import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useMapStore } from "../store/mapStore";
import { useCampaignMapStore } from "../store/campaignMapStore";
import { emitMapSettingsUpdate } from "../services/mapSocketService";

import {
  getTerrainCellKey,
  normalizeMapLayerConfig,
  normalizeMapSettings,
} from "@shared/rules/mapRules";

import type { CampaignMap } from "../services/mapApi";
import type {
  MapLayerConfig,
  MapObject,
  TerrainCell,
  TerrainType,
  WallMaterial,
  WallSegment,
} from "@shared/types/map";

import styles from "./MapEditorModal.module.css";

type EditorTool = "terrain" | "wall" | "object" | "erase";
type MapObjectType = MapObject["type"];

interface Props {
  open: boolean;
  map: CampaignMap | null;
  onClose: () => void;
}

const TERRAIN_OPTIONS: {
  id: TerrainType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "stone",
    label: "Pedra",
    description: "Piso firme, masmorras e ruínas.",
    icon: "⬚",
  },
  {
    id: "grass",
    label: "Grama",
    description: "Florestas, campos e clareiras.",
    icon: "✦",
  },
  {
    id: "dirt",
    label: "Terra",
    description: "Estradas, cavernas e trilhas.",
    icon: "◼",
  },
  {
    id: "wood",
    label: "Madeira",
    description: "Pontes, decks e interiores.",
    icon: "▤",
  },
  {
    id: "water",
    label: "Água",
    description: "Rios, lagoas, poços e terreno difícil.",
    icon: "≈",
  },
  {
    id: "lava",
    label: "Lava",
    description: "Perigo visual para mapas dramáticos.",
    icon: "◆",
  },
  {
    id: "snow",
    label: "Neve",
    description: "Regiões frias e terreno escorregadio.",
    icon: "❄",
  },
  {
    id: "void",
    label: "Abismo",
    description: "Buracos, vazio ou área bloqueada.",
    icon: "●",
  },
];

const WALL_OPTIONS: {
  id: WallMaterial;
  label: string;
  icon: string;
}[] = [
  {
    id: "stone",
    label: "Pedra",
    icon: "▥",
  },
  {
    id: "wood",
    label: "Madeira",
    icon: "▦",
  },
  {
    id: "metal",
    label: "Metal",
    icon: "▧",
  },
  {
    id: "force",
    label: "Força",
    icon: "✧",
  },
];

const OBJECT_OPTIONS: {
  id: MapObjectType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "rock",
    label: "Rocha",
    description: "Cobertura, obstáculo ou detalhe natural.",
    icon: "🪨",
  },
  {
    id: "tree",
    label: "Árvore",
    description: "Objeto alto para floresta ou cenário externo.",
    icon: "🌲",
  },
  {
    id: "crate",
    label: "Caixa",
    description: "Prop simples para cobertura e loot.",
    icon: "📦",
  },
  {
    id: "pillar",
    label: "Pilar",
    description: "Coluna alta para templo, ruína ou masmorra.",
    icon: "🏛️",
  },
  {
    id: "door",
    label: "Porta",
    description: "Marcação de passagem, bloqueio ou entrada.",
    icon: "🚪",
  },
  {
    id: "bridge",
    label: "Ponte",
    description: "Conecta níveis, água, abismos e plataformas.",
    icon: "═",
  },
  {
    id: "stairs",
    label: "Escada",
    description: "Sugere ligação visual entre alturas diferentes.",
    icon: "▟",
  },
  {
    id: "platform",
    label: "Plataforma",
    description: "Base elevada, mezanino ou terreno artificial.",
    icon: "▣",
  },
  {
    id: "campfire",
    label: "Fogueira",
    description: "Ponto de luz, ambiente e interesse visual.",
    icon: "🔥",
  },
];

