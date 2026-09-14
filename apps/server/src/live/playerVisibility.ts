import { prisma } from "../db/prisma";
import type { Server } from "socket.io";
import type { RoomState, Player } from "@shared/types/multiplayer";
import { createVisibility, tokenPoint } from "@shared/rules/visibilityRules";
import { filterMapSettingsForPlayers, normalizeMapLayerConfig } from "@shared/rules/mapRules";
import { isTokenVisibleInFog } from "@shared/rules/fogVisibility";
import { getRoom } from "./liveRoomService";
export const socketUsers = new Map<string, string>();
const observers = new Map<string, { mapId?: string; ids: string[] }>();
const restrictedHistory = new Set<string>();
const viewCache = new Map<string, { room: RoomState; signature: string; value: RoomState }>();
export function safeRelatedPayload(room: RoomState, socketId: string, payload: unknown) {
  if (room.players.find((p) => p.id === socketId)?.isGm) return true;
  if (payload && typeof payload === "object" && "id" in payload && restrictedHistory.has(String(payload.id))) return false;
  const view = playerView(room, socketId), text = JSON.stringify(payload) ?? "";
  return !Object.values(room.tokens).filter((t) => !view.tokens[t.id]).some((t) => [t.id, t.characterId, t.name, t.image].some((value) => value && value.length > 1 && text.includes(value)));
}
export function relatedAudience(io: Server, room: RoomState) { return { emit(event: string, payload: unknown) {
  // Remember protected history even when only the GM is connected. Otherwise
  // deleting a hidden token before a player joins could expose old references.
  let restricted = !safeRelatedPayload(room, "", payload);
  for (const p of room.players) { if (safeRelatedPayload(room, p.id, payload)) io.to(p.id).emit(event, payload); else restricted = true; }
  if (restricted && event === "chat:message" && payload && typeof payload === "object" && "id" in payload) restrictedHistory.add(String(payload.id));
} }; }
export function forgetViewer(id: string) { socketUsers.delete(id); observers.delete(id); viewCache.delete(id); }
export async function refreshViewer(room: RoomState, player: Player) {
  // Temporary rooms have no campaign membership. Campaign roles are checked
  // even with LOS disabled: a revoked GM must never keep receiving secrets.
  if (room.code.length === 6) return;
  const userId = socketUsers.get(player.id);
  observers.delete(player.id);
  if (!userId) throw new Error("Sessão não autenticada.");
  const member = await prisma.campaignMember.findUnique({ where: { campaignId_userId: { campaignId: room.code, userId } } });
  player.isGm = member?.role === "owner" || member?.role === "gm";
  if (!member) throw new Error("Acesso à campanha revogado.");
  if (!room.mapSettings.layerConfig?.scene3d?.environment.visionEnabled && !Object.values(room.tokens).some((t) => t.visibility === "owner_only")) return;
  const characters = await prisma.character.findMany({ where: { campaignId: room.code, archivedAt: null, OR: [{ ownerUserId: userId }, { createdByUserId: userId }, { permissions: { some: { userId, canControl: true } } }] }, select: { id: true } });
  const ids = new Set(characters.map((c) => c.id));
  observers.set(player.id, { mapId: room.mapSettings.mapId, ids: Object.values(room.tokens).filter((token) => token.characterId && ids.has(token.characterId)).map((token) => token.id) });
}
export function playerView(room: RoomState, socketId?: string): RoomState {
  const stored = socketId ? observers.get(socketId) : undefined;
  const signature = JSON.stringify([room.mapSettings, room.tokens, room.turnState, room.annotations, room.activeEffects, room.players, stored]);
  const cached = socketId ? viewCache.get(socketId) : undefined;
  if (cached?.room === room && cached.signature === signature) return cached.value;
  const sight = createVisibility(room.mapSettings, room.tokens, stored?.mapId === room.mapSettings.mapId ? stored?.ids ?? [] : []);
  const tokens = Object.fromEntries(Object.entries(room.tokens).filter(([, t]) => !t.isHidden && t.visibility !== "hidden" && t.visibility !== "gm_only" && (t.visibility !== "owner_only" || (stored?.mapId === room.mapSettings.mapId && stored?.ids.includes(t.id))) && isTokenVisibleInFog(t, room.mapSettings) && sight.visible({ ...tokenPoint(t, room.mapSettings.cellSize), y: (t.elevation ?? 0) / 5 + 0.5 })));
  const mapSettings = filterMapSettingsForPlayers(room.mapSettings, true);
  const layer = normalizeMapLayerConfig(mapSettings.layerConfig);
  if (sight.enabled) {
    mapSettings.backgroundImage = "";
    layer.scene3d.objects = layer.scene3d.objects.filter((o) => sight.visible({ ...o.transform.position, y: o.transform.position.y + 0.5 }, o.floorId));
    layer.scene3d.lights = layer.scene3d.lights.filter((l) => sight.visible(l.position, l.floorId));
    layer.scene3d.floors = layer.scene3d.floors.filter((f) => sight.observers.some((o) => f.elevation <= o.base.y + 0.1));
    const cells: Record<string, true> = {};
    for (const observer of sight.observers) {
      const r = observer.vision.rangeFt / 5;
      for (let z = Math.max(0, Math.floor(observer.base.z - r)); z < Math.min(room.mapSettings.heightCells, Math.ceil(observer.base.z + r)); z++) for (let x = Math.max(0, Math.floor(observer.base.x - r)); x < Math.min(room.mapSettings.widthCells, Math.ceil(observer.base.x + r)); x++) {
        const key = `${x}:${z}`;
        if (!cells[key] && sight.visible({ x: x + 0.5, y: observer.eye.y, z: z + 0.5 })) cells[key] = true;
      }
    }
    layer.fogOfWar = { enabled: true, opacity: 1, mode: "revealed_cells", cells };
    layer.terrainCells = Object.fromEntries(Object.entries(layer.terrainCells).filter(([, c]) => cells[`${c.x}:${c.y}`]));
    layer.walls = layer.walls.filter((w) => cells[`${w.x}:${w.y}`] || cells[`${w.x - 1}:${w.y}`] || cells[`${w.x}:${w.y - 1}`]);
    layer.objects = layer.objects.filter((o) => sight.visible({ x: o.x + o.widthCells / 2, z: o.y + o.heightCells / 2, y: o.elevation / 5 + 0.5 }));
    layer.images = layer.images.filter((i) => sight.visible({ x: (i.x + i.width / 2) / room.mapSettings.cellSize, z: (i.y + i.height / 2) / room.mapSettings.cellSize, y: 0.5 }));
  }
  const entries = room.turnState.entries.map((entry, index) => tokens[entry.tokenId] ? entry : { id: `concealed-turn-${index}`, tokenId: `concealed-turn-${index}`, name: "Oculto", initiative: 0, order: entry.order });
  const value = { ...room, tokens, mapSettings: { ...mapSettings, layerConfig: layer }, turnState: { ...room.turnState, entries }, activeEffects: room.activeEffects.filter((effect) => !sight.enabled && tokens[effect.casterTokenId] && !Object.values(room.tokens).filter((t) => !tokens[t.id]).some((t) => [t.id, t.characterId].some((id) => id && JSON.stringify(effect).includes(id)))), annotations: Object.fromEntries(Object.entries(room.annotations).filter(([, a]) => a.visibility !== "gm" && (!sight.enabled || (a.type === "text" ? sight.visible({ x: a.x / room.mapSettings.cellSize, z: a.y / room.mapSettings.cellSize, y: 0.5 }) : a.points.every((p) => sight.visible({ x: p.x / room.mapSettings.cellSize, z: p.y / room.mapSettings.cellSize, y: 0.5 })))))) };
  if (socketId) viewCache.set(socketId, { room, signature, value });
  return value;
}

export async function publishPlayerViews(io: Server, room: RoomState, sceneUpdate = false) {
  await Promise.all(room.players.map(async (player) => {
    try {
      await refreshViewer(room, player);
      if (getRoom(room.code) !== room || !room.players.includes(player) || !io.sockets.sockets.has(player.id)) return;
      const view = player.isGm ? room : playerView(room, player.id);
      if (sceneUpdate) io.to(player.id).emit("scene3d:updated", { mapId: room.mapSettings.mapId, scene: view.mapSettings.layerConfig?.scene3d });
      io.to(player.id).emit("room:state", view);
    } catch { /* A failed authorization lookup never falls back to an unfiltered view. */ }
  }));
}
