import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { CameraControls } from "@react-three/drei/core/CameraControls";

export default function SceneCamera({ width, depth, focus, focusRequest, resetRequest }: {
  width: number; depth: number; focus?: { x: number; y: number; z: number };
  focusRequest: number; resetRequest: number;
}) {
  const controls = useRef<CameraControls>(null);
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / Math.max(1, state.size.height));
  const extent = Math.max(width, depth);
  useEffect(() => {
    const distance = Math.max(depth, width / aspect) * 1.5 + 5;
    void controls.current?.setLookAt(width / 2, distance, depth / 2 + distance * 0.65, width / 2, 0, depth / 2, false);
  }, [width, depth, aspect, resetRequest, camera]);
  const latestFocus = useRef(focus);
  latestFocus.current = focus;
  useEffect(() => {
    const target = latestFocus.current;
    if (focusRequest && target) void controls.current?.setLookAt(target.x, target.y + 8, target.z + 6, target.x, target.y, target.z, true);
  }, [focusRequest]);
  return <>
    <PerspectiveCamera makeDefault fov={45} near={0.1} far={Math.max(2000, extent * 20)} position={[width / 2, extent * 1.5, depth * 1.5]} />
    <CameraControls ref={controls} makeDefault minDistance={2} maxDistance={Math.max(100, extent * 6)}
      minPolarAngle={0.05} maxPolarAngle={Math.PI / 2 - 0.08}
      mouseButtons={{ left: 0, right: 2, middle: 1, wheel: 16 }} />
  </>;
}
