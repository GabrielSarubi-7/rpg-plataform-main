import { socket } from "@/core/socket/socket";
import type { AudioTrackInput } from "@shared/types/audio";

function emitAudioEvent<T>(
  eventName: string,
  payload: T,
): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.emit(
      eventName,
      payload,
      (response?: { ok: boolean; error?: string }) => {
        if (!response?.ok) {
          reject(new Error(response?.error ?? "Erro ao sincronizar audio."));
          return;
        }

        resolve();
      },
    );
  });
}

export function addAudioTrack(
  roomCode: string,
  track: AudioTrackInput,
  authToken?: string | null,
) {
  return emitAudioEvent("audio:track:add", {
    roomCode,
    authToken: authToken ?? undefined,
    track,
  });
}

export function removeAudioTrack(
  roomCode: string,
  trackId: string,
  authToken?: string | null,
) {
  return emitAudioEvent("audio:track:remove", {
    roomCode,
    authToken: authToken ?? undefined,
    trackId,
  });
}

export function moveAudioTrack(
  roomCode: string,
  trackId: string,
  direction: -1 | 1,
  authToken?: string | null,
) {
  return emitAudioEvent("audio:track:move", {
    roomCode,
    authToken: authToken ?? undefined,
    trackId,
    direction,
  });
}

export function replaceAudioQueue(
  roomCode: string,
  tracks: AudioTrackInput[],
  authToken?: string | null,
) {
  return emitAudioEvent("audio:queue:replace", {
    roomCode,
    authToken: authToken ?? undefined,
    tracks,
  });
}

export function clearAudioQueue(roomCode: string, authToken?: string | null) {
  return emitAudioEvent("audio:queue:clear", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}

export function setAudioPlayback(
  roomCode: string,
  input: {
    currentTrackId?: string | null;
    isPlaying?: boolean;
  },
  authToken?: string | null,
) {
  return emitAudioEvent("audio:playback:set", {
    roomCode,
    authToken: authToken ?? undefined,
    ...input,
  });
}

export function playNextAudioTrack(roomCode: string, authToken?: string | null) {
  return emitAudioEvent("audio:next", {
    roomCode,
    authToken: authToken ?? undefined,
  });
}
