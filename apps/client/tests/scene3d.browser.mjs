// Run against `npm run dev:client`. Playwright may be supplied by the host
// via PLAYWRIGHT_MODULE_PATH; it is not a production dependency.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined, args: ["--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
const requests = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => requests.push(request.url()));
const snapshot = () => page.evaluate(() => window.fixture.snapshot());
async function mode(name) {
  await page.getByRole("button", { name, exact: true }).click();
  if (name === "3d") {
    await page.getByRole("button", { name: "Enquadrar mapa" }).waitFor();
    await page.waitForFunction(async () => {
      const s = await window.fixture.scene();
      return !!s?.scene.getObjectByName("token:hero") && s.camera.position.y > 0;
    });
  } else await page.waitForFunction(() => !document.querySelector("canvas"));
}
async function screenPoint(id, lift = 0.6) {
  return page.evaluate(async ({ id, lift }) => {
    const s = await window.fixture.scene();
    s.scene.updateMatrixWorld(true);
    s.camera.updateMatrixWorld(true);
    const object = s.scene.getObjectByName(`token:${id}`);
    const point = object.position.clone(); point.y += lift; point.project(s.camera);
    const rect = s.gl.domElement.getBoundingClientRect();
    return { x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 };
  }, { id, lift });
}
async function drag(id, dx, dy, cancel = false) {
  const point = await screenPoint(id);
  await page.mouse.move(point.x, point.y);
  await page.mouse.down();
  await page.mouse.move(point.x + dx, point.y + dy, { steps: 8 });
  if (cancel) await page.keyboard.press("Escape");
  await page.mouse.up();
}
try {
  await page.goto(`${process.env.SCENE3D_TEST_URL || "http://localhost:5173"}/tests/scene3d.browser.html`);
  await page.getByRole("button", { name: "2d", exact: true }).waitFor();
  assert.equal(requests.some((url) => url.includes("Scene3DCanvas.tsx")), false, "3D renderer must not load in 2D");
  const initial = await snapshot();
  await mode("2.5d");
  await mode("3d");
  assert.deepEqual((await snapshot()).tokens, initial.tokens, "switch preserves positions");
  const hero = await screenPoint("hero");
  await page.mouse.click(hero.x, hero.y);
  assert.equal((await snapshot()).selected, "hero");
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
  const cameraBefore = await page.evaluate(async () => (await window.fixture.scene()).camera.position.toArray());
  await page.mouse.move(640, 650); await page.mouse.wheel(0, -250);
  await page.waitForFunction(async (before) => (await window.fixture.scene()).camera.position.toArray().some((v, i) => Math.abs(v - before[i]) > 0.1), cameraBefore);
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
  await page.waitForFunction(async () => !!(await window.fixture.scene())?.scene.getObjectByName("token:hero"));
  const count = await page.evaluate(() => window.fixture.emissions.length);
  await drag("hero", 80, 30);
  assert.equal(await page.evaluate(() => window.fixture.emissions.length), count, "private GM map must not broadcast to live map");
  await page.evaluate(() => window.fixture.privateMap(false));
  const beforeSwitch = (await snapshot()).tokens;
  await mode("2d"); await mode("2.5d"); await mode("3d"); await mode("2d");
  assert.deepEqual((await snapshot()).tokens, beforeSwitch);
  await mode("3d");
  if (process.env.SCENE3D_SCREENSHOT) await page.screenshot({ path: process.env.SCENE3D_SCREENSHOT });
  await page.evaluate(() => window.fixture.fog(true));
  await page.getByRole("status").filter({ hasText: "Fog of War" }).waitFor();
  assert.equal(await page.locator("canvas").count(), 0, "fog must unmount 3D");
  await page.getByRole("button", { name: "Voltar ao 2D" }).click();
  assert.equal((await snapshot()).mode, "2d");
  assert.deepEqual(errors, [], "no runtime errors during gameplay/switching");
  await page.evaluate(() => { window.fixture.fog(false); window.fixture.background("/missing-scene-test-image.png"); window.fixture.mode("3d"); });
  await page.getByRole("status").filter({ hasText: "Não foi possível abrir" }).waitFor();
  await page.getByRole("button", { name: "Voltar ao 2D" }).click();
  assert.equal((await snapshot()).mode, "2d");
  console.log("PASS: lazy load, StrictMode, switching, coordinates, selection, drag, snap, cancel, elevation/menu, zoom, GM/player/turn, targeting, private map isolation, fog guard, asset error fallback.");
} catch (error) {
  console.log("Fixture screen:", await page.locator("body").innerText());
  if (process.env.SCENE3D_SCREENSHOT) await page.screenshot({ path: process.env.SCENE3D_SCREENSHOT });
  throw error;
} finally {
  if (errors.length) console.log("Browser errors:", errors);
  await browser.close();
}
