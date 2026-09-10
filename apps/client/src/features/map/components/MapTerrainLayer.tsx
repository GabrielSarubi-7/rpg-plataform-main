import { useMemo, type CSSProperties } from "react";

import { useMapStore } from "../store/mapStore";

import { normalizeMapLayerConfig } from "@shared/rules/mapRules";

import type {
  MapObject,
  TerrainCell,
  WallSegment,
} from "@shared/types/map";

import styles from "./MapTerrainLayer.module.css";

interface Props {
  cellSize: number;
  mode?: "2d" | "2.5d";
}

export default function MapTerrainLayer({ cellSize, mode = "2d" }: Props) {
  const layerConfig = useMapStore((state) => state.layerConfig);

  const normalizedLayer = useMemo(
    () => normalizeMapLayerConfig(layerConfig),
    [layerConfig],
  );

  const terrainCells = useMemo(
    () => Object.values(normalizedLayer.terrainCells),
    [normalizedLayer.terrainCells],
  );

  if (
    terrainCells.length === 0 &&
    normalizedLayer.walls.length === 0 &&
    normalizedLayer.objects.length === 0
  ) {
    return null;
  }

  return (
    <div
      className={`${styles.layer} ${mode === "2.5d" ? styles.layer25d : ""}`}
      aria-hidden
    >
      {terrainCells.map((cell) => (
        <TerrainTile key={`${cell.x}:${cell.y}`} cell={cell} cellSize={cellSize} />
      ))}

      {normalizedLayer.objects.map((object) => (
        <MapObjectBlock key={object.id} object={object} cellSize={cellSize} />
      ))}

      {normalizedLayer.walls.map((wall) => (
        <WallBlock key={wall.id} wall={wall} cellSize={cellSize} />
      ))}
    </div>
  );
}

function TerrainTile({
  cell,
  cellSize,
}: {
  cell: TerrainCell;
  cellSize: number;
}) {
  const positiveHeight = Math.max(0, cell.height);
  const reliefHeight = Math.min(positiveHeight * 3.8, cellSize * 1.35);
  const reliefSideWidth = Math.min(reliefHeight * 0.42, cellSize * 0.52);

  return (
    <div
      className={`${styles.terrainBlock} ${
        cell.height < 0 ? styles.depressedTerrain : ""
      }`}
      style={{
        left: cell.x * cellSize,
        top: cell.y * cellSize,
        width: cellSize,
        height: cellSize,
        zIndex: 1 + positiveHeight,
        "--height-level": cell.height,
        "--relief-height": `${reliefHeight}px`,
        "--relief-side-width": `${reliefSideWidth}px`,
        "--cell-size": `${cellSize}px`,
      } as CSSProperties}
    >
      {positiveHeight > 0 && (
        <>
          <div
            className={`${styles.terrainSide} ${styles.terrainSideEast} ${
              styles[cell.type]
            }`}
          />
          <div
            className={`${styles.terrainSide} ${styles.terrainSideSouth} ${
              styles[cell.type]
            }`}
          />
        </>
      )}

      <div className={`${styles.terrainCell} ${styles.terrainTop} ${styles[cell.type]}`}>
        {cell.height !== 0 && (
          <span>{cell.height > 0 ? `+${cell.height}` : cell.height}</span>
        )}
      </div>
    </div>
  );
}

function WallBlock({
  wall,
  cellSize,
}: {
  wall: WallSegment;
  cellSize: number;
}) {
  const thickness = Math.max(6, Math.round(cellSize * 0.14));
  const isVertical = wall.orientation === "vertical";
  const wallHeightPx = Math.min(Math.max(10, wall.height * 2.1), cellSize * 1.55);

  return (
    <div
      className={`${styles.wallBlock} ${styles[wall.material]} ${
        isVertical ? styles.wallVertical : styles.wallHorizontal
      }`}
      style={{
        left: wall.x * cellSize - (isVertical ? thickness / 2 : 0),
        top: wall.y * cellSize - (isVertical ? 0 : thickness / 2),
        width: isVertical ? thickness : cellSize,
        height: isVertical ? cellSize : thickness,
        "--wall-height": wall.height,
        "--wall-height-px": `${wallHeightPx}px`,
      } as CSSProperties}
      title={`${wall.material} ${wall.height}ft`}
    >
      <div className={`${styles.wallSide} ${styles[wall.material]}`} />
      <div className={`${styles.wallTop} ${styles[wall.material]}`} />
    </div>
  );
}

function MapObjectBlock({
  object,
  cellSize,
}: {
  object: MapObject;
  cellSize: number;
}) {
  const objectLift = Math.min(
    Math.max(0, object.elevation + object.height) * 1.4,
    cellSize * 1.8,
  );
  const objectHeightPx = Math.min(Math.max(8, object.height * 1.35), cellSize * 1.55);

  return (
    <div
      className={styles.mapObjectBlock}
      style={{
        left: object.x * cellSize,
        top: object.y * cellSize,
        width: object.widthCells * cellSize,
        height: object.heightCells * cellSize,
        zIndex: 3 + Math.max(0, object.elevation + object.height),
        "--object-elevation": object.elevation,
        "--object-height": object.height,
        "--object-lift": `${objectLift}px`,
        "--object-height-px": `${objectHeightPx}px`,
      } as CSSProperties}
      title={object.name ?? object.type}
    >
      <div className={styles.objectShadow} />
      <div className={`${styles.objectSide} ${styles[object.type]}`} />
      <div className={`${styles.mapObject} ${styles[object.type]}`}>
        <span>{getObjectIcon(object.type)}</span>
      </div>
    </div>
  );
}

function getObjectIcon(type: MapObject["type"]) {
  switch (type) {
    case "tree":
      return "🌲";
    case "crate":
      return "📦";
    case "pillar":
      return "🏛️";
    case "door":
      return "🚪";
    case "bridge":
      return "═";
    case "stairs":
      return "▟";
    case "platform":
      return "▣";
    case "campfire":
      return "🔥";
    case "custom":
      return "◆";
    case "rock":
    default:
      return "🪨";
  }
}
