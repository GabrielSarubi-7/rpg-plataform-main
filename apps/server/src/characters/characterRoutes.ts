import { CharacterType, CharacterVisibility } from "../generated/prisma";
import { Router } from "express";

import {
  authMiddleware,
  type AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { getRouteParam } from "../utils/routeParams";

import {
  createCharacter,
  deleteCharacter,
  listCampaignCharacters,
  updateCharacter,
} from "./characterService";

export const characterRoutes = Router();

characterRoutes.use(authMiddleware);


function parseCharacterType(value: unknown) {
  if (
    value === CharacterType.pc ||
    value === CharacterType.npc ||
    value === CharacterType.monster
  ) {
    return value;
  }

  return undefined;
}

function parseCharacterVisibility(value: unknown) {
  if (
    value === CharacterVisibility.private ||
    value === CharacterVisibility.gm_only ||
    value === CharacterVisibility.public
  ) {
    return value;
  }

  return undefined;
}

characterRoutes.get(
  "/campaigns/:campaignId/characters",
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

      const characters = await listCampaignCharacters({
        campaignId,
        userId: request.userId,
      });

      response.json({
        ok: true,
        characters,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao listar fichas.",
      });
    }
  },
);

characterRoutes.post(
  "/campaigns/:campaignId/characters",
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

      const character = await createCharacter({
        campaignId,
        userId: request.userId,
        name: String(request.body?.name ?? ""),
        type: parseCharacterType(request.body?.type),
        visibility: parseCharacterVisibility(request.body?.visibility),
        portraitImage:
          request.body?.portraitImage === undefined
            ? undefined
            : String(request.body.portraitImage),
        defaultTokenImage:
          request.body?.defaultTokenImage === undefined
            ? undefined
            : String(request.body.defaultTokenImage),
      });

      response.status(201).json({
        ok: true,
        character,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : "Erro ao criar ficha.",
      });
    }
  },
);

characterRoutes.patch(
  "/campaigns/:campaignId/characters/:characterId",
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
      const characterId = getRouteParam(request.params.characterId);

      const character = await updateCharacter({
        campaignId,
        characterId,
        userId: request.userId,
        name:
          request.body?.name === undefined
            ? undefined
            : String(request.body.name),
        type: parseCharacterType(request.body?.type),
        visibility: parseCharacterVisibility(request.body?.visibility),
        portraitImage:
          request.body?.portraitImage === undefined
            ? undefined
            : request.body.portraitImage === null
              ? null
              : String(request.body.portraitImage),
        defaultTokenImage:
          request.body?.defaultTokenImage === undefined
            ? undefined
            : request.body.defaultTokenImage === null
              ? null
              : String(request.body.defaultTokenImage),
        sheetData: request.body?.sheetData,
      });

      response.json({
        ok: true,
        character,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao atualizar ficha.",
      });
    }
  },
);
characterRoutes.delete(
  "/campaigns/:campaignId/characters/:characterId",
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
      const characterId = getRouteParam(request.params.characterId);

      const character = await deleteCharacter({
        campaignId,
        characterId,
        userId: request.userId,
      });

      response.json({
        ok: true,
        character,
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao deletar ficha.",
      });
    }
  },
);
