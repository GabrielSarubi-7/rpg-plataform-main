import { socket } from "@/core/socket/socket";
import type { MapAnnotation } from "@shared/types/annotation";

export function emitAnnotationUpsert(
  roomCode: string,
  annotation: MapAnnotation,
  authToken?: string | null,
) {
  socket.emit("annotation:upsert", {
    roomCode,
    annotation,
    authToken: authToken ?? undefined,
  });
}

export function emitAnnotationRemove(
  roomCode: string,
  annotationId: string,
  authToken?: string | null,
) {
  socket.emit("annotation:remove", {
    roomCode,
    annotationId,
    authToken: authToken ?? undefined,
  });
}

export function emitAnnotationClear(roomCode: string, authToken?: string | null) {
  socket.emit("annotation:clear", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}
