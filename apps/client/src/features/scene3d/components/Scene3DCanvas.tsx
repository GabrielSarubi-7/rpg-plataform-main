import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei/web/Html";
import SceneCamera from "../camera/SceneCamera";
import GroundPlane3D from "../map/GroundPlane3D";
import Grid3D from "../map/Grid3D";
import Token3D from "../tokens/Token3D";
import SceneInputController from "../interactions/SceneInputController";
import ActionPreview3D from "../actions/ActionPreview3D";
import Scene3DLoadingOverlay from "./Scene3DLoadingOverlay";
import { legacyTokenToWorldPosition, pixelsToWorldUnits } from "../utils/coordinates3d";
import type { Scene3DProps } from "../types";
import styles from "./Scene3D.module.css";
import { useMapStore } from "@/features/map/store/mapStore";
import { useAnnotationStore } from "@/features/annotations/store/annotationStore";
import { filterMapSettingsForPlayers, normalizeMapLayerConfig } from "@shared/rules/mapRules";
import { normalizeScene3DConfig } from "@shared/rules/scene3dRules";
import { isTokenVisibleInFog } from "@shared/rules/fogVisibility";
import type { SceneMutationPayload, SceneObject3DConfig } from "@shared/types/scene3d";
import LegacyLayers3D from "../map/LegacyLayers3D";
import SceneObjects3D, { type TransformMode } from "../objects/SceneObjects3D";
import SceneEditor3D from "../editor/SceneEditor3D";
import { mutateScene } from "../services/sceneSocket";
import { useUiStore } from "@/features/ui/store/uiStore";

