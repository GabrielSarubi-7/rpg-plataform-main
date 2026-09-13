import {
  ensureCampaignAccess,
  ensureCampaignGmAccess as ensureCampaignGmAccessBase,
  isGmRole,
} from "../campaigns/campaignAccess";

import {
  persistAssetReference,
  persistAssetReferences,
} from "../assets/assetService";
import { prisma } from "../db/prisma";
import { withMapWriteLock } from "./mapWriteLock";
import {
  DEFAULT_MAP_SETTINGS,
  filterMapSettingsForPlayers,
  normalizeMapLayerConfig,
  normalizeMapSettings,
} from "@shared/rules/mapRules";
import type { Token, TokenStandMode } from "@shared/types/token";
import { normalizeTokenSizeCells } from "@shared/rules/tokenRules";

const DEFAULT_MAP_WIDTH_CELLS = DEFAULT_MAP_SETTINGS.widthCells;
const DEFAULT_MAP_HEIGHT_CELLS = DEFAULT_MAP_SETTINGS.heightCells;
const DEFAULT_CELL_SIZE = DEFAULT_MAP_SETTINGS.cellSize;

function mapDbMapToMapSettings(map: {
  id: string;
  name: string;
  width: number;
  height: number;
  cellSize: number;
  backgroundImage: string | null;
  layerConfigJson: unknown;
}) {
  return normalizeMapSettings({
    ...DEFAULT_MAP_SETTINGS,
    mapId: map.id,
    pageName: map.name,
    widthCells: map.width,
    heightCells: map.height,
    cellSize: map.cellSize,
    backgroundImage: map.backgroundImage ?? undefined,
    layerConfig: normalizeMapLayerConfig(map.layerConfigJson),
  });
}

export function mapDbMapToPlayerView<
  T extends {
    id: string;
    name: string;
    width: number;
    height: number;
    cellSize: number;
    backgroundImage: string | null;
    layerConfigJson: unknown;
  },
>(map: T): T {
  const settings = filterMapSettingsForPlayers(mapDbMapToMapSettings(map));

  return {
    ...map,
    layerConfigJson: settings.layerConfig,
  };
}

function mapDbTokenToClientToken(token: {
  id: string;
  characterId: string | null;
  name: string | null;
  image: string | null;
  x: number;
  y: number;
  widthCells: number;
  heightCells: number;
  elevation: number;
  standMode: string;
  barsJson: unknown;
  statusJson: unknown;
}): Token {
  const bars = normalizeTokenBars(token.barsJson);
  const status = normalizeTokenStatus(token.statusJson);

  return {
    id: token.id,
    characterId: token.characterId ?? undefined,
    name: token.name ?? undefined,
    image: token.image ?? undefined,
    x: token.x,
    y: token.y,
    widthCells: normalizeTokenSizeCells(token.widthCells),
    heightCells: normalizeTokenSizeCells(token.heightCells),
    showHealthBar: bars.showHealthBar,
    conditions: status.conditions,
    elevation: token.elevation,
    standMode: normalizeTokenStandMode(token.standMode),
  };
}

export async function ensureCampaignGmAccess(input: {
  campaignId: string;
  userId: string;
}) {
  return ensureCampaignGmAccessBase(
    input,
    "Apenas o GM pode alterar mapas da campanha.",
  );
}

