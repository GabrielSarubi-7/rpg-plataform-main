import { useEffect, useMemo } from "react";
import { Object3D } from "three";
import type { Scene3DConfig } from "@shared/types/scene3d";
import type { Token } from "@shared/types/token";
import { normalizeTokenLight, normalizeVision } from "@shared/rules/sceneEnvironmentRules";
import { tokenPoint } from "@shared/rules/visibilityRules";
export default function SceneEnvironment3D({ scene, tokens, cellSize }: { scene: Scene3DConfig; tokens: Record<string, Token>; cellSize: number }) {
  const e = scene.environment, maxShadows = e.shadows ? e.quality === "high" ? 2 : e.quality === "medium" ? 1 : 0 : 0;
  return <group name="scene-environment">
    <ambientLight color={e.ambientColor} intensity={e.ambientIntensity} />
    <directionalLight position={[e.directionalPosition.x, e.directionalPosition.y, e.directionalPosition.z]} color={e.directionalColor} intensity={e.directionalIntensity} castShadow={maxShadows > 0} shadow-mapSize={[e.quality === "high" ? 2048 : 1024, e.quality === "high" ? 2048 : 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-camera-far={300} shadow-bias={-0.001} />
    {scene.lights.map((l, index) => <WorldLight key={l.id} position={l.position} target={l.target} color={l.color} intensity={l.intensity} range={l.range} angle={l.angle} spot={l.type === "spot"} shadow={l.shadows && l.type === "spot" && index < Math.max(0, maxShadows - 1)} />)}
    {Object.values(tokens).slice(0, 32).map((token) => { const l = normalizeTokenLight(token.light), p = tokenPoint(token, cellSize), angle = normalizeVision(token.vision).direction * Math.PI / 180; return l.enabled ? <WorldLight key={token.id} position={{ ...p, y: p.y + 1 }} target={{ x: p.x + Math.sin(angle), y: p.y + 1, z: p.z + Math.cos(angle) }} color={l.color} intensity={l.intensity} range={l.rangeFt / 5} angle={l.angle} spot={l.type === "spot"} shadow={false} /> : null; })}
  </group>;
}
function WorldLight({ position: p, target: t, color, intensity, range, angle, spot, shadow }: { position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number }; color: string; intensity: number; range: number; angle: number; spot: boolean; shadow: boolean }) {
  const target = useMemo(() => new Object3D(), []);
  useEffect(() => { target.position.set(t.x, t.y, t.z); target.updateMatrixWorld(); }, [target, t.x, t.y, t.z]);
  return <><primitive object={target} />{spot ? <spotLight position={[p.x, p.y, p.z]} target={target} color={color} intensity={intensity} distance={range} angle={angle * Math.PI / 360} penumbra={0.2} castShadow={shadow} shadow-mapSize={[1024, 1024]} shadow-bias={-0.001} /> : <pointLight position={[p.x, p.y, p.z]} color={color} intensity={intensity} distance={range} castShadow={false} />}</>;
}
