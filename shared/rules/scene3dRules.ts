import type { Scene3DConfig, SceneObject3DConfig, Transform3D, Vec3 } from "../types/scene3d";

export const MAX_SCENE_OBJECTS = 2000;
export const MODEL_ASSET_PATH = /^\/assets\/[a-f0-9]{64}\.glb$/;
const ID = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/;
export const isSceneObjectId = (id: unknown): id is string => typeof id === "string" && ID.test(id);
export const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
export function finiteNumber(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
}
export function normalizeVec3(value: unknown, fallback = 0, min = -500, max = 500): Vec3 {
  const v = record(value);
  return { x: finiteNumber(v.x, fallback, min, max), y: finiteNumber(v.y, fallback, min, max), z: finiteNumber(v.z, fallback, min, max) };
}
export function normalizeTransform3D(value: unknown, width = 500, depth = 500): Transform3D {
  const t = record(value);
  const position = normalizeVec3(t.position);
  return {
    position: { x: Math.max(0, Math.min(width, position.x)), y: Math.max(-100, Math.min(100, position.y)), z: Math.max(0, Math.min(depth, position.z)) },
    rotation: normalizeVec3(t.rotation, 0, -360, 360),
    scale: normalizeVec3(t.scale, 1, 0.01, 100),
  };
}
export function normalizeSceneObject3D(value: unknown, width = 500, depth = 500): SceneObject3DConfig | null {
  const o = record(value);
  if (!isSceneObjectId(o.id)) return null;
  const primitive = o.primitive === "sphere" || o.primitive === "cylinder" || o.primitive === "plane" ? o.primitive : "box";
  return {
    id: o.id, name: typeof o.name === "string" ? o.name.trim().slice(0, 100) || "Objeto" : "Objeto",
    kind: o.kind === "model" ? "model" : "primitive", primitive,
    assetUrl: typeof o.assetUrl === "string" && MODEL_ASSET_PATH.test(o.assetUrl) ? o.assetUrl : undefined,
    color: typeof o.color === "string" && /^#[0-9a-f]{6}$/i.test(o.color) ? o.color : "#9c8669",
    transform: normalizeTransform3D(o.transform, width, depth),
    // Invalid or missing visibility fails closed, never accidentally public.
    visibility: o.visibility === "public" || o.visibility === "hidden" ? o.visibility : "gm",
  };
}
export function normalizeScene3DConfig(value?: unknown, width = 500, depth = 500): Scene3DConfig {
  const raw = record(value), settings = record(raw.settings);
  const seen = new Set<string>();
  const objects: SceneObject3DConfig[] = [];
  for (const candidate of (Array.isArray(raw.objects) ? raw.objects.slice(0, MAX_SCENE_OBJECTS) : [])) {
    const object = normalizeSceneObject3D(candidate, width, depth);
    if (object && !seen.has(object.id)) { objects.push(object); seen.add(object.id); }
  }
  return {
    enabled: raw.enabled !== false,
    revision: Math.floor(finiteNumber(raw.revision, 0, 0, Number.MAX_SAFE_INTEGER)),
    world: { unitsPerCell: 1, distancePerCell: 5, distanceUnit: "ft" },
    objects,
    settings: {
      gridVisible: settings.gridVisible !== false,
      snapEnabled: settings.snapEnabled !== false,
      snapSize: [0.25, 0.5, 1].includes(Number(settings.snapSize)) ? Number(settings.snapSize) : 1,
    },
  };
}
export function filterScene3DForPlayers(scene: Scene3DConfig) {
  return { ...scene, objects: scene.objects.filter((object) => object.visibility === "public") };
}
