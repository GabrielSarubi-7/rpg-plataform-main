import type { Server, Socket } from "socket.io";
import { randomUUID } from "crypto";

import {
  persistAssetReference,
  persistAssetReferences,
} from "../assets/assetService";
import { prisma } from "../db/prisma";
import { verifyAuthToken } from "../auth/jwt";
import { ensureCampaignAccess } from "../campaigns/campaignAccess";
import { ensureCampaignGmAccess } from "../maps/mapService";
import { getCampaignSystemDefinition } from "@shared/rules/systemRegistry";

import type {
  ActionUsedPayload,
  AddTokenPayload,
  AudioPlaybackSetPayload,
  AudioQueueClearPayload,
  AudioQueueReplacePayload,
  AudioTrackAddPayload,
  AudioTrackMovePayload,
  AudioTrackRemovePayload,
  AnnotationClearPayload,
  AnnotationRemovePayload,
  AnnotationUpsertPayload,
  CreateCharacterTokenPayload,
  CreateRoomPayload,
  DeleteCharacterLivePayload,
  DeleteTokenPayload,
  UseActionPayload,
  JoinCampaignLivePayload,
  JoinRoomPayload,
  MoveTokenPayload,
  UpdateCharacterLivePayload,
  Player,
  RoomState,
  TurnEntryMovePayload,
  TurnEntryRemovePayload,
  TurnEntryUpsertPayload,
  TurnNextPayload,
  TurnStartPayload,
  TurnStopPayload,
  UpdateMapSettingsPayload,
  UpdateTokenOverlayPayload,
  UpdateTokenImagePayload,
  UpdateTokenVisualPayload,
} from "@shared/types/multiplayer";

import type { ChatMessage, SendChatMessagePayload } from "@shared/types/chat";
import type { DiceRollAck, DiceRollRequest } from "@shared/types/dice";
import type { MapAnnotation } from "@shared/types/annotation";
import type { RoomActionEffect } from "@shared/types/multiplayer";
import type { Token } from "@shared/types/token";
import { getMapPixelSize, normalizeMapSettings } from "@shared/rules/mapRules";
import {
  clampTokenToMap,
  getTokenDimensions,
  normalizeTokenSizeCells,
} from "@shared/rules/tokenRules";
import {
  createAudioTrack,
  createDefaultAudioState,
  getNextAudioTrackId,
  normalizeAudioState,
} from "@shared/rules/audioRules";

import {
  buildCriticalDamageExpression,
  formatDiceResultText,
  rollDiceExpression,
} from "@shared/rules/diceRules";

import {
  addOrUpdatePlayer,
  chatMessages,
  createChatMessage,
  createDefaultTurnState,
  createTemporaryRoom,
  createTokenFromCharacter,
  ensureCampaignRoom,
  getRoom,
  getRoomStateForPlayer,
  joinTemporaryRoom,
  persistMapSettings,
  persistTokenAdd,
  persistTokenDelete,
  persistTokenImage,
  persistTokenMove,
  persistTokenOverlay,
  persistTokenVisual,
  removeSocketFromRooms,
  switchCampaignMap,
} from "./liveRoomService";

