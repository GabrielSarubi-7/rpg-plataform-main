import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { startSceneSocketFixture } from '../../server/tests/scene3dSocketFixture.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const server = await startSceneSocketFixture();
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ['--enable-unsafe-swiftshader'] });
const errors = [];
const url = `${process.env.SCENE3D_TEST_URL || 'http://localhost:5176'}/tests/scene3d.browser.html`;
async function poll(page, predicate, argument) {
  const end = Date.now() + 20000;
  while (!await page.evaluate(predicate, argument)) { assert.ok(Date.now() < end, 'browser state timed out'); await page.waitForTimeout(50); }
}
async function connect(page, role) {
  await page.waitForFunction(() => Boolean(window.fixture));
  await page.evaluate(async ({ url, role }) => { await window.fixture.connect(url, role); window.fixture.enableEditor(); window.fixture.mode('3d'); }, { url: server.url, role });
  await server.publish();
  try { await poll(page, async () => Boolean((await window.fixture.scene())?.scene.getObjectByName('token:hero'))); }
  catch (error) { console.log('Scene readiness:', errors, await page.locator('body').innerText(), await page.evaluate(() => window.fixture.snapshot())); throw error; }
}
async function open(role) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route('**/campaigns/*/characters', (route) => route.fulfill({ json: { ok: true, characters: [] } }));
  await page.goto(url); await connect(page, role); return page;
}
async function request(page, event, data) {
  const result = await page.evaluate(({ event, data }) => window.fixture.emit(event, data), { event, data });
  assert.equal(result.ok, true, result.error); return result;
}
try {
  const gm = await open('gm'), player = await open('player');
  await gm.getByRole('button', { name: 'Ambiente e visão', exact: true }).click();
  await gm.getByText('Luzes', { exact: true }).click();
  await gm.getByRole('button', { name: 'Adicionar point', exact: true }).click();
  await poll(gm, () => window.fixture.map().layerConfig.scene3d.lights.length === 1);
  await poll(player, () => window.fixture.map().layerConfig.scene3d.lights.length === 1);
  const lightId = server.maps['map-a'].layerConfigJson.scene3d.lights[0].id;
  await gm.getByText('Câmeras salvas', { exact: true }).click();
  await gm.getByRole('button', { name: 'Salvar câmera atual', exact: true }).click();
  await poll(gm, () => window.fixture.map().layerConfig.scene3d.bookmarks.length === 1);
  const bookmark = structuredClone(server.maps['map-a'].layerConfigJson.scene3d.bookmarks[0]);
  for (let i = 0; i < 2; i++) {
    await gm.evaluate(async () => { const s = await window.fixture.scene(); await s.controls.setLookAt(2, 8, 9, 2, 0, 3, false); });
    await gm.getByRole('button', { name: bookmark.name, exact: true }).click();
    await poll(gm, async (b) => { const { camera } = await window.fixture.scene(); return Math.hypot(camera.position.x - b.position.x, camera.position.y - b.position.y, camera.position.z - b.position.z) < .1 && Math.abs(camera.fov - b.fov) < .1; }, bookmark);
  }
  await request(gm, 'scene3d:floor', { floor: { id: 'upper', name: 'Superior', elevation: 3, width: 12, depth: 10 } });
  await gm.getByLabel('Token de visão').selectOption('hero');
  await gm.getByLabel('GM: mostrar todos os andares').uncheck();
  await poll(gm, async () => (await window.fixture.scene()).scene.getObjectByName('floor:upper')?.visible === false);
  await gm.getByLabel('GM: mostrar todos os andares').check();
  await poll(gm, async () => (await window.fixture.scene()).scene.getObjectByName('floor:upper')?.visible === true);
  await request(gm, 'scene3d:object:upsert', { object: { id: 'door45', name: 'Porta teste', kind: 'door', visibility: 'public', transform: { position: { x: 6, z: 5.5 }, rotation: { y: 90 }, scale: { x: 3, y: 3, z: 1 } }, door: { interaction: { allowPlayers: true, rangeFt: 10 } } } });
  await request(gm, 'scene3d:object:upsert', { object: { id: 'secret45', name: 'GM ONLY', visibility: 'gm' } });
  await request(gm, 'token:perception:update', { tokenId: 'large', isHidden: true, visibility: 'public' });
  await request(gm, 'token:perception:update', { tokenId: 'hero', visibility: 'public', vision: { rangeFt: 30 }, light: { enabled: true, type: 'spot', color: '#abcdef', rangeFt: 20 } });
  await request(gm, 'scene3d:environment', { environment: { visionEnabled: true, quality: 'high', shadows: true } });
  await poll(player, () => !window.fixture.snapshot().tokens.large && !window.fixture.map().layerConfig.scene3d.objects.some((o) => o.id === 'secret45'));
  await player.getByRole('button', { name: 'Ambiente e visão', exact: true }).click();
  await player.getByLabel('Token de visão').selectOption('hero');
  await player.getByRole('button', { name: 'open', exact: true }).click();
  await poll(gm, () => window.fixture.map().layerConfig.scene3d.objects.find((o) => o.id === 'door45')?.door.state === 'open');
  await poll(player, async () => { const door = (await window.fixture.scene()).scene.getObjectByName('scene-object:door45'); return Math.abs(door?.children[0]?.rotation.y ?? 0) > 1.5; });
  for (const state of ['closed', 'locked', 'blocked', 'destroyed', 'open']) {
    await request(gm, 'scene3d:door:interact', { objectId: 'door45', state });
    await poll(player, (state) => window.fixture.map().layerConfig.scene3d.objects.find((o) => o.id === 'door45')?.door.state === state, state);
  }
  await server.reload(); await server.publish();
  await gm.reload(); await connect(gm, 'gm');
  await poll(gm, (id) => window.fixture.map().layerConfig.scene3d.lights.some((l) => l.id === id), lightId);
  assert.equal(await gm.evaluate(() => window.fixture.map().layerConfig.scene3d.floors[0].id), 'upper');
  assert.equal(await gm.evaluate(() => window.fixture.snapshot().tokens.hero.light.color), '#abcdef');
  assert.equal(await gm.evaluate(() => window.fixture.map().layerConfig.scene3d.objects.find((o) => o.id === 'door45').door.state), 'open');
  assert.deepEqual(errors, []);
  console.log('PHASE 4/5 browser: two clients, lights, floors, door animation/states, bookmarks, token perception, secrecy and reload passed.');
} finally { await browser.close(); await server.close(); }
