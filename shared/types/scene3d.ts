export interface Vec3 { x: number; y: number; z: number }
/** Rotation is stored in degrees. Position/scale use grid cells. */
export interface Transform3D { position: Vec3; rotation: Vec3; scale: Vec3 }
export type SceneVisibility = "public" | "gm" | "hidden";
export type ScenePrimitive = "box" | "sphere" | "cylinder" | "plane";
export interface SceneObject3DConfig {
  id: string;
  name: string;
  kind: "primitive" | "model";
  primitive: ScenePrimitive;
  assetUrl?: string;
  color: string;
  transform: Transform3D;
  visibility: SceneVisibility;
}
export interface Scene3DConfig {
  enabled: boolean;
  revision: number;
  world: { unitsPerCell: 1; distancePerCell: 5; distanceUnit: "ft" };
  objects: SceneObject3DConfig[];
  settings: { gridVisible: boolean; snapEnabled: boolean; snapSize: number };
}
export interface SceneMutationPayload {
  roomCode: string;
  mapId: string;
  authToken: string;
  object?: SceneObject3DConfig;
  objectId?: string;
  settings?: Scene3DConfig["settings"];
}
export type SceneMutationAck = { ok: true; mapId: string; scene: Scene3DConfig } | { ok: false; error: string };
export interface SceneUpdatedPayload { mapId: string; scene: Scene3DConfig }
