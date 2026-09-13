// Run against `npm run dev:client`. Playwright may be supplied by the host
// via PLAYWRIGHT_MODULE_PATH; it is not a production dependency.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startSceneSocketFixture } from "../../server/tests/scene3dSocketFixture.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ["--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
const requests = [];
let socketFixture;
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => requests.push(request.url()));
const snapshot = () => page.evaluate(() => window.fixture.snapshot());
async function waitScene(client = page) {
  // Include the renderer's deferred disposal window: an ephemeral first frame
  // is not evidence that a StrictMode remount has survived.
  await pollScene(async () => {
    const s = await window.fixture.scene();
    if (!s?.scene.getObjectByName("token:hero") || !s.internal.active || s.gl.getContext().isContextLost()) return false;
    const canvas = s.gl.domElement;
    canvas.testReadyAt ??= performance.now();
    return s.camera.position.y > 0 && performance.now() - canvas.testReadyAt > 750;
  }, undefined, client);
}
async function pollScene(predicate, argument, client = page) {
  const deadline = Date.now() + 30000;
  while (!await client.evaluate(predicate, argument)) {
    assert.ok(Date.now() < deadline, "scene did not become ready");
    await client.waitForTimeout(50);
  }
}
async function mode(name) {
  await page.getByRole("button", { name, exact: true }).click();
  if (name === "3d") {
    await page.getByRole("button", { name: "Enquadrar mapa" }).waitFor();
    await waitScene();
  } else await page.waitForFunction(() => !document.querySelector("canvas"));
}
async function screenPoint(id, lift = 0.6, client = page) {
  await waitScene(client);
  return client.evaluate(async ({ id, lift }) => {
    const s = await window.fixture.scene();
    s.scene.updateMatrixWorld(true);
    s.camera.updateMatrixWorld(true);
    const object = s.scene.getObjectByName(`token:${id}`);
    const point = object.position.clone(); point.y += lift; point.project(s.camera);
    const rect = s.gl.domElement.getBoundingClientRect();
    return { x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 };
  }, { id, lift });
}
async function drag(id, dx, dy, cancel = false, client = page) {
  const point = await screenPoint(id, 0.6, client);
  await client.mouse.move(point.x, point.y);
  await client.mouse.down();
  await client.mouse.move(point.x + dx, point.y + dy, { steps: 8 });
  if (cancel) await client.keyboard.press("Escape");
  await client.mouse.up();
}
try {
  await page.goto(`${process.env.SCENE3D_TEST_URL || "http://localhost:5173"}/tests/scene3d.browser.html`);
  await page.getByRole("button", { name: "2d", exact: true }).waitFor();
  assert.equal(requests.some((url) => url.includes("Scene3DCanvas.tsx")), false, "3D renderer must not load in 2D");
  const initial = await snapshot();
  await mode("2.5d");
  await mode("3d");
  assert.deepEqual((await snapshot()).tokens, initial.tokens, "switch preserves positions");
  const geometry = await page.evaluate(async () => {
    const s = await window.fixture.scene();
    const hero = s.scene.getObjectByName("token:hero");
    const large = s.scene.getObjectByName("token:large");
    const textures = [];
    hero.traverse((o) => { if (o.material?.map) textures.push(o.material.map.image.src); });
    const ground = s.scene.children.flatMap((o) => o.children).find((o) => o.material?.map && o.geometry?.parameters.width === 16);
    return { hero: hero.position.toArray(), large: large.position.toArray(), textures, sprite: window.fixture.sprite,
      background: { width: ground.geometry.parameters.width, height: ground.geometry.parameters.height, position: ground.position.toArray(), rotation: ground.rotation.x },
      grid: s.scene.children.find((o) => o.type === "LineSegments").geometry.attributes.position.count };
  });
  assert.deepEqual(geometry.hero, [4.5, 0, 5.5]);
  assert.deepEqual(geometry.large, [11, 2, 7]);
  assert.deepEqual(geometry.textures, [geometry.sprite], "standing token prefers sprite25dImage over portrait");
  assert.deepEqual(geometry.background, { width: 16, height: 8, position: [8, 0.005, 6], rotation: -Math.PI / 2 });
  assert.equal(geometry.grid, (17 + 13) * 2);
  await page.evaluate(() => window.fixture.rangedTargeting());
  await pollScene(async () => {
    const s = await window.fixture.scene(); const radii = [];
    s.scene.traverse((o) => { if (o.geometry?.type === "RingGeometry") radii.push(o.geometry.parameters.outerRadius); });
    return radii.includes(6.03) && radii.includes(12.03);
  });
  await page.keyboard.press("Escape");
  for (const button of ["middle", "right"]) {
    const before = await page.evaluate(async () => (await window.fixture.scene()).camera.matrixWorld.toArray());
    await page.mouse.move(900, 700); await page.mouse.down({ button });
    await page.mouse.move(1000, 750, { steps: 10 }); await page.mouse.up({ button });
    await pollScene(async (previous) => (await window.fixture.scene()).camera.matrixWorld.toArray().some((v, i) => Math.abs(v - previous[i]) > 0.1), before);
    await page.getByRole("button", { name: "Enquadrar mapa" }).click();
  }
  await page.getByRole("button", { name: "Grid", exact: true }).click();
  assert.equal(await page.evaluate(async () => (await window.fixture.scene()).scene.children.find((o) => o.type === "LineSegments").visible), false);
  await page.getByRole("button", { name: "Grid", exact: true }).click();
  const hero = await screenPoint("hero");
  await page.mouse.click(hero.x, hero.y);
  assert.equal((await snapshot()).selected, "hero");
  const beforeFocus = await page.evaluate(async () => (await window.fixture.scene()).camera.position.toArray());
  await page.getByRole("button", { name: "Focar token" }).click();
  await pollScene(async (before) => (await window.fixture.scene()).camera.position.toArray().some((v, i) => Math.abs(v - before[i]) > 0.5), beforeFocus);
  await page.getByRole("button", { name: "Enquadrar mapa" }).click();
  await drag("hero", 95, -30);
  const moved = (await snapshot()).tokens.hero;
  assert.notEqual(moved.x, initial.tokens.hero.x);
  assert.equal(moved.x % 40, 0); assert.equal(moved.y % 40, 0);
  assert.equal(await page.evaluate(() => window.fixture.emissions.filter((e) => e.event === "token:move").length), 1);
  await drag("hero", 80, 40, true);
  assert.deepEqual((await snapshot()).tokens.hero, moved, "Escape cancels drag");
  const menuPoint = await screenPoint("hero");
  await page.mouse.click(menuPoint.x, menuPoint.y, { button: "right" });
  await page.getByRole("button", { name: "+5", exact: true }).click();
  assert.equal((await snapshot()).tokens.hero.elevation, 5);
  assert.equal(await page.evaluate(() => window.fixture.emissions.filter((e) => e.event === "token:visual:update").length), 1);
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.evaluate(() => window.fixture.token("hero", { standMode: "flat" }));
  const flatImage = await page.evaluate(async () => {
    const s = await window.fixture.scene(); let image;
    s.scene.getObjectByName("token:hero").traverse((o) => { if (o.material?.map) image = o.material.map.image.src; });
    return { image, portrait: window.fixture.portrait };
  });
  assert.equal(flatImage.image, flatImage.portrait, "flat token uses its regular portrait");
  await page.evaluate(() => window.fixture.token("hero", { standMode: "billboard" }));
  const cameraBefore = await page.evaluate(async () => (await window.fixture.scene()).camera.position.toArray());
  await page.mouse.move(640, 650); await page.mouse.wheel(0, -250);
  await pollScene(async (before) => (await window.fixture.scene()).camera.position.toArray().some((v, i) => Math.abs(v - before[i]) > 0.1), cameraBefore);
  await page.getByRole("button", { name: "Enquadrar mapa" }).click();
  await page.evaluate(() => { window.fixture.role("player"); window.fixture.turn("large"); });
  const blocked = (await snapshot()).tokens.hero;
  await drag("hero", 80, 30);
  assert.deepEqual((await snapshot()).tokens.hero, blocked, "out of turn blocked");
  await page.evaluate(() => window.fixture.turn("hero"));
  await drag("hero", -70, 35);
  assert.notDeepEqual((await snapshot()).tokens.hero, blocked, "authorized current player can move");
  const large = (await snapshot()).tokens.large;
  await drag("large", 100, 40);
  assert.deepEqual((await snapshot()).tokens.large, large, "player cannot move unowned token");
  await page.evaluate(() => window.fixture.targeting());
  const target = await screenPoint("large");
  await page.mouse.move(target.x, target.y);
  assert.deepEqual((await snapshot()).mouse, { x: large.x + 40, y: large.y + 40 });
  await page.mouse.click(target.x, target.y);
  const action = await page.evaluate(() => window.fixture.emissions.findLast((e) => e.event === "action:use"));
  assert.ok(action?.payload.targeting.affectedTokenIds.includes("large"));
  await page.keyboard.press("Escape");
  await page.evaluate(() => { window.fixture.role("gm"); window.fixture.privateMap(true); });
  await waitScene();
  const count = await page.evaluate(() => window.fixture.emissions.length);
  await drag("hero", 80, 30);
  assert.equal(await page.evaluate(() => window.fixture.emissions.length), count, "private GM map must not broadcast to live map");
  await page.evaluate(() => window.fixture.privateMap(false));
  await drag("large", 1500, 900);
  const clamped = (await snapshot()).tokens.large;
  assert.equal(clamped.x, 560); assert.equal(clamped.y, 400);
  await drag("large", -1500, -600);
  const clampedTop = (await snapshot()).tokens.large;
  assert.equal(clampedTop.x, 0); assert.equal(clampedTop.y, 0);
  const beforeSwitch = (await snapshot()).tokens;
  await mode("2d"); await mode("2.5d"); await mode("3d"); await mode("2d");
  assert.deepEqual((await snapshot()).tokens, beforeSwitch);
  await mode("3d");
  if (process.env.SCENE3D_SCREENSHOT) await page.screenshot({ path: process.env.SCENE3D_SCREENSHOT });
  await page.evaluate(() => window.fixture.fog(true));
  await waitScene();
  assert.equal(await page.locator("canvas").count(), 1, "fog is supported in 3D");
  assert.deepEqual(errors, [], "no runtime errors during gameplay/switching");
  await page.evaluate(() => { window.fixture.fog(false); window.fixture.layers({ objects: [{ id: "unsupported-object", x: 1, y: 1 }] }); window.fixture.mode("3d"); });
  await waitScene();
  assert.equal(await page.locator("canvas").count(), 1, "legacy objects are supported");
  await page.evaluate(() => window.fixture.layers({}));
  await waitScene();
  await page.evaluate(() => { window.fixture.fog(false); window.fixture.background("/missing-scene-test-image.png"); window.fixture.mode("3d"); });
  await page.getByRole("status").filter({ hasText: "Não foi possível abrir" }).waitFor();
  await page.getByRole("button", { name: "Voltar ao 2D" }).click();
  assert.equal((await snapshot()).mode, "2d");
  const expectedAssetErrors = errors.splice(0);
  assert.ok(expectedAssetErrors.length && expectedAssetErrors.every((error) => error.includes("missing-scene-test-image.png")));
  await page.evaluate(() => window.fixture.background(window.fixture.originalBackground));
  socketFixture = await startSceneSocketFixture();
  await page.evaluate((url) => window.fixture.connect(url, "gm"), socketFixture.url);
  const peer = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  peer.on("pageerror", (error) => errors.push(error.message));
  await peer.goto(`${process.env.SCENE3D_TEST_URL || "http://localhost:5173"}/tests/scene3d.browser.html`);
  await peer.evaluate((url) => window.fixture.connect(url, "player"), socketFixture.url);
  await mode("3d");
  await drag("hero", 100, 40);
  const networkMove = (await snapshot()).tokens.hero;
  await peer.waitForFunction((token) => window.fixture.snapshot().tokens.hero.x === token.x && window.fixture.snapshot().tokens.hero.y === token.y, networkMove);
  const point = await screenPoint("hero");
  await page.mouse.click(point.x, point.y, { button: "right" });
  await page.getByRole("button", { name: "+5", exact: true }).click();
  const networkVisual = (await snapshot()).tokens.hero;
  await peer.waitForFunction((elevation) => window.fixture.snapshot().tokens.hero.elevation === elevation, networkVisual.elevation);
  await peer.getByRole("button", { name: "3d", exact: true }).click();
  await peer.reload();
  await peer.evaluate((url) => window.fixture.connect(url, "player"), socketFixture.url);
  await peer.getByRole("button", { name: "Enquadrar mapa" }).waitFor();
  assert.equal(await peer.evaluate(() => window.fixture.snapshot().mode), "3d", "3D preference survives reload");
  assert.deepEqual(await peer.evaluate(() => window.fixture.snapshot().tokens.hero), networkVisual, "reload receives authoritative token state");
  assert.equal(socketFixture.persisted.hero.x, networkVisual.x);
  assert.equal(socketFixture.persisted.hero.y, networkVisual.y);
  assert.equal(socketFixture.persisted.hero.elevation, networkVisual.elevation);
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await mode("2d");
  await drag("hero", -80, -20, false, peer);
  const playerMove = await peer.evaluate(() => window.fixture.snapshot().tokens.hero);
  assert.notDeepEqual(playerMove, networkVisual, "authorized player moves in 3D");
  await page.waitForFunction((token) => window.fixture.snapshot().tokens.hero.x === token.x && window.fixture.snapshot().tokens.hero.y === token.y, playerMove);
  await mode("3d");
  const emissionsBeforePrivate = (await page.evaluate(() => window.fixture.emissions)).length;
  await page.evaluate(() => window.fixture.privateMap(true));
  await drag("hero", -60, -30);
  assert.equal((await page.evaluate(() => window.fixture.emissions)).length, emissionsBeforePrivate);
  assert.deepEqual(await peer.evaluate(() => window.fixture.snapshot().tokens.hero), playerMove, "private GM drag does not reach the other browser");
  await page.evaluate(() => window.fixture.privateMap(false));
  socketFixture.room().annotations = { secret: { id: "secret", visibility: "gm", type: "text", text: "GM secret", x: 0, y: 0, color: "#fff", fontSize: 18 } };
  socketFixture.publish();
  await page.getByText("GM secret", { exact: true }).waitFor();
  assert.equal((await snapshot()).annotations.secret.text, "GM secret");
  assert.deepEqual(await peer.evaluate(() => window.fixture.snapshot().annotations), {}, "GM annotation never enters player state");
  await waitScene(peer);
  assert.deepEqual(errors, []);
  await peer.close();
  console.log("PASS: lazy load, StrictMode, switching, geometry/background/grid, sprite/flat/billboard, orbit/pan/zoom, coordinates, selection, drag, snap, clamp 2x2, cancel, elevation/menu, GM/player/turn, targeting, private map isolation, fog/secret layer guards, asset error fallback, two browser clients via real Socket.IO handlers, persistence adapter calls, reload.");
} catch (error) {
  console.log("Fixture screen:", await page.locator("body").innerText());
  if (process.env.SCENE3D_SCREENSHOT) await page.screenshot({ path: process.env.SCENE3D_SCREENSHOT });
  throw error;
} finally {
  if (errors.length) console.log("Browser errors:", errors);
  await browser.close();
  await socketFixture?.close();
}
