import test from 'node:test';
import assert from 'node:assert/strict';
import { io } from 'socket.io-client';
import { startSceneSocketFixture } from './scene3dSocketFixture.mjs';
const { normalizeMapSettings, normalizeMapLayerConfig } = await import('../../../shared/rules/mapRules.ts');
const { normalizeScene3DConfig } = await import('../../../shared/rules/scene3dRules.ts');

test('authoritative two-client LOS, doors, secrecy, movement, persistence and private maps', async (t) => {
  const server = await startSceneSocketFixture(), clients = [], seen = [];
  t.after(async () => { clients.forEach((c) => c.disconnect()); await server.close(); });
  const scene = normalizeScene3DConfig({ environment: { visionEnabled: true }, objects: [
    { id: 'door', kind: 'door', name: 'Porta', visibility: 'public', door: { interaction: { allowPlayers: true, rangeFt: 10 } }, transform: { position: { x: 3, z: 2.5 }, rotation: { y: 90 }, scale: { x: 2, y: 3, z: .15 } } },
    { id: 'secret-object', visibility: 'gm', name: 'Secret vault' },
  ] });
  const tokens = { hero: { id: 'hero', characterId: 'hero-sheet', name: 'Hero', x: 40, y: 80 }, enemy: { id: 'enemy', name: 'Enemy', x: 160, y: 80 }, 'hidden-token': { id: 'hidden-token', characterId: 'secret-sheet', name: 'Hidden sentinel', x: 40, y: 40, isHidden: true } };
  const mapSettings = normalizeMapSettings({ mapId: 'map-a', widthCells: 16, heightCells: 12, cellSize: 40, layerConfig: normalizeMapLayerConfig({ scene3d: scene }) });
  async function connect(role) {
    const client = io(server.url, { transports: ['websocket'] }); clients.push(client);
    await new Promise((r) => client.once('connect', r));
    const { authToken } = await client.emitWithAck('fixture:join', { role, tokens, mapSettings, character: { id: 'hero-sheet', campaignId: 'fixture-campaign', ownerUserId: 'player', createdByUserId: 'gm', permissions: [] } });
    const actor = { client, authToken, view: null, history: null, messages: [] };
    client.on('chat:history', (messages) => { actor.history = messages; });
    client.on('chat:message', (message) => actor.messages.push(message));
    client.on('room:state', (view) => { actor.view = view; if (role === 'player') seen.push(view); });
    if (role === 'player') client.on('scene3d:updated', (data) => seen.push(data));
    const joined = await client.emitWithAck('campaign:join-live', { campaignId: 'fixture-campaign', authToken, playerName: role });
    assert.equal(joined.ok, true); actor.view = joined.room; if (role === 'player') seen.push(joined.room);
    return actor;
  }
  const gm = await connect('gm'), player = await connect('player');
  const request = (actor, event, data = {}) => actor.client.timeout(5000).emitWithAck(event, { roomCode: 'fixture-campaign', mapId: 'map-a', authToken: actor.authToken, ...data });
  async function poll(predicate) { const end = Date.now() + 5000; while (!predicate()) { assert.ok(Date.now() < end, 'state timed out'); await new Promise((r) => setTimeout(r, 10)); } }
  assert.ok(gm.view.tokens['hidden-token']); assert.ok(gm.view.tokens.enemy);
  assert.ok(player.view.tokens.hero); assert.equal(player.view.tokens.enemy, undefined);
  assert.equal(player.view.tokens['hidden-token'], undefined);
  for (const data of [{ tokenId: 'enemy', state: 'open' }, { tokenId: 'hero', state: 'destroyed' }, { tokenId: 'hero', state: 'open', authToken: '' }]) assert.equal((await request(player, 'scene3d:door:interact', { objectId: 'door', ...data })).ok, false);
  assert.equal((await request(player, 'scene3d:door:interact', { objectId: 'door', tokenId: 'hero', state: 'open' })).ok, true);
  await poll(() => player.view.tokens.enemy && gm.view.mapSettings.layerConfig.scene3d.objects[0].door.state === 'open');
  await request(gm, 'scene3d:door:interact', { objectId: 'door', state: 'locked' });
  await poll(() => !player.view.tokens.enemy);
  assert.equal((await request(player, 'scene3d:door:interact', { objectId: 'door', tokenId: 'hero', state: 'open' })).ok, false);
  player.client.emit('token:move', { roomCode: 'fixture-campaign', authToken: player.authToken, tokenId: 'hero', x: 160, y: 80 });
  await new Promise((r) => setTimeout(r, 50)); assert.equal(server.room().tokens.hero.x, 40, 'closed door blocks movement');
  await request(gm, 'scene3d:door:interact', { objectId: 'door', state: 'open' });
  player.client.emit('token:move', { roomCode: 'fixture-campaign', authToken: player.authToken, tokenId: 'hero', x: 400, y: 80 });
  await poll(() => server.room().tokens.hero.x === 400);
  assert.equal((await request(player, 'scene3d:door:interact', { objectId: 'door', tokenId: 'hero', state: 'closed' })).ok, false, 'out of range');
  assert.equal((await request(player, 'token:perception:update', { tokenId: 'hero', vision: { rangeFt: 300 } })).ok, false);
  assert.equal((await request(gm, 'token:perception:update', { tokenId: 'hero', visibility: 'public', vision: { rangeFt: 5 }, light: { enabled: true, type: 'spot', color: '#abcdef' } })).ok, true);
  await poll(() => !player.view.tokens.enemy);
  player.client.emit('token:move', { roomCode: 'fixture-campaign', authToken: player.authToken, tokenId: 'hero', x: 120, y: 80 });
  await poll(() => Boolean(player.view.tokens.enemy));
  for (const [event, data] of [
    ['scene3d:light', { light: { id: 'lamp', visibility: 'public', type: 'spot', position: { x: 3.5, y: 1, z: 2.5 } } }],
    ['scene3d:floor', { floor: { id: 'upper', elevation: 3 } }],
    ['scene3d:bookmark', { bookmark: { id: 'camera', fov: 65 } }],
  ]) { assert.equal((await request(player, event, data)).ok, false); assert.equal((await request(gm, event, data)).ok, true); }
  const before = structuredClone(server.maps['map-a'].layerConfigJson.scene3d);
  const legacy = { ...server.room().mapSettings, layerConfig: normalizeMapLayerConfig({ terrainCells: { '1:1': { x: 1, y: 1, height: 5, type: 'grass' } } }) };
  assert.equal((await request(gm, 'map:settings:update', { settings: legacy })).ok, true);
  assert.deepEqual(server.maps['map-a'].layerConfigJson.scene3d, before);
  await server.reload(); await server.publish();
  await poll(() => gm.view.tokens.hero.light?.color === '#abcdef');
  assert.equal(gm.view.mapSettings.layerConfig.scene3d.lights[0].id, 'lamp');
  assert.equal(gm.view.mapSettings.layerConfig.scene3d.floors[0].id, 'upper');
  assert.equal(gm.view.mapSettings.layerConfig.scene3d.objects[0].door.state, 'open');
  const preview = await request(gm, 'scene3d:vision:preview', { playerId: player.client.id });
  assert.equal(preview.ok, true); assert.equal(preview.room.tokens['hidden-token'], undefined);
  assert.equal((await request(player, 'scene3d:vision:preview', { playerId: gm.client.id })).ok, false);
  const privateLight = { id: 'private-lamp', name: 'PRIVATE-LIGHT', visibility: 'public' };
  await request(gm, 'scene3d:light', { light: privateLight, mapId: 'map-private' });
  assert.equal(server.room().mapSettings.layerConfig.scene3d.lights.some((l) => l.id === privateLight.id), false);
  const { safeRelatedPayload } = await import('../src/live/playerVisibility.ts');
  assert.equal(safeRelatedPayload(server.room(), player.client.id, { casterTokenId: 'hidden-token' }), false);
  assert.equal(safeRelatedPayload(server.room(), gm.client.id, { casterTokenId: 'hidden-token' }), true);
  gm.client.emit('chat:send', { roomCode: 'fixture-campaign', text: 'Hidden sentinel guarda secret-sheet.' });
  await poll(() => gm.messages.some((m) => m.text.includes('Hidden sentinel')));
  assert.equal(player.messages.some((m) => m.text.includes('Hidden sentinel')), false, 'live chat protects hidden references');
  delete server.room().tokens['hidden-token'];
  const latePlayer = await connect('player');
  await poll(() => latePlayer.history !== null);
  assert.equal(JSON.stringify(latePlayer.history).includes('Hidden sentinel'), false, 'history remains protected after hidden token deletion');
  for (const forbidden of ['secret-object', 'hidden-token', 'secret-sheet', 'Hidden sentinel', 'PRIVATE-LIGHT']) assert.equal(JSON.stringify(seen).includes(forbidden), false, forbidden);
  // Changing the active map invalidates observers and cached cells.
  server.room().mapSettings = { ...server.room().mapSettings, mapId: 'other-map' }; server.room().tokens = {};
  await server.publish(); await poll(() => player.view.mapSettings.mapId === 'other-map');
  assert.deepEqual(player.view.tokens, {}); assert.deepEqual(player.view.mapSettings.layerConfig.fogOfWar.cells, {});
});
