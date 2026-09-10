import { socket } from "@/core/socket/socket";
import type { MapSettings } from "@shared/types/map";
import type { RoomState, SwitchCampaignMapPayload } from "@shared/types/multiplayer";

export function emitMapSettingsUpdate(
  roomCode: string,
  settings: MapSettings,
  authToken?: string | null,
) {
  socket.emit("map:settings:update", {
    roomCode,
    settings,
    authToken: authToken ?? undefined,
  });
}

export function emitCampaignMapSwitch(payload: SwitchCampaignMapPayload) {
  return new Promise<RoomState>((resolve, reject) => {
    socket.emit(
      "campaign:map:switch",
      payload,
      (response?: { ok: boolean; room?: RoomState; error?: string }) => {
        if (!response?.ok || !response.room) {
          reject(new Error(response?.error ?? "Erro ao trocar mapa."));
          return;
        }

        resolve(response.room);
      },
    );
  });
}