export function registerLiveSocketHandlers(io: Server, socket: Socket) {
  console.log("Conectado:", socket.id);

  socket.on(
    "campaign:join-live",
    async (payload: JoinCampaignLivePayload, callback) => {
      const campaignId = payload.campaignId?.trim();
      const playerName = payload.playerName?.trim();

      if (!campaignId || !playerName || !payload.authToken) {
        callback?.({
          ok: false,
          error: "Dados inválidos para entrar na campanha.",
        });
        return;
      }

      try {
        const authPayload = verifyAuthToken(payload.authToken);
        const member = await ensureCampaignAccess({
          campaignId,
          userId: authPayload.userId,
        });
        const room = await ensureCampaignRoom(campaignId);
        const isGm = member.role === "owner" || member.role === "gm";

        const player: Player = {
          id: socket.id,
          name: playerName,
          isGm,
        };

        addOrUpdatePlayer(room, player);

        socket.join(campaignId);

        callback?.({
          ok: true,
          room: getRoomStateForPlayer(room, isGm),
          playerId: socket.id,
        });

        socket.emit("chat:history", chatMessages[campaignId] ?? []);
        emitRoomState(io, room);

        console.log(`${playerName} entrou na campanha ${campaignId}`);
      } catch (error) {
        console.error(error);

        callback?.({
          ok: false,
          error: "Erro ao carregar campanha.",
        });
      }
    },
  );

  socket.on(
    "campaign:map:switch",
    async (
      payload: {
        campaignId: string;
        mapId: string;
        authToken?: string;
      },
      callback,
    ) => {
      const campaignId = payload.campaignId?.trim();
      const mapId = payload.mapId?.trim();

      if (!campaignId || !mapId || !payload.authToken) {
        callback?.({
          ok: false,
          error: "Dados inválidos para trocar mapa.",
        });
        return;
      }

      try {
        const authPayload = verifyAuthToken(payload.authToken);
        const result = await switchCampaignMap({
          campaignId,
          mapId,
          userId: authPayload.userId,
        });

        emitRoomState(io, result.room);

        callback?.({
          ok: true,
          room: result.room,
          map: result.map,
        });

        console.log(
          `Mapa ativo alterado na campanha ${campaignId}: ${result.map.name}`,
        );
      } catch (error) {
        console.error(error);

        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao trocar mapa.",
        });
      }
    },
  );

  socket.on(
    "character:updated",
    async (payload: UpdateCharacterLivePayload) => {
      const roomCode = payload.roomCode?.trim();
      const room = roomCode ? getRoom(roomCode) : null;

      if (!room || !payload.authToken || !isLiveCharacter(payload.character)) {
        return;
      }

      if (payload.character.campaignId !== room.code) {
        return;
      }

      try {
        const authPayload = verifyAuthToken(payload.authToken);

        await ensureCampaignAccess({
          campaignId: room.code,
          userId: authPayload.userId,
        });

        socket.to(room.code).emit("character:updated", payload.character);
      } catch (error) {
        console.error("Erro ao sincronizar ficha atualizada:", error);
      }
    },
  );

  socket.on(
    "character:deleted",
    async (payload: DeleteCharacterLivePayload) => {
      const roomCode = payload.roomCode?.trim();
      const room = roomCode ? getRoom(roomCode) : null;
      const characterId = payload.characterId?.trim();

      if (!room || !payload.authToken || !characterId) {
        return;
      }

      try {
        const authPayload = verifyAuthToken(payload.authToken);

        await ensureCampaignAccess({
          campaignId: room.code,
          userId: authPayload.userId,
        });

        socket.to(room.code).emit("character:deleted", {
          characterId,
        });
      } catch (error) {
        console.error("Erro ao sincronizar ficha deletada:", error);
      }
    },
  );

  socket.on(
    "character:token:create",
    async (payload: CreateCharacterTokenPayload, callback) => {
      const campaignId =
        typeof payload?.campaignId === "string" ? payload.campaignId.trim() : "";
      const characterId =
        typeof payload?.characterId === "string" ? payload.characterId.trim() : "";

      if (
        !campaignId ||
        !characterId ||
        typeof payload?.authToken !== "string" ||
        !payload.authToken.trim()
      ) {
        callback?.({
          ok: false,
          error: "Dados inválidos para criar token.",
        });
        return;
      }

      try {
        const authPayload = verifyAuthToken(payload.authToken);
        const member = await ensureCampaignAccess({
          campaignId,
          userId: authPayload.userId,
        });
        const character = await prisma.character.findFirst({
          where: {
            id: characterId,
            campaignId,
            archivedAt: null,
          },
          include: { permissions: true },
        });

        if (!character) {
          throw new Error("Ficha não encontrada.");
        }

        const canControl =
          member.role === "owner" ||
          member.role === "gm" ||
          character.ownerUserId === authPayload.userId ||
          character.createdByUserId === authPayload.userId ||
          character.permissions.some(
            (permission) =>
              permission.userId === authPayload.userId && permission.canControl,
          );

        if (!canControl) {
          throw new Error("Voce nao controla esta ficha.");
        }

        const result = await createTokenFromCharacter({
          campaignId,
          characterId,
          x: payload.x,
          y: payload.y,
        });

        emitRoomState(io, result.room);

        callback?.({
          ok: true,
          room: getRoomStateForSocket(result.room, socket.id),
          token: result.token,
        });
      } catch (error) {
        console.error(error);

        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao criar token.",
        });
      }
    },
  );

  socket.on("room:create", (payload: CreateRoomPayload, callback) => {
    const playerName = payload.playerName?.trim();

    if (!playerName) {
      callback?.({
        ok: false,
        error: "Nome inválido.",
      });
      return;
    }

    const room = createTemporaryRoom(playerName, socket.id);

    socket.join(room.code);

    callback?.({
      ok: true,
      room: getRoomStateForSocket(room, socket.id),
      playerId: socket.id,
    });

    socket.emit("chat:history", chatMessages[room.code] ?? []);
    emitRoomState(io, room);

    console.log(`Lobby criado: ${room.code} por ${playerName}`);
  });

  socket.on("room:join", (payload: JoinRoomPayload, callback) => {
    const roomCode = payload.roomCode?.trim().toUpperCase();
    const playerName = payload.playerName?.trim();

    if (!roomCode || !playerName) {
      callback?.({
        ok: false,
        error: "Dados inválidos.",
      });
      return;
    }

    const room = joinTemporaryRoom({
      roomCode,
      playerName,
      socketId: socket.id,
    });

    if (!room) {
      callback?.({
        ok: false,
        error: "Lobby não encontrado.",
      });
      return;
    }

    socket.join(room.code);

    callback?.({
      ok: true,
      room: getRoomStateForSocket(room, socket.id),
      playerId: socket.id,
    });

    socket.emit("chat:history", chatMessages[room.code] ?? []);
    emitRoomState(io, room);

    console.log(`${playerName} entrou no lobby ${room.code}`);
  });

  socket.on("token:add", async (payload: AddTokenPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    let canResizeToken = false;

    try {
      const context = await ensureCanControlToken(
        room,
        payload.token,
        payload.authToken,
        {
        respectTurn: false,
        },
      );

      canResizeToken =
        context.isGm && isSocketGmInTemporaryRoom(room, socket.id);
    } catch (error) {
      console.error("Token add negado:", error);
      return;
    }

    const tokenImage = await persistAssetReference(payload.token.image);
    const token: Token = {
      ...payload.token,
      image: tokenImage ?? undefined,
      widthCells: canResizeToken
        ? normalizeTokenSizeCells(payload.token.widthCells)
        : 1,
      heightCells: canResizeToken
        ? normalizeTokenSizeCells(payload.token.heightCells)
        : 1,
    };
    const mapSize = getMapPixelSize(room.mapSettings);
    const dimensions = getTokenDimensions(token, room.mapSettings.cellSize);
    const position = clampTokenToMap(
      token.x,
      token.y,
      mapSize.width,
      mapSize.height,
      dimensions.width,
      dimensions.height,
    );

    token.x = position.x;
    token.y = position.y;

    room.tokens[payload.token.id] = token;

    io.to(room.code).emit("token:added", token);

    try {
      await persistTokenAdd(room.code, token);
    } catch (error) {
      console.error("Erro ao persistir token:", error);
    }
  });

  socket.on("token:move", async (payload: MoveTokenPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    const token = room.tokens[payload.tokenId];
    if (!token) return;

    try {
      await ensureCanControlToken(room, token, payload.authToken, {
        respectTurn: true,
      });
    } catch (error) {
      console.error("Movimento de token negado:", error);
      return;
    }

    const mapSize = getMapPixelSize(room.mapSettings);
    const dimensions = getTokenDimensions(token, room.mapSettings.cellSize);
    const position = clampTokenToMap(
      payload.x,
      payload.y,
      mapSize.width,
      mapSize.height,
      dimensions.width,
      dimensions.height,
    );

    token.x = position.x;
    token.y = position.y;

    socket.to(room.code).emit("token:moved", {
      tokenId: payload.tokenId,
      x: position.x,
      y: position.y,
    });

    try {
      await persistTokenMove(
        room.code,
        payload.tokenId,
        position.x,
        position.y,
      );
    } catch (error) {
      console.error("Erro ao persistir movimento do token:", error);
    }
  });

  socket.on("token:image:update", async (payload: UpdateTokenImagePayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    const token = room.tokens[payload.tokenId];
    if (!token) return;

    try {
      await ensureCanControlToken(room, token, payload.authToken, {
        respectTurn: false,
      });
    } catch (error) {
      console.error("Atualizacao de imagem de token negada:", error);
      return;
    }

    const tokenImage = await persistAssetReference(payload.image);

    token.image = tokenImage ?? undefined;

    io.to(room.code).emit("token:updated", {
      tokenId: payload.tokenId,
      patch: {
        image: token.image,
      } satisfies Partial<Token>,
    });

    try {
      await persistTokenImage(room.code, payload.tokenId, tokenImage ?? "");
    } catch (error) {
      console.error("Erro ao persistir imagem do token:", error);
    }
  });

  socket.on(
    "token:overlay:update",
    async (payload: UpdateTokenOverlayPayload) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      const token = room.tokens[payload.tokenId];
      if (!token) return;

      try {
        await ensureCanControlToken(room, token, payload.authToken, {
          respectTurn: true,
        });
      } catch (error) {
        console.error("Overlay de token negado:", error);
        return;
      }

      if (payload.showHealthBar !== undefined) {
        token.showHealthBar = payload.showHealthBar;
      }

      if (payload.conditions !== undefined) {
        token.conditions = payload.conditions;
      }

      io.to(room.code).emit("token:updated", {
        tokenId: payload.tokenId,
        patch: {
          showHealthBar: token.showHealthBar,
          conditions: token.conditions,
        } satisfies Partial<Token>,
      });

      try {
        await persistTokenOverlay({
          roomCode: room.code,
          tokenId: payload.tokenId,
          showHealthBar: payload.showHealthBar,
          conditions: payload.conditions,
        });
      } catch (error) {
        console.error("Erro ao persistir overlays do token:", error);
      }
    },
  );

  socket.on(
    "token:visual:update",
    async (payload: UpdateTokenVisualPayload) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      const token = room.tokens[payload.tokenId];
      if (!token) return;

      let canResizeToken = false;

      try {
        const context = await ensureCanControlToken(
          room,
          token,
          payload.authToken,
          {
          respectTurn: true,
          },
        );

        canResizeToken =
          context.isGm && isSocketGmInTemporaryRoom(room, socket.id);
      } catch (error) {
        console.error("Visual de token negado:", error);
        return;
      }

      const requestsResize =
        payload.widthCells !== undefined || payload.heightCells !== undefined;

      if (requestsResize && !canResizeToken) {
        console.error("Redimensionamento de token negado: apenas o GM.");
        return;
      }

      if (payload.elevation !== undefined) {
        token.elevation = Math.max(0, Math.min(300, payload.elevation));
      }

      if (payload.standMode !== undefined) {
        token.standMode =
          payload.standMode === "flat" || payload.standMode === "billboard"
            ? payload.standMode
            : "auto";
      }

      if (requestsResize) {
        token.widthCells = normalizeTokenSizeCells(
          payload.widthCells ?? token.widthCells,
        );
        token.heightCells = normalizeTokenSizeCells(
          payload.heightCells ?? token.heightCells,
        );

        const mapSize = getMapPixelSize(room.mapSettings);
        const dimensions = getTokenDimensions(
          token,
          room.mapSettings.cellSize,
        );
        const position = clampTokenToMap(
          token.x,
          token.y,
          mapSize.width,
          mapSize.height,
          dimensions.width,
          dimensions.height,
        );

        token.x = position.x;
        token.y = position.y;
      }

      io.to(room.code).emit("token:updated", {
        tokenId: payload.tokenId,
        patch: {
          x: token.x,
          y: token.y,
          elevation: token.elevation,
          standMode: token.standMode,
          widthCells: token.widthCells,
          heightCells: token.heightCells,
        } satisfies Partial<Token>,
      });

      try {
        await persistTokenVisual({
          roomCode: room.code,
          tokenId: payload.tokenId,
          elevation: token.elevation,
          standMode: token.standMode,
          widthCells: token.widthCells,
          heightCells: token.heightCells,
        });

        if (requestsResize) {
          await persistTokenMove(room.code, payload.tokenId, token.x, token.y);
        }
      } catch (error) {
        console.error("Erro ao persistir visual 2.5D do token:", error);
      }
    },
  );

  socket.on("token:delete", async (payload: DeleteTokenPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    const token = room.tokens[payload.tokenId];
    if (!token) return;

    try {
      await ensureCanControlToken(room, token, payload.authToken, {
        respectTurn: true,
      });
    } catch (error) {
      console.error("Remocao de token negada:", error);
      return;
    }

    delete room.tokens[payload.tokenId];

    io.to(room.code).emit("token:deleted", {
      tokenId: payload.tokenId,
    });

    try {
      await persistTokenDelete(room.code, payload.tokenId);
    } catch (error) {
      console.error("Erro ao deletar token:", error);
    }
  });

  socket.on("action:use", async (payload: UseActionPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    const casterToken = room.tokens[payload.casterTokenId];
    if (!casterToken) return;
    if (casterToken.characterId !== payload.characterId) return;

    let actorContext: Awaited<ReturnType<typeof ensureCanControlToken>>;

    try {
      actorContext = await ensureCanControlToken(room, casterToken, payload.authToken, {
        respectTurn: true,
      });
    } catch (error) {
      console.error("Uso de acao negado:", error);
      return;
    }

    const player = room.players.find(
      (currentPlayer) => currentPlayer.id === socket.id,
    );

    const affectedNames = (payload.targeting.affectedTokenIds ?? [])
      .map((tokenId) => room.tokens[tokenId]?.name)
      .filter((name): name is string => Boolean(name));

    const displayName = casterToken.name ?? player?.name ?? "Jogador";
    const resolvedRolls = {
      attackExpression:
        payload.rolls?.attackExpression ??
        (payload.action.roll.mode === "attack_roll" ? "1d20" : undefined),
      damageExpression:
        payload.rolls?.damageExpression ?? payload.action.roll.damage,
      criticalDamageExpression:
        payload.rolls?.criticalDamageExpression ??
        (payload.action.roll.criticalDamage
          ? payload.action.roll.criticalDamage
          : payload.rolls?.damageExpression
            ? buildCriticalDamageExpression(payload.rolls.damageExpression)
          : payload.action.roll.damage
            ? buildCriticalDamageExpression(payload.action.roll.damage)
            : undefined),
      healingExpression:
        payload.rolls?.healingExpression ?? payload.action.roll.healing,
      saveDc: payload.rolls?.saveDc ?? payload.action.roll.saveDc,
    };
    const textParts = [`${displayName} usou ${payload.action.name}.`];

    if (payload.action.description?.trim()) {
      textParts.push(payload.action.description.trim());
    }

    if (affectedNames.length > 0) {
      textParts.push(`Alvos afetados: ${affectedNames.join(", ")}.`);
    }

    if (payload.action.roll.saveAbility) {
      textParts.push(
        `Salvaguarda: ${formatAbility(payload.action.roll.saveAbility)}${
          resolvedRolls.saveDc ? ` CD ${resolvedRolls.saveDc}` : ""
        }.`,
      );
    }

    if (resolvedRolls.attackExpression) {
      textParts.push(`Acerto: ${resolvedRolls.attackExpression}.`);
    }

    if (resolvedRolls.damageExpression) {
      textParts.push(
        `Dano: ${resolvedRolls.damageExpression}${
          payload.action.roll.damageType
            ? ` ${payload.action.roll.damageType}`
            : ""
        }.`,
      );
    }

    const message = createChatMessage({
      roomCode: room.code,
      socketId: socket.id,
      playerName: player?.name ?? "Jogador",
      text: textParts.join(" "),
    });

    io.to(room.code).emit("chat:message", message);
    io.to(room.code).emit("action:used", {
      useId: payload.useId,
      roomCode: payload.roomCode,
      action: payload.action,
      casterTokenId: payload.casterTokenId,
      characterId: payload.characterId,
      targeting: payload.targeting,
      rolls: payload.rolls,
      color: payload.color,
      usedAt: Date.now(),
      previewDurationMs: 3200,
    } satisfies ActionUsedPayload);

    let roomStateChanged = false;

    const effectDuration = normalizeActionEffectDuration(
      payload.action.persistentEffect,
    );

    if (effectDuration > 0) {
      room.activeEffects = [
        ...(room.activeEffects ?? []),
        createRoomActionEffect(payload, effectDuration),
      ].slice(-64);
      roomStateChanged = true;
    }

    const summonCharacterId = getSummonCharacterId(payload.action.summon);

    if (summonCharacterId) {
      try {
        await ensureCanUseSummonCharacter({
          room,
          characterId: summonCharacterId,
          context: actorContext,
        });

        const summonPosition = getSummonTokenPosition(room, payload);
        const result = await createTokenFromCharacter({
          campaignId: room.code,
          characterId: summonCharacterId,
          x: summonPosition.x,
          y: summonPosition.y,
        });

        room.tokens[result.token.id] = result.token;
        roomStateChanged = true;
      } catch (error) {
        console.error("Invocacao negada:", error);
      }
    }

    if (roomStateChanged) {
      emitRoomState(io, room);
    }

    if (resolvedRolls.attackExpression) {
      emitActionDiceMessage({
        io,
        roomCode: room.code,
        socketId: socket.id,
        playerName: displayName,
        expression: resolvedRolls.attackExpression,
        label: `Acerto: ${payload.action.name}`,
        color: payload.color,
        followUp: resolvedRolls.damageExpression
          ? {
              kind: "damage",
              actionName: payload.action.name,
              normalExpression: resolvedRolls.damageExpression,
              criticalExpression: resolvedRolls.criticalDamageExpression,
              damageType: payload.action.roll.damageType,
            }
          : undefined,
      });
    }

    let damageResult: ReturnType<typeof rollDiceExpression> | null = null;

    if (
      resolvedRolls.damageExpression &&
      payload.action.roll.mode !== "attack_roll"
    ) {
      damageResult = emitActionDiceMessage({
        io,
        roomCode: room.code,
        socketId: socket.id,
        playerName: displayName,
        expression: resolvedRolls.damageExpression,
        label: `Dano: ${payload.action.name}`,
        color: payload.color,
      });
    }

    if (resolvedRolls.healingExpression) {
      emitActionDiceMessage({
        io,
        roomCode: room.code,
        socketId: socket.id,
        playerName: displayName,
        expression: resolvedRolls.healingExpression,
        label: `Cura: ${payload.action.name}`,
        color: payload.color,
      });
    }

    if (
      payload.action.roll.mode === "saving_throw" &&
      payload.action.roll.saveAbility &&
      resolvedRolls.saveDc
    ) {
      try {
        await resolveAutomaticSavingThrows({
          io,
          roomCode: room.code,
          roomTokens: room.tokens,
          affectedTokenIds: payload.targeting.affectedTokenIds ?? [],
          saveAbility: payload.action.roll.saveAbility,
          saveDc: resolvedRolls.saveDc,
          actionName: payload.action.name,
          damageResult,
          damageType: payload.action.roll.damageType,
          halfOnSuccess: payload.action.roll.halfOnSuccess ?? false,
        });
      } catch (error) {
        console.error("Erro ao resolver salvaguardas automáticas:", error);
      }
    }
  });

    socket.on("chat:send", (payload: SendChatMessagePayload) => {
    const roomCode = payload.roomCode?.trim();
    const text = payload.text?.trim();

    if (!roomCode || !text) return;

    const room = getRoom(roomCode);
    if (!room) return;

    const player = room.players.find(
      (currentPlayer) => currentPlayer.id === socket.id,
    );

    const message = createChatMessage({
      roomCode: room.code,
      socketId: socket.id,
      playerName: player?.name ?? payload.playerName ?? "Jogador",
      text,
    });

    io.to(room.code).emit("chat:message", message);
  });

  socket.on(
    "dice:roll",
    (payload: DiceRollRequest, callback?: (response: DiceRollAck) => void) => {
    const roomCode = payload.roomCode?.trim();
    const room = getRoom(roomCode);

    if (!room || !roomCode) return;

    const player = room.players.find(
      (currentPlayer) => currentPlayer.id === socket.id,
    );

    try {
      const isPrivateGmRoll = Boolean(payload.isGmRoll && player?.isGm);
      const result = rollDiceExpression(payload.expression, isPrivateGmRoll);

      const playerName = player?.name ?? payload.playerName ?? "Jogador";
      const displayName = payload.characterName?.trim() || playerName;

      const message: ChatMessage = {
        id: randomUUID(),
        roomCode: room.code,
        playerId: socket.id,
        playerName: displayName,
        text: formatDiceResultText(displayName, result, payload.label),
        createdAt: Date.now(),
        type: "dice",
        dice: result,
        followUp: payload.followUp,
        color: normalizeOptionalColor(payload.color),
      };

      if (!chatMessages[room.code]) {
        chatMessages[room.code] = [];
      }

      if (isPrivateGmRoll) {
        socket.emit("chat:message", message);
      } else {
        chatMessages[room.code].push(message);
        io.to(room.code).emit("chat:message", message);
      }
      callback?.({
        ok: true,
        result,
      });
    } catch {
      socket.emit("chat:message", {
        id: randomUUID(),
        roomCode: room.code,
        playerId: "system",
        playerName: "Sistema",
        text: "Expressão de dado inválida.",
        createdAt: Date.now(),
      } satisfies ChatMessage);
      callback?.({
        ok: false,
        error: "Expressão de dado inválida.",
      });
    }
  });

  socket.on(
    "map:settings:update",
    async (
      payload: UpdateMapSettingsPayload,
      callback?: (response: { ok: boolean; error?: string }) => void,
    ) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      const isTemporaryLobby = room.code.length === 6;

      try {
        if (isTemporaryLobby) {
          const player = room.players.find(
            (currentPlayer) => currentPlayer.id === socket.id,
          );

          if (!player?.isGm) {
            throw new Error("Apenas o GM pode alterar o mapa.");
          }
        } else {
          if (!payload.authToken) {
            throw new Error("Apenas o GM pode alterar o mapa ao vivo.");
          }

          const authPayload = verifyAuthToken(payload.authToken);

          await ensureCampaignGmAccess({
            campaignId: room.code,
            userId: authPayload.userId,
          });
        }

        const backgroundImage = await persistAssetReference(
          payload.settings.backgroundImage,
        );
        const layerConfig = await persistAssetReferences(
          payload.settings.layerConfig,
        );
        const settings = normalizeMapSettings({
          ...payload.settings,
          backgroundImage: backgroundImage ?? undefined,
          layerConfig,
        });

        if (!isTemporaryLobby) {
          await persistMapSettings(room.code, settings);
        }

        room.mapSettings = settings;

        emitRoomState(io, room);

        callback?.({
          ok: true,
        });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "Erro ao persistir configuracoes do mapa.",
        });

        console.error("Erro ao persistir configurações do mapa:", error);
      }
    },
  );

  socket.on("annotation:upsert", async (payload: AnnotationUpsertPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      const player = room.players.find(
        (currentPlayer) => currentPlayer.id === socket.id,
      );
      if (!player) return;

      const annotation = normalizeLiveAnnotation(payload.annotation, socket.id);

      if (annotation.visibility === "gm") {
        await ensureCanManageAnnotations(room, payload.authToken, socket.id);
      }

      room.annotations[annotation.id] = annotation;
      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao sincronizar anotacao:", error);
    }
  });

  socket.on("annotation:remove", async (payload: AnnotationRemovePayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageAnnotations(room, payload.authToken, socket.id);

      delete room.annotations[payload.annotationId];
      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao remover anotacao:", error);
    }
  });

  socket.on("annotation:clear", async (payload: AnnotationClearPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageAnnotations(room, payload.authToken, socket.id);

      room.annotations = {};
      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao limpar anotacoes:", error);
    }
  });

  socket.on("turn:start", async (payload: TurnStartPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageTurns(room.code, payload.authToken);

      room.turnState = {
        ...room.turnState,
        active: true,
        currentIndex: Math.min(
          room.turnState.currentIndex,
          Math.max(0, room.turnState.entries.length - 1),
        ),
        round: room.turnState.round || 1,
      };

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao iniciar turnos:", error);
    }
  });

  socket.on("turn:stop", async (payload: TurnStopPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageTurns(room.code, payload.authToken);

      room.turnState = createDefaultTurnState();

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao encerrar turnos:", error);
    }
  });

  socket.on("turn:entry:upsert", async (payload: TurnEntryUpsertPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    const token = room.tokens[payload.entry.tokenId];
    if (!token) return;

    try {
      await ensureCanControlToken(room, token, payload.authToken, {
        respectTurn: false,
      });

      upsertTurnEntry(room, token, payload.entry.initiative);

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao atualizar iniciativa:", error);
    }
  });

  socket.on("turn:entry:remove", async (payload: TurnEntryRemovePayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageTurns(room.code, payload.authToken);

      const currentTokenId =
        room.turnState.entries[room.turnState.currentIndex]?.tokenId ?? null;
      const entries = room.turnState.entries.filter(
        (entry) => entry.tokenId !== payload.tokenId,
      );

      room.turnState.entries = rebuildTurnOrders(entries);
      room.turnState.currentIndex = getNextCurrentIndex(
        room.turnState.entries,
        currentTokenId,
      );

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao remover turno:", error);
    }
  });

  socket.on("turn:entry:move", async (payload: TurnEntryMovePayload) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageTurns(room.code, payload.authToken);

      const currentIndex = room.turnState.entries.findIndex(
        (entry) => entry.tokenId === payload.tokenId,
      );

      if (currentIndex < 0) return;

      if (room.turnState.entries.length <= 1) {
        return;
      }

      const nextIndex =
        (currentIndex + payload.direction + room.turnState.entries.length) %
        room.turnState.entries.length;

      const currentTurnTokenId =
        room.turnState.entries[room.turnState.currentIndex]?.tokenId ?? null;
      const entries = [...room.turnState.entries];
      const [entry] = entries.splice(currentIndex, 1);

      entries.splice(nextIndex, 0, entry);

      room.turnState.entries = rebuildTurnOrders(entries);
      room.turnState.currentIndex = getNextCurrentIndex(
        room.turnState.entries,
        currentTurnTokenId,
      );

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao mover turno:", error);
    }
  });

  socket.on("turn:next", async (payload: TurnNextPayload) => {
    const room = getRoom(payload.roomCode);
    if (!room || !room.turnState.active) return;

    try {
      const context = await getRoomAuthContext(room.code, payload.authToken);
      const currentEntry = room.turnState.entries[room.turnState.currentIndex];

      if (!context.isGm && currentEntry) {
        const token = room.tokens[currentEntry.tokenId];

        if (!token) return;

        await ensureCanControlToken(room, token, payload.authToken, {
          respectTurn: true,
        });
      }

      advanceTurn(room);
      tickRoomActionEffects(room);

      emitRoomState(io, room);
    } catch (error) {
      console.error("Erro ao passar turno:", error);
    }
  });

  socket.on("audio:track:add", async (payload: AudioTrackAddPayload, callback) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanUseAudioQueue(room, socket.id, payload.authToken);

      room.audioState = normalizeAudioState(room.audioState);

      const player = room.players.find(
        (currentPlayer) => currentPlayer.id === socket.id,
      );
      const track = createAudioTrack(payload.track, {
        playerId: socket.id,
        name: player?.name,
      });
      const wasEmpty = room.audioState.queue.length === 0;

      room.audioState.queue = [...room.audioState.queue, track];

      if (wasEmpty || !room.audioState.currentTrackId) {
        room.audioState.currentTrackId = track.id;
        room.audioState.isPlaying = true;
      }

      room.audioState.updatedAt = Date.now();

      emitRoomState(io, room);

      callback?.({
        ok: true,
        track,
      });
    } catch (error) {
      callback?.({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao adicionar audio.",
      });
      console.error("Erro ao adicionar audio:", error);
    }
  });

  socket.on(
    "audio:track:remove",
    async (payload: AudioTrackRemovePayload, callback) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      try {
        await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

        room.audioState = normalizeAudioState(room.audioState);

        const removedCurrent =
          room.audioState.currentTrackId === payload.trackId;
        room.audioState.queue = room.audioState.queue.filter(
          (track) => track.id !== payload.trackId,
        );

        if (removedCurrent) {
          room.audioState.currentTrackId = room.audioState.queue[0]?.id ?? null;
          room.audioState.isPlaying = Boolean(room.audioState.currentTrackId);
        }

        room.audioState.updatedAt = Date.now();

        emitRoomState(io, room);
        callback?.({ ok: true });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao remover audio.",
        });
        console.error("Erro ao remover audio:", error);
      }
    },
  );

  socket.on(
    "audio:track:move",
    async (payload: AudioTrackMovePayload, callback) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      try {
        await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

        room.audioState = normalizeAudioState(room.audioState);

        const currentIndex = room.audioState.queue.findIndex(
          (track) => track.id === payload.trackId,
        );

        if (currentIndex < 0 || room.audioState.queue.length <= 1) {
          callback?.({ ok: true });
          return;
        }

        const nextIndex =
          (currentIndex + payload.direction + room.audioState.queue.length) %
          room.audioState.queue.length;
        const queue = [...room.audioState.queue];
        const [track] = queue.splice(currentIndex, 1);

        queue.splice(nextIndex, 0, track);

        room.audioState.queue = queue;
        room.audioState.updatedAt = Date.now();

        emitRoomState(io, room);
        callback?.({ ok: true });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao mover audio.",
        });
        console.error("Erro ao mover audio:", error);
      }
    },
  );

  socket.on(
    "audio:queue:replace",
    async (payload: AudioQueueReplacePayload, callback) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      try {
        await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

        const player = room.players.find(
          (currentPlayer) => currentPlayer.id === socket.id,
        );
        const queue = payload.tracks
          .slice(0, 80)
          .map((track) =>
            createAudioTrack(track, {
              playerId: socket.id,
              name: player?.name,
            }),
          );

        room.audioState = {
          queue,
          currentTrackId: queue[0]?.id ?? null,
          isPlaying: queue.length > 0,
          updatedAt: Date.now(),
        };

        emitRoomState(io, room);
        callback?.({ ok: true });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao substituir fila.",
        });
        console.error("Erro ao substituir fila de audio:", error);
      }
    },
  );

  socket.on(
    "audio:queue:clear",
    async (payload: AudioQueueClearPayload, callback) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      try {
        await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

        room.audioState = createDefaultAudioState();

        emitRoomState(io, room);
        callback?.({ ok: true });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao limpar fila.",
        });
        console.error("Erro ao limpar fila de audio:", error);
      }
    },
  );

  socket.on(
    "audio:playback:set",
    async (payload: AudioPlaybackSetPayload, callback) => {
      const room = getRoom(payload.roomCode);
      if (!room) return;

      try {
        await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

        room.audioState = normalizeAudioState(room.audioState);

        if (
          payload.currentTrackId !== undefined &&
          (payload.currentTrackId === null ||
            room.audioState.queue.some(
              (track) => track.id === payload.currentTrackId,
            ))
        ) {
          room.audioState.currentTrackId = payload.currentTrackId;
        }

        if (payload.isPlaying !== undefined) {
          room.audioState.isPlaying = Boolean(
            payload.isPlaying && room.audioState.currentTrackId,
          );
        }

        room.audioState.updatedAt = Date.now();

        emitRoomState(io, room);
        callback?.({ ok: true });
      } catch (error) {
        callback?.({
          ok: false,
          error:
            error instanceof Error ? error.message : "Erro ao controlar audio.",
        });
        console.error("Erro ao controlar audio:", error);
      }
    },
  );

  socket.on("audio:next", async (payload: AudioQueueClearPayload, callback) => {
    const room = getRoom(payload.roomCode);
    if (!room) return;

    try {
      await ensureCanManageAudioQueue(room, socket.id, payload.authToken);

      room.audioState = normalizeAudioState(room.audioState);
      room.audioState.currentTrackId = getNextAudioTrackId(room.audioState);
      room.audioState.isPlaying = Boolean(room.audioState.currentTrackId);
      room.audioState.updatedAt = Date.now();

      emitRoomState(io, room);
      callback?.({ ok: true });
    } catch (error) {
      callback?.({
        ok: false,
        error:
          error instanceof Error ? error.message : "Erro ao avancar audio.",
      });
      console.error("Erro ao avancar audio:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Desconectado:", socket.id);

    const result = removeSocketFromRooms(socket.id);

    for (const room of result.changedRooms) {
      emitRoomState(io, room);
    }

    for (const roomCode of result.removedTemporaryRooms) {
      console.log(`Lobby removido: ${roomCode}`);
    }
  });
}

