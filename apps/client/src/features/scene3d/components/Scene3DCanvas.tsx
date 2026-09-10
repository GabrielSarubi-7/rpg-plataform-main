import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
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

export default function Scene3DCanvas(props: Scene3DProps) {
  const [gridVisible, setGridVisible] = useState(true);
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
      <SceneCamera width={width} depth={depth} resetRequest={resetRequest} focusRequest={focusRequest} focus={selected ? legacyTokenToWorldPosition(selected, props.cellSize) : undefined} />
      <GroundPlane3D width={width} depth={depth} image={props.backgroundImage} />
      <Grid3D width={width} depth={depth} visible={gridVisible} />
      {Object.values(props.tokens).map((token) => <Token3D key={token.id} token={token} cellSize={props.cellSize}
        character={charactersById.get(token.characterId ?? "")} sheetTemplate={props.sheetTemplate} selected={props.selectedTokenIds.includes(token.id)} />)}
      <ActionPreview3D tokens={props.tokens} cellSize={props.cellSize} />
      <SceneInputController {...props} />
    </Canvas>
    <div className={styles.toolbar} data-ui-layer="true">
      <button type="button" onClick={() => setResetRequest((n) => n + 1)}>Enquadrar mapa</button>
      <button type="button" disabled={!selected} onClick={() => setFocusRequest((n) => n + 1)}>Focar token</button>
      <button type="button" aria-pressed={gridVisible} onClick={() => setGridVisible((v) => !v)}>Grid</button>
      <button type="button" onClick={props.onReturnTo2D}>2D</button>
      <small>Esquerdo: selecionar/arrastar · Direito no chão: pan · Meio: orbitar · Roda: zoom</small>
      <small>Direito no token: menu · Esc: cancelar · Imagens, fichas e ferramentas de desenho: use 2D.</small>
    </div>
  </div>;
}
