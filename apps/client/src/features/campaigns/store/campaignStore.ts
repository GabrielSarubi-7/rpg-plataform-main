import { create } from "zustand";

import type { Campaign } from "../services/campaignApi";
import {
  createCampaignRequest,
  createCampaignInviteRequest,
  deleteCampaignRequest,
  joinCampaignRequest,
  listCampaignsRequest,
  removeCampaignMemberRequest,
  updateCampaignMemberRoleRequest,
  updateCampaignSettingsRequest,
  updateCampaignSystemPresetRequest,
} from "../services/campaignApi";
import type { CampaignRole } from "../services/campaignApi";
import type {
  CampaignSettings,
  CampaignSystemId,
} from "@shared/types/campaignSettings";

const ACTIVE_CAMPAIGN_KEY = "rpg-platform-active-campaign-id";

interface CampaignStore {
  campaigns: Campaign[];
  activeCampaign: Campaign | null;
  loading: boolean;
  error: string | null;

  loadCampaigns: (token: string) => Promise<void>;
  createCampaign: (
    token: string,
    input: {
      name: string;
      description?: string;
      systemPreset?: CampaignSystemId;
    },
  ) => Promise<void>;
  joinCampaign: (token: string, code: string) => Promise<void>;
  createInvite: (token: string, campaignId: string) => Promise<Campaign | null>;
  updateSettings: (
    token: string,
    campaignId: string,
    settings: CampaignSettings,
  ) => Promise<Campaign | null>;
  updateSystemPreset: (
    token: string,
    campaignId: string,
    systemPreset: CampaignSystemId,
  ) => Promise<Campaign | null>;
  updateMemberRole: (
    token: string,
    campaignId: string,
    memberId: string,
    role: Exclude<CampaignRole, "owner">,
  ) => Promise<Campaign | null>;
  removeMember: (
    token: string,
    campaignId: string,
    memberId: string,
  ) => Promise<Campaign | null>;
  deleteCampaign: (token: string, campaignId: string) => Promise<boolean>;
  openCampaign: (campaign: Campaign) => void;
  closeCampaign: () => void;
  clearError: () => void;
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  activeCampaign: null,
  loading: false,
  error: null,

  loadCampaigns: async (token) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await listCampaignsRequest(token);
      const storedActiveCampaignId = localStorage.getItem(ACTIVE_CAMPAIGN_KEY);

      const activeCampaign =
        result.campaigns.find(
          (campaign) => campaign.id === storedActiveCampaignId,
        ) ?? null;

      set({
        campaigns: result.campaigns,
        activeCampaign,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao carregar campanhas.",
      });
    }
  },

  createCampaign: async (token, input) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await createCampaignRequest(token, input);

      localStorage.setItem(ACTIVE_CAMPAIGN_KEY, result.campaign.id);

      set((state) => ({
        campaigns: [result.campaign, ...state.campaigns],
        activeCampaign: result.campaign,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao criar campanha.",
      });
    }
  },

  joinCampaign: async (token, code) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await joinCampaignRequest(token, code);

      localStorage.setItem(ACTIVE_CAMPAIGN_KEY, result.campaign.id);

      const existingCampaign = get().campaigns.some(
        (campaign) => campaign.id === result.campaign.id,
      );

      set((state) => ({
        campaigns: existingCampaign
          ? state.campaigns.map((campaign) =>
              campaign.id === result.campaign.id ? result.campaign : campaign,
            )
          : [result.campaign, ...state.campaigns],
        activeCampaign: result.campaign,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao entrar na campanha.",
      });
    }
  },

  createInvite: async (token, campaignId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await createCampaignInviteRequest(token, campaignId);

      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === result.campaign.id ? result.campaign : campaign,
        ),
        activeCampaign:
          state.activeCampaign?.id === result.campaign.id
            ? result.campaign
            : state.activeCampaign,
        loading: false,
      }));

      return result.campaign;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao criar convite.",
      });

      return null;
    }
  },

  updateSettings: async (token, campaignId, settings) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await updateCampaignSettingsRequest(
        token,
        campaignId,
        settings,
      );

      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === result.campaign.id ? result.campaign : campaign,
        ),
        activeCampaign:
          state.activeCampaign?.id === result.campaign.id
            ? result.campaign
            : state.activeCampaign,
        loading: false,
      }));

      return result.campaign;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar configuracoes da campanha.",
      });

      return null;
    }
  },

  updateSystemPreset: async (token, campaignId, systemPreset) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await updateCampaignSystemPresetRequest(
        token,
        campaignId,
        systemPreset,
      );

      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === result.campaign.id ? result.campaign : campaign,
        ),
        activeCampaign:
          state.activeCampaign?.id === result.campaign.id
            ? result.campaign
            : state.activeCampaign,
        loading: false,
      }));

      return result.campaign;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao alterar sistema da campanha.",
      });

      return null;
    }
  },

  updateMemberRole: async (token, campaignId, memberId, role) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await updateCampaignMemberRoleRequest(
        token,
        campaignId,
        memberId,
        role,
      );

      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === result.campaign.id ? result.campaign : campaign,
        ),
        activeCampaign:
          state.activeCampaign?.id === result.campaign.id
            ? result.campaign
            : state.activeCampaign,
        loading: false,
      }));

      return result.campaign;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao alterar player.",
      });

      return null;
    }
  },

  removeMember: async (token, campaignId, memberId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await removeCampaignMemberRequest(
        token,
        campaignId,
        memberId,
      );

      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === result.campaign.id ? result.campaign : campaign,
        ),
        activeCampaign:
          state.activeCampaign?.id === result.campaign.id
            ? result.campaign
            : state.activeCampaign,
        loading: false,
      }));

      return result.campaign;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao remover player.",
      });

      return null;
    }
  },

  deleteCampaign: async (token, campaignId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await deleteCampaignRequest(token, campaignId);

      if (get().activeCampaign?.id === campaignId) {
        localStorage.removeItem(ACTIVE_CAMPAIGN_KEY);
      }

      set((state) => ({
        campaigns: state.campaigns.filter(
          (campaign) => campaign.id !== campaignId,
        ),
        activeCampaign:
          state.activeCampaign?.id === campaignId ? null : state.activeCampaign,
        loading: false,
      }));

      return true;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao excluir campanha.",
      });

      return false;
    }
  },

  openCampaign: (campaign) => {
    localStorage.setItem(ACTIVE_CAMPAIGN_KEY, campaign.id);

    set({
      activeCampaign: campaign,
    });
  },

  closeCampaign: () => {
    localStorage.removeItem(ACTIVE_CAMPAIGN_KEY);

    set({
      activeCampaign: null,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
