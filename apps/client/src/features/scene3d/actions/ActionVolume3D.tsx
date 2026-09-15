import { DoubleSide } from 'three';
import type { CharacterAction } from '@shared/types/action';
import type { WorldPoint } from '../utils/coordinates3d';

export default function ActionVolume3D({ action, from, to, color }: { action: CharacterAction; from: WorldPoint; to: WorldPoint; color: string }) {
  const t = action.targeting, radius = Math.max(.05, (t.shape === 'melee_reach' ? t.reachFt ?? 5 : t.radiusFt ?? 0) / 5), length = Math.max(.05, (t.lengthFt ?? 5) / 5);
  const height = Math.max(.1, (t.heightFt ?? 5) / 5), size = Math.max(.1, (t.sizeFt ?? 5) / 5);
  const direction = Math.atan2(to.x - from.x, to.z - from.z);
  const material = <meshBasicMaterial color={color} transparent opacity={Math.min(.18, action.visual.opacity)} depthWrite={false} side={DoubleSide} toneMapped={false} />;
  if (t.showImpactArea === false && ['point_sphere', 'cube', 'cylinder'].includes(t.shape)) return null;
  return <group name={`action-volume:${t.shape}`} userData={{ visualOnly: true }}>
    {t.shape === 'point_sphere' && <mesh position={[to.x, to.y + radius, to.z]} raycast={() => {}}><sphereGeometry args={[radius, 24, 16]} />{material}</mesh>}
    {t.shape === 'cube' && <mesh position={[to.x, to.y + size / 2, to.z]} raycast={() => {}}><boxGeometry args={[size, size, size]} />{material}</mesh>}
    {['cylinder', 'self_emanation', 'melee_reach', 'self'].includes(t.shape) && <mesh position={t.shape === 'cylinder' ? [to.x, to.y + height / 2, to.z] : [from.x, from.y + height / 2, from.z]} raycast={() => {}}><cylinderGeometry args={[t.shape === 'self' ? .6 : radius, t.shape === 'self' ? .6 : radius, height, 40]} />{material}</mesh>}
    {t.shape === 'line' && <mesh position={[from.x + Math.sin(direction) * length / 2, from.y + height / 2, from.z + Math.cos(direction) * length / 2]} rotation={[0, direction, 0]} raycast={() => {}}><boxGeometry args={[(t.widthFt ?? 5) / 5, height, length]} />{material}</mesh>}
    {t.shape === 'cone' && <group position={[from.x, from.y + .1, from.z]} rotation={[0, direction, 0]}><mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}><coneGeometry args={[length * Math.tan((t.angleDeg ?? 53.13) * Math.PI / 360), length, 32]} />{material}</mesh></group>}
    <mesh name="action-impact" position={[to.x, to.y + .09, to.z]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}><ringGeometry args={[.1, .16, 24]} /><meshBasicMaterial color={color} depthWrite={false} transparent opacity={.8} /></mesh>
  </group>;
}
