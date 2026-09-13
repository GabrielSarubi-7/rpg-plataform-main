import assert from "node:assert/strict";
import test from "node:test";
import { legacyTokenToWorldPosition, worldPositionToLegacyToken, feetToWorldUnits, worldUnitsToFeet, pixelPointToWorld, worldPointToPixels, worldPointToCell, constrainTokenPosition, fitContainedImage, pixelsToWorldUnits } from "../src/features/scene3d/utils/coordinates3d.ts";
import { getUnsupportedSceneLayers } from "../src/features/scene3d/utils/sceneCompatibility.ts";
import { normalizeMapLayerConfig } from "../../../shared/rules/mapRules.ts";
import { getTokenCenter, resolveActionTargeting } from "../../../shared/rules/targetingRules.ts";
import { screenToWorld, worldToScreen } from "../src/features/map/utils/coords.ts";

test("documented 1x1 token: pixels -> cell-centered X/Y/Z -> original token", () => {
  const token = { id: "one", x: 80, y: 120, elevation: 10 };
  const world = legacyTokenToWorldPosition(token, 40);
  assert.deepEqual(world, { x: 2.5, y: 2, z: 3.5 });
  assert.deepEqual(worldPositionToLegacyToken(world, token, 40), { x: 80, y: 120, elevation: 10 });
});
for (const cellSize of [20, 40, 75, 200]) {
  test(`round trip: all token footprints and elevations, cellSize=${cellSize}`, () => {
    for (const widthCells of [1, 2, 3, 4]) for (const heightCells of [1, 2, 3, 4]) for (const elevation of [0, 5, 25, 300]) {
      const token = { id: "test", x: cellSize * 3, y: cellSize * 6, widthCells, heightCells, elevation };
      const world = legacyTokenToWorldPosition(token, cellSize);
      assert.equal(world.x, 3 + widthCells / 2);
      assert.equal(world.z, 6 + heightCells / 2);
      assert.deepEqual(worldPositionToLegacyToken(world, token, cellSize), { x: token.x, y: token.y, elevation });
    }
  });
}
test("elevation and point/cell conversions preserve the legacy domain", () => {
  assert.equal(feetToWorldUnits(15), 3);
  assert.equal(worldUnitsToFeet(3), 15);
  assert.deepEqual(worldPointToCell({ x: 8.25, y: 300, z: 11.5 }), { col: 8, row: 11 });
  assert.deepEqual(worldPointToPixels({ x: 8.25, y: 300, z: 11.5 }, 40), { x: 330, y: 460 });
  for (const invalid of [0, -1, NaN, Infinity]) assert.throws(() => pixelsToWorldUnits(40, invalid), RangeError);
});
test("drag uses legacy snap and clamps the entire 2x3 footprint", () => {
  const token = { id: "big", x: 0, y: 0, widthCells: 2, heightCells: 3 };
  assert.deepEqual(constrainTokenPosition({ x: 62, y: 99 }, token, 40, 400, 320), { x: 80, y: 80 });
  assert.deepEqual(constrainTokenPosition({ x: 999, y: 999 }, token, 40, 400, 320), { x: 320, y: 200 });
  assert.deepEqual(constrainTokenPosition({ x: -99, y: -99 }, token, 40, 400, 320), { x: 0, y: 0 });
});
test("background matches contain and centered letterboxing in both orientations", () => {
  assert.deepEqual(fitContainedImage(20, 10, 100, 100), { width: 10, height: 10, x: 5, y: 0 });
  assert.deepEqual(fitContainedImage(10, 20, 200, 100), { width: 10, height: 5, x: 0, y: 7.5 });
});
test("legacy layers render in 3D without changing map data, painting remains in 2D", () => {
  const layer = normalizeMapLayerConfig();
  assert.deepEqual(getUnsupportedSceneLayers(layer), []);
  for (const mode of ["hidden_cells", "revealed_cells"]) {
    const fog = { ...layer, fogOfWar: { ...layer.fogOfWar, enabled: true, mode } };
    assert.deepEqual(getUnsupportedSceneLayers(fog), []);
  }
  const populated = { ...layer, terrainCells: { "0:0": {} }, walls: [{}], objects: [{}], images: [{}] };
  const before = JSON.stringify(populated);
  assert.equal(getUnsupportedSceneLayers(populated, 1, true).length, 1);
  assert.equal(JSON.stringify(populated), before);
});
const tokens = {
  caster: { id: "caster", x: 80, y: 120, elevation: 30 },
  near: { id: "near", x: 160, y: 120, elevation: 0 },
  far: { id: "far", x: 400, y: 280, widthCells: 2, heightCells: 2, elevation: 100 },
};
for (const shape of ["self", "self_emanation", "single_target", "melee_reach", "ranged_projectile", "point_sphere", "cone", "line", "cube", "cylinder"]) {
  test(`targeting bridge preserves full 2D result: ${shape}`, () => {
    const action = { targeting: { shape, rangeFt: 60, normalRangeFt: 30, longRangeFt: 60, radiusFt: 15, reachFt: 10, lengthFt: 30, widthFt: 10, sizeFt: 20 } };
    for (const requestedPoint of [{ x: 180, y: 140 }, { x: 440, y: 320 }, { x: 950, y: 850 }]) {
      const input = { action, tokens, casterTokenId: "caster", origin: getTokenCenter(tokens.caster, 40), requestedPoint, tokenSize: 40, pixelsPerFoot: 8 };
      const raycast = pixelPointToWorld(requestedPoint, 40, 250);
      assert.deepEqual(resolveActionTargeting({ ...input, requestedPoint: worldPointToPixels(raycast, 40) }), resolveActionTargeting(input));
    }
  });
}
test("legacy 2D and 2.5D projection round trips remain equivalent", () => {
  for (const pitch of [0, 20, 60]) for (const yaw of [0, 35, 90]) {
    const camera = { centerX: 400, centerY: 300, zoom: 2, pitch, yaw };
    const screen = worldToScreen(180, 140, camera, 1280, 720);
    const world = screenToWorld(screen.x, screen.y, camera, 1280, 720);
    assert.ok(Math.abs(world.x - 180) < 1e-8 && Math.abs(world.y - 140) < 1e-8);
  }
});
