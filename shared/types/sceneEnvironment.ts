import type { Vec3 } from "./scene3d";
export type DoorState = "closed" | "open" | "locked" | "destroyed" | "blocked";
export interface DoorConfig { state: DoorState; hinge: "left" | "right"; openAngle: number; interaction: { allowPlayers: boolean; rangeFt: number } }
export interface SceneEnvironmentConfig { ambientColor: string; ambientIntensity: number; directionalColor: string; directionalIntensity: number; directionalPosition: Vec3; quality: "low" | "medium" | "high"; shadows: boolean; visionEnabled: boolean; darkness: boolean }
export interface SceneLightConfig { id: string; name: string; type: "point" | "spot"; position: Vec3; target: Vec3; color: string; intensity: number; range: number; angle: number; shadows: boolean; floorId?: string; visibility: "public" | "gm" }
export interface SceneFloorConfig { id: string; name: string; elevation: number; x: number; z: number; width: number; depth: number; color: string; visible: boolean }
export interface CameraBookmark { id: string; name: string; position: Vec3; target: Vec3; fov: number }
export interface TokenVisionConfig { enabled: boolean; rangeFt: number; angle: number; direction: number; eyeHeightFt: number; darkvisionFt: number }
export interface TokenLightConfig { enabled: boolean; type: "point" | "spot"; color: string; intensity: number; rangeFt: number; angle: number }
