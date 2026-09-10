import FloatingPanel from "@/shared/components/ui/FloatingPanel";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";

import { emitMapSettingsUpdate } from "../services/mapSocketService";
import { useCampaignMapStore } from "../store/campaignMapStore";
import { useFogToolStore, type FogTool } from "../store/fogToolStore";
import { useMapStore } from "../store/mapStore";
import { withFogOfWar } from "../utils/fogOfWar";

import { DEFAULT_FOG_OF_WAR, normalizeMapSettings } from "@shared/rules/mapRules";
import type { FogOfWarConfig, MapLayerConfig } from "@shared/types/map";

import styles from "./FogPanel.module.css";

const TOOL_OPTIONS: {
  id: FogTool;
  label: string;
  description: string;
}[] = [
  {
    id: "none",
    label: "Mover",
    description: "Navegue normalmente pelo mapa.",
  },
  {
    id: "reveal",
    label: "Revelar",
    description: "Mostra área para os jogadores.",
  },
  {
    id: "hide",
    label: "Escurecer",
    description: "Esconde área dos jogadores.",
  },
];

export default function FogPanel() {
  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);

  const mapId = useMapStore((state) => state.mapId);
  const layerConfig = useMapStore((state) => state.layerConfig);
  const widthCells = useMapStore((state) => state.widthCells);
  const heightCells = useMapStore((state) => state.heightCells);
  const setMapSettings = useMapStore((state) => state.setMapSettings);

  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const canManageLoadedMap = useCampaignMapStore((state) => state.canManage);
  const saving = useCampaignMapStore((state) => state.saving);
  const updateMap = useCampaignMapStore((state) => state.updateMap);
  const canManage =
    canManageLoadedMap || canManageCampaign(activeCampaign, user?.id);

  const fogTool = useFogToolStore((state) => state.tool);
  const brushSize = useFogToolStore((state) => state.brushSize);
  const setFogTool = useFogToolStore((state) => state.setTool);
  const setBrushSize = useFogToolStore((state) => state.setBrushSize);

  const fog = layerConfig?.fogOfWar ?? DEFAULT_FOG_OF_WAR;
  const hiddenCellCount = Object.keys(fog.cells).length;
  const totalCells = widthCells * heightCells;
  const isLiveMap = Boolean(
    lobbyCode && mapId && (!activeMapId || mapId === activeMapId),
  );

  const persistLayer = async (nextLayer: MapLayerConfig) => {
    const settings = buildMapSettingsFromStore(nextLayer);

    setMapSettings(settings);

    const shouldSavePrivately =
      canManage &&
      Boolean(settings.mapId) &&
      Boolean(activeMapId) &&
      settings.mapId !== activeMapId;

    if (
      shouldSavePrivately &&
      authToken &&
      activeCampaign &&
      settings.mapId
    ) {
      await updateMap(authToken, activeCampaign.id, settings.mapId, {
        layerConfig: settings.layerConfig ?? null,
      });
      return;
    }

    if (lobbyCode && authToken) {
      emitMapSettingsUpdate(lobbyCode, settings, authToken);
    }
  };

  const updateFog = (nextFog: Partial<FogOfWarConfig>) => {
    void persistLayer(withFogOfWar(layerConfig, nextFog));
  };

  const handleEnableFog = (enabled: boolean) => {
    updateFog({
      enabled,
      opacity: fog.opacity,
    });

    if (!enabled) {
      setFogTool("none");
    } else if (fogTool === "none") {
      setFogTool("reveal");
    }
  };

  const hideEverything = () => {
    setFogTool("reveal");
    updateFog({
      enabled: true,
      opacity: fog.opacity,
      mode: "revealed_cells",
      cells: {},
    });
  };

  const revealEverything = () => {
    setFogTool("none");
    updateFog({
      enabled: false,
      opacity: fog.opacity,
      mode: "hidden_cells",
      cells: {},
    });
  };

  return (
    <FloatingPanel panelId="fog" title="Fog of War" width={360} height={560}>
      <div className={styles.panel}>
        {!canManage ? (
          <div className={styles.emptyState}>
            <strong>Controle do mestre</strong>
            <p>
              A névoa de guerra é controlada pelo GM/owner. Jogadores só veem o
              resultado no mapa.
            </p>
          </div>
        ) : (
          <>
            <section className={styles.hero}>
              <div>
                <span className={styles.eyebrow}>Visão dos jogadores</span>
                <strong>{fog.enabled ? "Fog ativa" : "Mapa revelado"}</strong>
                <p>
                  {isLiveMap
                    ? "Alterações aplicadas no mapa ao vivo."
                    : "Alterações salvas apenas neste mapa do GM."}
                </p>
              </div>

              <button
                type="button"
                className={`${styles.switchButton} ${
                  fog.enabled ? styles.switchButtonOn : ""
                }`}
                onClick={() => handleEnableFog(!fog.enabled)}
              >
                {fog.enabled ? "Ligada" : "Desligada"}
              </button>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <strong>Ferramenta</strong>
                <span>{brushSize}×{brushSize}</span>
              </div>

              <div className={styles.toolGrid}>
                {TOOL_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={!fog.enabled && option.id !== "none"}
                    className={`${styles.toolButton} ${
                      fogTool === option.id ? styles.toolButtonActive : ""
                    }`}
                    onClick={() => setFogTool(option.id)}
                    title={option.description}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>

              <label className={styles.field}>
                <span>Tamanho do pincel</span>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                />
              </label>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <strong>Opacidade</strong>
                <span>{Math.round(fog.opacity * 100)}%</span>
              </div>

              <label className={styles.field}>
                <span>Escuridão para jogadores</span>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={Math.round(fog.opacity * 100)}
                  onChange={(event) =>
                    updateFog({
                      enabled: fog.enabled,
                      opacity: Number(event.target.value) / 100,
                    })
                  }
                />
              </label>
            </section>

            <section className={styles.actions}>
              <button
                type="button"
                className={styles.primaryAction}
                disabled={saving}
                onClick={hideEverything}
              >
                Escurecer tudo
              </button>

              <button
                type="button"
                className={styles.secondaryAction}
                disabled={saving}
                onClick={revealEverything}
              >
                Revelar tudo
              </button>
            </section>

            <section className={styles.statusCard}>
              <div>
                <span>Modo</span>
                <strong>
                  {fog.mode === "revealed_cells"
                    ? "Mapa escuro, revelando áreas"
                    : "Mapa aberto, escondendo áreas"}
                </strong>
              </div>

              <div>
                <span>Células marcadas</span>
                <strong>
                  {hiddenCellCount} / {totalCells}
                </strong>
              </div>
            </section>
          </>
        )}
      </div>
    </FloatingPanel>
  );
}

function buildMapSettingsFromStore(layerConfig: MapLayerConfig) {
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
