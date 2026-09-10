import { lazy, Suspense } from "react";
import { useMapStore } from "@/features/map/store/mapStore";
import { useAnnotationStore } from "@/features/annotations/store/annotationStore";
import { useFogToolStore } from "@/features/map/store/fogToolStore";
import Scene3DErrorBoundary from "./Scene3DErrorBoundary";
import Scene3DLoadingOverlay from "./Scene3DLoadingOverlay";
import { getUnsupportedSceneLayers } from "../utils/sceneCompatibility";
import type { Scene3DProps } from "../types";
import styles from "./Scene3D.module.css";

const Scene3DCanvas = lazy(() => import("./Scene3DCanvas"));

export default function Scene3DGate(props: Scene3DProps) {
  const layer = useMapStore((s) => s.layerConfig);
  const annotations = useAnnotationStore((s) => s.annotations);
  const annotationTool = useAnnotationStore((s) => s.tool);
  const fogTool = useFogToolStore((s) => s.tool);
  const reasons = getUnsupportedSceneLayers(layer, Object.keys(annotations).length, annotationTool !== "none" || fogTool !== "none");
  return <div className={styles.viewport}>
    {reasons.length ? <Scene3DLoadingOverlay message={`Este mapa usa recursos ainda indisponíveis no 3D: ${reasons.join(", ")}. Continue no 2D para visualizar todas as camadas.`} onReturnTo2D={props.onReturnTo2D} /> :
      <Scene3DErrorBoundary onReturnTo2D={props.onReturnTo2D}>
        <Suspense fallback={<Scene3DLoadingOverlay onReturnTo2D={props.onReturnTo2D} />}>
          <Scene3DCanvas {...props} />
        </Suspense>
      </Scene3DErrorBoundary>}
  </div>;
}