function emitRoomState(io: Server, room: RoomState) {
  for (const player of room.players) {
    io.to(player.id).emit(
      "room:state",
      getRoomStateForPlayer(room, Boolean(player.isGm)),
    );
  }
}

function getRoomStateForSocket(room: RoomState, socketId: string) {
  const player = room.players.find(
    (currentPlayer) => currentPlayer.id === socketId,
  );

  return getRoomStateForPlayer(room, Boolean(player?.isGm));
}

async function ensureCanManageAnnotations(
  room: RoomState,
  authToken: string | undefined,
  socketId: string,
) {
  const player = room.players.find((currentPlayer) => currentPlayer.id === socketId);

  if (player?.isGm) {
    return;
  }

  const context = await getRoomAuthContext(room.code, authToken);

  if (!context.isGm) {
    throw new Error("Apenas o GM pode gerenciar anotacoes privadas.");
  }
}

function normalizeLiveAnnotation(
  annotation: MapAnnotation,
  socketId: string,
): MapAnnotation {
  const id =
    typeof annotation.id === "string" && annotation.id.trim()
      ? annotation.id.trim().slice(0, 80)
      : randomUUID();
  const visibility = annotation.visibility === "gm" ? "gm" : "public";

  if (annotation.type === "text") {
    return {
      id,
      type: "text",
      visibility,
      createdBy: annotation.createdBy ?? socketId,
      x: normalizeFinite(annotation.x, 0, -100000, 100000),
      y: normalizeFinite(annotation.y, 0, -100000, 100000),
      text: String(annotation.text ?? "").slice(0, 500),
      color: normalizeColor(annotation.color),
      fontSize: normalizeFinite(annotation.fontSize, 18, 8, 72),
    };
  }

  return {
    id,
    type: "pen",
    visibility,
    createdBy: annotation.createdBy ?? socketId,
    color: normalizeColor(annotation.color),
    size: normalizeFinite(annotation.size, 4, 1, 18),
    points: Array.isArray(annotation.points)
      ? annotation.points.slice(-900).map((point) => ({
          x: normalizeFinite(point.x, 0, -100000, 100000),
          y: normalizeFinite(point.y, 0, -100000, 100000),
        }))
      : [],
  };
}

