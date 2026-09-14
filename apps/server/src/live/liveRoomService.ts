import { tokenPerceptionFromDb } from "@shared/rules/sceneEnvironmentRules";
import { randomUUID } from "crypto";
import { playerView } from "./playerVisibility";
import { normalizeTokenLight, normalizeVision } from "@shared/rules/sceneEnvironmentRules";
import { isTokenVisibleInFog } from "@shared/rules/fogVisibility";

import {
  persistAssetReference,
  persistAssetReferences,
} from "../assets/assetService";
import { prisma } from "../db/prisma";
import { withMapWriteLock } from "../maps/mapWriteLock";

import type { RoomState, Player } from "@shared/types/multiplayer";

import type { ChatMessage } from "@shared/types/chat";
import type { Token, TokenStandMode } from "@shared/types/token";
import type { MapSettings } from "@shared/types/map";
import type { MapAnnotation } from "@shared/types/annotation";
import type { TurnState } from "@shared/types/turn";

import {
  DEFAULT_MAP_SETTINGS,
  filterMapSettingsForPlayers,
  normalizeMapLayerConfig,
  normalizeMapSettings,
} from "@shared/rules/mapRules";
import {
  createDefaultAudioState,
  normalizeAudioState,
} from "@shared/rules/audioRules";
import { normalizeTokenSizeCells } from "@shared/rules/tokenRules";
import { ensureCampaignGmAccess } from "../maps/mapService";

export const rooms: Record<string, RoomState> = {};
export const chatMessages: Record<string, ChatMessage[]> = {};

export function createDefaultTurnState(): TurnState {
  return {
    active: false,
    entries: [],
    currentIndex: 0,
    round: 1,
  };
}

export function normalizeTurnState(value?: Partial<TurnState> | null): TurnState {
  const entries = Array.isArray(value?.entries) ? value.entries : [];
  const currentIndex =
    typeof value?.currentIndex === "number" && Number.isFinite(value.currentIndex)
      ? Math.max(0, Math.min(Math.floor(value.currentIndex), Math.max(0, entries.length - 1)))
      : 0;

  return {
    active: Boolean(value?.active),
    entries,
    currentIndex,
    round:
      typeof value?.round === "number" && Number.isFinite(value.round)
        ? Math.max(1, Math.floor(value.round))
        : 1,
  };
}

export function createRoomCode() {
  let code = "";

  do {
    code = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (rooms[code]);

  return code;
}

export function getRoom(code?: string) {
  if (!code) return null;

  const room = rooms[code] ?? rooms[code.toUpperCase()] ?? null;

  if (room) {
    room.turnState = normalizeTurnState(room.turnState);
    room.audioState = normalizeAudioState(room.audioState);
    room.annotations ??= {};
    room.activeEffects ??= [];
  }

  return room;
}

export function addOrUpdatePlayer(room: RoomState, player: Player) {
  const existingPlayer = room.players.find(
    (currentPlayer) => currentPlayer.id === player.id,
  );

  if (existingPlayer) {
    existingPlayer.name = player.name;
    existingPlayer.isGm = player.isGm;
    return;
  }

  room.players.push(player);
}

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
  statusJson: unknown; visionJson?: unknown; lightJson?: unknown; visibility?: unknown; isHidden?: unknown;
}) {
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
    ...tokenPerceptionFromDb(token),
  };
}

