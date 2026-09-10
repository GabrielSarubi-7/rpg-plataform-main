import { create } from "zustand";

import { socket } from "@/core/socket/socket";

import type {
  JoinCampaignLivePayload,
  RoomState,
} from "@shared/types/multiplayer";
import type { AudioState } from "@shared/types/audio";
import type { RoomActionEffect } from "@shared/types/multiplayer";
import type { TurnState } from "@shared/types/turn";

const DEFAULT_TURN_STATE: TurnState = {
  active: false,
  entries: [],
  currentIndex: 0,
  round: 1,
};

const DEFAULT_AUDIO_STATE: AudioState = {
  queue: [],
  currentTrackId: null,
  isPlaying: false,
  updatedAt: 0,
};

interface LobbyState {
  playerName: string;
  playerId: string | null;
  lobbyCode: string | null;
  players: RoomState["players"];
  turnState: TurnState;
  audioState: AudioState;
  activeEffects: RoomActionEffect[];
  error: string | null;
  isLoading: boolean;

  setPlayerName: (name: string) => void;
  createLobby: () => void;
  joinLobby: (code: string) => void;
  joinCampaignLive: (
    campaignId: string,
    playerName: string,
    authToken: string,
  ) => void;
  leaveLobby: () => void;
  setRoomState: (room: RoomState) => void;
}

interface RoomSocketResponse {
  ok: boolean;
  room?: RoomState;
  playerId?: string;
  error?: string;
}

export const useLobbyStore = create<LobbyState>((set, get) => ({
  playerName: "",
  playerId: null,
  lobbyCode: null,
  players: [],
  turnState: DEFAULT_TURN_STATE,
  audioState: DEFAULT_AUDIO_STATE,
  activeEffects: [],
  error: null,
  isLoading: false,

  setPlayerName: (playerName) => set({ playerName }),

  createLobby: () => {
    const playerName = get().playerName.trim();

    if (!playerName) {
      set({ error: "Digite seu nome antes de criar um lobby." });
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    set({ isLoading: true, error: null });

    socket.timeout(5000).emit(
      "room:create",
      { playerName },
      (err: Error | null, response?: RoomSocketResponse) => {
        if (err) {
          set({
            isLoading: false,
            error: "Não foi possível conectar ao servidor.",
          });
          return;
        }

        if (!response?.ok || !response.room) {
          set({
            isLoading: false,
            error: response?.error ?? "Erro ao criar lobby.",
          });
          return;
        }

        set({
          lobbyCode: response.room.code,
          players: response.room.players,
          turnState: response.room.turnState ?? DEFAULT_TURN_STATE,
          audioState: response.room.audioState ?? DEFAULT_AUDIO_STATE,
          activeEffects: response.room.activeEffects ?? [],
          playerId: response.playerId ?? null,
          error: null,
          isLoading: false,
        });
      },
    );
  },

  joinLobby: (code) => {
    const playerName = get().playerName.trim();

    if (!playerName) {
      set({ error: "Digite seu nome antes de entrar em um lobby." });
      return;
    }

    const roomCode = code.trim().toUpperCase();

    if (!roomCode) {
      set({ error: "Digite o código do lobby." });
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    set({ isLoading: true, error: null });

    socket.timeout(5000).emit(
      "room:join",
      {
        roomCode,
        playerName,
      },
      (err: Error | null, response?: RoomSocketResponse) => {
        if (err) {
          set({
            isLoading: false,
            error: "Não foi possível conectar ao servidor.",
          });
          return;
        }

        if (!response?.ok || !response.room) {
          set({
            isLoading: false,
            error: response?.error ?? "Erro ao entrar no lobby.",
          });
          return;
        }

        set({
          lobbyCode: response.room.code,
          players: response.room.players,
          turnState: response.room.turnState ?? DEFAULT_TURN_STATE,
          audioState: response.room.audioState ?? DEFAULT_AUDIO_STATE,
          activeEffects: response.room.activeEffects ?? [],
          playerId: response.playerId ?? null,
          error: null,
          isLoading: false,
        });
      },
    );
  },

  joinCampaignLive: (campaignId, playerName, authToken) => {
    const currentLobbyCode = get().lobbyCode;
    const isLoading = get().isLoading;

    if (!campaignId || !playerName.trim() || !authToken) {
      set({
        error: "Dados inválidos para entrar na campanha.",
      });
      return;
    }

    if (currentLobbyCode === campaignId || isLoading) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    const payload: JoinCampaignLivePayload = {
      campaignId,
      playerName: playerName.trim(),
      authToken,
    };

    set({
      playerName: playerName.trim(),
      isLoading: true,
      error: null,
    });

    socket
      .timeout(5000)
      .emit(
        "campaign:join-live",
        payload,
        (err: Error | null, response?: RoomSocketResponse) => {
          if (err) {
            set({
              isLoading: false,
              error: "Não foi possível conectar à campanha.",
            });
            return;
          }

          if (!response?.ok || !response.room) {
            set({
              isLoading: false,
              error: response?.error ?? "Erro ao entrar na campanha.",
            });
            return;
          }

          set({
            lobbyCode: response.room.code,
            players: response.room.players,
            turnState: response.room.turnState ?? DEFAULT_TURN_STATE,
            audioState: response.room.audioState ?? DEFAULT_AUDIO_STATE,
            activeEffects: response.room.activeEffects ?? [],
            playerId: response.playerId ?? null,
            error: null,
            isLoading: false,
          });
        },
      );
  },

  leaveLobby: () =>
    set({
      lobbyCode: null,
      players: [],
      turnState: DEFAULT_TURN_STATE,
      audioState: DEFAULT_AUDIO_STATE,
      activeEffects: [],
      playerId: null,
      error: null,
      isLoading: false,
    }),

  setRoomState: (room) =>
    set({
      lobbyCode: room.code,
      players: room.players,
      turnState: room.turnState ?? DEFAULT_TURN_STATE,
      audioState: room.audioState ?? DEFAULT_AUDIO_STATE,
      activeEffects: room.activeEffects ?? [],
    }),
}));
