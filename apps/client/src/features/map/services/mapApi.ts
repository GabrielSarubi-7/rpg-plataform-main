import type { MapLayerConfig, MapSettings } from "@shared/types/map";
import type { Token } from "@shared/types/token";

import { parseApiResponse } from "@/core/api/parseResponse";
import { SERVER_URL } from "@/core/api/serverUrl";

export interface CampaignMap {
  id: string;
  campaignId: string;
  name: string;
  width: number;
  height: number;
  cellSize: number;
  gridType?: string;
  backgroundImage?: string | null;
  layerConfigJson?: MapLayerConfig | null;
  sortOrder: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

interface MapsResponse {
  ok: boolean;
  maps: CampaignMap[];
  activeMapId?: string | null;
  canManage: boolean;
  error?: string;
}

interface MapResponse {
  ok: boolean;
  map: CampaignMap;
  error?: string;
}

interface MapStateResponse {
  ok: boolean;
  map: CampaignMap;
  mapSettings: MapSettings;
  tokens: Record<string, Token>;
  error?: string;
}


export async function listCampaignMapsRequest(
  token: string,
  campaignId: string,
) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}/maps`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseApiResponse<MapsResponse>(response);
}

export async function createCampaignMapRequest(
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
  },
) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}/maps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<MapResponse>(response);
}

export async function updateCampaignMapRequest(
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
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/maps/${mapId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  return parseApiResponse<MapResponse>(response);
}

export async function getCampaignMapStateRequest(
  token: string,
  campaignId: string,
  mapId: string,
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/maps/${mapId}/state`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseApiResponse<MapStateResponse>(response);
}
