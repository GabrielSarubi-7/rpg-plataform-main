import assert from "node:assert/strict";
import test from "node:test";

test("baseline socket security", async (t) => {
  // All database methods used below are mocked; never use a real database.
  const previousDatabaseUrl = process.env.DATABASE_URL;
  const previousJwtSecret = process.env.JWT_SECRET;
  process.env.DATABASE_URL = "postgresql://test:test@127.0.0.1:1/test";
  process.env.JWT_SECRET = "baseline-test-secret";
  t.after(() => {
    if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousDatabaseUrl;
    if (previousJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousJwtSecret;
  });

  const { prisma } = await import("../src/db/prisma.ts");
  const { signAuthToken } = await import("../src/auth/jwt.ts");
  const { registerLiveSocketHandlers } = await import("../src/live/liveSocketHandlers.ts");
  const { rooms, chatMessages } = await import("../src/live/liveRoomService.ts");
  const campaignId = "baseline-test-campaign";
  const userId = "baseline-test-user";
  const authToken = signAuthToken({ userId });

  function fixture(context, role = "player", characterPatch = {}) {
    // Prisma delegates are proxies; restore their methods explicitly.
    const stub = (model, method, implementation) => {
      const original = model[method];
      model[method] = implementation;
      context.after(() => { model[method] = original; });
    };
    const character = {
      id: "character-1", campaignId, archivedAt: null,
      name: "Test character", ownerUserId: "other-user",
      createdByUserId: "other-user", permissions: [],
      defaultTokenImage: null, portraitImage: null,
      ...characterPatch,
    };
    const map = { id: "map-1", campaignId };
    const writes = [];
    const emissions = [];
    const handlers = new Map();
    context.mock.method(console, "log", () => {});
    context.mock.method(console, "error", () => {});
    stub(prisma.campaignMember, "findUnique", async ({ where }) => {
      assert.equal(where.campaignId_userId.campaignId, campaignId);
      assert.equal(where.campaignId_userId.userId, userId);
      return role ? { role, userId, campaignId } : null;
    });
    stub(prisma.character, "findFirst", async ({ where }) =>
      where.id === character.id && where.campaignId === character.campaignId &&
      where.archivedAt === character.archivedAt ? character : null,
    );
    stub(prisma.campaign, "findUnique", async () => ({ id: campaignId }));
    stub(prisma.campaignSession, "findFirst", async () => ({ activeMapId: map.id }));
    stub(prisma.map, "findFirst", async () => map);
    stub(prisma.mapToken, "create", async ({ data }) => {
      writes.push(data);
      return { id: "created-token", widthCells: 1, heightCells: 1, ...data };
    });
    rooms[campaignId] = {
      code: campaignId,
      players: [{ id: "socket-1", name: "Test player", isGm: role === "gm" || role === "owner" }],
      tokens: { caster: { id: "caster", characterId: character.id, x: 0, y: 0 } },
      mapSettings: { widthCells: 24, heightCells: 18, cellSize: 40, pageName: "Test map" },
      turnState: { active: false, entries: [], currentIndex: 0, round: 1 },
      audioState: { queue: [], currentTrackId: null, isPlaying: false, updatedAt: 0 },
      annotations: {}, activeEffects: [],
    };
    context.after(() => {
      delete rooms[campaignId];
      delete chatMessages[campaignId];
    });
    const io = { to: (recipient) => ({ emit: (event, payload) => emissions.push({ recipient, event, payload }) }) };
    const socket = { id: "socket-1", on: (event, handler) => handlers.set(event, handler) };
    registerLiveSocketHandlers(io, socket);
    return { writes, emissions, handlers };
  }

  const deniedCases = [
    { name: "missing authentication", token: undefined },
    { name: "invalid authentication", token: "invalid-jwt" },
    { name: "non-member", role: null },
    { name: "player without control" },
    { name: "view permission is insufficient", character: { permissions: [{ userId, canView: true, canControl: false }] } },
    { name: "edit permission is insufficient", character: { permissions: [{ userId, canEdit: true, canControl: false }] } },
    { name: "character from another campaign, even for GM", role: "gm", character: { campaignId: "other-campaign" } },
    { name: "archived character, even for GM", role: "gm", character: { archivedAt: new Date() } },
  ];
  for (const scenario of deniedCases) {
    await t.test(`character token creation rejects ${scenario.name}`, async (context) => {
      const state = fixture(context, "role" in scenario ? scenario.role : "player", scenario.character);
      let ack;
      await state.handlers.get("character:token:create")({
        campaignId, characterId: "character-1",
        authToken: "token" in scenario ? scenario.token : authToken,
      }, (value) => { ack = value; });
      assert.equal(ack?.ok, false);
      assert.equal(state.writes.length, 0);
      assert.equal(state.emissions.length, 0);
      assert.equal(rooms[campaignId].tokens["created-token"], undefined);
    });
  }

  for (const scenario of [
    { name: "campaign owner", role: "owner" },
    { name: "GM", role: "gm" },
    { name: "character owner", character: { ownerUserId: userId } },
    { name: "character creator", character: { createdByUserId: userId } },
    { name: "explicit controller", character: { permissions: [{ userId, canControl: true }] } },
  ]) {
    await t.test(`character token creation permits ${scenario.name}`, async (context) => {
      const state = fixture(context, scenario.role ?? "player", scenario.character);
      let ack;
      await state.handlers.get("character:token:create")({
        campaignId, characterId: "character-1", authToken, x: 80, y: 120,
      }, (value) => { ack = value; });
      assert.equal(ack?.ok, true);
      assert.equal(state.writes.length, 1);
      assert.equal(state.writes[0].mapId, "map-1");
      assert.equal(ack.token.x, 80);
      assert.equal(ack.token.y, 120);
      assert.equal(rooms[campaignId].tokens[ack.token.id], ack.token);
    });
  }

  await t.test("action broadcast preserves gameplay fields but excludes credentials and unknown fields", async (context) => {
    const state = fixture(context, "gm");
    const payload = {
      useId: "action-use-1", roomCode: campaignId, authToken,
      casterTokenId: "caster", characterId: "character-1",
      action: {
        id: "action-1", name: "Test action", description: "",
        roll: { mode: "none" }, targeting: { shape: "self" },
      },
      targeting: { shape: "self", origin: { x: 20, y: 20 }, affectedTokenIds: [] },
      rolls: {}, color: "#123456", extraPrivateField: "must-not-be-broadcast",
    };
    await state.handlers.get("action:use")(payload);
    const broadcast = state.emissions.find((item) => item.event === "action:used")?.payload;
    assert.ok(broadcast);
    assert.equal("authToken" in broadcast, false);
    assert.equal("extraPrivateField" in broadcast, false);
    for (const key of ["useId", "roomCode", "casterTokenId", "characterId", "action", "targeting", "rolls", "color"]) {
      assert.deepEqual(broadcast[key], payload[key]);
    }
    assert.equal(typeof broadcast.usedAt, "number");
    assert.equal(broadcast.previewDurationMs, 3200);
    assert.equal(JSON.stringify(state.emissions).includes(authToken), false);
  });
});
