export type DiceRollOutcome = "normal" | "critical" | "fumble";

export interface DiceRollFollowUp {
  kind: "damage";
  actionName: string;
  normalExpression: string;
  criticalExpression?: string;
  damageType?: string;
}

export interface DiceRollRequest {
  roomCode: string;
  playerName: string;
  expression: string;
  isGmRoll: boolean;
  label?: string;
  characterName?: string;
  followUp?: DiceRollFollowUp;
  color?: string;
}

export interface DiceRollResult {
  expression: string;
  total: number;
  rolls: number[];
  sides: number;
  modifier: number;
  isGmRoll: boolean;
  outcome: DiceRollOutcome;
}

export interface DiceRollAck {
  ok: boolean;
  result?: DiceRollResult;
  error?: string;
}