export default function MapEditorModal({ open, map, onClose }: Props) {
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);

  const currentMapId = useMapStore((state) => state.mapId);
  const setMapSettings = useMapStore((state) => state.setMapSettings);

  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const saving = useCampaignMapStore((state) => state.saving);
  const updateMap = useCampaignMapStore((state) => state.updateMap);

  const boardRef = useRef<HTMLDivElement>(null);
  const isPaintingRef = useRef(false);
  const lastPaintRef = useRef<string | null>(null);

  const [tool, setTool] = useState<EditorTool>("terrain");
  const [terrainType, setTerrainType] = useState<TerrainType>("stone");
  const [terrainHeight, setTerrainHeight] = useState(0);
  const [wallMaterial, setWallMaterial] = useState<WallMaterial>("stone");
  const [wallHeight, setWallHeight] = useState(15);
  const [wallOrientation, setWallOrientation] = useState<
    WallSegment["orientation"]
  >("horizontal");
  const [objectType, setObjectType] = useState<MapObjectType>("rock");
  const [objectWidthCells, setObjectWidthCells] = useState(1);
  const [objectHeightCells, setObjectHeightCells] = useState(1);
  const [objectElevation, setObjectElevation] = useState(0);
  const [objectHeight, setObjectHeight] = useState(10);
  const [brushSize, setBrushSize] = useState(1);
  const [editorCellSize, setEditorCellSize] = useState(28);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(
    null,
  );

  const [draftName, setDraftName] = useState(map?.name ?? "");
  const [draftWidth, setDraftWidth] = useState(map?.width ?? 40);
  const [draftHeight, setDraftHeight] = useState(map?.height ?? 40);
  const [draftCellSize, setDraftCellSize] = useState(map?.cellSize ?? 40);
  const [layerConfig, setLayerConfig] = useState<MapLayerConfig>(() =>
    normalizeMapLayerConfig(map?.layerConfigJson),
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !map) return;

    setDraftName(map.name);
    setDraftWidth(map.width);
    setDraftHeight(map.height);
    setDraftCellSize(map.cellSize);
    setLayerConfig(normalizeMapLayerConfig(map.layerConfigJson));
    setTool("terrain");
    setLocalError(null);
  }, [open, map]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key.toLowerCase() === "r") {
        setWallOrientation((value) =>
          value === "horizontal" ? "vertical" : "horizontal",
        );
      }

      if (event.key === "1") setTool("terrain");
      if (event.key === "2") setTool("wall");
      if (event.key === "3") setTool("object");
      if (event.key === "4") setTool("erase");
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const terrainCells = useMemo(
    () =>
      Object.values(layerConfig.terrainCells).filter(
        (cell) =>
          cell.x >= 0 &&
          cell.y >= 0 &&
          cell.x < draftWidth &&
          cell.y < draftHeight,
      ),
    [layerConfig.terrainCells, draftWidth, draftHeight],
  );

  const visibleWalls = useMemo(
    () =>
      layerConfig.walls.filter(
        (wall) =>
          wall.x >= 0 &&
          wall.y >= 0 &&
          wall.x <= draftWidth &&
          wall.y <= draftHeight,
      ),
    [layerConfig.walls, draftWidth, draftHeight],
  );

  const visibleObjects = useMemo(
    () =>
      layerConfig.objects.filter(
        (object) =>
          object.x >= 0 &&
          object.y >= 0 &&
          object.x < draftWidth &&
          object.y < draftHeight,
      ),
    [layerConfig.objects, draftWidth, draftHeight],
  );

  const boardSize = {
    width: draftWidth * editorCellSize,
    height: draftHeight * editorCellSize,
  };

  if (!open || !map) return null;

  const selectedTerrain = TERRAIN_OPTIONS.find(
    (option) => option.id === terrainType,
  );
  const selectedObject = OBJECT_OPTIONS.find((option) => option.id === objectType);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const cell = getCellFromPointer(event);
    if (!cell) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    isPaintingRef.current = true;
    lastPaintRef.current = null;
    paintAt(cell.x, cell.y);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const cell = getCellFromPointer(event);
    setHoveredCell(cell);

    if (!isPaintingRef.current) return;

    if (!cell) return;

    paintAt(cell.x, cell.y);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isPaintingRef.current = false;
    lastPaintRef.current = null;
  };

  const handlePointerLeave = () => {
    setHoveredCell(null);
  };

  const handleSave = async () => {
    if (!authToken || !activeCampaign || !map) return;

    const name = draftName.trim();

    if (name.length < 2) {
      setLocalError("Dê um nome para o mapa com pelo menos 2 caracteres.");
      return;
    }

    const prunedLayer = pruneLayerConfig(
      normalizeMapLayerConfig(layerConfig),
      draftWidth,
      draftHeight,
    );

    try {
      setLocalError(null);

      const updatedMap = await updateMap(authToken, activeCampaign.id, map.id, {
        name,
        width: draftWidth,
        height: draftHeight,
        cellSize: draftCellSize,
        backgroundImage: map.backgroundImage ?? null,
        layerConfig: prunedLayer,
      });

      const updatedSettings = normalizeMapSettings({
        mapId: updatedMap.id,
        pageName: updatedMap.name,
        widthCells: updatedMap.width,
        heightCells: updatedMap.height,
        cellSize: updatedMap.cellSize,
        backgroundImage: updatedMap.backgroundImage ?? undefined,
        layerConfig: prunedLayer,
      });

      if (currentMapId === updatedMap.id) {
        setMapSettings(updatedSettings);
      }

      if (
        activeMapId === updatedMap.id &&
        currentMapId === updatedMap.id &&
        lobbyCode &&
        authToken
      ) {
        emitMapSettingsUpdate(lobbyCode, updatedSettings, authToken);
      }

      onClose();
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Erro ao salvar edição do mapa.",
      );
    }
  };

  function getCellFromPointer(event: PointerEvent<HTMLDivElement>) {
    const board = boardRef.current;
    if (!board) return null;

    const rect = board.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / editorCellSize);
    const y = Math.floor((event.clientY - rect.top) / editorCellSize);

    if (x < 0 || y < 0 || x >= draftWidth || y >= draftHeight) {
      return null;
    }

    return {
      x,
      y,
    };
  }

  function paintAt(x: number, y: number) {
    const paintKey = `${tool}:${x}:${y}:${terrainType}:${terrainHeight}:${wallMaterial}:${wallHeight}:${wallOrientation}:${objectType}:${objectWidthCells}:${objectHeightCells}:${objectElevation}:${objectHeight}:${brushSize}`;

    if (paintKey === lastPaintRef.current) {
      return;
    }

    lastPaintRef.current = paintKey;

    setLayerConfig((current) => {
      const next = cloneLayerConfig(current);
      const cells = getBrushCells(x, y, brushSize, draftWidth, draftHeight);

      if (tool === "terrain") {
        for (const cell of cells) {
          next.terrainCells[getTerrainCellKey(cell.x, cell.y)] = {
            x: cell.x,
            y: cell.y,
            type: terrainType,
            height: terrainHeight,
          };
        }
      }

      if (tool === "wall") {
        const wallIds = new Set(
          cells.map((cell) => getWallId(cell.x, cell.y, wallOrientation)),
        );

        next.walls = next.walls.filter((wall) => !wallIds.has(wall.id));

        for (const cell of cells) {
          next.walls.push({
            id: getWallId(cell.x, cell.y, wallOrientation),
            x: cell.x,
            y: cell.y,
            orientation: wallOrientation,
            height: wallHeight,
            material: wallMaterial,
          });
        }
      }

      if (tool === "object") {
        const objectBounds = {
          x,
          y,
          widthCells: objectWidthCells,
          heightCells: objectHeightCells,
        };

        next.objects = next.objects.filter(
          (object) => !objectsOverlap(object, objectBounds),
        );

        next.objects.push({
          id: crypto.randomUUID(),
          x,
          y,
          widthCells: objectWidthCells,
          heightCells: objectHeightCells,
          elevation: objectElevation,
          height: objectHeight,
          type: objectType,
          name: selectedObject?.label,
        });
      }

      if (tool === "erase") {
        const terrainKeys = new Set(
          cells.map((cell) => getTerrainCellKey(cell.x, cell.y)),
        );
        const wallPositions = new Set(
          cells.flatMap((cell) => [
            getWallId(cell.x, cell.y, "horizontal"),
            getWallId(cell.x, cell.y, "vertical"),
          ]),
        );

        for (const key of terrainKeys) {
          delete next.terrainCells[key];
        }

        next.walls = next.walls.filter((wall) => !wallPositions.has(wall.id));
        next.objects = next.objects.filter((object) =>
          cells.every(
            (cell) =>
              !objectsOverlap(object, {
                x: cell.x,
                y: cell.y,
                widthCells: 1,
                heightCells: 1,
              }),
          ),
        );
      }

      return next;
    });
  }

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
            <span className={styles.eyebrow}>Construtor de mapa</span>
            <h2>{map.name}</h2>
            <p>
              Pinte pisos em níveis diferentes, desenhe paredes e prepare água,
              abismos ou terreno difícil sem trocar o background original.
            </p>
          </div>

          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </header>

        <div className={styles.body}>
          <aside className={styles.palette}>
            <section className={styles.paletteCard}>
              <h3>Mapa</h3>

              <label>
                Nome
                <input
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                />
              </label>

              <div className={styles.compactGrid}>
                <label>
                  Largura
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={draftWidth}
                    onChange={(event) =>
                      setDraftWidth(clampNumber(event.target.value, 1, 500))
                    }
                  />
                </label>

                <label>
                  Altura
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={draftHeight}
                    onChange={(event) =>
                      setDraftHeight(clampNumber(event.target.value, 1, 500))
                    }
                  />
                </label>
              </div>

              <label>
                Célula da mesa
                <input
                  type="number"
                  min={20}
                  max={200}
                  value={draftCellSize}
                  onChange={(event) =>
                    setDraftCellSize(clampNumber(event.target.value, 20, 200))
                  }
                />
              </label>
            </section>

            <section className={styles.paletteCard}>
              <h3>Ferramenta</h3>

              <div className={styles.toolGrid}>
                <button
                  type="button"
                  className={tool === "terrain" ? styles.activeTool : ""}
                  onClick={() => setTool("terrain")}
                >
                  1 Chão
                </button>
                <button
                  type="button"
                  className={tool === "wall" ? styles.activeTool : ""}
                  onClick={() => setTool("wall")}
                >
                  2 Parede
                </button>
                <button
                  type="button"
                  className={tool === "object" ? styles.activeTool : ""}
                  onClick={() => setTool("object")}
                >
                  3 Prop
                </button>
                <button
                  type="button"
                  className={tool === "erase" ? styles.activeTool : ""}
                  onClick={() => setTool("erase")}
                >
                  4 Apagar
                </button>
              </div>

              <label>
                Pincel
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                />
                <span className={styles.valuePill}>{brushSize}×{brushSize}</span>
              </label>
            </section>

            {tool === "terrain" && (
              <section className={styles.paletteCard}>
                <h3>Tipo de chão</h3>

                <div className={styles.terrainGrid}>
                  {TERRAIN_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.terrainButton} ${
                        terrainType === option.id ? styles.terrainButtonActive : ""
                      } ${styles[option.id]}`}
                      onClick={() => setTerrainType(option.id)}
                      title={option.description}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>

                <label>
                  Altura do piso
                  <input
                    type="range"
                    min={-4}
                    max={20}
                    value={terrainHeight}
                    onChange={(event) =>
                      setTerrainHeight(Number(event.target.value))
                    }
                  />
                  <span className={styles.valuePill}>
                    {terrainHeight > 0 ? `+${terrainHeight}` : terrainHeight} ft
                  </span>
                </label>

                {selectedTerrain && (
                  <p className={styles.hint}>{selectedTerrain.description}</p>
                )}
              </section>
            )}

            {tool === "wall" && (
              <section className={styles.paletteCard}>
                <h3>Parede</h3>

                <div className={styles.terrainGrid}>
                  {WALL_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.terrainButton} ${
                        wallMaterial === option.id ? styles.terrainButtonActive : ""
                      } ${styles[option.id]}`}
                      onClick={() => setWallMaterial(option.id)}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className={styles.toolGrid}>
                  <button
                    type="button"
                    className={
                      wallOrientation === "horizontal" ? styles.activeTool : ""
                    }
                    onClick={() => setWallOrientation("horizontal")}
                  >
                    Horizontal
                  </button>
                  <button
                    type="button"
                    className={
                      wallOrientation === "vertical" ? styles.activeTool : ""
                    }
                    onClick={() => setWallOrientation("vertical")}
                  >
                    Vertical
                  </button>
                </div>

                <label>
                  Altura da parede
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={wallHeight}
                    onChange={(event) => setWallHeight(Number(event.target.value))}
                  />
                  <span className={styles.valuePill}>{wallHeight} ft</span>
                </label>

                <p className={styles.hint}>Atalho: pressione R para alternar a direção.</p>
              </section>
            )}

            {tool === "object" && (
              <section className={styles.paletteCard}>
                <h3>Props de cenário</h3>

                <div className={styles.objectGrid}>
                  {OBJECT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`${styles.objectButton} ${
                        objectType === option.id ? styles.objectButtonActive : ""
                      } ${styles[option.id]}`}
                      onClick={() => setObjectType(option.id)}
                      title={option.description}
                    >
                      <span>{option.icon}</span>
                      <strong>{option.label}</strong>
                    </button>
                  ))}
                </div>

                <div className={styles.compactGrid}>
                  <label>
                    Largura
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={objectWidthCells}
                      onChange={(event) =>
                        setObjectWidthCells(
                          clampNumber(event.target.value, 1, 12),
                        )
                      }
                    />
                  </label>

                  <label>
                    Profundidade
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={objectHeightCells}
                      onChange={(event) =>
                        setObjectHeightCells(
                          clampNumber(event.target.value, 1, 12),
                        )
                      }
                    />
                  </label>
                </div>

                <label>
                  Elevação da base
                  <input
                    type="range"
                    min={-4}
                    max={40}
                    value={objectElevation}
                    onChange={(event) =>
                      setObjectElevation(Number(event.target.value))
                    }
                  />
                  <span className={styles.valuePill}>
                    {objectElevation > 0 ? `+${objectElevation}` : objectElevation} ft
                  </span>
                </label>

                <label>
                  Altura visual
                  <input
                    type="range"
                    min={1}
                    max={120}
                    value={objectHeight}
                    onChange={(event) => setObjectHeight(Number(event.target.value))}
                  />
                  <span className={styles.valuePill}>{objectHeight} ft</span>
                </label>

                {selectedObject && (
                  <p className={styles.hint}>{selectedObject.description}</p>
                )}
              </section>
            )}

            <section className={styles.paletteCard}>
              <h3>Visualização</h3>

              <label>
                Zoom do editor
                <input
                  type="range"
                  min={14}
                  max={46}
                  value={editorCellSize}
                  onChange={(event) =>
                    setEditorCellSize(Number(event.target.value))
                  }
                />
                <span className={styles.valuePill}>{editorCellSize}px</span>
              </label>

              <div className={styles.stats}>
                <span>{terrainCells.length} pisos</span>
                <span>{visibleWalls.length} paredes</span>
                <span>{visibleObjects.length} props</span>
              </div>
            </section>
          </aside>

          <main className={styles.workspace}>
            <div className={styles.workspaceTopbar}>
              <strong>
                {tool === "terrain" && `Pintando: ${selectedTerrain?.label ?? "chão"}`}
                {tool === "wall" && `Desenhando parede: ${wallMaterial}`}
                {tool === "object" && `Inserindo prop: ${selectedObject?.label ?? "objeto"}`}
                {tool === "erase" && "Apagando construção"}
              </strong>
              <span>
                {hoveredCell
                  ? `Célula ${hoveredCell.x}, ${hoveredCell.y}`
                  : "Clique e arraste no mapa para editar."}
              </span>
            </div>

            <div className={styles.boardViewport}>
              <div
                ref={boardRef}
                className={styles.board}
                style={
                  {
                    width: boardSize.width,
                    height: boardSize.height,
                    "--editor-cell-size": `${editorCellSize}px`,
                  } as CSSProperties
                }
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              >
                {map.backgroundImage && (
                  <div
                    className={styles.boardImage}
                    style={{
                      backgroundImage: `url(${resolveAssetUrl(map.backgroundImage)})`,
                    }}
                  />
                )}

                {terrainCells.map((cell) => (
                  <EditorTerrainCell
                    key={getTerrainCellKey(cell.x, cell.y)}
                    cell={cell}
                    cellSize={editorCellSize}
                  />
                ))}

                {visibleObjects.map((object) => (
                  <EditorObject
                    key={object.id}
                    object={object}
                    cellSize={editorCellSize}
                  />
                ))}

                {visibleWalls.map((wall) => (
                  <EditorWall
                    key={wall.id}
                    wall={wall}
                    cellSize={editorCellSize}
                  />
                ))}

                {hoveredCell && (
                  <BrushGhost
                    x={hoveredCell.x}
                    y={hoveredCell.y}
                    tool={tool}
                    brushSize={tool === "object" ? 1 : brushSize}
                    objectWidthCells={objectWidthCells}
                    objectHeightCells={objectHeightCells}
                    cellSize={editorCellSize}
                  />
                )}
              </div>
            </div>
          </main>
        </div>

        {(localError || (!currentMapId && activeMapId === map.id)) && (
          <p className={styles.error}>
            {localError ??
              "Dica: abra este mapa na sua tela antes de salvar alterações ao vivo."}
          </p>
        )}

        <footer className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Cancelar
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Salvando..." : "Salvar construção"}
          </button>
        </footer>
      </section>
    </div>
  );
}

