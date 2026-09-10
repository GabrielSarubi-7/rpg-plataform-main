import { useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useMapStore } from "../store/mapStore";
import { useCampaignMapStore } from "../store/campaignMapStore";
import { useUiStore } from "@/features/ui/store/uiStore";

import MapLibraryModal from "./MapLibraryModal";

import styles from "./MapsPanel.module.css";

export default function MapsPanel() {
  const [libraryOpen, setLibraryOpen] = useState(false);

  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const currentMapId = useMapStore((state) => state.mapId);
  const currentPageName = useMapStore((state) => state.pageName);
  const currentBackground = useMapStore((state) => state.backgroundImage);
  const currentWidthCells = useMapStore((state) => state.widthCells);
  const currentHeightCells = useMapStore((state) => state.heightCells);
  const togglePanel = useUiStore((state) => state.togglePanel);

  const maps = useCampaignMapStore((state) => state.maps);
  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const canManage = useCampaignMapStore((state) => state.canManage);
  const loading = useCampaignMapStore((state) => state.loading);
  const error = useCampaignMapStore((state) => state.error);
  const loadMaps = useCampaignMapStore((state) => state.loadMaps);
  const activateMap = useCampaignMapStore((state) => state.activateMap);

  const currentMap =
    maps.find((map) => map.id === currentMapId) ??
    maps.find((map) => map.id === activeMapId) ??
    maps[0] ??
    null;
  const isViewingLiveMap =
    !canManage || !currentMapId || currentMapId === activeMapId;
  const currentMapName =
    currentMap?.id === currentMapId
      ? currentPageName
      : currentMap?.name ?? currentPageName;
  const currentMapBackground =
    currentMap?.id === currentMapId
      ? currentBackground
      : currentMap?.backgroundImage ?? currentBackground;

  useEffect(() => {
    if (!authToken || !activeCampaign) return;

    void loadMaps(authToken, activeCampaign.id);
  }, [authToken, activeCampaign, loadMaps, currentMapId]);

  const publishCurrentMap = async () => {
    if (!authToken || !activeCampaign || !currentMapId || !canManage) return;

    await activateMap(authToken, activeCampaign.id, currentMapId);
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Páginas da campanha</span>
          <h2>Mapas</h2>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => setLibraryOpen(true)}
        >
          Abrir biblioteca
        </button>
      </header>

      <div className={styles.currentCard}>
        <div
          className={styles.thumbnail}
          style={{
            backgroundImage: currentMapBackground
              ? `url(${resolveAssetUrl(currentMapBackground)})`
              : undefined,
          }}
        >
          {!currentMapBackground && <span>Sem imagem</span>}
        </div>

        <div className={styles.currentInfo}>
          <span
            className={isViewingLiveMap ? styles.liveBadge : styles.previewBadge}
          >
            {isViewingLiveMap ? "Ao vivo" : "Só GM"}
          </span>
          <strong>{currentMapName}</strong>
          <small>
            {currentMap?.width ?? currentWidthCells} ×{" "}
            {currentMap?.height ?? currentHeightCells} células
          </small>
        </div>
      </div>

      {canManage ? (
        <div className={styles.helper}>
          Use “Abrir para mim” para preparar um mapa em segredo. Só “Colocar ao
          vivo” troca a página dos jogadores.
        </div>
      ) : (
        <div className={styles.helper}>
          Jogadores veem somente o mapa que o mestre deixou ao vivo.
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.muted}>Carregando mapas...</p>}

      {canManage && (
        <div className={styles.actionStack}>
          {!isViewingLiveMap && (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={publishCurrentMap}
            >
              Colocar este mapa ao vivo
            </button>
          )}

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => togglePanel("pageSettings")}
          >
            Configurar mapa e background
          </button>
        </div>
      )}

      <MapLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
      />
    </section>
  );
}