export async function getOrCreateActiveMap(campaignId: string) {
  const activeSession = await prisma.campaignSession.findFirst({
    where: {
      campaignId,
      status: "active",
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  if (activeSession?.activeMapId) {
    const activeMap = await prisma.map.findFirst({
      where: {
        id: activeSession.activeMapId,
        campaignId,
        isArchived: false,
        deletedAt: null,
      },
    });

    if (activeMap) {
      return activeMap;
    }
  }

  const existingMap = await prisma.map.findFirst({
    where: {
      campaignId,
      isArchived: false,
      deletedAt: null,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  if (existingMap) {
    if (activeSession) {
      await prisma.campaignSession.update({
        where: {
          id: activeSession.id,
        },
        data: {
          activeMapId: existingMap.id,
        },
      });
    }

    return existingMap;
  }

  const createdMap = await prisma.map.create({
    data: {
      campaignId,
      name: "Mapa inicial",
      width: DEFAULT_MAP_SETTINGS.widthCells,
      height: DEFAULT_MAP_SETTINGS.heightCells,
      cellSize: DEFAULT_MAP_SETTINGS.cellSize,
      backgroundImage: DEFAULT_MAP_SETTINGS.backgroundImage ?? null,
      layerConfigJson: toPrismaJson(DEFAULT_MAP_SETTINGS.layerConfig),
      sortOrder: 0,
    },
  });

  if (activeSession) {
    await prisma.campaignSession.update({
      where: {
        id: activeSession.id,
      },
      data: {
        activeMapId: createdMap.id,
      },
    });
  } else {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        ownerUserId: true,
      },
    });

    if (campaign) {
      await prisma.campaignSession.create({
        data: {
          campaignId,
          activeMapId: createdMap.id,
          createdByUserId: campaign.ownerUserId,
        },
      });
    }
  }

  return createdMap;
}

export async function getActiveMapIdForCampaign(campaignId: string) {
  const activeMap = await getOrCreateActiveMap(campaignId);

  return activeMap.id;
}

export async function loadRoomFromCampaign(campaignId: string) {
  const activeMap = await getOrCreateActiveMap(campaignId);

  const tokens = await prisma.mapToken.findMany({
    where: {
      mapId: activeMap.id,
      deletedAt: null,
    },
  });

  const clientTokens = Object.fromEntries(
    tokens.map((token) => [token.id, mapDbTokenToClientToken(token)]),
  );

  const room: RoomState = {
    code: campaignId,
    players: [],
    tokens: clientTokens,
    mapSettings: mapDbMapToMapSettings(activeMap),
    turnState: createDefaultTurnState(),
    audioState: createDefaultAudioState(),
    annotations: {},
    activeEffects: [],
  };

  rooms[campaignId] = room;

  if (!chatMessages[campaignId]) {
    chatMessages[campaignId] = [];
  }

  return room;
}

export async function reloadCampaignRoom(campaignId: string) {
  const existingPlayers = rooms[campaignId]?.players ?? [];
  const existingAnnotations = rooms[campaignId]?.annotations ?? {};
  const existingActiveEffects = rooms[campaignId]?.activeEffects ?? [];

  const room = await loadRoomFromCampaign(campaignId);

  room.players = existingPlayers;
  room.annotations = existingAnnotations;
  room.activeEffects = existingActiveEffects;
  rooms[campaignId] = room;

  return room;
}

export async function ensureCampaignRoom(campaignId: string) {
  if (rooms[campaignId]) {
    return rooms[campaignId];
  }

  return loadRoomFromCampaign(campaignId);
}

async function getCampaignRoomActiveMapId(roomCode: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: roomCode,
    },
    select: {
      id: true,
    },
  });

  if (!campaign) {
    return null;
  }

  return getActiveMapIdForCampaign(roomCode);
}

export function createTemporaryRoom(playerName: string, socketId: string) {
  const code = createRoomCode();

  const player: Player = {
    id: socketId,
    name: playerName,
    isGm: true,
  };

  rooms[code] = {
    code,
    players: [player],
    tokens: {},
    mapSettings: DEFAULT_MAP_SETTINGS,
    turnState: createDefaultTurnState(),
    audioState: createDefaultAudioState(),
    annotations: {},
    activeEffects: [],
  };

  chatMessages[code] = [];

  return rooms[code];
}

export function joinTemporaryRoom(input: {
  roomCode: string;
  playerName: string;
  socketId: string;
}) {
  const room = getRoom(input.roomCode);

  if (!room) {
    return null;
  }

  addOrUpdatePlayer(room, {
    id: input.socketId,
    name: input.playerName,
    isGm: false,
  });

  return room;
}

