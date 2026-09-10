// Test-only server: real Socket.IO and production move/visual handlers.
// Every database delegate reached by these scenarios is replaced in memory.
import { createServer } from "node:http";
import { Server } from "socket.io";
import assert from "node:assert/strict";

export async function startSceneSocketFixture() {
  const previous = { DATABASE_URL: process.env.DATABASE_URL, JWT_SECRET: process.env.JWT_SECRET };
  process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test";
  process.env.JWT_SECRET = "scene-browser-test-only";
  const { prisma } = await import("../src/db/prisma.ts");
  const { signAuthToken } = await import("../src/auth/jwt.ts");
  const { registerLiveSocketHandlers } = await import("../src/live/liveSocketHandlers.ts");
  const { rooms, getRoomStateForPlayer } = await import("../src/live/liveRoomService.ts");
  const campaignId = "fixture-campaign";
  const restores = [];
  const persisted = {};
  let character;
  const stub = (model, method, fn) => {
    const original = model[method]; model[method] = fn;
    restores.push(() => { model[method] = original; });
  };
  stub(prisma.campaignMember, "findUnique", async ({ where }) => {
    const { campaignId: id, userId } = where.campaignId_userId;
    assert.equal(id, campaignId);
    return ["gm", "player"].includes(userId) ? { role: userId, userId, campaignId } : null;
  });
  stub(prisma.character, "findFirst", async ({ where }) => where.id === character?.id ? character : null);
  stub(prisma.campaign, "findUnique", async () => ({ id: campaignId }));
  stub(prisma.campaignSession, "findFirst", async () => ({ activeMapId: "map-a" }));
  stub(prisma.map, "findFirst", async () => ({ id: "map-a", campaignId }));
  stub(prisma.mapToken, "upsert", async ({ where, create, update }) => {
    persisted[where.id] = { ...persisted[where.id], ...create, ...update };
    return persisted[where.id];
  });
  stub(prisma.mapToken, "updateMany", async ({ where, data }) => {
    assert.equal(where.mapId, "map-a");
    persisted[where.id] = { ...persisted[where.id], ...data };
    return { count: 1 };
  });
  const http = createServer();
  const io = new Server(http, { cors: { origin: true } });
  io.on("connection", (socket) => {
    registerLiveSocketHandlers(io, socket);
    socket.on("fixture:join", async (data, ack) => {
      assert.ok(["gm", "player"].includes(data.role));
      if (!rooms[campaignId]) {
        character = data.character;
        rooms[campaignId] = {
          code: campaignId, players: [], tokens: data.tokens, mapSettings: data.mapSettings,
          turnState: { active: false, entries: [], currentIndex: 0, round: 1 },
          audioState: { queue: [], currentTrackId: null, isPlaying: false, updatedAt: 0 },
          annotations: {}, activeEffects: [],
        };
      }
      ack({ authToken: signAuthToken({ userId: data.role }) });
    });
  });
  await new Promise((resolve) => http.listen(0, "127.0.0.1", resolve));
  return {
    url: `http://127.0.0.1:${http.address().port}`,
    persisted,
    room: () => rooms[campaignId],
    publish() {
      const room = rooms[campaignId];
      for (const player of room.players) io.to(player.id).emit("room:state", getRoomStateForPlayer(room, player.isGm));
    },
    async close() {
      await new Promise((resolve) => io.close(resolve));
      delete rooms[campaignId];
      restores.reverse().forEach((restore) => restore());
      await prisma.$disconnect();
      for (const key of Object.keys(previous)) {
        if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key];
      }
    },
  };
}
