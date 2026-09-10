import { create } from "zustand";

import {
  createCampaignMapRequest,
  getCampaignMapStateRequest,
  listCampaignMapsRequest,
  updateCampaignMapRequest,
  type CampaignMap,
} from "../services/mapApi";
import type { MapLayerConfig } from "@shared/types/map";
import { emitCampaignMapSwitch } from "../services/mapSocketService";
import { useMapStore } from "./mapStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";

interface CampaignMapStore {
  maps: CampaignMap[];
  activeMapId: string | null;
  canManage: boolean;
  loading: boolean;
  saving: boolean;
  error: string | null;

  loadMaps: (token: string, campaignId: string) => Promise<void>;
  createMap: (
    token: string,
    campaignId: string,
    input: {
      name: string;
      width?: number;
      height?: number;
      cellSize?: number;
      backgroundImage?: string | null;
      layerConfig?: MapLayerConfig | null;
      layerConfigJson?: MapLayerConfig | null;
      activate?: boolean;
    },
  ) => Promise<CampaignMap>;
  updateMap: (
    token: string,
    campaignId: string,
    mapId: string,
    input: {
      name?: string;
      width?: number;
      height?: number;
      cellSize?: number;
      backgroundImage?: string | null;
      layerConfig?: MapLayerConfig | null;
      layerConfigJson?: MapLayerConfig | null;
    },
  ) => Promise<CampaignMap>;
  activateMap: (
    token: string,
    campaignId: string,
    mapId: string,
  ) => Promise<void>;
  previewMap: (
    token: string,
    campaignId: string,
    mapId: string,
  ) => Promise<void>;
  setActiveMapId: (mapId: string | null) => void;
  clearError: () => void;
}

export const useCampaignMapStore = create<CampaignMapStore>((set, get) => ({
  maps: [],
  activeMapId: null,
  canManage: false,
  loading: false,
  saving: false,
  error: null,

  loadMaps: async (token, campaignId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await listCampaignMapsRequest(token, campaignId);

      set({
        maps: result.maps,
        activeMapId: result.activeMapId ?? null,
        canManage: result.canManage,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao carregar mapas.",
      });
    }
  },

  createMap: async (token, campaignId, input) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await createCampaignMapRequest(token, campaignId, input);

      set((state) => ({
        maps: [...state.maps, result.map].sort(
          (left, right) => left.sortOrder - right.sortOrder,
        ),
        saving: false,
      }));

      if (input.activate) {
        await get().activateMap(token, campaignId, result.map.id);
      }

      return result.map;
    } catch (error) {
      set({
        saving: false,
        error: error instanceof Error ? error.message : "Erro ao criar mapa.",
      });

      throw error;
    }
  },

  updateMap: async (token, campaignId, mapId, input) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await updateCampaignMapRequest(
        token,
        campaignId,
        mapId,
        input,
      );

      set((state) => ({
        maps: state.maps.map((map) =>
          map.id === result.map.id ? result.map : map,
        ),
        saving: false,
      }));

      return result.map;
    } catch (error) {
      set({
        saving: false,
        error:
          error instanceof Error ? error.message : "Erro ao atualizar mapa.",
      });

      throw error;
    }
  },

  activateMap: async (token, campaignId, mapId) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const room = await emitCampaignMapSwitch({
        campaignId,
        mapId,
        authToken: token,
      });

      useMapStore.getState().setMapSettings(room.mapSettings);
      useTokenStore.getState().setTokens(room.tokens);

      const result = await listCampaignMapsRequest(token, campaignId);

      set({
        maps: result.maps,
        activeMapId: room.mapSettings.mapId ?? result.activeMapId ?? mapId,
        canManage: result.canManage,
        saving: false,
      });
    } catch (error) {
      set({
        saving: false,
        error: error instanceof Error ? error.message : "Erro ao abrir mapa.",
      });

      throw error;
    }
  },

  previewMap: async (token, campaignId, mapId) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await getCampaignMapStateRequest(token, campaignId, mapId);

      useMapStore.getState().setMapSettings(result.mapSettings);
      useTokenStore.getState().setTokens(result.tokens);

      set((state) => ({
        maps: state.maps.map((map) =>
          map.id === result.map.id ? result.map : map,
        ),
        saving: false,
      }));
    } catch (error) {
      set({
        saving: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao abrir mapa para o GM.",
      });

      throw error;
    }
  },

  setActiveMapId: (mapId) => {
    set({
      activeMapId: mapId,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
