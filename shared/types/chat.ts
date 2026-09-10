import type { DiceRollFollowUp, DiceRollResult } from "./dice";

export interface ChatMessage {
  id: string;
  roomCode: string;
  playerId: string;
  playerName: string;
  text: string;
  createdAt: number;

  type?: "text" | "dice";
  dice?: DiceRollResult;
  followUp?: DiceRollFollowUp;
  color?: string;
}

export interface SendChatMessagePayload {
  roomCode: string;
  playerName: string;
  text: string;
}
