import { socket } from "@/core/socket/socket";
import type { Token, TokenStandMode } from "@shared/types/token";
import type { TokenConditionId } from "@shared/types/tokenStatus";

export function emitTokenAdd(
  roomCode: string,
  token: Token,
  authToken?: string | null,
) {
  socket.emit("token:add", {
    roomCode,
    token,
    authToken: authToken ?? undefined,
  });
}

export function emitTokenMove(
  roomCode: string,
  tokenId: string,
  x: number,
  y: number,
  authToken?: string | null,
) {
  socket.emit("token:move", {
    roomCode,
    tokenId,
    x,
    y,
    authToken: authToken ?? undefined,
  });
}

export function emitTokenDelete(
  roomCode: string,
  tokenId: string,
  authToken?: string | null,
) {
  socket.emit("token:delete", {
    roomCode,
    tokenId,
    authToken: authToken ?? undefined,
  });
}

export function emitTokenImageUpdate(
  roomCode: string,
  tokenId: string,
  image: string,
  authToken?: string | null,
) {
  socket.emit("token:image:update", {
    roomCode,
    tokenId,
    image,
    authToken: authToken ?? undefined,
  });
}

export function emitTokenOverlayUpdate(
  roomCode: string,
  tokenId: string,
  input: {
    showHealthBar?: boolean;
    conditions?: TokenConditionId[];
  },
  authToken?: string | null,
) {
  socket.emit("token:overlay:update", {
    roomCode,
    tokenId,
    authToken: authToken ?? undefined,
    ...input,
  });
}

export function emitTokenVisualUpdate(
  roomCode: string,
  tokenId: string,
  input: {
    elevation?: number;
    standMode?: TokenStandMode;
    widthCells?: number;
    heightCells?: number;
  },
  authToken?: string | null,
) {
  socket.emit("token:visual:update", {
    roomCode,
    tokenId,
    authToken: authToken ?? undefined,
    ...input,
  });
}
