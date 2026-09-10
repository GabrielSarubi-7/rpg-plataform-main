import { parseApiResponse } from "@/core/api/parseResponse";
import { SERVER_URL } from "@/core/api/serverUrl";
import type {
  CampaignSettings,
  CampaignSystemId,
} from "@shared/types/campaignSettings";

export type CampaignRole = "owner" | "gm" | "player" | "spectator";

export interface CampaignMember {
  id: string;
  campaignId: string;
  userId: string;
  role: CampaignRole;
  displayName?: string | null;
  joinedAt: string;
  lastSeenAt?: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CampaignInvite {
  id: string;
  campaignId: string;
  code: string;
  roleOnJoin: CampaignRole;
  usesCount: number;
  maxUses?: number | null;
  expiresAt?: string | null;
  revokedAt?: string | null;
  createdAt: string;
}

export interface CampaignSession {
  id: string;
  campaignId: string;
  activeMapId?: string | null;
  status: string;
  startedAt: string;
  endedAt?: string | null;
  createdByUserId: string;
}

export interface Campaign {
  id: string;
  ownerUserId: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
  settingsJson?: CampaignSettings;
  members?: CampaignMember[];
  invites?: CampaignInvite[];
  sessions?: CampaignSession[];
}

interface CampaignResponse {
  ok: boolean;
  campaign: Campaign;
  error?: string;
}

interface CampaignsResponse {
  ok: boolean;
  campaigns: Campaign[];
  error?: string;
}

interface CampaignDeleteResponse {
  ok: boolean;
  campaignId: string;
  error?: string;
}


export async function listCampaignsRequest(token: string) {
  const response = await fetch(`${SERVER_URL}/campaigns`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseApiResponse<CampaignsResponse>(response);
}

export async function createCampaignRequest(
  token: string,
  input: {
    name: string;
    description?: string;
    systemPreset?: CampaignSystemId;
  },
) {
  const response = await fetch(`${SERVER_URL}/campaigns`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseApiResponse<CampaignResponse>(response);
}

export async function joinCampaignRequest(token: string, code: string) {
  const response = await fetch(`${SERVER_URL}/campaigns/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  return parseApiResponse<CampaignResponse>(response);
}

export async function createCampaignInviteRequest(
  token: string,
  campaignId: string,
) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}/invites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return parseApiResponse<CampaignResponse>(response);
}

export async function updateCampaignSettingsRequest(
  token: string,
  campaignId: string,
  settings: CampaignSettings,
) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}/settings`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      settings,
    }),
  });

  return parseApiResponse<CampaignResponse>(response);
}

export async function updateCampaignSystemPresetRequest(
  token: string,
  campaignId: string,
  systemPreset: CampaignSystemId,
) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}/system`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemPreset,
    }),
  });

  return parseApiResponse<CampaignResponse>(response);
}

export async function updateCampaignMemberRoleRequest(
  token: string,
  campaignId: string,
  memberId: string,
  role: Exclude<CampaignRole, "owner">,
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/members/${memberId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    },
  );

  return parseApiResponse<CampaignResponse>(response);
}

export async function removeCampaignMemberRequest(
  token: string,
  campaignId: string,
  memberId: string,
) {
  const response = await fetch(
    `${SERVER_URL}/campaigns/${campaignId}/members/${memberId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return parseApiResponse<CampaignResponse>(response);
}

export async function deleteCampaignRequest(token: string, campaignId: string) {
  const response = await fetch(`${SERVER_URL}/campaigns/${campaignId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseApiResponse<CampaignDeleteResponse>(response);
}
