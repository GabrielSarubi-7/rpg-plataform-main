import { Router } from "express";

import {
  authMiddleware,
  type AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { getRouteParam } from "../utils/routeParams";

import {
  archiveCampaign,
  createCampaign,
  createCampaignInvite,
  getCampaignForUser,
  joinCampaignByInvite,
  listUserCampaigns,
  removeCampaignMember,
  updateCampaignSettings,
  updateCampaignMemberRole,
  updateCampaignSystemPreset,
} from "./campaignService";

export const campaignRoutes = Router();

campaignRoutes.use(authMiddleware);


campaignRoutes.post("/", async (request: AuthenticatedRequest, response) => {
  try {
    if (!request.userId) {
      response.status(401).json({
        ok: false,
        error: "Usuário não autenticado.",
      });
      return;
    }

    const campaign = await createCampaign({
      userId: request.userId,
      name: String(request.body?.name ?? ""),
      description:
        request.body?.description === undefined
          ? undefined
          : String(request.body.description),
      systemPreset:
        request.body?.systemPreset === undefined
          ? undefined
          : String(request.body.systemPreset),
    });

    response.status(201).json({
      ok: true,
      campaign,
    });
  } catch (error) {
    response.status(400).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "Erro ao criar campanha.",
    });
  }
});

campaignRoutes.get("/", async (request: AuthenticatedRequest, response) => {
  try {
    if (!request.userId) {
      response.status(401).json({
        ok: false,
        error: "Usuário não autenticado.",
      });
      return;
    }

    const campaigns = await listUserCampaigns(request.userId);

    response.json({
      ok: true,
      campaigns,
    });
  } catch (error) {
    response.status(400).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "Erro ao listar campanhas.",
    });
  }
});

campaignRoutes.post("/join", async (request: AuthenticatedRequest, response) => {
  try {
    if (!request.userId) {
      response.status(401).json({
        ok: false,
        error: "Usuário não autenticado.",
      });
      return;
    }

    const campaign = await joinCampaignByInvite({
      userId: request.userId,
      code: String(request.body?.code ?? ""),
    });

    response.json({
      ok: true,
      campaign,
    });
  } catch (error) {
    response.status(400).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "Erro ao entrar na campanha.",
    });
  }
});

campaignRoutes.post(
  "/:campaignId/invites",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuário não autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);

      if (!campaignId) {
        response.status(400).json({
          ok: false,
          error: "ID da campanha inválido.",
        });
        return;
      }

      const campaign = await createCampaignInvite({
        userId: request.userId,
        campaignId,
      });

      response.status(201).json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao criar convite.",
      });
    }
  },
);

campaignRoutes.put(
  "/:campaignId/settings",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuario nao autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);

      if (!campaignId) {
        response.status(400).json({
          ok: false,
          error: "ID da campanha invalido.",
        });
        return;
      }

      const campaign = await updateCampaignSettings({
        userId: request.userId,
        campaignId,
        settings: request.body?.settings,
      });

      response.json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao salvar configuracoes da campanha.",
      });
    }
  },
);

campaignRoutes.put(
  "/:campaignId/system",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuario nao autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);

      if (!campaignId) {
        response.status(400).json({
          ok: false,
          error: "ID da campanha invalido.",
        });
        return;
      }

      const campaign = await updateCampaignSystemPreset({
        userId: request.userId,
        campaignId,
        systemPreset: request.body?.systemPreset,
      });

      response.json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao alterar sistema da campanha.",
      });
    }
  },
);

campaignRoutes.patch(
  "/:campaignId/members/:memberId",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuario nao autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);
      const memberId = getRouteParam(request.params.memberId);

      if (!campaignId || !memberId) {
        response.status(400).json({
          ok: false,
          error: "Dados do membro invalidos.",
        });
        return;
      }

      const campaign = await updateCampaignMemberRole({
        userId: request.userId,
        campaignId,
        memberId,
        role: request.body?.role,
      });

      response.json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao alterar player.",
      });
    }
  },
);

campaignRoutes.delete(
  "/:campaignId/members/:memberId",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuario nao autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);
      const memberId = getRouteParam(request.params.memberId);

      if (!campaignId || !memberId) {
        response.status(400).json({
          ok: false,
          error: "Dados do membro invalidos.",
        });
        return;
      }

      const campaign = await removeCampaignMember({
        userId: request.userId,
        campaignId,
        memberId,
      });

      response.json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao remover player.",
      });
    }
  },
);

campaignRoutes.delete(
  "/:campaignId",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuario nao autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);

      if (!campaignId) {
        response.status(400).json({
          ok: false,
          error: "ID da campanha invalido.",
        });
        return;
      }

      await archiveCampaign({
        userId: request.userId,
        campaignId,
      });

      response.json({
        ok: true,
        campaignId,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao excluir campanha.",
      });
    }
  },
);

campaignRoutes.get(
  "/:campaignId",
  async (request: AuthenticatedRequest, response) => {
    try {
      if (!request.userId) {
        response.status(401).json({
          ok: false,
          error: "Usuário não autenticado.",
        });
        return;
      }

      const campaignId = getRouteParam(request.params.campaignId);

      if (!campaignId) {
        response.status(400).json({
          ok: false,
          error: "ID da campanha inválido.",
        });
        return;
      }

      const campaign = await getCampaignForUser({
        userId: request.userId,
        campaignId,
      });

      response.json({
        ok: true,
        campaign,
      });
    } catch (error) {
      response.status(404).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar campanha.",
      });
    }
  },
);
