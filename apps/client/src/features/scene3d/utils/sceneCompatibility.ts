import type { MapLayerConfig } from "@shared/types/map";

// Fail closed before mounting WebGL. In particular, a floor-only fog mask
// would let an orbiting camera reveal tokens that are hidden in the 2D view.
export function getUnsupportedSceneLayers(layer?: MapLayerConfig, annotationCount = 0, editingLegacyLayer = false) {
  const reasons: string[] = [];
  if (layer?.fogOfWar.enabled) reasons.push("Fog of War");
  if (Object.keys(layer?.terrainCells ?? {}).length) reasons.push("terreno");
  if (layer?.walls.length) reasons.push("paredes");
  if (layer?.objects.length) reasons.push("objetos de cenário");
  if (layer?.images.length) reasons.push("imagens em camadas");
  if (annotationCount) reasons.push("anotações");
  if (editingLegacyLayer) reasons.push("ferramenta de Fog/anotação ativa");
  return reasons;
}
