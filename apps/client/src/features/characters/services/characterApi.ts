import { parseApiResponse } from "@/core/api/parseResponse";
import { SERVER_URL } from "@/core/api/serverUrl";

export type CharacterType = "pc" | "npc" | "monster";
export type CharacterVisibility = "private" | "gm_only" | "public";

export interface CharacterPermission {
  id: string;
  characterId: string;
  userId: string;
  canView: boolean;
  canEdit: boolean;
  canControl: boolean;
}

export interface CharacterSheet {
  id: string;
  characterId: string;
  system: string;
  schemaVersion: number;
  dataJson: unknown;
  version: number;
  lastEditedByUserId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  campaignId: string;
  ownerUserId?: string | null;
  createdByUserId: string;
  name: string;
  type: CharacterType;
  visibility: CharacterVisibility;
  portraitImage?: string | null;
  defaultTokenImage?: string | null;
  system: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
  sheet?: CharacterSheet | null;
  permissions?: CharacterPermission[];
}

interface CharactersResponse {
  ok: boolean;
  characters: Character[];
  error?: string;
}

interface CharacterResponse {
  ok: boolean;
  character: Character;
  error?: string;
}


export async function listCharactersRequest(
  token: string,
  campaignId: string,
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/characters`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseApiResponse<CharactersResponse>(response);
}

export async function createCharacterRequest(
  token: string,
  campaignId: string,
  input: {
    name: string;
    type?: CharacterType;
    visibility?: CharacterVisibility;
    portraitImage?: string;
    defaultTokenImage?: string;
  },
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/characters`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  return parseApiResponse<CharacterResponse>(response);
}

export async function updateCharacterRequest(
  token: string,
  campaignId: string,
  characterId: string,
  input: {
    name?: string;
    type?: CharacterType;
    visibility?: CharacterVisibility;
    portraitImage?: string | null;
    defaultTokenImage?: string | null;
    sheetData?: unknown;
  },
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/characters/${characterId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  return parseApiResponse<CharacterResponse>(response);
}

export async function deleteCharacterRequest(
  token: string,
  campaignId: string,
  characterId: string,
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/characters/${characterId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseApiResponse<CharacterResponse>(response);
}
