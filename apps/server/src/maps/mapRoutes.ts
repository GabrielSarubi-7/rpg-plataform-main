import { Router } from "express";

import {
  authMiddleware,
  type AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { getRouteParam } from "../utils/routeParams";

import {
  createCampaignMap,
  getCampaignMapState,
  listCampaignMaps,
  setActiveCampaignMap,
  updateCampaignMap,
} from "./mapService";

export const mapRoutes = Router();

mapRoutes.use(authMiddleware);


mapRoutes.get(
  "/campaigns/:campaignId/maps",
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

      const result = await listCampaignMaps({
        campaignId,
        userId: request.userId,
      });

      response.json({
        ok: true,
        maps: result.maps,
        activeMapId: result.activeMapId,
        canManage: result.canManage,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao listar mapas.",
      });
    }
  },
);

mapRoutes.get(
  "/campaigns/:campaignId/maps/:mapId/state",
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
      const mapId = getRouteParam(request.params.mapId);

      const result = await getCampaignMapState({
        campaignId,
        mapId,
        userId: request.userId,
      });

      response.json({
        ok: true,
        ...result,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao carregar mapa.",
      });
    }
  },
);

mapRoutes.post(
  "/campaigns/:campaignId/maps",
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

      const map = await createCampaignMap({
        campaignId,
        userId: request.userId,
        name: String(request.body?.name ?? ""),
        width:
          request.body?.width === undefined
            ? undefined
            : Number(request.body.width),
        height:
          request.body?.height === undefined
            ? undefined
            : Number(request.body.height),
        cellSize:
          request.body?.cellSize === undefined
            ? undefined
            : Number(request.body.cellSize),
        backgroundImage:
          request.body?.backgroundImage === undefined
            ? undefined
            : request.body.backgroundImage === null
              ? null
              : String(request.body.backgroundImage),
        layerConfig:
          request.body?.layerConfig === undefined &&
          request.body?.layerConfigJson === undefined
            ? undefined
            : (request.body.layerConfig ?? request.body.layerConfigJson),
      });

      response.status(201).json({
        ok: true,
        map,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "Erro ao criar mapa.",
      });
    }
  },
);

mapRoutes.patch(
  "/campaigns/:campaignId/maps/:mapId",
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
      const mapId = getRouteParam(request.params.mapId);

      const map = await updateCampaignMap({
        campaignId,
        mapId,
        userId: request.userId,
        name:
          request.body?.name === undefined
            ? undefined
            : String(request.body.name),
        width:
          request.body?.width === undefined
            ? undefined
            : Number(request.body.width),
        height:
          request.body?.height === undefined
            ? undefined
            : Number(request.body.height),
        cellSize:
          request.body?.cellSize === undefined
            ? undefined
            : Number(request.body.cellSize),
        backgroundImage:
          request.body?.backgroundImage === undefined
            ? undefined
            : request.body.backgroundImage === null
              ? null
              : String(request.body.backgroundImage),
        layerConfig:
          request.body?.layerConfig === undefined &&
          request.body?.layerConfigJson === undefined
            ? undefined
            : (request.body.layerConfig ?? request.body.layerConfigJson),
      });

      response.json({
        ok: true,
        map,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao atualizar mapa.",
      });
    }
  },
);

mapRoutes.patch(
  "/campaigns/:campaignId/maps/:mapId/active",
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
      const mapId = getRouteParam(request.params.mapId);

      const map = await setActiveCampaignMap({
        campaignId,
        mapId,
        userId: request.userId,
      });

      response.json({
        ok: true,
        map,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "Erro ao ativar mapa.",
      });
    }
  },
);
