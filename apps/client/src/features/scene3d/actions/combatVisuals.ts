import { getDistance, getTokenCenter, resolveActionTargeting } from '@shared/rules/targetingRules';
import type { CharacterAction } from '@shared/types/action';
import type { Token } from '@shared/types/token';
import type { ActionUsedPayload, RoomActionEffect } from '@shared/types/multiplayer';
import { worldPointToPixels, type WorldPoint } from '../utils/coordinates3d';

// This adapter never adds elevation to the combat calculation.
export function resolveWorldTarget(action: CharacterAction, tokens: Record<string, Token>, casterTokenId: string, point: WorldPoint, cellSize: number) {
  return resolveActionTargeting({ action, tokens, casterTokenId, origin: getTokenCenter(tokens[casterTokenId], cellSize), requestedPoint: worldPointToPixels(point, cellSize), tokenSize: cellSize, pixelsPerFoot: cellSize / 5 });
}
export function measureWorld(a: WorldPoint, b: WorldPoint, cellSize: number) {
  const horizontalFt = getDistance(worldPointToPixels(a, cellSize), worldPointToPixels(b, cellSize)) / (cellSize / 5);
  const elevationFt = (b.y - a.y) * 5;
  return { horizontalFt, elevationFt, spatialFt: Math.hypot(horizontalFt, elevationFt) };
}
export function canRenderCombatEffect(effect: ActionUsedPayload | RoomActionEffect, tokens: Record<string, Token>) {
  return Boolean(tokens[effect.casterTokenId]) && [...(effect.targeting.targetTokenIds ?? []), ...(effect.targeting.affectedTokenIds ?? [])].every((id) => Boolean(tokens[id]));
}
export const combatEffectColor = (action: CharacterAction) => action.roll.mode === 'healing' ? '#59ed9b' : action.roll.mode === 'saving_throw' ? '#b797ff' : action.visual.projectileColor ?? action.visual.borderColor;
