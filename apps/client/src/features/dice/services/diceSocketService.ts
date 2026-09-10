import { socket } from "@/core/socket/socket";
import type {
  DiceRollAck,
  DiceRollFollowUp,
  DiceRollResult,
} from "@shared/types/dice";

interface RollDiceParams {
  roomCode: string;
  playerName: string;
  expression: string;
  isGmRoll: boolean;
  label?: string;
  characterName?: string;
  followUp?: DiceRollFollowUp;
  color?: string;
}

export function emitDiceRoll(params: RollDiceParams) {
  return new Promise<DiceRollResult>((resolve, reject) => {
    socket.emit("dice:roll", params, (response: DiceRollAck) => {
      if (!response?.ok || !response.result) {
        reject(new Error(response?.error ?? "Erro ao rolar dado."));
        return;
      }

      resolve(response.result);
    });
  });
}
