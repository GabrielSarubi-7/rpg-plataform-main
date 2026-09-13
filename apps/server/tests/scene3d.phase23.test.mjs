import test from "node:test";
import assert from "node:assert/strict";
import { io } from "socket.io-client";
import { startSceneSocketFixture } from "./scene3dSocketFixture.mjs";
const { normalizeMapLayerConfig, normalizeMapSettings } = await import("../../../shared/rules/mapRules.ts");
const { normalizeSceneObject3D } = await import("../../../shared/rules/scene3dRules.ts");

test("scene CRUD, authorization, filtered two-client sync, private maps and stale legacy saves", async (t) => {
  const server = await startSceneSocketFixture();
  const clients = [];
  t.after(async () => { clients.forEach((client) => client.disconnect()); await server.close(); });
  async function connect(role) {
    const client = io(server.url, { transports: ["websocket"] }); clients.push(client);
    await new Promise((resolve) => client.once("connect", resolve));
    const session = await client.emitWithAck("fixture:join", { role, character: {}, tokens: { hero: { id: "hero", x: 0, y: 0 } }, mapSettings: normalizeMapSettings({ mapId: "map-a", widthCells: 16, heightCells: 12 }) });
    const joined = await client.emitWithAck("campaign:join-live", { campaignId: "fixture-campaign", playerName: role, authToken: session.authToken });
    assert.equal(joined.ok, true);
    return { client, authToken: session.authToken };
  }
  const gm = await connect("gm"), player = await connect("player"), seen = [];
  for (const [mime, filename] of [["application/octet-stream", "bad.glb"], ["model/gltf-binary", "bad.glb"], ["application/octet-stream", "arbitrary.bin"], ["image/png", "bad.glb"]]) {
    const response = await fetch(`${server.url}/assets`, { method: "POST", headers: { Authorization: `Bearer ${gm.authToken}`, "Content-Type": mime, "X-File-Name": filename }, body: "not a valid model" });
    assert.equal(response.status, 400);
  }
  const waitUpdate = (predicate) => new Promise((resolve) => { const handler = (data) => { if (predicate(data)) { player.client.off("scene3d:updated", handler); resolve(data); } }; player.client.on("scene3d:updated", handler); });
  player.client.on("scene3d:updated", (data) => seen.push(data));
  const request = (actor, event, extra = {}) => actor.client.timeout(3000).emitWithAck(event, { roomCode: "fixture-campaign", mapId: "map-a", authToken: actor.authToken, ...extra });
  const object = normalizeSceneObject3D({ id: "one", name: "Secret", kind: "model", assetUrl: `/assets/${'b'.repeat(64)}.glb`, visibility: "gm" });
  for (const authToken of ["", "invalid", player.authToken]) {
    const rejected = await request(gm, "scene3d:object:upsert", { object, authToken }); assert.equal(rejected.ok, false);
  }
  assert.equal((await request(gm, "scene3d:object:upsert", { object, mapId: "missing" })).ok, false);
  assert.equal((await request(gm, "scene3d:object:upsert", { object })).ok, true);
  const publicObject = { ...object, visibility: "public" };
  const publicEvent = waitUpdate((data) => data.scene.objects.length === 1);
  await request(gm, "scene3d:object:upsert", { object: publicObject });
  assert.equal((await publicEvent).scene.objects[0].id, "one");
  const secretEvent = waitUpdate((data) => data.scene.revision >= 3 && data.scene.objects.length === 0);
  await request(gm, "scene3d:object:upsert", { object });
  assert.deepEqual((await secretEvent).scene.objects, []);
  const before = structuredClone(server.maps['map-a'].layerConfigJson.scene3d);
  const { updateCampaignMap } = await import("../src/maps/mapService.ts");
  await updateCampaignMap({ campaignId: "fixture-campaign", userId: "gm", mapId: "map-a", layerConfig: { version: 1, terrainCells: { '2:2': { x: 2, y: 2, height: 10, type: "grass" } } } });
  assert.deepEqual(server.maps['map-a'].layerConfigJson.scene3d, before);
  const settings = { ...server.room().mapSettings, layerConfig: normalizeMapLayerConfig({ fogOfWar: { enabled: true, cells: { '0:0': true } } }) };
  assert.equal((await request(gm, "map:settings:update", { settings })).ok, true);
  assert.deepEqual(server.maps['map-a'].layerConfigJson.scene3d, before);
  assert.deepEqual(server.room().mapSettings.layerConfig.scene3d, before);
  assert.equal((await request(gm, "map:settings:update", { settings: { ...settings, mapId: "map-private" } })).ok, false);
  await Promise.all([
    request(gm, "scene3d:object:upsert", { object: { ...object, id: "two" } }),
    updateCampaignMap({ campaignId: "fixture-campaign", userId: "gm", mapId: "map-a", layerConfig: { version: 1 } }),
  ]);
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects.length, 2);
  const active = structuredClone(server.room().mapSettings.layerConfig.scene3d);
  await request(gm, "scene3d:object:upsert", { object: { ...object, id: "private" }, mapId: "map-private" });
  assert.deepEqual(server.room().mapSettings.layerConfig.scene3d, active);
  const { getCampaignMapState } = await import("../src/maps/mapService.ts");
  const { prisma } = await import("../src/db/prisma.ts");
  const original = prisma.mapToken.findMany; prisma.mapToken.findMany = async () => [];
  try { assert.deepEqual((await getCampaignMapState({ campaignId: "fixture-campaign", userId: "gm", mapId: "map-private" })).mapSettings.layerConfig.scene3d.objects.map((o) => o.id), ["private"]); }
  finally { prisma.mapToken.findMany = original; }
  assert.equal((await request(gm, "scene3d:object:remove", { objectId: "one" })).ok, true);
  assert.deepEqual(server.maps['map-a'].layerConfigJson.scene3d.objects.map((o) => o.id), ["two"]);
  assert.equal(seen.some((event) => JSON.stringify(event).includes('b'.repeat(64)) && event.scene.objects[0]?.visibility !== "public"), false);
});
