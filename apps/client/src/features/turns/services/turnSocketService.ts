import { socket } from "@/core/socket/socket";

export function emitTurnStart(roomCode: string, authToken?: string | null) {
  socket.emit("turn:start", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}

export function emitTurnStop(roomCode: string, authToken?: string | null) {
  socket.emit("turn:stop", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}

export function emitTurnEntryUpsert(
  roomCode: string,
  input: {
    tokenId: string;
    initiative: number;
  },
  authToken?: string | null,
) {
  socket.emit("turn:entry:upsert", {
    roomCode,
    authToken: authToken ?? undefined,
    entry: input,
  });
}

export function emitTurnEntryRemove(
  roomCode: string,
  tokenId: string,
  authToken?: string | null,
) {
  socket.emit("turn:entry:remove", {
    roomCode,
    authToken: authToken ?? undefined,
    tokenId,
  });
}

export function emitTurnEntryMove(
  roomCode: string,
  tokenId: string,
  direction: -1 | 1,
  authToken?: string | null,
) {
  socket.emit("turn:entry:move", {
    roomCode,
    authToken: authToken ?? undefined,
    tokenId,
    direction,
  });
}

export function emitTurnNext(roomCode: string, authToken?: string | null) {
  socket.emit("turn:next", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}