function normalizeColor(value: unknown) {
  const color = typeof value === "string" ? value : "#f4d35e";

  return /^#[0-9a-f]{6}$/i.test(color) ? color : "#f4d35e";
}

function normalizeOptionalColor(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const color = value.trim();

  return /^#[0-9a-f]{6}$/i.test(color) ? color : undefined;
}

function normalizeFinite(value: unknown, fallback: number, min: number, max: number) {
  const number = typeof value === "number" && Number.isFinite(value) ? value : fallback;

  return Math.max(min, Math.min(max, number));
}

function formatAbility(ability: string) {
  switch (ability) {
    case "strength":
      return "Força";
    case "dexterity":
      return "Destreza";
    case "constitution":
      return "Constituição";
    case "intelligence":
      return "Inteligência";
    case "wisdom":
      return "Sabedoria";
    case "charisma":
      return "Carisma";
    default:
      return ability;
  }
}

function emitActionDiceMessage(input: {
  io: Server;
  roomCode: string;
  socketId: string;
  playerName: string;
  expression: string;
  label: string;
  followUp?: ChatMessage["followUp"];
  color?: string;
}) {
  try {
    const result = rollDiceExpression(input.expression, false);

    const message: ChatMessage = {
      id: randomUUID(),
      roomCode: input.roomCode,
      playerId: input.socketId,
      playerName: input.playerName,
      text: formatDiceResultText(input.playerName, result, input.label),
      createdAt: Date.now(),
      type: "dice",
      dice: result,
      followUp: input.followUp,
      color: normalizeOptionalColor(input.color),
    };

    if (!chatMessages[input.roomCode]) {
      chatMessages[input.roomCode] = [];
    }

    chatMessages[input.roomCode].push(message);
    input.io.to(input.roomCode).emit("chat:message", message);
    return result;
  } catch {
    const message = createChatMessage({
      roomCode: input.roomCode,
      socketId: "system",
      playerName: "Sistema",
      text: `Não foi possível rolar ${input.label}: expressão inválida.`,
    });

    input.io.to(input.roomCode).emit("chat:message", message);
    return null;
  }
}

