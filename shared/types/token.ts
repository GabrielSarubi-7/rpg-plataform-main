import type { TokenConditionId } from "./tokenStatus";

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
}
