import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveWorldTarget, measureWorld, canRenderCombatEffect, combatEffectColor } from '../src/features/scene3d/actions/combatVisuals';
import { getTokenCenter, resolveActionTargeting } from '../../../shared/rules/targetingRules';
import { normalizeSheetForm, spendActionResources, recoverCharacterResources } from '../src/features/characters/types/characterSheet';
import { prepareActionRolls } from '../src/features/actions/utils/actionRolls';
import type { CharacterAction, TargetingShape } from '../../../shared/types/action';
import { normalizeMapSettings } from '../../../shared/rules/mapRules';
const action = (shape: TargetingShape): CharacterAction => ({ id: shape, name: shape, kind: 'spell', description: '', icon: '', activation: { type: 'action', cost: 1 }, roll: { mode: 'none' }, targeting: { shape, rangeFt: 60, normalRangeFt: 30, longRangeFt: 120, radiusFt: 10, lengthFt: 20, widthFt: 5, sizeFt: 15, heightFt: 20, reachFt: 5 }, visual: { color: '#aa66ff', borderColor: '#ffffff', opacity: .25 } });
const tokens = { caster: { id: 'caster', characterId: 'sheet', x: 40, y: 40, elevation: 30 }, target: { id: 'target', x: 200, y: 40, widthCells: 2, heightCells: 3, elevation: 50 } };
test('a redacted background stays empty through scene and room update normalization', () => {
  assert.equal(normalizeMapSettings(normalizeMapSettings({ backgroundImage: '' })).backgroundImage, '');
});
for (const shape of ['self', 'self_emanation', 'single_target', 'melee_reach', 'ranged_projectile', 'point_sphere', 'cone', 'line', 'cube', 'cylinder'] as const) {
  test(`3D ${shape} preserves existing targets/range at every visual elevation`, () => {
    const a = action(shape), point = getTokenCenter(tokens.target, 40);
    const baseline = resolveActionTargeting({ action: a, tokens, casterTokenId: 'caster', origin: getTokenCenter(tokens.caster, 40), requestedPoint: point, tokenSize: 40, pixelsPerFoot: 8 });
    for (const y of [-10, 0, 4, 50]) assert.deepEqual(resolveWorldTarget(a, tokens, 'caster', { x: point.x / 40, y, z: point.y / 40 }, 40), baseline);
  });
}
test('normal/long/invalid ranges remain the existing horizontal bands', () => {
  const a = action('ranged_projectile');
  for (const [x, band] of [[5, 'normal'], [15, 'long'], [40, 'invalid']] as const) assert.equal(resolveWorldTarget(a, tokens, 'caster', { x, y: 200, z: 1.5 }, 40).rangeBand, band);
});
test('measurement separates horizontal rule, signed elevation and optional spatial distance', () => {
  assert.deepEqual(measureWorld({ x: 0, y: 2, z: 0 }, { x: 3, y: 14, z: 4 }, 40), { horizontalFt: 25, elevationFt: 60, spatialFt: 65 });
});
test('removed/hidden target references suppress the entire visual effect', () => {
  const effect = { casterTokenId: 'caster', targeting: { affectedTokenIds: ['target'] } } as never;
  assert.equal(canRenderCombatEffect(effect, tokens), true);
  assert.equal(canRenderCombatEffect(effect, { caster: tokens.caster }), false);
  assert.equal(canRenderCombatEffect(effect, {}), false);
});
test('combat uses current resource spending/recovery and roll preparation including critical/healing/save', () => {
  const form = normalizeSheetForm({ characterName: 'Hero', characterType: 'pc', dataJson: {} });
  form.resources = [{ id: 'mana', name: 'Mana', current: 3, max: 3, recovery: 'turn_end' } as never];
  const a = { ...action('melee_reach'), resourceCosts: [{ resourceId: 'mana', amount: 2 }], roll: { mode: 'attack_roll' as const, damage: '1d8+2', healing: '1d6', saveDc: 14 } };
  const spent = spendActionResources(form, a)!;
  assert.equal(spent.resources[0].current, 1); assert.equal(form.resources[0].current, 3);
  assert.equal(spendActionResources(spent, a), null);
  assert.equal(recoverCharacterResources(spent, 'turn_end').resources[0].current, 3);
  const rolls = prepareActionRolls(a, form);
  assert.equal(rolls.damageExpression, '1d8+2'); assert.equal(rolls.criticalDamageExpression, '2d8+2'); assert.equal(rolls.healingExpression, '1d6'); assert.equal(rolls.saveDc, 14);
  assert.equal(combatEffectColor({ ...a, roll: { mode: 'healing' } }), '#59ed9b');
});