async function resolveAutomaticSavingThrows(input: {
  io: Server;
  roomCode: string;
  roomTokens: Record<string, Token>;
  affectedTokenIds: string[];
  saveAbility: string;
  saveDc: number;
  actionName: string;
  damageResult: ReturnType<typeof rollDiceExpression> | null;
  damageType?: string;
  halfOnSuccess: boolean;
}) {
  const affectedTokens = input.affectedTokenIds
    .map((tokenId) => input.roomTokens[tokenId])
    .filter((token): token is Token => Boolean(token));

  const characterIds = affectedTokens
    .map((token) => token.characterId)
    .filter((characterId): characterId is string => Boolean(characterId));

  const characters =
    characterIds.length > 0
      ? await prisma.character.findMany({
          where: {
            id: {
              in: characterIds,
            },
            archivedAt: null,
          },
          include: {
            sheet: true,
          },
        })
      : [];

  const characterById = new Map(
    characters.map((character) => [character.id, character]),
  );

  const saveResults: {
    tokenName: string;
    total: number;
    success: boolean;
  }[] = [];
  const skippedTokenNames: string[] = [];

  for (const token of affectedTokens) {
    const character = token.characterId
      ? characterById.get(token.characterId)
      : null;

    if (!character?.sheet) {
      skippedTokenNames.push(token.name ?? "Token sem ficha");
      continue;
    }

    const saveBonus = getCharacterSavingThrowBonus(
      character.sheet.dataJson,
      input.saveAbility,
    );

    const result = emitActionDiceMessage({
      io: input.io,
      roomCode: input.roomCode,
      socketId: token.id,
      playerName: token.name ?? character.name,
      expression: formatModifierExpression(saveBonus),
      label: `Salvaguarda de ${formatAbility(input.saveAbility)}: ${input.actionName}`,
    });

    if (!result) {
      continue;
    }

    saveResults.push({
      tokenName: token.name ?? character.name,
      total: result.total,
      success: result.total >= input.saveDc,
    });
  }

  if (saveResults.length === 0 && skippedTokenNames.length === 0) {
    return;
  }

  const summaryParts = [
    `Salvaguardas automáticas de ${formatAbility(input.saveAbility)} CD ${input.saveDc} para ${input.actionName}:`,
  ];

  if (saveResults.length > 0) {
    summaryParts.push(
      saveResults
        .map(
          (result) =>
            `${result.tokenName} ${
              result.success ? "passou" : "falhou"
            } (${result.total})`,
        )
        .join("; ") + ".",
    );
  }

  if (input.damageResult) {
    const damageText = `${input.damageResult.total}${
      input.damageType ? ` ${input.damageType}` : ""
    }`;

    if (input.halfOnSuccess) {
      summaryParts.push(
        `Dano: ${damageText}; quem passou recebe metade (${Math.floor(
          input.damageResult.total / 2,
        )}).`,
      );
    } else {
      summaryParts.push(`Dano: ${damageText}.`);
    }
  }

  if (skippedTokenNames.length > 0) {
    summaryParts.push(
      `Sem ficha vinculada para rolar automaticamente: ${skippedTokenNames.join(
        ", ",
      )}.`,
    );
  }

  const summary = createChatMessage({
    roomCode: input.roomCode,
    socketId: "system",
    playerName: "Sistema",
    text: summaryParts.join(" "),
  });

  input.io.to(input.roomCode).emit("chat:message", summary);
}

