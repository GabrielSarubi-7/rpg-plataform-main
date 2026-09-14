import type { MapSettings } from "../types/map";
import type { Token } from "../types/token";
import { normalizeScene3DConfig } from "./scene3dRules";
import { normalizeTokenLight, normalizeVision } from "./sceneEnvironmentRules";
import { isFogAreaVisible } from "./fogVisibility";
export interface SightPoint { x: number; z: number; y: number }
interface Barrier { a: SightPoint; b: SightPoint; height: number }
export const tokenPoint = (token: Token, cellSize: number): SightPoint => ({ x: token.x / cellSize + (token.widthCells ?? 1) / 2, z: token.y / cellSize + (token.heightCells ?? 1) / 2, y: (token.elevation ?? 0) / 5 });
export function getBarriers(settings: MapSettings, flag: "blocksVision" | "blocksMovement" | "blocksLight" = "blocksVision") {
  const barriers: Barrier[] = (settings.layerConfig?.walls ?? []).map((w) => ({ a: { x: w.x, z: w.y, y: 0 }, b: { x: w.x + (w.orientation === "horizontal" ? 1 : 0), z: w.y + (w.orientation === "vertical" ? 1 : 0), y: 0 }, height: w.height / 5 }));
  for (const o of settings.layerConfig?.scene3d?.objects ?? []) {
    if (!o[flag] || (o.door && ["open", "destroyed"].includes(o.door.state))) continue;
    const t = o.transform, angle = t.rotation.y * Math.PI / 180;
    const point = (x: number, z: number): SightPoint => ({ x: t.position.x + x * Math.cos(angle) + z * Math.sin(angle), z: t.position.z - x * Math.sin(angle) + z * Math.cos(angle), y: t.position.y });
    if (o.kind === "door") barriers.push({ a: point(-t.scale.x / 2, 0), b: point(t.scale.x / 2, 0), height: t.scale.y });
    else {
      const points = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => point(x * t.scale.x / 2, z * t.scale.z / 2));
      for (let i = 0; i < 4; i++) barriers.push({ a: points[i], b: points[(i + 1) % 4], height: t.scale.y });
    }
  }
  return barriers;
}
function intersection(a: SightPoint, b: SightPoint, c: SightPoint, d: SightPoint) {
  const dx = b.x - a.x, dz = b.z - a.z, ex = d.x - c.x, ez = d.z - c.z, denominator = dx * ez - dz * ex;
  if (Math.abs(denominator) < 1e-9) return null;
  const t = ((c.x - a.x) * ez - (c.z - a.z) * ex) / denominator, u = ((c.x - a.x) * dz - (c.z - a.z) * dx) / denominator;
  return t > 1e-5 && t < 1 - 1e-5 && u >= -1e-5 && u <= 1 + 1e-5 ? t : null;
}
export function clearLine(a: SightPoint, b: SightPoint, barriers: Barrier[]) {
  return !barriers.some((barrier) => { const t = intersection(a, b, barrier.a, barrier.b); if (t === null) return false; const y = a.y + t * (b.y - a.y); return y >= barrier.a.y - 0.01 && y <= barrier.a.y + barrier.height + 0.01; });
}
export function movementBlocked(settings: MapSettings, token: Token, x: number, y: number) {
  const a = tokenPoint(token, settings.cellSize), b = tokenPoint({ ...token, x, y }, settings.cellSize);
  const radius = Math.min(token.widthCells ?? 1, token.heightCells ?? 1) / 2 - 0.001;
  const distance = (p: SightPoint, u: SightPoint, v: SightPoint) => { const dx = v.x - u.x, dz = v.z - u.z, d = dx * dx + dz * dz; const t = d ? Math.max(0, Math.min(1, ((p.x - u.x) * dx + (p.z - u.z) * dz) / d)) : 0; return Math.hypot(p.x - u.x - t * dx, p.z - u.z - t * dz); };
  return getBarriers(settings, "blocksMovement").some((wall) => a.y < wall.a.y + wall.height && a.y + 1 > wall.a.y && (intersection(a, b, wall.a, wall.b) !== null || Math.min(distance(a, wall.a, wall.b), distance(b, wall.a, wall.b), distance(wall.a, a, b), distance(wall.b, a, b)) < radius));
}
function inCone(a: SightPoint, b: SightPoint, direction: number, angle: number) {
  if (angle >= 360 || Math.hypot(b.x - a.x, b.z - a.z) < 0.01) return true;
  const bearing = Math.atan2(b.x - a.x, b.z - a.z) * 180 / Math.PI;
  return Math.abs(((bearing - direction + 540) % 360) - 180) <= angle / 2;
}
export function floorAt(settings: MapSettings, y: number) { return (settings.layerConfig?.scene3d?.floors ?? []).filter((f) => f.elevation <= y + 0.1).sort((a, b) => b.elevation - a.elevation)[0]; }
export function createVisibility(settings: MapSettings, tokens: Record<string, Token>, observerIds: string[]) {
  const scene = normalizeScene3DConfig(settings.layerConfig?.scene3d), barriers = getBarriers(settings), lightBarriers = getBarriers(settings, "blocksLight");
  const observers = observerIds.flatMap((id) => { const token = tokens[id]; if (!token || token.isHidden || token.visibility === "hidden" || token.visibility === "gm_only") return []; const vision = normalizeVision(token.vision), base = tokenPoint(token, settings.cellSize); return vision.enabled ? [{ base, eye: { ...base, y: base.y + vision.eyeHeightFt / 5 }, vision }] : []; });
  const lights = [...scene.lights.filter((l) => l.visibility === "public").map((l) => ({ point: l.position, range: l.range, intensity: l.intensity, angle: l.type === "spot" ? l.angle : 360, direction: Math.atan2(l.target.x - l.position.x, l.target.z - l.position.z) * 180 / Math.PI })), ...Object.values(tokens).filter((t) => !t.isHidden && t.visibility !== "hidden" && t.visibility !== "gm_only").flatMap((t) => { const light = normalizeTokenLight(t.light); return light.enabled ? [{ point: tokenPoint(t, settings.cellSize), range: light.rangeFt / 5, intensity: light.intensity, angle: light.type === "spot" ? light.angle : 360, direction: normalizeVision(t.vision).direction }] : []; })];
  const visible = (point: SightPoint, floorId?: string) => {
    if (!isFogAreaVisible(settings.layerConfig?.fogOfWar, point.x, point.z)) return false;
    if (!scene.environment.visionEnabled) return true;
    return observers.some(({ base, eye, vision }) => {
      const distance = Math.hypot(point.x - eye.x, point.z - eye.z) * 5;
      const floor = floorId ? scene.floors.find((f) => f.id === floorId) : floorAt(settings, point.y);
      if (floor && (!floor.visible || floor.id !== floorAt(settings, base.y)?.id)) return false;
      if (distance > vision.rangeFt || !inCone(eye, point, vision.direction, vision.angle) || !clearLine(eye, point, barriers)) return false;
      return !scene.environment.darkness || scene.environment.ambientIntensity > 0.05 || distance <= vision.darkvisionFt || lights.some((l) => l.intensity > 0 && Math.hypot(point.x - l.point.x, point.z - l.point.z) <= l.range && inCone(l.point, point, l.direction, l.angle) && clearLine(l.point, point, lightBarriers));
    });
  };
  return { visible, observers, enabled: scene.environment.visionEnabled };
}
