import { socket } from "@/core/socket/socket";

import type { Character } from "./characterApi";
import type {
  DeleteCharacterLivePayload,
  UpdateCharacterLivePayload,
} from "@shared/types/multiplayer";

export function emitCharacterUpdated(
  roomCode: string,
  authToken: string,
  character: Character,
) {
  const payload: UpdateCharacterLivePayload = {
    roomCode,
    authToken,
    character: character as unknown as UpdateCharacterLivePayload["character"],
  };

  socket.emit("character:updated", payload);
}

export function emitCharacterDeleted(
  roomCode: string,
  authToken: string,
  characterId: string,
) {
  const payload: DeleteCharacterLivePayload = {
    roomCode,
    authToken,
    characterId,
  };

  socket.emit("character:deleted", payload);
}
