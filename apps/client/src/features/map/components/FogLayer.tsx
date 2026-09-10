import { useId, useMemo, useRef, useState } from "react";

import type { Camera } from "@/features/map/hooks/useCamera";
import { screenToWorld } from "@/features/map/utils/coords";
import { emitMapSettingsUpdate } from "@/features/map/services/mapSocketService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useCampaignMapStore } from "@/features/map/store/campaignMapStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useMapStore } from "@/features/map/store/mapStore";

import { normalizeMapSettings } from "@shared/rules/mapRules";
import type { MapSettings } from "@shared/types/map";

import { applyFogBrush, getFogBrushCells, withFogOfWar } from "../utils/fogOfWar";
import { useFogToolStore } from "../store/fogToolStore";

import styles from "./FogLayer.module.css";

interface Props {
  width: number;
  height: number;
  cellSize: number;
  camera: Camera;
}

export default function FogLayer({ width, height, cellSize, camera }: Props) {
  const maskId = useId().replace(/:/g, "");
  const isPaintingRef = useRef(false);
  const lastPaintKeyRef = useRef<string | null>(null);

  const authToken = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);

  const mapId = useMapStore((state) => state.mapId);
  const widthCells = useMapStore((state) => state.widthCells);
  const heightCells = useMapStore((state) => state.heightCells);
  const layerConfig = useMapStore((state) => state.layerConfig);
  const setMapSettings = useMapStore((state) => state.setMapSettings);

  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const canManageLoadedMap = useCampaignMapStore((state) => state.canManage);
  const updateMap = useCampaignMapStore((state) => state.updateMap);
  const canManage =
    canManageLoadedMap || canManageCampaign(activeCampaign, user?.id);

  const fogTool = useFogToolStore((state) => state.tool);
  const brushSize = useFogToolStore((state) => state.brushSize);

  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(
    null,
  );

  const fog = layerConfig?.fogOfWar;
  const fogCells = useMemo(
    () =>
      Object.keys(fog?.cells ?? {})
        .map((key) => {
          const [x, y] = key.split(":").map(Number);

          if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

          return {
            key,
            x,
            y,
          };
        })
        .filter((cell): cell is { key: string; x: number; y: number } =>
          Boolean(cell),
        ),
    [fog?.cells],
  );

  const isFogVisible = Boolean(fog?.enabled);
  const isEditing = canManage && fogTool !== "none";
  const effectiveOpacity = canManage
    ? Math.min(0.62, Math.max(0.16, (fog?.opacity ?? 0.92) * 0.58))
    : Math.max(0.2, Math.min(1, fog?.opacity ?? 0.92));

  const getCellFromEvent = (event: React.PointerEvent<HTMLElement>) => {
    const world = screenToWorld(event.clientX, event.clientY, camera);
    const x = Math.floor(world.x / cellSize);
    const y = Math.floor(world.y / cellSize);

    if (x < 0 || y < 0 || x >= widthCells || y >= heightCells) {
      return null;
    }

    return {
      x,
      y,
    };
  };

  const updateFogAtCell = (cell: { x: number; y: number }) => {
    if (!canManage || fogTool === "none") return;

    const currentState = useMapStore.getState();
    const currentLayer = currentState.layerConfig;
    const currentFog = currentLayer?.fogOfWar;

    if (!currentFog?.enabled) return;

    const brushCells = getFogBrushCells({
      centerX: cell.x,
      centerY: cell.y,
      brushSize,
      widthCells: currentState.widthCells,
      heightCells: currentState.heightCells,
    });
    const paintKey = `${fogTool}:${brushCells.map((item) => item.key).join("|")}`;

    if (lastPaintKeyRef.current === paintKey) return;
    lastPaintKeyRef.current = paintKey;

    const nextFog = applyFogBrush({
      fog: currentFog,
      cellKeys: brushCells.map((item) => item.key),
      action: fogTool === "hide" ? "hide" : "reveal",
    });
    const nextLayer = withFogOfWar(currentLayer, nextFog);
    const nextSettings = buildMapSettingsFromStore(nextLayer);

    setMapSettings(nextSettings);
  };

  const commitFog = () => {
    if (!canManage) return;

    const settings = buildMapSettingsFromStore(
      useMapStore.getState().layerConfig,
    );
    const shouldSavePrivately =
      canManage &&
      Boolean(mapId) &&
      Boolean(activeMapId) &&
      mapId !== activeMapId;

    if (
      shouldSavePrivately &&
      authToken &&
      activeCampaign &&
      settings.mapId
    ) {
      void updateMap(authToken, activeCampaign.id, settings.mapId, {
        layerConfig: settings.layerConfig ?? null,
      });
      return;
    }

    if (lobbyCode && authToken) {
      emitMapSettingsUpdate(lobbyCode, settings, authToken);
    }
  };

  const stopEvent = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!isEditing || event.button !== 0) return;

    const cell = getCellFromEvent(event);
    if (!cell) return;

    stopEvent(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    isPaintingRef.current = true;
    lastPaintKeyRef.current = null;
    updateFogAtCell(cell);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isEditing) return;

    const cell = getCellFromEvent(event);
    setHoveredCell(cell);

    if (!isPaintingRef.current || !cell) return;

    stopEvent(event);
    updateFogAtCell(cell);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!isEditing) return;

    stopEvent(event);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isPaintingRef.current = false;
    lastPaintKeyRef.current = null;
    commitFog();
  };

  if (!isFogVisible && !isEditing) {
    return null;
  }

  return (
    <section
      className={`${styles.layer} ${isEditing ? styles.layerEditing : ""}`}
      style={{
        width,
        height,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => setHoveredCell(null)}
      onContextMenu={isEditing ? stopEvent : undefined}
    >
      {isFogVisible && fog && (
        <svg
          className={styles.svg}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          {fog.mode === "revealed_cells" ? (
            <>
              <defs>
                <mask id={maskId}>
                  <rect width={width} height={height} fill="white" />

                  {fogCells.map((cell) => (
                    <rect
                      key={cell.key}
                      x={cell.x * cellSize}
                      y={cell.y * cellSize}
                      width={cellSize}
                      height={cellSize}
                      fill="black"
                    />
                  ))}
                </mask>
              </defs>

              <rect
                width={width}
                height={height}
                fill="black"
                opacity={effectiveOpacity}
                mask={`url(#${maskId})`}
              />
            </>
          ) : (
            fogCells.map((cell) => (
              <rect
                key={cell.key}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                width={cellSize}
                height={cellSize}
                fill="black"
                opacity={effectiveOpacity}
              />
            ))
          )}
        </svg>
      )}

      {isEditing && hoveredCell && (
        <div
          className={`${styles.brush} ${
            fogTool === "hide" ? styles.brushHide : styles.brushReveal
          }`}
          style={getBrushStyle({
            cell: hoveredCell,
            cellSize,
            brushSize,
            widthCells,
            heightCells,
          })}
        />
      )}
    </section>
  );
}

function buildMapSettingsFromStore(layerConfig: MapSettings["layerConfig"]) {
  const state = useMapStore.getState();

  return normalizeMapSettings({
    mapId: state.mapId,
    pageName: state.pageName,
    widthCells: state.widthCells,
    heightCells: state.heightCells,
    cellSize: state.cellSize,
    backgroundImage: state.backgroundImage,
    backgroundImageWidth: state.backgroundImageWidth,
    backgroundImageHeight: state.backgroundImageHeight,
    layerConfig,
  });
}

function getBrushStyle(input: {
  cell: { x: number; y: number };
  cellSize: number;
  brushSize: number;
  widthCells: number;
  heightCells: number;
}) {
  const size = Math.max(1, input.brushSize);
  const offset = Math.floor(size / 2);
  const x = Math.max(0, Math.min(input.widthCells - size, input.cell.x - offset));
  const y = Math.max(
    0,
    Math.min(input.heightCells - size, input.cell.y - offset),
  );

  return {
    left: x * input.cellSize,
    top: y * input.cellSize,
    width: size * input.cellSize,
    height: size * input.cellSize,
  };
}
