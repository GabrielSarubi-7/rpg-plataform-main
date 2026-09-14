import type { TokenConditionId } from "./tokenStatus";
import type { TokenLightConfig, TokenVisionConfig } from "./sceneEnvironment";

export type TokenStandMode = "auto" | "flat" | "billboard";

export interface Token {
  id: string;
  x: number;
  y: number;
  image?: string;

  characterId?: string;
  name?: string;
  widthCells?: number;
  heightCells?: number;
  showHealthBar?: boolean;
  conditions?: TokenConditionId[];
  elevation?: number;
  standMode?: TokenStandMode;
  visibility?: "public" | "gm_only" | "hidden" | "owner_only";
  isHidden?: boolean;
  vision?: TokenVisionConfig;
  light?: TokenLightConfig;
}
