import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { Scene3DConfig } from "@shared/types/scene3d";
export default function SceneFloor3D({ scene, selectedFloor, tokenHeight, showAll }: { scene: Scene3DConfig; selectedFloor: string; tokenHeight?: number; showAll: boolean }) {
  const ref = useRef<Group>(null);
  useFrame(({ camera, scene: root }) => {
    const limit = scene.floors.find((f) => f.id === selectedFloor)?.elevation ?? tokenHeight ?? camera.position.y;
    root.traverse((o) => { if (o.userData.sceneFloorId) { const floor = scene.floors.find((f) => f.id === o.userData.sceneFloorId); o.visible = !floor || showAll || (floor.visible && floor.elevation <= limit + 0.1); } });
  });
  return <group ref={ref} name="scene-floors">{scene.floors.map((f) => <mesh key={f.id} name={`floor:${f.id}`} userData={{ sceneFloorId: f.id }} position={[f.x + f.width / 2, f.elevation - 0.045, f.z + f.depth / 2]} receiveShadow castShadow><boxGeometry args={[f.width, 0.08, f.depth]} /><meshStandardMaterial color={f.color} roughness={0.9} /></mesh>)}</group>;
}
