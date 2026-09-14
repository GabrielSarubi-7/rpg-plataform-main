import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import type { CameraBookmark } from "@shared/types/sceneEnvironment";
export default function CameraBookmarkController({ bookmark, capture, onCapture }: { bookmark: CameraBookmark | null; capture: number; onCapture: (value: CameraBookmark) => void }) {
  const { get, invalidate } = useThree(), latest = useRef(onCapture); latest.current = onCapture;
  useEffect(() => { if (!capture) return; const { camera, controls } = get(); const target = new Vector3(); (controls as any)?.getTarget(target); latest.current({ id: crypto.randomUUID(), name: `Câmera ${capture}`, position: { x: camera.position.x, y: camera.position.y, z: camera.position.z }, target: { x: target.x, y: target.y, z: target.z }, fov: camera instanceof PerspectiveCamera ? camera.fov : 45 }); }, [capture, get]);
  useEffect(() => { if (!bookmark) return; const { controls } = get(); void (controls as any)?.setLookAt(bookmark.position.x, bookmark.position.y, bookmark.position.z, bookmark.target.x, bookmark.target.y, bookmark.target.z, true); invalidate(); }, [bookmark, get, invalidate]);
  useFrame(({ camera, invalidate }, dt) => { if (!bookmark || !(camera instanceof PerspectiveCamera)) return; if (Math.abs(camera.fov - bookmark.fov) > 0.01) { camera.fov += (bookmark.fov - camera.fov) * Math.min(1, dt * 8); camera.updateProjectionMatrix(); invalidate(); } });
  return null;
}
