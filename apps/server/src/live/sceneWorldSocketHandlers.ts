import type { Server, Socket } from "socket.io";
import { verifyAuthToken } from "../auth/jwt";
import { ensureCampaignAccess, ensureCampaignGmAccess, isGmRole } from "../campaigns/campaignAccess";
import { prisma } from "../db/prisma";
import { withMapWriteLock } from "../maps/mapWriteLock";
import { getRoom } from "./liveRoomService";
import { playerView, publishPlayerViews, refreshViewer, socketUsers } from "./playerVisibility";
import { ensureCanControlToken } from "./liveSocketHandlers";
import { normalizeMapLayerConfig } from "@shared/rules/mapRules";
import { normalizeDoor, normalizeTokenLight, normalizeVision } from "@shared/rules/sceneEnvironmentRules";
import { tokenPoint } from "@shared/rules/visibilityRules";
export function registerSceneWorldSocketHandlers(io: Server, socket: Socket) {
  socket.on("scene3d:door:interact", async (payload, ack) => {
    try {
      const { userId } = verifyAuthToken(payload?.authToken);
      const member = await ensureCampaignAccess({ campaignId: payload.roomCode, userId });
      await withMapWriteLock(payload.mapId, async () => {
        const map = await prisma.map.findFirst({ where: { id: payload.mapId, campaignId: payload.roomCode, deletedAt: null, isArchived: false } });
        if (!map) throw new Error("Mapa não encontrado.");
        const layer = normalizeMapLayerConfig(map.layerConfigJson), object = layer.scene3d.objects.find((o) => o.id === payload.objectId && o.kind === "door");
        if (!object?.door) throw new Error("Porta não encontrada.");
        const room = getRoom(payload.roomCode);
        if (!isGmRole(member.role)) {
          if (!room || room.mapSettings.mapId !== map.id || socketUsers.get(socket.id) !== userId) throw new Error("Entre na mesa ativa.");
          const token = room.tokens[payload.tokenId];
          if (!token || !object.door.interaction.allowPlayers || object.visibility !== "public") throw new Error("Interação não permitida.");
          await ensureCanControlToken(room, token, payload.authToken, { respectTurn: false });
          const player = room.players.find((p) => p.id === socket.id);
          if (!player) throw new Error("Jogador inválido.");
          await refreshViewer(room, player);
          if (!playerView(room, socket.id).mapSettings.layerConfig?.scene3d?.objects.some((o) => o.id === object.id)) throw new Error("Porta não visível.");
          const p = tokenPoint(token, map.cellSize), target = object.transform.position;
          if (Math.hypot(p.x - target.x, p.z - target.z, p.y - target.y) * 5 > object.door.interaction.rangeFt) throw new Error("Token fora do alcance.");
          if (!["closed", "open"].includes(object.door.state) || !["closed", "open"].includes(payload.state)) throw new Error("A porta está trancada, bloqueada ou destruída.");
        }
        if (!["closed", "open", "locked", "destroyed", "blocked"].includes(payload.state)) throw new Error("Estado inválido.");
        object.door = normalizeDoor({ ...object.door, state: payload.state }); layer.scene3d.revision++;
        await prisma.map.update({ where: { id: map.id }, data: { layerConfigJson: JSON.parse(JSON.stringify(layer)) } });
        if (room?.mapSettings.mapId === map.id) { room.mapSettings.layerConfig = layer; await publishPlayerViews(io, room, true); }
      });
      ack?.({ ok: true });
    } catch (error) { ack?.({ ok: false, error: error instanceof Error ? error.message : "Interação negada." }); }
  });
  socket.on("token:perception:update", async (payload, ack) => {
    try {
      const { userId } = verifyAuthToken(payload?.authToken);
      await ensureCampaignGmAccess({ campaignId: payload.roomCode, userId });
      const map = await prisma.map.findFirst({ where: { id: payload.mapId, campaignId: payload.roomCode, deletedAt: null } });
      if (!map) throw new Error("Mapa não encontrado.");
      const vision = normalizeVision(payload.vision), light = normalizeTokenLight(payload.light);
      const visibility = ["public", "gm_only", "owner_only"].includes(payload.visibility) ? payload.visibility : "gm_only";
      const result = await prisma.mapToken.updateMany({ where: { id: payload.tokenId, mapId: map.id, deletedAt: null }, data: { visionJson: JSON.parse(JSON.stringify(vision)), lightJson: JSON.parse(JSON.stringify(light)), visibility, isHidden: payload.isHidden === true } });
      if (!result.count) throw new Error("Token não encontrado.");
      const room = getRoom(payload.roomCode);
      if (room?.mapSettings.mapId === map.id && room.tokens[payload.tokenId]) { Object.assign(room.tokens[payload.tokenId], { vision, light, visibility, isHidden: payload.isHidden === true }); await publishPlayerViews(io, room); }
      ack?.({ ok: true });
    } catch (error) { ack?.({ ok: false, error: error instanceof Error ? error.message : "Falha ao salvar visão." }); }
  });
  socket.on("scene3d:vision:preview", async (payload, ack) => {
    try {
      const { userId } = verifyAuthToken(payload?.authToken); await ensureCampaignGmAccess({ campaignId: payload.roomCode, userId });
      const room = getRoom(payload.roomCode), player = room?.players.find((p) => p.id === payload.playerId);
      if (!room || !player) throw new Error("Jogador não encontrado.");
      await refreshViewer(room, player); ack?.({ ok: true, room: playerView(room, player.id) });
    } catch (error) { ack?.({ ok: false, error: error instanceof Error ? error.message : "Falha ao inspecionar." }); }
  });
}