export async function listCampaignMaps(input: {
  campaignId: string;
  userId: string;
}) {
  const member = await ensureCampaignAccess(input);
  const isGm = isGmRole(member.role);

  const activeSession = await prisma.campaignSession.findFirst({
    where: {
      campaignId: input.campaignId,
      status: "active",
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  const activeMapId = activeSession?.activeMapId ?? null;

  if (!isGm && !activeMapId) {
    return {
      maps: [],
      activeMapId,
      canManage: false,
    };
  }

  if (!isGm && activeMapId) {
    const maps = await prisma.map.findMany({
      where: {
        id: activeMapId,
        campaignId: input.campaignId,
        isArchived: false,
        deletedAt: null,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return {
      maps: maps.map(mapDbMapToPlayerView),
      activeMapId,
      canManage: false,
    };
  }

  const maps = await prisma.map.findMany({
    where: {
      campaignId: input.campaignId,
      isArchived: false,
      deletedAt: null,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return {
    maps,
    activeMapId,
    canManage: isGm,
  };
}

export async function createCampaignMap(input: {
  campaignId: string;
  userId: string;
  name: string;
  width?: number;
  height?: number;
  cellSize?: number;
  backgroundImage?: string | null;
  layerConfig?: unknown;
}) {
  await ensureCampaignGmAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const name = input.name.trim();

  if (name.length < 2) {
    throw new Error("Nome do mapa precisa ter pelo menos 2 caracteres.");
  }

  const lastMap = await prisma.map.findFirst({
    where: {
      campaignId: input.campaignId,
      isArchived: false,
      deletedAt: null,
    },
    orderBy: {
      sortOrder: "desc",
    },
  });

  const backgroundImage = await persistAssetReference(input.backgroundImage);
  const layerConfig = await persistAssetReferences(input.layerConfig);

  return prisma.map.create({
    data: {
      campaignId: input.campaignId,
      name,
      width: input.width ?? DEFAULT_MAP_WIDTH_CELLS,
      height: input.height ?? DEFAULT_MAP_HEIGHT_CELLS,
      cellSize: input.cellSize ?? DEFAULT_CELL_SIZE,
      backgroundImage: backgroundImage ?? null,
      layerConfigJson: toPrismaJson(normalizeMapLayerConfig(layerConfig)),
      sortOrder: (lastMap?.sortOrder ?? -1) + 1,
    },
  });
}

export async function updateCampaignMap(input: {
  campaignId: string;
  userId: string;
  mapId: string;
  name?: string;
  width?: number;
  height?: number;
  cellSize?: number;
  backgroundImage?: string | null;
  layerConfig?: unknown;
}) {
  await ensureCampaignGmAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  return withMapWriteLock(input.mapId, async () => {
    const map = await prisma.map.findFirst({
      where: {
        id: input.mapId,
        campaignId: input.campaignId,
        isArchived: false,
        deletedAt: null,
      },
    });

    if (!map) {
      throw new Error("Mapa não encontrado.");
    }

    const nextName = input.name?.trim();

    if (nextName !== undefined && nextName.length < 2) {
      throw new Error("Nome do mapa precisa ter pelo menos 2 caracteres.");
    }

    const backgroundImage =
      input.backgroundImage === undefined
        ? undefined
        : await persistAssetReference(input.backgroundImage);
    const layerConfig =
      input.layerConfig === undefined
        ? undefined
        : await persistAssetReferences(input.layerConfig);

    return prisma.map.update({
      where: {
        id: map.id,
      },
      data: {
        name: nextName ?? undefined,
        width: input.width ?? undefined,
        height: input.height ?? undefined,
        cellSize: input.cellSize ?? undefined,
        backgroundImage,
        layerConfigJson:
          layerConfig === undefined
            ? undefined
            : toPrismaJson({ ...normalizeMapLayerConfig(layerConfig), scene3d: normalizeMapLayerConfig(map.layerConfigJson).scene3d }),
      },
    });
  });
}

export async function getCampaignMapState(input: {
  campaignId: string;
  userId: string;
  mapId: string;
}) {
  await ensureCampaignGmAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const map = await prisma.map.findFirst({
    where: {
      id: input.mapId,
      campaignId: input.campaignId,
      isArchived: false,
      deletedAt: null,
    },
  });

  if (!map) {
    throw new Error("Mapa não encontrado.");
  }

  const tokens = await prisma.mapToken.findMany({
    where: {
      mapId: map.id,
      deletedAt: null,
    },
  });

  return {
    map,
    mapSettings: mapDbMapToMapSettings(map),
    tokens: Object.fromEntries(
      tokens.map((token) => [token.id, mapDbTokenToClientToken(token)]),
    ),
  };
}

export async function setActiveCampaignMap(input: {
  campaignId: string;
  userId: string;
  mapId: string;
}) {
  await ensureCampaignGmAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const map = await prisma.map.findFirst({
    where: {
      id: input.mapId,
      campaignId: input.campaignId,
      isArchived: false,
      deletedAt: null,
    },
  });

  if (!map) {
    throw new Error("Mapa não encontrado.");
  }

  const activeSession = await prisma.campaignSession.findFirst({
    where: {
      campaignId: input.campaignId,
      status: "active",
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (activeSession) {
    await prisma.campaignSession.update({
      where: {
        id: activeSession.id,
      },
      data: {
        activeMapId: map.id,
      },
    });

    return map;
  }

  await prisma.campaignSession.create({
    data: {
      campaignId: input.campaignId,
      activeMapId: map.id,
      createdByUserId: input.userId,
    },
  });

  return map;
}

function normalizeTokenBars(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      showHealthBar: false,
    };
  }

  const bars = value as {
    showHealthBar?: unknown;
  };

  return {
    showHealthBar:
      typeof bars.showHealthBar === "boolean" ? bars.showHealthBar : false,
  };
}

function normalizeTokenStatus(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      conditions: [],
    };
  }

  const status = value as {
    conditions?: unknown;
  };

  return {
    conditions: Array.isArray(status.conditions)
      ? status.conditions.filter(
          (condition): condition is NonNullable<Token["conditions"]>[number] =>
            typeof condition === "string",
        )
      : [],
  };
}

function normalizeTokenStandMode(value: unknown): TokenStandMode {
  if (value === "flat" || value === "billboard") {
    return value;
  }

  return "auto";
}

function toPrismaJson(value: unknown): any {
  return JSON.parse(JSON.stringify(value));
}