export async function persistTokenAdd(roomCode: string, token: Token) {
  const activeMapId = await getCampaignRoomActiveMapId(roomCode);

  if (!activeMapId) {
    return;
  }

  const image = await persistAssetReference(token.image);

  await prisma.mapToken.upsert({
    where: {
      id: token.id,
    },
    create: {
      id: token.id,
      mapId: activeMapId,
      characterId: token.characterId ?? null,
      name: token.name ?? null,
      image: image ?? null,
      x: token.x,
      y: token.y,
      widthCells: normalizeTokenSizeCells(token.widthCells),
      heightCells: normalizeTokenSizeCells(token.heightCells),
      elevation: token.elevation ?? 0,
      standMode: token.standMode ?? "auto",
      barsJson: {
        showHealthBar: token.showHealthBar ?? false,
      },
      statusJson: {
        conditions: token.conditions ?? [],
      },
    },
    update: {
      characterId: token.characterId ?? null,
      name: token.name ?? null,
      image: image ?? null,
      x: token.x,
      y: token.y,
      widthCells: normalizeTokenSizeCells(token.widthCells),
      heightCells: normalizeTokenSizeCells(token.heightCells),
      elevation: token.elevation ?? 0,
      standMode: token.standMode ?? "auto",
      barsJson: {
        showHealthBar: token.showHealthBar ?? false,
      },
      statusJson: {
        conditions: token.conditions ?? [],
      },
      deletedAt: null,
    },
  });
}
export async function createTokenFromCharacter(input: {
  campaignId: string;
  characterId: string;
  x?: number;
  y?: number;
}) {
  const activeMapId = await getCampaignRoomActiveMapId(input.campaignId);

  if (!activeMapId) {
    throw new Error("Mapa ativo não encontrado.");
  }

  const character = await prisma.character.findFirst({
    where: {
      id: input.characterId,
      campaignId: input.campaignId,
      archivedAt: null,
    },
  });

  if (!character) {
    throw new Error("Ficha não encontrada.");
  }

  const token = await prisma.mapToken.create({
    data: {
      mapId: activeMapId,
      characterId: character.id,
      name: character.name,
      image: character.defaultTokenImage ?? character.portraitImage ?? null,
      x: input.x ?? 0,
      y: input.y ?? 0,
      elevation: 0,
      standMode: "auto",
      barsJson: {
        showHealthBar: false,
      },
      statusJson: {
        conditions: [],
      },
    },
  });

  const clientToken: Token = {
    id: token.id,
    characterId: character.id,
    name: character.name,
    image: token.image ?? undefined,
    x: token.x,
    y: token.y,
    widthCells: normalizeTokenSizeCells(token.widthCells),
    heightCells: normalizeTokenSizeCells(token.heightCells),
    showHealthBar: false,
    conditions: [],
    elevation: token.elevation,
    standMode: normalizeTokenStandMode(token.standMode),
    ...tokenPerceptionFromDb(token),
  };

  const room = await ensureCampaignRoom(input.campaignId);

  room.tokens[clientToken.id] = clientToken;

  return {
    room,
    token: clientToken,
  };
}

export async function persistTokenMove(
  roomCode: string,
  tokenId: string,
  x: number,
  y: number,
) {
  const activeMapId = await getCampaignRoomActiveMapId(roomCode);

  if (!activeMapId) {
    return;
  }

  await prisma.mapToken.upsert({
    where: {
      id: tokenId,
    },
    create: {
      id: tokenId,
      mapId: activeMapId,
      x,
      y,
    },
    update: {
      x,
      y,
      deletedAt: null,
    },
  });
}

export async function persistTokenImage(
  roomCode: string,
  tokenId: string,
  image: string,
) {
  const activeMapId = await getCampaignRoomActiveMapId(roomCode);

  if (!activeMapId) {
    return;
  }

  const assetImage = await persistAssetReference(image);

  await prisma.mapToken.upsert({
    where: {
      id: tokenId,
    },
    create: {
      id: tokenId,
      mapId: activeMapId,
      x: 0,
      y: 0,
      image: assetImage ?? null,
    },
    update: {
      image: assetImage ?? null,
      deletedAt: null,
    },
  });
}

export async function persistTokenOverlay(input: {
  roomCode: string;
  tokenId: string;
  showHealthBar?: boolean;
  conditions?: Token["conditions"];
}) {
  const activeMapId = await getCampaignRoomActiveMapId(input.roomCode);

  if (!activeMapId) {
    return;
  }

  const token = rooms[input.roomCode]?.tokens[input.tokenId];

  await prisma.mapToken.updateMany({
    where: {
      id: input.tokenId,
      mapId: activeMapId,
      deletedAt: null,
    },
    data: {
      barsJson: {
        showHealthBar:
          input.showHealthBar ?? token?.showHealthBar ?? false,
      },
      statusJson: {
        conditions: input.conditions ?? token?.conditions ?? [],
      },
    },
  });
}

