import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { ActionUsedPayload } from '@shared/types/multiplayer';
import type { Token } from '@shared/types/token';
import { getTokenCenter } from '@shared/rules/targetingRules';
import { pixelPointToWorld } from '../utils/coordinates3d';
import { combatEffectColor } from './combatVisuals';

export default function ActionBurst3D({ effect, tokens, cellSize }: { effect: ActionUsedPayload; tokens: Record<string, Token>; cellSize: number }) {
  const projectile = useRef<Mesh>(null), pulse = useRef<Mesh>(null), started = useRef<number | null>(null);
  const caster = tokens[effect.casterTokenId], target = tokens[effect.targeting.targetTokenIds?.[0] ?? ''];
  const from = pixelPointToWorld(effect.targeting.origin, cellSize, caster?.elevation ?? 0);
  const to = pixelPointToWorld(target ? getTokenCenter(target, cellSize) : effect.targeting.targetPoint ?? effect.targeting.origin, cellSize, target?.elevation ?? 0);
  const color = combatEffectColor(effect.action);
  useFrame(({ invalidate, clock }) => {
    started.current ??= clock.elapsedTime;
    const elapsed = clock.elapsedTime - started.current;
    const t = Math.min(1, elapsed / .65);
    if (projectile.current) { projectile.current.visible = t < 1; projectile.current.position.set(from.x + (to.x - from.x) * t, from.y + .6 + (to.y - from.y) * t + Math.sin(t * Math.PI) * .5, from.z + (to.z - from.z) * t); }
    if (pulse.current) { const progress = Math.max(0, Math.min(1, (elapsed - .5) / .7)); pulse.current.visible = progress > 0 && progress < 1; pulse.current.scale.setScalar(.2 + progress * 1.3); }
    if (elapsed < 1.3) invalidate();
  });
  return <group name={`action-burst:${effect.useId}`}>
    <group position={[from.x, from.y + .1, from.z]} rotation={[0, Math.atan2(to.x - from.x, to.z - from.z), 0]}><mesh position={[0, 0, .7]} rotation={[Math.PI / 2, 0, 0]} raycast={() => {}}><coneGeometry args={[.13, .4, 3]} /><meshBasicMaterial color={color} transparent opacity={.6} depthWrite={false} /></mesh></group>
    <mesh ref={projectile} raycast={() => {}}><sphereGeometry args={[.1, 10, 8]} /><meshBasicMaterial color={color} depthWrite={false} toneMapped={false} /></mesh>
    <mesh ref={pulse} position={[to.x, to.y + .1, to.z]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}><ringGeometry args={[.35, .45, 24]} /><meshBasicMaterial color={color} transparent opacity={.65} depthWrite={false} toneMapped={false} /></mesh>
  </group>;
}
