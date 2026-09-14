import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import type { DoorConfig } from "@shared/types/sceneEnvironment";
export default function Door3D({ door, color }: { door: DoorConfig; color: string }) {
  const ref = useRef<Group>(null), hinge = door.hinge === "right" ? 0.5 : -0.5;
  const angle = door.state === "open" ? door.openAngle * Math.PI / 180 * (hinge > 0 ? -1 : 1) : 0;
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => invalidate(), [angle, invalidate]);
  useFrame((state, dt) => { if (!ref.current) return; const current = ref.current.rotation.y; if (Math.abs(current - angle) > 0.001) { ref.current.rotation.y += (angle - current) * Math.min(1, dt * 10); state.invalidate(); } });
  return <group ref={ref} position={[hinge, 0, 0]} visible={door.state !== "destroyed"}><mesh position={[-hinge, 0.5, 0]} castShadow receiveShadow><boxGeometry args={[1, 1, 0.1]} /><meshStandardMaterial color={door.state === "locked" ? "#785147" : door.state === "blocked" ? "#554c44" : color} roughness={0.8} /></mesh></group>;
}