export async function persistTokenVisual(input: {
  roomCode: string;
  tokenId: string;
  elevation?: number;
  standMode?: TokenStandMode;
  widthCells?: number;
  heightCells?: number;
}) {
  const activeMapId = await getCampaignRoomActiveMapId(input.roomCode);

  if (!activeMapId) {
    return;
  }

  const token = rooms[input.roomCode]?.tokens[input.tokenId];

  await prisma.mapToken.updateMany({
    where: {
      id: input.tokenId,
      mapId: activeMapId,
      deletedAt: null,
    },
    data: {
      elevation: input.elevation ?? token?.elevation ?? 0,
      standMode: input.standMode ?? token?.standMode ?? "auto",
      widthCells: normalizeTokenSizeCells(
        input.widthCells ?? token?.widthCells,
      ),
      heightCells: normalizeTokenSizeCells(
        input.heightCells ?? token?.heightCells,
      ),
    },
  });
}
export async function persistTokenDelete(roomCode: string, tokenId: string) {
  const activeMapId = await getCampaignRoomActiveMapId(roomCode);

  if (!activeMapId) {
    return;
  }

  await prisma.mapToken.updateMany({
    where: {
      id: tokenId,
      mapId: activeMapId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
export async function persistMapSettings(
  roomCode: string,
  settings: MapSettings,
) {
  const activeMapId = await getCampaignRoomActiveMapId(roomCode);

  if (!activeMapId) {
    throw new Error("Nenhum mapa ativo.");
  }

  if (settings.mapId && settings.mapId !== activeMapId) throw new Error("O mapa ativo mudou. Recarregue antes de salvar.");
  return withMapWriteLock(activeMapId, async () => {
    const stored = await prisma.map.findUnique({ where: { id: activeMapId } });
    if (!stored) throw new Error("Mapa não encontrado.");
    const backgroundImage = await persistAssetReference(settings.backgroundImage);
    const layerConfig = {
      ...normalizeMapLayerConfig(await persistAssetReferences(settings.layerConfig)),
      scene3d: normalizeMapLayerConfig(stored.layerConfigJson).scene3d,
    };

    await prisma.map.update({
      where: { id: activeMapId },
      data: {
        name: settings.pageName,
        width: settings.widthCells,
        height: settings.heightCells,
        cellSize: settings.cellSize,
        backgroundImage: backgroundImage ?? null,
        layerConfigJson: toPrismaJson(layerConfig),
      },
    });
    return normalizeMapSettings({ ...settings, mapId: activeMapId, layerConfig });
  });
}

export function getRoomStateForPlayer(room: RoomState, isGm: boolean, socketId?: string): RoomState {
  if (isGm) {
    return room;
  }

  return playerView(room, socketId);
}

function filterAnnotationsForPlayer(annotations: Record<string, MapAnnotation>) {
  return Object.fromEntries(
    Object.entries(annotations).filter(
      ([, annotation]) => annotation.visibility !== "gm",
    ),
  );
}

export async function switchCampaignMap(input: {
  campaignId: string;
  mapId: string;
  userId: string;
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
  }

  const room = await reloadCampaignRoom(input.campaignId);

  return {
    map,
    room,
  };
}

export function createChatMessage(input: {
  roomCode: string;
  socketId: string;
  playerName: string;
  text: string;
}) {
  const message: ChatMessage = {
    id: randomUUID(),
    roomCode: input.roomCode,
    playerId: input.socketId,
    playerName: input.playerName,
    text: input.text,
    createdAt: Date.now(),
  };

  if (!chatMessages[input.roomCode]) {
    chatMessages[input.roomCode] = [];
  }

  chatMessages[input.roomCode].push(message);

  return message;
}

export function removeSocketFromRooms(socketId: string) {
  const changedRooms: RoomState[] = [];
  const removedTemporaryRooms: string[] = [];

  for (const room of Object.values(rooms)) {
    const previousLength = room.players.length;

    room.players = room.players.filter((player) => player.id !== socketId);

    if (room.players.length !== previousLength) {
      changedRooms.push(room);
    }

    const isTemporaryLobby = room.code.length === 6;

    if (room.players.length === 0 && isTemporaryLobby) {
      delete rooms[room.code];
      delete chatMessages[room.code];

      removedTemporaryRooms.push(room.code);
    }
  }

  return {
    changedRooms,
    removedTemporaryRooms,
  };
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
