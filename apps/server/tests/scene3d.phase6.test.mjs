import test from 'node:test';
import assert from 'node:assert/strict';
import { io } from 'socket.io-client';
import { startSceneSocketFixture } from './scene3dSocketFixture.mjs';
const { normalizeMapSettings } = await import('../../../shared/rules/mapRules.ts');
test('phase 6 uses current rolls, turns, summons and secure per-player action/effect streams', async (t) => {
  const server = await startSceneSocketFixture(), clients = [];
  const random = Math.random;
  t.after(async () => { Math.random = random; clients.forEach((c) => c.disconnect()); await server.close(); });
  const tokens = { hero: { id: 'hero', characterId: 'sheet', name: 'Hero', x: 40, y: 40, elevation: 10 }, target: { id: 'target', characterId: 'sheet', name: 'Target', x: 120, y: 40, widthCells: 2, heightCells: 2, elevation: 20 }, secret: { id: 'secret', name: 'Secret sentinel', x: 40, y: 40, isHidden: true } };
  const settings = normalizeMapSettings({ mapId: 'map-a', widthCells: 16, heightCells: 12, cellSize: 40, layerConfig: { scene3d: { environment: { visionEnabled: true } } } });
  async function connect(role) {
    const client = io(server.url, { transports: ['websocket'] }); clients.push(client);
    await new Promise((r) => client.once('connect', r));
    const { authToken } = await client.emitWithAck('fixture:join', { role, tokens, mapSettings: settings, character: { id: 'sheet', campaignId: 'fixture-campaign', name: 'Hero', ownerUserId: 'player', createdByUserId: 'gm', permissions: [], sheet: { dataJson: {} } } });
    const actor = { client, authToken, actions: [], chat: [], view: null };
    client.on('action:used', (data) => actor.actions.push(data)); client.on('chat:message', (data) => actor.chat.push(data)); client.on('room:state', (data) => { actor.view = data; });
    const joined = await client.emitWithAck('campaign:join-live', { campaignId: 'fixture-campaign', authToken, playerName: role }); assert.equal(joined.ok, true); actor.view = joined.room; return actor;
  }
  const gm = await connect('gm'), player = await connect('player');
  const poll = async (fn) => { const until = Date.now() + 5000; while (!fn()) { assert.ok(Date.now() < until, 'phase6 server timeout'); await new Promise((r) => setTimeout(r, 10)); } };
  const base = { id: 'attack', name: 'Attack', kind: 'spell', icon: '', description: '', activation: { type: 'action', cost: 1 }, targeting: { shape: 'single_target', rangeFt: 60 }, visual: { color: '#aabbcc', borderColor: '#ffffff', opacity: .2 }, roll: { mode: 'none' } };
  let sequence = 0;
  const emit = (actor, action, extra = {}) => { const payload = { useId: `use-${++sequence}`, roomCode: 'fixture-campaign', authToken: actor.authToken, casterTokenId: 'hero', characterId: 'sheet', action, targeting: { shape: action.targeting.shape, origin: { x: 60, y: 60 }, targetPoint: { x: 160, y: 80 }, affectedTokenIds: ['target'], targetTokenIds: ['target'] }, ...extra }; actor.client.emit('action:use', payload); return payload; };
  Math.random = () => .999;
  for (const [mode, roll, expected] of [
    ['attack_roll', { damage: '1d8+2' }, '1d20'],
    ['damage', { damage: '1d6+2' }, '1d6+2'],
    ['healing', { healing: '1d6+2' }, '1d6+2'],
    ['saving_throw', { damage: '1d6', saveAbility: 'dexterity', saveDc: 14, halfOnSuccess: true }, '1d6'],
  ]) {
    const before = player.chat.length, payload = emit(player, { ...base, name: mode, roll: { mode, ...roll } });
    await poll(() => player.actions.some((a) => a.useId === payload.useId) && player.chat.slice(before).some((m) => m.dice?.expression === expected));
    const used = player.actions.find((a) => a.useId === payload.useId); assert.deepEqual(used.targeting, payload.targeting); assert.equal(used.mapId, 'map-a'); assert.equal('authToken' in used, false);
    if (mode === 'attack_roll') { const dice = player.chat.slice(before).find((m) => m.dice); assert.equal(dice.dice.outcome, 'critical'); assert.equal(dice.followUp.criticalExpression, '2d8+2'); }
    if (mode === 'saving_throw') await poll(() => player.chat.slice(before).some((m) => m.text.includes('quem passou recebe metade')));
    if (mode === 'healing') assert.equal(player.chat.slice(before).find((m) => m.dice).dice.total, 8);
  }
  const persistent = emit(player, { ...base, persistentEffect: { enabled: true, durationTurns: 2 } });
  await poll(() => player.view.activeEffects.some((e) => e.sourceUseId === persistent.useId));
  await server.reload(); await server.publish(); await poll(() => player.view.activeEffects.length === 1);
  server.room().turnState = { active: true, entries: [{ id: 'hero', tokenId: 'hero', name: 'Hero', order: 0, initiative: 20 }, { id: 'other', tokenId: 'secret', name: 'Hidden', order: 1, initiative: 10 }], currentIndex: 1, round: 1 };
  const deniedTurn = emit(player, base); await new Promise((r) => setTimeout(r, 80)); assert.equal(gm.actions.some((a) => a.useId === deniedTurn.useId), false);
  gm.client.emit('turn:next', { roomCode: 'fixture-campaign', authToken: gm.authToken }); await poll(() => player.view.activeEffects[0]?.remainingTurns === 1);
  gm.client.emit('turn:next', { roomCode: 'fixture-campaign', authToken: gm.authToken }); await poll(() => player.view.activeEffects.length === 0);
  server.room().turnState.active = false;
  const secretPayload = emit(player, base, { targeting: { shape: 'single_target', origin: { x: 60, y: 60 }, targetPoint: { x: 60, y: 60 }, targetTokenIds: ['secret'], affectedTokenIds: ['secret'] } });
  await new Promise((r) => setTimeout(r, 80)); assert.equal(gm.actions.some((a) => a.useId === secretPayload.useId), false);
  const gmSecret = emit(gm, { ...base, persistentEffect: { enabled: true, durationTurns: 2 } }, { targeting: secretPayload.targeting });
  await poll(() => gm.actions.some((a) => a.useId === gmSecret.useId)); assert.equal(player.actions.some((a) => a.useId === gmSecret.useId), false); assert.equal(player.view.activeEffects.some((e) => e.sourceUseId === gmSecret.useId), false);
  const count = Object.keys(server.room().tokens).length;
  emit(player, { ...base, summon: { enabled: true, characterId: 'uncontrolled' } }); await new Promise((r) => setTimeout(r, 80)); assert.equal(Object.keys(server.room().tokens).length, count);
  emit(player, { ...base, summon: { enabled: true, characterId: 'sheet' } }); await poll(() => Object.keys(server.room().tokens).length === count + 1);
  const summoned = Object.values(server.room().tokens).find((token) => !tokens[token.id]); assert.equal(summoned.x, 160); assert.equal(summoned.y, 80);
  await poll(() => Boolean(player.view.tokens[summoned.id])); await server.reload(); assert.ok(server.room().tokens[summoned.id]);
  server.room().mapSettings.mapId = 'old-map'; await server.reload(); assert.deepEqual(server.room().activeEffects, []);
  assert.equal(JSON.stringify(player.actions).includes('secret'), false); assert.equal(JSON.stringify(player.chat).includes('Secret sentinel'), false);
});