function EditorTerrainCell({
  cell,
  cellSize,
}: {
  cell: TerrainCell;
  cellSize: number;
}) {
  return (
    <div
      className={`${styles.editorTerrainCell} ${styles[cell.type]}`}
      style={{
        left: cell.x * cellSize,
        top: cell.y * cellSize,
        width: cellSize,
        height: cellSize,
        "--height-level": cell.height,
      } as CSSProperties}
    >
      {cell.height !== 0 && <span>{cell.height > 0 ? `+${cell.height}` : cell.height}</span>}
    </div>
  );
}

function EditorWall({
  wall,
  cellSize,
}: {
  wall: WallSegment;
  cellSize: number;
}) {
  const thickness = Math.max(5, Math.round(cellSize * 0.18));
  const isVertical = wall.orientation === "vertical";

  return (
    <div
      className={`${styles.editorWall} ${styles[wall.material]} ${
        isVertical ? styles.editorWallVertical : styles.editorWallHorizontal
      }`}
      style={{
        left: wall.x * cellSize - (isVertical ? thickness / 2 : 0),
        top: wall.y * cellSize - (isVertical ? 0 : thickness / 2),
        width: isVertical ? thickness : cellSize,
        height: isVertical ? cellSize : thickness,
        "--wall-height": wall.height,
      } as CSSProperties}
    />
  );
}

