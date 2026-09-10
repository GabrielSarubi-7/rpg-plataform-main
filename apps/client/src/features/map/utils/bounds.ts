import { clamp } from "@shared/utils/math";

// LEGACY: generic bounds helper kept for future map utilities.
// Current token/map clamping lives in shared/rules/tokenRules and map rules.
export function clampToMap(
  x: number,
  y: number,
  width: number,
  height: number,
  size = 40
) {
  return {
    x: clamp(x, 0, width - size),
    y: clamp(y, 0, height - size),
  };
}
