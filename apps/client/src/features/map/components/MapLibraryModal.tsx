import { useEffect, useMemo, useRef, useState } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import {
  getImageFileSize,
  resolveAssetUrl,
  uploadImageAsset,
} from "@/features/assets/assetApi";
import { useMapStore } from "../store/mapStore";
import { useCampaignMapStore } from "../store/campaignMapStore";
import MapEditorModal from "./MapEditorModal";
import { DEFAULT_MAP_SETTINGS } from "@shared/rules/mapRules";

import type { CampaignMap } from "../services/mapApi";

import styles from "./MapLibraryModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MapLibraryModal({ open, onClose }: Props) {
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const viewedMapId = useMapStore((state) => state.mapId);

  const maps = useCampaignMapStore((state) => state.maps);
  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const canManage = useCampaignMapStore((state) => state.canManage);
  const loading = useCampaignMapStore((state) => state.loading);
  const saving = useCampaignMapStore((state) => state.saving);
  const error = useCampaignMapStore((state) => state.error);
  const loadMaps = useCampaignMapStore((state) => state.loadMaps);
  const createMap = useCampaignMapStore((state) => state.createMap);
  const activateMap = useCampaignMapStore((state) => state.activateMap);
  const previewMap = useCampaignMapStore((state) => state.previewMap);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("Nova página");
  const [width, setWidth] = useState(DEFAULT_MAP_SETTINGS.widthCells);
  const [height, setHeight] = useState(DEFAULT_MAP_SETTINGS.heightCells);
  const [cellSize, setCellSize] = useState(DEFAULT_MAP_SETTINGS.cellSize);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [activateAfterCreate, setActivateAfterCreate] = useState(true);
  const [editingMap, setEditingMap] = useState<CampaignMap | null>(null);

  const filteredMaps = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return maps;

    return maps.filter((map) =>
      map.name.toLowerCase().includes(normalizedQuery),
    );
  }, [maps, query]);

  useEffect(() => {
    if (!open || !authToken || !activeCampaign) return;

    void loadMaps(authToken, activeCampaign.id);
  }, [open, authToken, activeCampaign, loadMaps, viewedMapId]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (editingMap) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, editingMap]);

  if (!open) return null;

  const handleChooseBackground = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!authToken) return;

    const imageSize = await getImageFileSize(file);
    const imageUrl = await uploadImageAsset(authToken, file, {
      maxDimension: 1920,
      quality: 0.82,
    });

    setBackgroundImage(imageUrl);
    setWidth(Math.max(1, Math.round(imageSize.width / cellSize)));
    setHeight(Math.max(1, Math.round(imageSize.height / cellSize)));
  };

  const handleCreateMap = async () => {
    if (!authToken || !activeCampaign || !canManage) return;

    const map = await createMap(authToken, activeCampaign.id, {
      name,
      width,
      height,
      cellSize,
      backgroundImage,
      activate: activateAfterCreate,
    });

    if (!activateAfterCreate) {
      await previewMap(authToken, activeCampaign.id, map.id);
    }

    setCreating(false);
    setName("Nova página");
    setWidth(DEFAULT_MAP_SETTINGS.widthCells);
    setHeight(DEFAULT_MAP_SETTINGS.heightCells);
    setCellSize(DEFAULT_MAP_SETTINGS.cellSize);
    setBackgroundImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePreviewMap = async (map: CampaignMap) => {
    if (!authToken || !activeCampaign || !canManage) return;
    if (map.id === viewedMapId) return;

    await previewMap(authToken, activeCampaign.id, map.id);
  };

  const handleActivateMap = async (map: CampaignMap) => {
    if (!authToken || !activeCampaign || !canManage) return;
    if (map.id === activeMapId) return;

    await activateMap(authToken, activeCampaign.id, map.id);
  };

  return (
    <div
      data-ui-layer="true"
      className={styles.backdrop}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <section className={styles.modal} role="dialog" aria-modal="true">
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Biblioteca da mesa</span>
            <h2>Mapas da campanha</h2>
            <p>
              {canManage
                ? "Abra mapas só para você enquanto prepara a sessão, ou coloque um mapa ao vivo para todos."
                : "Aqui aparece apenas o mapa que o mestre deixou visível."}
            </p>
          </div>

          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </header>

        <div className={styles.toolbar}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar mapa..."
            className={styles.searchInput}
          />

          {canManage && (
            <button
              type="button"
              className={styles.createButton}
              onClick={() => setCreating((value) => !value)}
            >
              + Criar mapa
            </button>
          )}
        </div>

        {creating && canManage && (
          <div className={styles.createPanel}>
            <div className={styles.createPreviewWrap}>
              <div
                className={styles.createPreview}
                style={{
                  backgroundImage: backgroundImage
                    ? `url(${resolveAssetUrl(backgroundImage)})`
                    : undefined,
                }}
              >
                {!backgroundImage && <span>Miniatura</span>}
              </div>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Escolher imagem
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleChooseBackground}
              />
            </div>

            <div className={styles.createFields}>
              <label>
                Nome
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <div className={styles.numberGrid}>
                <label>
                  Largura
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={width}
                    onChange={(event) => setWidth(Number(event.target.value))}
                  />
                </label>

                <label>
                  Altura
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={height}
                    onChange={(event) => setHeight(Number(event.target.value))}
                  />
                </label>

                <label>
                  Célula
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={cellSize}
                    onChange={(event) =>
                      setCellSize(Number(event.target.value))
                    }
                  />
                </label>
              </div>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={activateAfterCreate}
                  onChange={(event) =>
                    setActivateAfterCreate(event.target.checked)
                  }
                />
                Colocar este mapa ao vivo ao criar
              </label>

              <button
                type="button"
                className={styles.createButton}
                disabled={saving}
                onClick={handleCreateMap}
              >
                {saving ? "Criando..." : "Criar mapa"}
              </button>
            </div>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.content}>
          {loading ? (
            <div className={styles.emptyState}>Carregando mapas...</div>
          ) : filteredMaps.length === 0 ? (
            <div className={styles.emptyState}>
              Nenhum mapa encontrado para esta busca.
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredMaps.map((map) => {
                const live = map.id === activeMapId;
                const viewing = map.id === viewedMapId;

                return (
                  <article
                    key={map.id}
                    className={`${styles.mapCard} ${
                      live ? styles.mapCardActive : ""
                    } ${viewing ? styles.mapCardViewing : ""}`}
                  >
                    <div className={styles.mapButton}>
                      <MapThumbnail map={map} live={live} viewing={viewing} />

                      <span className={styles.mapName}>{map.name}</span>
                      <span className={styles.mapMeta}>
                        {map.width} × {map.height} células
                      </span>

                      {canManage && (
                        <div className={styles.cardActions}>
                          <button
                            type="button"
                            className={styles.cardButton}
                            disabled={saving}
                            onClick={() => setEditingMap(map)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={styles.cardButton}
                            disabled={viewing || saving}
                            onClick={() => handlePreviewMap(map)}
                          >
                            {viewing ? "Na sua tela" : "Abrir para mim"}
                          </button>

                          <button
                            type="button"
                            className={`${styles.cardButton} ${styles.liveButton}`}
                            disabled={live || saving}
                            onClick={() => handleActivateMap(map)}
                          >
                            {live ? "Ao vivo" : "Colocar ao vivo"}
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Fechar
          </button>
        </footer>
      </section>

      <MapEditorModal
        open={Boolean(editingMap)}
        map={editingMap}
        onClose={() => setEditingMap(null)}
      />
    </div>
  );
}

function MapThumbnail(props: {
  map: CampaignMap;
  live: boolean;
  viewing: boolean;
}) {
  return (
    <div
      className={styles.mapThumbnail}
      style={{
        backgroundImage: props.map.backgroundImage
          ? `url(${resolveAssetUrl(props.map.backgroundImage)})`
          : undefined,
      }}
    >
      {!props.map.backgroundImage && <span>Mapa</span>}
      {props.live && <strong>Ao vivo</strong>}
      {!props.live && props.viewing && <em>Na sua tela</em>}
    </div>
  );
}