function EditorObject({
  object,
  cellSize,
}: {
  object: MapObject;
  cellSize: number;
}) {
  return (
    <div
      className={`${styles.editorObject} ${styles[object.type]}`}
      style={{
        left: object.x * cellSize,
        top: object.y * cellSize,
        width: object.widthCells * cellSize,
        height: object.heightCells * cellSize,
        "--object-elevation": object.elevation,
        "--object-height": object.height,
      } as CSSProperties}
      title={object.name ?? object.type}
    >
      <span>{getObjectIcon(object.type)}</span>
    </div>
  );
}

function BrushGhost({
  x,
  y,
  tool,
  brushSize,
  objectWidthCells,
  objectHeightCells,
  cellSize,
}: {
  x: number;
  y: number;
  tool: EditorTool;
  brushSize: number;
  objectWidthCells: number;
  objectHeightCells: number;
  cellSize: number;
}) {
  const sizeX = tool === "object" ? objectWidthCells : brushSize;
  const sizeY = tool === "object" ? objectHeightCells : brushSize;
  const offset = tool === "object" ? 0 : Math.floor(brushSize / 2);

  return (
    <div
      className={`${styles.brushGhost} ${styles[`ghost-${tool}`] ?? ""}`}
      style={{
        left: (x - offset) * cellSize,
        top: (y - offset) * cellSize,
        width: sizeX * cellSize,
        height: sizeY * cellSize,
      }}
    />
  );
}

