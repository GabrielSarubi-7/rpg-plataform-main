import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { startSceneSocketFixture } from '../../server/tests/scene3dSocketFixture.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const server = await startSceneSocketFixture();
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ['--enable-unsafe-swiftshader'] });
const errors = [];
const url = `${process.env.SCENE3D_TEST_URL || 'http://localhost:5176'}/tests/scene3d.browser.html`;
async function poll(page, fn, argument) { const end = Date.now() + 20000; while (!await page.evaluate(fn, argument)) { assert.ok(Date.now() < end, 'phase6 browser timeout'); await page.waitForTimeout(50); } }
async function connect(page, role) {
  await page.waitForFunction(() => Boolean(window.fixture));
  await page.evaluate(async ({ url, role }) => { await window.fixture.connect(url, role); window.fixture.enableEditor(); window.fixture.mode('3d'); }, { url: server.url, role });
  await server.publish(); await poll(page, async () => Boolean((await window.fixture.scene())?.scene.getObjectByName('token:hero')));
}
async function open(role) { const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } }); page.on('pageerror', (error) => errors.push(error.message)); await page.route('**/campaigns/*/characters', async (route) => route.fulfill({ json: { ok: true, characters: await page.evaluate(() => window.fixture.characters()) } })); await page.goto(url); await connect(page, role); return page; }
async function screen(page, id) { return page.evaluate(async (id) => { const s = await window.fixture.scene(), o = s.scene.getObjectByName(`token:${id}`); const point = o.position.clone(); point.y += .1; point.project(s.camera); const rect = s.gl.domElement.getBoundingClientRect(); return { x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 }; }, id); }
const base = { id: 'phase6', name: 'Phase 6', kind: 'spell', description: '', icon: '', activation: { type: 'action', cost: 1 }, resourceCosts: [], roll: { mode: 'healing', healing: '1d6+2' }, targeting: { shape: 'point_sphere', rangeFt: 120, normalRangeFt: 30, longRangeFt: 120, radiusFt: 10, lengthFt: 20, widthFt: 5, sizeFt: 15, heightFt: 10, reachFt: 10, showCasterRange: true, showPathLine: true, showImpactArea: true }, visual: { color: '#9944ff', borderColor: '#eeeeff', opacity: .25 } };
try {
  const gm = await open('gm'), player = await open('player');
  for (const shape of ['self', 'self_emanation', 'single_target', 'melee_reach', 'ranged_projectile', 'point_sphere', 'cone', 'line', 'cube', 'cylinder']) {
    await gm.evaluate(({ action, shape }) => window.fixture.action({ ...action, targeting: { ...action.targeting, shape } }, { x: 440, y: 280 }), { action: base, shape });
    await poll(gm, async (shape) => Boolean((await window.fixture.scene()).scene.getObjectByName(`action-volume:${shape}`)), shape);
  }
  await gm.evaluate(() => window.fixture.cancelAction());
  await player.evaluate((action) => window.fixture.action(action), base);
  await poll(player, async () => Boolean((await window.fixture.scene()).scene.getObjectByName('action-volume:point_sphere')));
  const aim = await screen(player, 'large'); await player.mouse.click(aim.x, aim.y);
  try { await poll(player, () => window.fixture.emissions.some((e) => e.event === 'action:use')); } catch (error) { console.log('Confirmation diagnostics', errors, await player.locator('body').innerText(), await player.evaluate(() => window.fixture.emissions)); throw error; }
  const payload = await player.evaluate(() => window.fixture.emissions.find((e) => e.event === 'action:use').payload);
  for (const page of [gm, player]) await poll(page, async (id) => Boolean((await window.fixture.scene()).scene.getObjectByName(`action-burst:${id}`)), payload.useId);
  await player.getByText('Combate — resultados do chat', { exact: true }).click();
  await player.getByText(/rolou Cura/).waitFor();
  await player.evaluate(async (id) => { window.phase6Disposed = 0; const root = (await window.fixture.scene()).scene.getObjectByName(`action-burst:${id}`); root.traverse((o) => o.geometry?.addEventListener('dispose', () => window.phase6Disposed++)); }, payload.useId);
  await poll(player, async (id) => !(await window.fixture.scene()).scene.getObjectByName(`action-burst:${id}`), payload.useId);
  await poll(player, () => window.phase6Disposed > 0);
  await player.evaluate(() => window.fixture.cancelAction());
  await player.getByRole('button', { name: 'Medir 3D', exact: true }).click();
  await player.getByLabel('Distância espacial informativa').check();
  const a = await screen(player, 'hero'), b = await screen(player, 'large');
  await player.mouse.click(a.x, a.y); await player.mouse.click(b.x, b.y);
  await player.getByText(/Δ elevação: 10.0 ft/).waitFor();
  await player.getByText(/Espacial \(informativo\)/).waitFor();
  await player.getByRole('button', { name: 'Medir 3D', exact: true }).click();
  await player.evaluate((action) => window.fixture.action({ ...action, persistentEffect: { enabled: true, durationTurns: 2 }, summon: { enabled: true, characterId: 'hero-sheet' } }), base);
  await poll(player, async () => Boolean((await window.fixture.scene()).scene.getObjectByName('action-volume:point_sphere')));
  await player.mouse.click(b.x, b.y);
  await poll(player, () => Object.keys(window.fixture.snapshot().tokens).length === 3);
  assert.equal(server.room().activeEffects.length, 1);
  await player.evaluate(() => window.fixture.cancelAction());
  const before = await player.evaluate(() => window.fixture.snapshot().tokens);
  await player.evaluate(() => window.fixture.mode('2d')); await player.evaluate(() => window.fixture.mode('3d'));
  await poll(player, async () => Boolean((await window.fixture.scene())?.scene.getObjectByName('token:hero')));
  assert.deepEqual(await player.evaluate(() => window.fixture.snapshot().tokens), before);
  const hidden = await gm.evaluate(() => window.fixture.emit('token:perception:update', { tokenId: 'large', visibility: 'public', isHidden: true })); assert.equal(hidden.ok, true);
  await poll(player, async () => !window.fixture.snapshot().tokens.large && !(await window.fixture.scene()).scene.getObjectByName('action-volume:point_sphere'));
  const revealed = await gm.evaluate(() => window.fixture.emit('token:perception:update', { tokenId: 'large', visibility: 'public', isHidden: false })); assert.equal(revealed.ok, true);
  await gm.evaluate(() => window.fixture.privateMap(true)); await poll(gm, async () => { const s = await window.fixture.scene(); return s && !s.scene.getObjectByName('combat-preview3d'); });
  await gm.evaluate(() => window.fixture.privateMap(false));
  await server.reload(); await server.publish(); await player.reload(); await connect(player, 'player');
  assert.equal(Object.keys(await player.evaluate(() => window.fixture.snapshot().tokens)).length, 3);
  await poll(player, async () => Boolean((await window.fixture.scene()).scene.getObjectByName('action-volume:point_sphere')));
  assert.deepEqual(errors, []);
  console.log('PASS phase6 browser: ten previews, actual action confirmation + two-client effects/chat, geometry disposal, measurement/elevation, persistent effect, summon, 3D/2D state, private map and reload.');
} finally { await browser.close(); await server.close(); }