export default function Scene3DCanvas(props: Scene3DProps) {
  const map = useMapStore();
  const annotations = useAnnotationStore((s) => s.annotations);
  const layer = useMemo(() => normalizeMapLayerConfig(props.isGm ? map.layerConfig : filterMapSettingsForPlayers(map).layerConfig), [map.layerConfig, props.isGm, map.widthCells, map.heightCells, map.cellSize]);
  const scene = useMemo(() => normalizeScene3DConfig(layer.scene3d), [layer.scene3d]);
  const [editing, setEditing] = useState(false);
  const [objectId, setObjectId] = useState<string | null>(null);
  const [transformMode, setTransformMode] = useState<TransformMode>("translate");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [restore, setRestore] = useState(0);
  const canEdit = Boolean(props.isGm && props.campaignId && props.authToken && map.mapId);
  const editActive = editing && canEdit && !props.isTargeting;
  useEffect(() => {
    if (!editActive) return;
    const wasCollapsed = useUiStore.getState().rightSidebarCollapsed;
    useUiStore.setState({ rightSidebarCollapsed: true });
    return () => useUiStore.setState({ rightSidebarCollapsed: wasCollapsed });
  }, [editActive]);
  const mutate = async (event: string, data: Partial<SceneMutationPayload> = {}) => {
    if (!canEdit || busy) throw new Error("Editor indisponível.");
    setBusy(true); setStatus("Salvando…");
    try { await mutateScene(event, { ...data, roomCode: props.campaignId!, mapId: map.mapId!, authToken: props.authToken! }); setStatus("Salvo no servidor."); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Falha ao salvar."); setRestore((n) => n + 1); throw error; }
    finally { setBusy(false); }
  };
  const saveObject = (object: SceneObject3DConfig) => mutate("scene3d:object:upsert", { object });
  const visibleTokens = useMemo(() => props.isGm ? props.tokens : Object.fromEntries(Object.entries(props.tokens).filter(([, token]) => isTokenVisibleInFog(token, map))), [props.tokens, props.isGm, map.layerConfig, map.cellSize]);
  const [gridVisible, setGridVisible] = useState(true);
  useEffect(() => setGridVisible(scene.settings.gridVisible), [scene.settings.gridVisible]);
  const [resetRequest, setResetRequest] = useState(0);
  const [focusRequest, setFocusRequest] = useState(0);
  const [contextLost, setContextLost] = useState(false);
  const width = pixelsToWorldUnits(props.mapWidth, props.cellSize);
  const depth = pixelsToWorldUnits(props.mapHeight, props.cellSize);
  const charactersById = useMemo(() => new Map(props.characters.map((character) => [character.id, character])), [props.characters]);
  const selected = props.tokens[props.selectedTokenIds[0]];
  if (contextLost) return <Scene3DLoadingOverlay message="O contexto WebGL foi perdido. Volte ao 2D para continuar." onReturnTo2D={props.onReturnTo2D} />;
  return <div className={styles.viewport} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); window.alert("Para adicionar fichas ou imagens ao mapa, use o modo 2D nesta entrega."); }}>
    <Canvas dpr={[1, 1.75]} frameloop="demand" gl={{ antialias: true, alpha: false }}
      fallback={<Scene3DLoadingOverlay message="WebGL não está disponível neste navegador." onReturnTo2D={props.onReturnTo2D} />}
      onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", () => setContextLost(true), { once: true }); }}>
      <color attach="background" args={["#11131a"]} />
      <ambientLight intensity={1.3} /><directionalLight position={[10, 20, 8]} intensity={1.8} />
      <SceneCamera width={width} depth={depth} resetRequest={resetRequest} focusRequest={focusRequest} focus={selected ? legacyTokenToWorldPosition(selected, props.cellSize) : undefined} />
      {/* Keep texture loading inside the renderer so Suspense does not detach
          and remount the Canvas root while its WebGL context is still active. */}
      <Suspense fallback={<Html fullscreen><Scene3DLoadingOverlay onReturnTo2D={props.onReturnTo2D} /></Html>}>
      <GroundPlane3D width={width} depth={depth} image={props.backgroundImage} layer={layer} />
      <Grid3D width={width} depth={depth} visible={gridVisible} />
      <LegacyLayers3D layer={layer} width={width} depth={depth} cellSize={props.cellSize} isGm={Boolean(props.isGm)} annotations={annotations} />
      <SceneObjects3D key={restore} scene={scene} editing={editActive} selectedId={objectId} onSelect={setObjectId} mode={transformMode} onTransform={(object) => { void saveObject(object).catch(() => undefined); }} />
      {Object.values(visibleTokens).map((token) => <Token3D key={token.id} token={token} cellSize={props.cellSize}
        character={charactersById.get(token.characterId ?? "")} sheetTemplate={props.sheetTemplate} selected={props.selectedTokenIds.includes(token.id)} />)}
      <ActionPreview3D tokens={visibleTokens} cellSize={props.cellSize} />
      {!editActive && <SceneInputController {...props} tokens={visibleTokens} />}
      </Suspense>
    </Canvas>
    <div className={styles.toolbar} data-ui-layer="true">
      <button type="button" onClick={() => setResetRequest((n) => n + 1)}>Enquadrar mapa</button>
      <button type="button" disabled={!selected} onClick={() => setFocusRequest((n) => n + 1)}>Focar token</button>
      <button type="button" aria-pressed={gridVisible} onClick={() => setGridVisible((v) => !v)}>Grid</button>
      <button type="button" onClick={props.onReturnTo2D}>2D</button>
      {canEdit && <button type="button" aria-pressed={editing} disabled={busy || props.isTargeting} onClick={() => { setEditing((v) => !v); props.onSelectToken(null); }}>Editor 3D</button>}
      <small>Esquerdo: selecionar/arrastar · Direito no chão: pan · Meio: orbitar · Roda: zoom</small>
      <small>Direito no token: menu · Esc: cancelar · Imagens, fichas e ferramentas de desenho: use 2D.</small>
    </div>
    {editActive && <SceneEditor3D scene={scene} selectedId={objectId} onSelect={setObjectId} mode={transformMode} setMode={setTransformMode} width={width} depth={depth} authToken={props.authToken!} busy={busy} status={status} saveObject={saveObject} removeObject={(id) => mutate("scene3d:object:remove", { objectId: id })} saveSettings={(settings) => mutate("scene3d:settings:update", { settings })} sync={() => mutate("scene3d:sync")} />}
  </div>;
}
