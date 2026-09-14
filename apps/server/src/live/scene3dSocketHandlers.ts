import type { Server, Socket } from "socket.io";
import { verifyAuthToken } from "../auth/jwt";
import { ensureCampaignGmAccess } from "../campaigns/campaignAccess";
import { prisma } from "../db/prisma";
import { withMapWriteLock } from "../maps/mapWriteLock";
import { getRoom } from "./liveRoomService";
import { publishPlayerViews } from "./playerVisibility";
import { normalizeBookmark, normalizeEntities, normalizeEnvironment, normalizeFloor, normalizeLight } from "@shared/rules/sceneEnvironmentRules";
import { filterMapSettingsForPlayers, normalizeMapLayerConfig } from "@shared/rules/mapRules";
import { isSceneObjectId, MAX_SCENE_OBJECTS, normalizeScene3DConfig, normalizeSceneObject3D } from "@shared/rules/scene3dRules";
import type { SceneMutationAck, SceneMutationPayload } from "@shared/types/scene3d";

export function registerScene3DSocketHandlers(io: Server, socket: Socket) {
  for (const operation of ["upsert", "remove", "settings", "sync", "environment", "light", "floor", "bookmark", "light:remove", "floor:remove", "bookmark:remove"] as const) {
    const event = operation === "settings" ? "scene3d:settings:update" : operation === "sync" ? "scene3d:sync" : ["upsert", "remove"].includes(operation) ? `scene3d:object:${operation}` : `scene3d:${operation}`;
    socket.on(event, async (payload: SceneMutationPayload, callback?: (ack: SceneMutationAck) => void) => {
      try {
        if (!payload?.authToken || !payload.mapId || !payload.roomCode) throw new Error("Autenticação necessária.");
        const { userId } = verifyAuthToken(payload.authToken);
        await ensureCampaignGmAccess({ campaignId: payload.roomCode, userId });
        const scene = await withMapWriteLock(payload.mapId, async () => {
          const map = await prisma.map.findFirst({ where: { id: payload.mapId, campaignId: payload.roomCode, deletedAt: null, isArchived: false } });
          if (!map) throw new Error("Mapa não encontrado.");
          const layer = normalizeMapLayerConfig(map.layerConfigJson);
          const next = normalizeScene3DConfig(layer.scene3d, map.width, map.height);
          const before = JSON.stringify(next);
          if (operation === "upsert") {
            const object = normalizeSceneObject3D(payload.object, map.width, map.height);
            if (!object || (object.kind === "model" && !object.assetUrl)) throw new Error("Objeto inválido.");
            const index = next.objects.findIndex((item) => item.id === object.id);
            if (index < 0) {
              if (next.objects.length >= MAX_SCENE_OBJECTS) throw new Error("Limite de objetos atingido.");
              next.objects.push(object);
            } else next.objects[index] = object;
          } else if (operation === "remove") {
            if (!isSceneObjectId(payload.objectId)) throw new Error("Identificador inválido.");
            next.objects = next.objects.filter((item) => item.id !== payload.objectId);
          } else if (operation === "settings") {
            next.settings = normalizeScene3DConfig({ settings: { ...next.settings, ...payload.settings } }).settings;
          } else if (operation === "environment") {
            next.environment = normalizeEnvironment(payload.environment);
          } else if (["light", "floor", "bookmark"].includes(operation)) {
            const field = operation === "light" ? "lights" : operation === "floor" ? "floors" : "bookmarks";
            const entity = operation === "light" ? normalizeLight(payload.light) : operation === "floor" ? normalizeFloor(payload.floor) : normalizeBookmark(payload.bookmark);
            if (!entity) throw new Error("Configuração inválida.");
            const current = next[field] as { id: string }[];
            if (!current.some((v) => v.id === entity.id) && current.length >= (field === "floors" ? 16 : 32)) throw new Error("Limite atingido.");
            (next as any)[field] = [...current.filter((v) => v.id !== entity.id), entity];
          } else if (operation.endsWith(":remove")) {
            const field = operation.startsWith("light") ? "lights" : operation.startsWith("floor") ? "floors" : "bookmarks";
            (next as any)[field] = next[field].filter((v) => v.id !== payload.entityId);
            if (field === "floors") next.objects = next.objects.map((o) => o.floorId === payload.entityId ? { ...o, floorId: undefined } : o);
          }
          if (operation !== "sync" && JSON.stringify(next) !== before) {
            next.revision++;
            await prisma.map.update({ where: { id: map.id }, data: { layerConfigJson: JSON.parse(JSON.stringify({ ...layer, scene3d: next })) } });
          }
          // Update the live copy inside the same lock. Private maps never enter the live room.
          const room = getRoom(payload.roomCode);
          if (room?.mapSettings.mapId === map.id) {
            room.mapSettings.layerConfig = { ...normalizeMapLayerConfig(room.mapSettings.layerConfig), scene3d: next };
            await publishPlayerViews(io, room, true);
          }
          return next;
        });
        callback?.({ ok: true, mapId: payload.mapId, scene });
      } catch (error) {
        callback?.({ ok: false, error: error instanceof Error ? error.message : "Não foi possível salvar a cena." });
      }
    });
  }
}
