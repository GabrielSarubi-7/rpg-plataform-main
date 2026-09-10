import { socket } from "@/core/socket/socket";

import type { UseActionPayload } from "@shared/types/multiplayer";

export function emitActionUse(payload: UseActionPayload) {
  socket.emit("action:use", payload);
}