function getCharacterSavingThrowBonus(dataJson: unknown, ability: string) {
  const data = asRecord(dataJson);
  const system = getCampaignSystemDefinition(data.system);
  const systemData = asRecord(data[system.sheet.dataKey]);
  const sheetData = Object.keys(systemData).length > 0
    ? systemData
    : asRecord(data.dnd5e);
  const abilities = asRecord(sheetData.abilities);
  const abilityData = asRecord(abilities[ability]);
  const savingThrows = asRecord(sheetData.savingThrows);
  const saveData = asRecord(savingThrows[ability]);

  const score = getNumber(abilityData.score, 10);
  const proficiencyBonus = getNumber(sheetData.proficiencyBonus, 2);
  const proficient = getBoolean(saveData.proficient, false);
  const manualBonus = getNumber(saveData.bonus, 0);
  const abilityModifier =
    system.rules.abilityScoreMode === "flat_value" ||
    system.rules.abilityScoreMode === "dice_pool"
      ? score
      : Math.floor((score - 10) / 2);

  return (
    abilityModifier +
    (proficient ? proficiencyBonus : 0) +
    manualBonus
  );
}

function formatModifierExpression(value: number) {
  if (value > 0) return `1d20+${value}`;
  if (value < 0) return `1d20${value}`;
  return "1d20";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isTemporaryRoomCode(roomCode: string) {
  return roomCode.length === 6;
}

function isSocketGmInTemporaryRoom(room: RoomState, socketId: string) {
  if (!isTemporaryRoomCode(room.code)) {
    return true;
  }

  return Boolean(
    room.players.find((player) => player.id === socketId)?.isGm,
  );
}

async function getRoomAuthContext(roomCode: string, authToken?: string) {
  if (isTemporaryRoomCode(roomCode)) {
    return {
      userId: null,
      isGm: true,
    };
  }

  if (!authToken) {
    throw new Error("Autenticacao obrigatoria.");
  }

  const authPayload = verifyAuthToken(authToken);
  const member = await ensureCampaignAccess({
    campaignId: roomCode,
    userId: authPayload.userId,
  });

  return {
    userId: authPayload.userId,
    isGm: member.role === "owner" || member.role === "gm",
  };
}

async function ensureCanManageTurns(roomCode: string, authToken?: string) {
  if (isTemporaryRoomCode(roomCode)) {
    return;
  }

  if (!authToken) {
    throw new Error("Apenas o GM pode iniciar ou organizar turnos.");
  }

  const authPayload = verifyAuthToken(authToken);

  await ensureCampaignGmAccess({
    campaignId: roomCode,
    userId: authPayload.userId,
  });
}

async function ensureCanUseAudioQueue(
  room: RoomState,
  socketId: string,
  authToken?: string,
) {
  if (isTemporaryRoomCode(room.code)) {
    const player = room.players.find(
      (currentPlayer) => currentPlayer.id === socketId,
    );

    if (!player) {
      throw new Error("Voce nao esta nesta sala.");
    }

    return;
  }

  if (!authToken) {
    throw new Error("Autenticacao obrigatoria.");
  }

  const authPayload = verifyAuthToken(authToken);

  await ensureCampaignAccess({
    campaignId: room.code,
    userId: authPayload.userId,
  });
}

async function ensureCanManageAudioQueue(
  room: RoomState,
  socketId: string,
  authToken?: string,
) {
  if (isTemporaryRoomCode(room.code)) {
    const player = room.players.find(
      (currentPlayer) => currentPlayer.id === socketId,
    );

    if (!player?.isGm) {
      throw new Error("Apenas o GM pode organizar a fila.");
    }

    return;
  }

  if (!authToken) {
    throw new Error("Apenas o GM pode organizar a fila.");
  }

  const authPayload = verifyAuthToken(authToken);

  await ensureCampaignGmAccess({
    campaignId: room.code,
    userId: authPayload.userId,
  });
}

async function ensureCanControlToken(
  room: NonNullable<ReturnType<typeof getRoom>>,
  token: Token,
  authToken: string | undefined,
  options: {
    respectTurn: boolean;
  },
) {
  const context = await getRoomAuthContext(room.code, authToken);

  if (context.isGm) {
    return context;
  }

  if (!context.userId) {
    throw new Error("Usuario invalido.");
  }

  if (!token.characterId) {
    throw new Error("Apenas o GM pode controlar tokens sem ficha.");
  }

  const character = await prisma.character.findFirst({
    where: {
      id: token.characterId,
      campaignId: room.code,
      archivedAt: null,
    },
    include: {
      permissions: true,
    },
  });

  const canControl =
    character?.ownerUserId === context.userId ||
    character?.createdByUserId === context.userId ||
    Boolean(
      character?.permissions.some(
        (permission) =>
          permission.userId === context.userId && permission.canControl,
      ),
    );

  if (!canControl) {
    throw new Error("Voce nao controla este token.");
  }

  if (options.respectTurn && room.turnState.active) {
    const currentEntry = room.turnState.entries[room.turnState.currentIndex];

    if (!currentEntry || currentEntry.tokenId !== token.id) {
      throw new Error("Aguarde o turno deste token.");
    }
  }

  return context;
}

function upsertTurnEntry(room: NonNullable<ReturnType<typeof getRoom>>, token: Token, initiative: number) {
  const currentTurnTokenId =
    room.turnState.entries[room.turnState.currentIndex]?.tokenId ?? null;
  const nextInitiative = Number.isFinite(initiative)
    ? Math.floor(initiative)
    : 0;
  const existing = room.turnState.entries.find(
    (entry) => entry.tokenId === token.id,
  );
  const nextEntry = {
    id: existing?.id ?? token.id,
    tokenId: token.id,
    characterId: token.characterId,
    name: token.name ?? "Token",
    image: token.image,
    initiative: nextInitiative,
    order: existing?.order ?? room.turnState.entries.length,
  };
  const entries = [
    ...room.turnState.entries.filter((entry) => entry.tokenId !== token.id),
    nextEntry,
  ].sort((left, right) => right.initiative - left.initiative || left.order - right.order);

  room.turnState.entries = rebuildTurnOrders(entries);
  room.turnState.currentIndex = getNextCurrentIndex(
    room.turnState.entries,
    currentTurnTokenId,
  );
}

function rebuildTurnOrders<T extends { order: number }>(entries: T[]) {
  return entries.map((entry, index) => ({
    ...entry,
    order: index,
  }));
}

function getNextCurrentIndex(
  entries: {
    tokenId: string;
  }[],
  currentTurnTokenId: string | null,
) {
  if (entries.length === 0) {
    return 0;
  }

  if (!currentTurnTokenId) {
    return 0;
  }

  const nextIndex = entries.findIndex(
    (entry) => entry.tokenId === currentTurnTokenId,
  );

  return nextIndex >= 0 ? nextIndex : 0;
}

function advanceTurn(room: NonNullable<ReturnType<typeof getRoom>>) {
  const totalEntries = room.turnState.entries.length;

  if (totalEntries === 0) {
    room.turnState.currentIndex = 0;
    return;
  }

  const nextIndex = (room.turnState.currentIndex + 1) % totalEntries;

  room.turnState.currentIndex = nextIndex;

  if (nextIndex === 0) {
    room.turnState.round += 1;
  }
}

function tickRoomActionEffects(room: NonNullable<ReturnType<typeof getRoom>>) {
  room.activeEffects = (room.activeEffects ?? [])
    .map((effect) => ({
      ...effect,
      remainingTurns: Math.max(0, effect.remainingTurns - 1),
    }))
    .filter((effect) => effect.remainingTurns > 0);
}

function normalizeActionEffectDuration(
  effect: unknown,
) {
  if (!effect || typeof effect !== "object" || Array.isArray(effect)) {
    return 0;
  }

  const record = effect as {
    enabled?: unknown;
    durationTurns?: unknown;
  };

  if (record.enabled !== true) {
    return 0;
  }

  const durationTurns = Number(record.durationTurns);

  return Number.isFinite(durationTurns)
    ? Math.max(0, Math.min(100, Math.floor(durationTurns)))
    : 0;
}

function createRoomActionEffect(
  payload: UseActionPayload,
  durationTurns: number,
): RoomActionEffect {
  return {
    id: randomUUID(),
    name: payload.action.name || "Efeito",
    actionId: payload.action.id,
    casterTokenId: payload.casterTokenId,
    characterId: payload.characterId,
    action: payload.action,
    targeting: payload.targeting,
    remainingTurns: durationTurns,
    createdAt: Date.now(),
    sourceUseId: payload.useId,
  };
}

function getSummonCharacterId(summon: unknown) {
  if (!summon || typeof summon !== "object" || Array.isArray(summon)) {
    return "";
  }

  const record = summon as {
    enabled?: unknown;
    characterId?: unknown;
  };

  if (record.enabled !== true || typeof record.characterId !== "string") {
    return "";
  }

  return record.characterId.trim().slice(0, 80);
}

async function ensureCanUseSummonCharacter(input: {
  room: NonNullable<ReturnType<typeof getRoom>>;
  characterId: string;
  context: Awaited<ReturnType<typeof ensureCanControlToken>>;
}) {
  if (isTemporaryRoomCode(input.room.code)) {
    throw new Error("Invocacao por ficha exige campanha salva.");
  }

  if (input.context.isGm) {
    return;
  }

  if (!input.context.userId) {
    throw new Error("Usuario invalido.");
  }

  const character = await prisma.character.findFirst({
    where: {
      id: input.characterId,
      campaignId: input.room.code,
      archivedAt: null,
    },
    include: {
      permissions: true,
    },
  });

  const canControl =
    character?.ownerUserId === input.context.userId ||
    character?.createdByUserId === input.context.userId ||
    Boolean(
      character?.permissions.some(
        (permission) =>
          permission.userId === input.context.userId && permission.canControl,
      ),
    );

  if (!canControl) {
    throw new Error("Voce nao controla a ficha invocada.");
  }
}

function getSummonTokenPosition(
  room: NonNullable<ReturnType<typeof getRoom>>,
  payload: UseActionPayload,
) {
  const cellSize = room.mapSettings.cellSize || 40;
  const targetPoint =
    payload.targeting.targetPoint ?? payload.targeting.origin;
  const mapSize = getMapPixelSize(room.mapSettings);
  const x = Math.floor(targetPoint.x / cellSize) * cellSize;
  const y = Math.floor(targetPoint.y / cellSize) * cellSize;

  return clampTokenToMap(
    x,
    y,
    mapSize.width,
    mapSize.height,
    cellSize,
    cellSize,
  );
}

function isLiveCharacter(
  value: unknown,
): value is UpdateCharacterLivePayload["character"] {
  const character = asRecord(value);

  return (
    typeof character.id === "string" &&
    typeof character.campaignId === "string"
  );
}

function getNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}
