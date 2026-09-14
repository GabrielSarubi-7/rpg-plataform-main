import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeMapSettings, filterMapSettingsForPlayers } from '../../../shared/rules/mapRules';
import { normalizeScene3DConfig } from '../../../shared/rules/scene3dRules';
import { createVisibility, movementBlocked } from '../../../shared/rules/visibilityRules';
import { normalizeVision, normalizeTokenLight, tokenPerceptionFromDb } from '../../../shared/rules/sceneEnvironmentRules';
import type { Token } from '../../../shared/types/token';

const hero: Token = { id: 'hero', x: 40, y: 80, vision: normalizeVision({ rangeFt: 30 }) };
function settings(objects: unknown[] = [], extra = {}) {
  return normalizeMapSettings({ widthCells: 16, heightCells: 12, cellSize: 40, layerConfig: { scene3d: normalizeScene3DConfig({ objects, environment: { visionEnabled: true }, ...extra }) } } as never);
}
const door = { id: 'door', kind: 'door', visibility: 'public', transform: { position: { x: 3, y: 0, z: 2.5 }, rotation: { y: 90 }, scale: { x: 2, y: 3, z: 0.15 } } };
const target = { x: 4.5, y: 0.5, z: 2.5 };
test('door states block LOS and swept movement; open/destroyed release both', () => {
  for (const state of ['closed', 'locked', 'blocked', 'open', 'destroyed']) {
    const map = settings([{ ...door, door: { state } }]);
    const blocked = !['open', 'destroyed'].includes(state);
    assert.equal(createVisibility(map, { hero }, ['hero']).visible(target), !blocked, state);
    assert.equal(movementBlocked(map, hero, 160, 80), blocked, state);
  }
});
test('legacy wall, object bounds and eye height participate in LOS', () => {
  const map = settings();
  map.layerConfig!.walls = [{ id: 'wall', x: 3, y: 2, orientation: 'vertical', height: 10 } as never];
  assert.equal(createVisibility(map, { hero }, ['hero']).visible(target), false);
  assert.equal(createVisibility(map, { hero: { ...hero, elevation: 20 } }, ['hero']).visible({ ...target, y: 4.5 }), true);
  assert.equal(createVisibility(settings([{ ...door, kind: 'primitive', blocksVision: true }]), { hero }, ['hero']).visible(target), false);
});
test('range, angle, disabled observers and floor boundaries fail closed', () => {
  const map = settings([], { floors: [{ id: 'ground', elevation: 0 }, { id: 'upper', elevation: 3 }] });
  assert.equal(createVisibility(map, { hero }, []).visible(target), false);
  assert.equal(createVisibility(map, { hero: { ...hero, vision: normalizeVision({ enabled: false }) } }, ['hero']).visible(target), false);
  assert.equal(createVisibility(map, { hero: { ...hero, vision: normalizeVision({ rangeFt: 5 }) } }, ['hero']).visible(target), false);
  assert.equal(createVisibility(map, { hero: { ...hero, vision: normalizeVision({ angle: 45, direction: 0 }) } }, ['hero']).visible(target), false);
  const sight = createVisibility(map, { hero }, ['hero']);
  assert.equal(sight.visible(target, 'ground'), true);
  assert.equal(sight.visible({ ...target, y: 3.5 }, 'upper'), false);
});
test('darkness uses light geometry, not shadows; darkvision supplies local range', () => {
  const map = settings([], { environment: { visionEnabled: true, darkness: true, ambientIntensity: 0 }, lights: [{ id: 'lamp', visibility: 'public', position: { x: 4, y: 1, z: 2.5 }, range: 3 }] });
  assert.equal(createVisibility(map, { hero }, ['hero']).visible(target), true);
  map.layerConfig!.scene3d!.lights = [];
  assert.equal(createVisibility(map, { hero }, ['hero']).visible(target), false);
  assert.equal(createVisibility(map, { hero: { ...hero, vision: normalizeVision({ darkvisionFt: 30 }) } }, ['hero']).visible(target), true);
  const lit = { ...hero, light: normalizeTokenLight({ enabled: true, rangeFt: 30 }) };
  assert.equal(createVisibility(map, { hero: lit }, ['hero']).visible(target), true);
});
test('normalization preserves environment, clamps input and keeps REST conservative', () => {
  const map = settings([door], { lights: [{ id: 'light', intensity: Infinity }], bookmarks: [{ id: 'camera', fov: 900 }], floors: [{ id: 'floor', elevation: 200 }] });
  const scene = map.layerConfig!.scene3d!;
  assert.equal(scene.bookmarks[0].fov, 90);
  assert.equal(scene.floors[0].elevation, 100);
  assert.ok(Number.isFinite(scene.lights[0].intensity));
  assert.deepEqual(normalizeScene3DConfig(JSON.parse(JSON.stringify(scene))), scene);
  assert.deepEqual(filterMapSettingsForPlayers(map).layerConfig!.scene3d!.objects, []);
  assert.equal(tokenPerceptionFromDb({ visibility: 'custom' }).visibility, 'gm_only');
});
