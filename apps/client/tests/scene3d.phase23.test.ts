import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMapLayerConfig, normalizeMapSettings, filterMapSettingsForPlayers } from "../../../shared/rules/mapRules.ts";
import { normalizeScene3DConfig, normalizeSceneObject3D } from "../../../shared/rules/scene3dRules.ts";
import { isFogCellHidden, isTokenVisibleInFog } from "../../../shared/rules/fogVisibility.ts";
import { validateGlb } from "../../../shared/rules/glbRules.ts";
import { cloneLayerConfig, pruneLayerConfig } from "../src/features/map/utils/mapLayerConfig.ts";
import { withFogOfWar } from "../src/features/map/utils/fogOfWar.ts";
const object = normalizeSceneObject3D({ id: "test", visibility: "gm", transform: { position: { x: 3, y: 2, z: 4 } } })!;
test("V1 upgrades automatically and V2 survives every legacy reconstruction without aliasing", () => {
  const source = normalizeMapLayerConfig({ version: 1, scene3d: { objects: [object], revision: 7 }, terrainCells: { "1:1": { x: 1, y: 1, height: 5, type: "stone" } } });
  assert.equal(source.version, 2);
  for (const clone of [normalizeMapLayerConfig(source), cloneLayerConfig(source), pruneLayerConfig(source, 2, 2), withFogOfWar(source, { enabled: true }), normalizeMapSettings({ layerConfig: source }).layerConfig!]) {
    assert.deepEqual(clone.scene3d, source.scene3d);
    clone.scene3d!.objects[0].transform.position.x = 99;
    assert.equal(source.scene3d!.objects[0].transform.position.x, 3);
  }
  assert.deepEqual(normalizeMapLayerConfig({ version: 1 }).scene3d?.objects, []);
});
test("scene normalizer bounds values, discards invalid resources, deduplicates and fails visibility closed", () => {
  const scene = normalizeScene3DConfig({ objects: [{ ...object, visibility: "oops", assetUrl: "https://evil.test/model.glb", transform: { position: { x: Infinity, z: 900 }, scale: { x: -2, y: NaN, z: 999 } } }, object, { id: "../../bad" }] }, 16, 12);
  assert.equal(scene.objects.length, 1); const o = scene.objects[0];
  assert.equal(o.visibility, "gm"); assert.equal(o.assetUrl, undefined);
  assert.deepEqual(o.transform.position, { x: 0, y: 0, z: 12 }); assert.deepEqual(o.transform.scale, { x: 0.01, y: 1, z: 100 });
  assert.deepEqual(normalizeScene3DConfig(scene), scene);
});
test("player serialization strips secrets including model paths; fog hides full footprints in either mode", () => {
  const map = normalizeMapSettings({ widthCells: 10, heightCells: 10, cellSize: 40, layerConfig: normalizeMapLayerConfig({ scene3d: { objects: [object, { ...object, id: "hidden", visibility: "hidden", assetUrl: `/assets/${'a'.repeat(64)}.glb` }, { ...object, id: "public", visibility: "public" }] } }) });
  const view = filterMapSettingsForPlayers(map);
  assert.deepEqual(view.layerConfig?.scene3d?.objects.map((o) => o.id), ["public"]);
  assert.ok(!JSON.stringify(view).includes('a'.repeat(64)));
  const fog = { enabled: true, opacity: 0.9, mode: "hidden_cells" as const, cells: { "2:2": true as const } };
  map.layerConfig!.fogOfWar = fog;
  assert.equal(isFogCellHidden(fog, 2, 2), true);
  assert.equal(isTokenVisibleInFog({ id: "big", x: 40, y: 40, widthCells: 2, heightCells: 2 }, map), false);
  assert.equal(isTokenVisibleInFog({ id: "small", x: 0, y: 0 }, map), true);
  map.layerConfig!.fogOfWar = { ...fog, mode: "revealed_cells" };
  assert.equal(isTokenVisibleInFog({ id: "small", x: 80, y: 80 }, map), true);
  assert.equal(isTokenVisibleInFog({ id: "small", x: 0, y: 0 }, map), false);
});
function glb(json: unknown) {
  const raw = new TextEncoder().encode(JSON.stringify(json)), length = Math.ceil(raw.length / 4) * 4, bytes = new Uint8Array(20 + length), view = new DataView(bytes.buffer);
  view.setUint32(0, 0x46546c67, true); view.setUint32(4, 2, true); view.setUint32(8, bytes.length, true); view.setUint32(12, length, true); view.setUint32(16, 0x4e4f534a, true); bytes.fill(32, 20); bytes.set(raw, 20); return bytes;
}
test("GLB validator accepts self-contained v2 and rejects signatures, external resources and allocation abuse", () => {
  assert.doesNotThrow(() => validateGlb(glb({ asset: { version: "2.0" }, scenes: [{ nodes: [] }], nodes: [] })));
  for (const json of [
    { asset: { version: "1.0" } }, { asset: { version: "2.0" }, buffers: [{ uri: "https://evil.test/a.bin" }] },
    { asset: { version: "2.0" }, images: [{ uri: "data:image/svg+xml,<svg/>" }] },
    { asset: { version: "2.0" }, nodes: [{ children: [0] }] },
    { asset: { version: "2.0" }, nodes: [{ children: [2] }, { children: [2] }, {}] },
    { asset: { version: "2.0" }, accessors: [{ count: 1e9 }] },
    { asset: { version: "2.0" }, extensions: { KHR_draco_mesh_compression: {} } },
  ]) assert.throws(() => validateGlb(glb(json)));
  const bad = glb({ asset: { version: "2.0" } }); bad[0] = 0; assert.throws(() => validateGlb(bad));
  assert.throws(() => validateGlb(new Uint8Array([1, 2, 3])));
});