function getBrushCells(
  x: number,
  y: number,
  brushSize: number,
  width: number,
  height: number,
) {
  const cells: { x: number; y: number }[] = [];
  const offset = Math.floor(brushSize / 2);

  for (let yy = y - offset; yy < y - offset + brushSize; yy += 1) {
    for (let xx = x - offset; xx < x - offset + brushSize; xx += 1) {
      if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;

      cells.push({
        x: xx,
        y: yy,
      });
    }
  }

  return cells;
}

function getWallId(
  x: number,
  y: number,
  orientation: WallSegment["orientation"],
) {
  return `wall:${x}:${y}:${orientation}`;
}

function objectsOverlap(
  left: Pick<MapObject, "x" | "y" | "widthCells" | "heightCells">,
  right: Pick<MapObject, "x" | "y" | "widthCells" | "heightCells">,
) {
  return (
    left.x < right.x + right.widthCells &&
    left.x + left.widthCells > right.x &&
    left.y < right.y + right.heightCells &&
    left.y + left.heightCells > right.y
  );
}

function getObjectIcon(type: MapObjectType) {
  return OBJECT_OPTIONS.find((option) => option.id === type)?.icon ?? "◆";
}

function cloneLayerConfig(layer: MapLayerConfig): MapLayerConfig {
  return {
    version: 1,
    terrainCells: Object.fromEntries(
      Object.entries(layer.terrainCells).map(([key, cell]) => [
        key,
        {
          ...cell,
        },
      ]),
    ),
    walls: layer.walls.map((wall) => ({
      ...wall,
    })),
    objects: layer.objects.map((object) => ({
      ...object,
    })),
    images: layer.images.map((image) => ({
      ...image,
    })),
    fogOfWar: {
      ...layer.fogOfWar,
      cells: {
        ...layer.fogOfWar.cells,
      },
    },
  };
}

function pruneLayerConfig(
  layer: MapLayerConfig,
  width: number,
  height: number,
): MapLayerConfig {
  const terrainCells = Object.fromEntries(
    Object.entries(layer.terrainCells).filter(
      ([, cell]) => cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height,
    ),
  );
  const fogCells = Object.fromEntries(
    Object.entries(layer.fogOfWar.cells).filter(([key]) => {
      const [x, y] = key.split(":").map(Number);

      return (
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        x >= 0 &&
        y >= 0 &&
        x < width &&
        y < height
      );
    }),
  );

  return {
    version: 1,
    terrainCells,
    walls: layer.walls.filter(
      (wall) =>
        wall.x >= 0 &&
        wall.y >= 0 &&
        wall.x <= width &&
        wall.y <= height,
    ),
    objects: layer.objects.filter(
      (object: MapObject) =>
        object.x >= 0 &&
        object.y >= 0 &&
        object.x < width &&
        object.y < height,
    ),
    images: layer.images.map((image) => ({
      ...image,
    })),
    fogOfWar: {
      ...layer.fogOfWar,
      cells: fogCells,
    },
  };
}

function clampNumber(value: string, min: number, max: number) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.floor(numericValue)));
}
