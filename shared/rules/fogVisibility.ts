import type { FogOfWarConfig, MapSettings } from "../types/map";
import type { Token } from "../types/token";

export function isFogCellHidden(fog: FogOfWarConfig | undefined, x: number, z: number) {
  if (!fog?.enabled) return false;
  const marked = Boolean(fog.cells[`${Math.floor(x)}:${Math.floor(z)}`]);
  return fog.mode === "revealed_cells" ? !marked : marked;
}
// Conservatively hide a whole object if any part of its footprint is unrevealed.
export function isFogAreaVisible(fog: FogOfWarConfig | undefined, x: number, z: number, width = 0.01, depth = 0.01) {
  if (!fog?.enabled) return true;
  for (let y = Math.floor(z); y < Math.ceil(z + depth); y++) {
    for (let column = Math.floor(x); column < Math.ceil(x + width); column++) {
      if (isFogCellHidden(fog, column, y)) return false;
    }
  }
  return true;
}
export function isTokenVisibleInFog(token: Token, settings: MapSettings) {
  return isFogAreaVisible(settings.layerConfig?.fogOfWar, token.x / settings.cellSize, token.y / settings.cellSize, token.widthCells ?? 1, token.heightCells ?? 1);
}
