import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startSceneSocketFixture } from "../../server/tests/scene3dSocketFixture.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const server = await startSceneSocketFixture();
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ['--enable-unsafe-swiftshader'] });
const errors = [];
const url = `${process.env.SCENE3D_TEST_URL || 'http://localhost:5173'}/tests/scene3d.browser.html`;
async function open(role) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/campaigns/*/characters', (route) => route.fulfill({ json: { ok: true, characters: [] } }));
  await page.route('**/assets**', async (route) => {
    const request = route.request(), pathname = new URL(request.url()).pathname;
    if (!pathname.startsWith('/assets')) return route.continue();
    const response = await route.fetch({ url: `${server.url}${pathname}` }); await route.fulfill({ response });
  });
  await page.goto(url); await page.waitForFunction(() => Boolean(window.fixture));
  await page.evaluate(async ({ url, role }) => { await window.fixture.connect(url, role); window.fixture.enableEditor(); window.fixture.mode('3d'); }, { url: server.url, role });
  await ready(page); return page;
}
async function poll(page, fn, argument) {
  const end = Date.now() + 20000;
  while (!await page.evaluate(fn, argument)) { assert.ok(Date.now() < end, 'Browser condition timed out'); await page.waitForTimeout(50); }
}
async function ready(page) { await poll(page, async () => { const s = await window.fixture.scene(); return s?.internal.active && s.scene.getObjectByName('token:hero') && !s.gl.getContext().isContextLost(); }); }
const saved = (page) => page.getByRole('status').filter({ hasText: 'Salvo no servidor.' }).waitFor();
function triangleGlb() {
  const json = { asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0 }], meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }], buffers: [{ byteLength: 36 }], bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: 36 }], accessors: [{ bufferView: 0, componentType: 5126, count: 3, type: 'VEC3', min: [0, 0, 0], max: [1, 1, 0] }] };
  const raw = Buffer.from(JSON.stringify(json)), padded = Math.ceil(raw.length / 4) * 4, result = Buffer.alloc(28 + padded + 36);
  result.writeUInt32LE(0x46546c67, 0); result.writeUInt32LE(2, 4); result.writeUInt32LE(result.length, 8); result.writeUInt32LE(padded, 12); result.writeUInt32LE(0x4e4f534a, 16); result.fill(32, 20, 20 + padded); raw.copy(result, 20);
  result.writeUInt32LE(36, 20 + padded); result.writeUInt32LE(0x004e4942, 24 + padded);
  [0, 0, 0, 1, 0, 0, 0, 1, 0].forEach((v, i) => result.writeFloatLE(v, 28 + padded + i * 4)); return result;
}
let gm, player;
try {
  gm = await open('gm'); player = await open('player');
  assert.equal(await player.getByRole('button', { name: 'Editor 3D', exact: true }).count(), 0);
  await gm.getByRole('button', { name: 'Editor 3D', exact: true }).click();
  await gm.getByRole('button', { name: 'Caixa', exact: true }).click(); await saved(gm);
  const firstId = await gm.evaluate(() => window.fixture.map().layerConfig.scene3d.objects[0].id);
  await poll(player, (id) => window.fixture.map().layerConfig.scene3d.objects.some((o) => o.id === id), firstId);
  await gm.getByLabel('Nome do objeto').fill('Mesa de teste');
  await gm.getByLabel('position-x').fill('7'); await gm.getByLabel('position-y').fill('1'); await gm.getByLabel('rotation-y').fill('45'); await gm.getByLabel('scale-x').fill('2');
  await gm.getByRole('button', { name: 'Aplicar inspector' }).click(); await saved(gm);
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects[0].transform.rotation.y, 45);
  // Drive the real TransformControls using its visible X handle and physical pointer input.
  await gm.getByRole('button', { name: 'Mover', exact: true }).click();
  const handle = await gm.evaluate(async () => {
    const s = await window.fixture.scene(); s.scene.updateMatrixWorld(true);
    let control; s.scene.traverse((o) => { if (o.userData.editorControls) control = o.userData.editorControls; });
    if (!control) throw new Error('TransformControls missing');
    const gizmo = control._gizmo;
    const arrows = gizmo.gizmo.translate.children.filter((o) => o.name === 'X' && o.geometry?.type === 'CylinderGeometry');
    const arrow = arrows[0] ?? gizmo.gizmo.translate.children.find((o) => o.name === 'X');
    arrow.geometry.computeBoundingBox();
    const point = arrow.geometry.boundingBox.getCenter(arrow.position.clone()).applyMatrix4(arrow.matrixWorld).project(s.camera), rect = s.gl.domElement.getBoundingClientRect();
    return { x: (point.x + 1) * rect.width / 2 + rect.left, y: (1 - point.y) * rect.height / 2 + rect.top };
  });
  const beforeRevision = server.maps['map-a'].layerConfigJson.scene3d.revision;
  await gm.mouse.move(handle.x, handle.y); await gm.mouse.down(); await gm.mouse.move(handle.x + 65, handle.y, { steps: 10 });
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.revision, beforeRevision, 'drag preview is local until pointer up');
  await gm.mouse.up();
  await poll(gm, (revision) => window.fixture.map().layerConfig.scene3d.revision > revision, beforeRevision);
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects[0].transform.position.x % 1, 0, 'gizmo translation snaps');
  await gm.getByRole('button', { name: 'Duplicar', exact: true }).click(); await saved(gm);
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects.length, 2);
  await gm.getByRole('button', { name: 'Deletar', exact: true }).click(); await saved(gm);
  assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects.length, 1);
  await gm.getByLabel('Objetos 3D').selectOption(firstId);
  await gm.getByLabel('Visibilidade', { exact: true }).selectOption('gm'); await gm.getByRole('button', { name: 'Aplicar inspector' }).click(); await saved(gm);
  await poll(player, () => window.fixture.map().layerConfig.scene3d.objects.length === 0);
  await poll(player, async (id) => !(await window.fixture.scene()).scene.getObjectByName(`scene-object:${id}`), firstId);
  // Real upload route + signature checking + SHA-256 dedup + loader.
  const file = { name: 'triangle.glb', mimeType: 'model/gltf-binary', buffer: triangleGlb() };
  await gm.getByLabel('Adicionar GLB', { exact: true }).setInputFiles(file);
  await gm.getByText('Modelo adicionado.', { exact: true }).waitFor(); await saved(gm);
  const model = server.maps['map-a'].layerConfigJson.scene3d.objects.find((o) => o.kind === 'model');
  assert.match(model.assetUrl, /^\/assets\/[a-f0-9]{64}\.glb$/);
  await poll(gm, async (id) => { const g = (await window.fixture.scene()).scene.getObjectByName(`scene-object:${id}`); let found = false; g?.traverse((o) => { if (o.isMesh && o.geometry.attributes.position.count === 3) found = true; }); return found; }, model.id);
  await gm.getByLabel('Adicionar GLB', { exact: true }).setInputFiles(file); await gm.getByText('Modelo adicionado.', { exact: true }).waitFor(); await saved(gm);
  const models = server.maps['map-a'].layerConfigJson.scene3d.objects.filter((o) => o.kind === 'model'); assert.equal(models.length, 2); assert.equal(models[0].assetUrl, models[1].assetUrl);
  await gm.getByLabel('Adicionar GLB', { exact: true }).setInputFiles({ name: 'bad.glb', mimeType: 'application/octet-stream', buffer: Buffer.from('not a model') });
  await gm.getByText(/GLB inválido/).waitFor(); assert.equal(server.maps['map-a'].layerConfigJson.scene3d.objects.length, 3);
  await gm.evaluate(async () => {
    const sample = window.fixture.map().layerConfig.scene3d.objects.find((o) => o.kind === 'model');
    await window.fixture.emit('scene3d:object:upsert', { object: { ...sample, id: 'missing-model', assetUrl: `/assets/${'f'.repeat(64)}.glb` } });
  });
  await poll(gm, async () => (await window.fixture.scene()).scene.getObjectByName('scene-object:missing-model')?.getObjectByName('model-error-placeholder'));
  await gm.evaluate(() => window.fixture.emit('scene3d:object:remove', { objectId: 'missing-model' }));
  const persisted = structuredClone(server.maps['map-a'].layerConfigJson.scene3d);
  // Edit terrain/Fog via the actual legacy save socket while stale scene3d is absent.
  await gm.evaluate(async () => {
    const current = window.fixture.map();
    await window.fixture.emit('map:settings:update', { settings: { ...current, layerConfig: { version: 1, terrainCells: { '1:1': { x: 1, y: 1, height: 10, type: 'grass' }, '2:1': { x: 2, y: 1, height: -5, type: 'stone' } }, walls: [{ id: 'wall', x: 1, y: 1, height: 10, material: 'stone', orientation: 'horizontal' }], objects: [{ id: 'tree', x: 3, y: 1, widthCells: 1, heightCells: 1, elevation: 0, height: 10, type: 'tree' }], images: [{ id: 'image', x: 40, y: 160, width: 80, height: 80, image: window.fixture.portrait }], fogOfWar: { enabled: true, mode: 'hidden_cells', cells: { '0:0': true }, opacity: 0.5 } } } });
  });
  assert.deepEqual(server.maps['map-a'].layerConfigJson.scene3d, persisted);
  await poll(gm, async () => { const s = (await window.fixture.scene()).scene; return s.getObjectByName('terrain3d')?.count === 2 && s.getObjectByName('walls3d')?.count === 1 && s.getObjectByName('legacy-cones')?.count === 1 && s.getObjectByName('fog3d')?.count === 1; });
  if (process.env.SCENE3D_SCREENSHOT) await gm.screenshot({ path: process.env.SCENE3D_SCREENSHOT });
  await gm.getByRole('button', { name: 'Salvar', exact: true }).click(); await saved(gm);
  await gm.reload(); await gm.waitForFunction(() => Boolean(window.fixture));
  await gm.evaluate(async (url) => { await window.fixture.connect(url, 'gm'); window.fixture.enableEditor(); window.fixture.mode('3d'); }, server.url); await ready(gm);
  assert.deepEqual(await gm.evaluate(() => JSON.parse(JSON.stringify(window.fixture.map().layerConfig.scene3d))), persisted);
  const activeBeforePrivate = structuredClone(server.room().mapSettings.layerConfig.scene3d);
  await poll(gm, async () => {
    const scene = (await window.fixture.scene()).scene;
    let geometry;
    scene.traverse((o) => { if (o.isMesh && o.geometry.attributes.position.count === 3) geometry = o.geometry; });
    if (!geometry) return false;
    window.modelDisposals = 0;
    geometry.addEventListener('dispose', () => window.modelDisposals++);
    return true;
  });
  await gm.evaluate(() => window.fixture.privateMap(true)); await ready(gm);
  await gm.getByRole('button', { name: 'Editor 3D', exact: true }).click(); await gm.getByRole('button', { name: 'Pilar', exact: true }).click(); await saved(gm);
  assert.equal(server.maps['map-private'].layerConfigJson.scene3d.objects.length, 1);
  await poll(gm, () => window.modelDisposals > 0);
  assert.deepEqual(server.room().mapSettings.layerConfig.scene3d, activeBeforePrivate);
  server.publish(); await gm.waitForTimeout(100);
  assert.equal(await gm.evaluate(() => window.fixture.map().mapId), 'map-private', 'live room update must not replace private editor');
  assert.deepEqual(errors, []);
  console.log('PASS: Phase 2 legacy layers/instancing/Fog; Phase 3 editor CRUD, inspector, real gizmo drag/snap, secure GLB upload/dedup/load/rejection, two browsers, secret filtering, stale 2D/Fog save preservation, reload and private-map isolation. PostgreSQL adapter mocked.');
} catch (error) {
  if (gm) { console.log(await gm.locator('body').innerText()); if (process.env.SCENE3D_SCREENSHOT) await gm.screenshot({ path: process.env.SCENE3D_SCREENSHOT }); }
  console.log('Browser errors:', errors); throw error;
} finally { await browser.close(); await server.close(); }
