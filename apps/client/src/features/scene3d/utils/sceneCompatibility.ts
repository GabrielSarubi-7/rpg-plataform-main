import type { MapLayerConfig } from "@shared/types/map";

// Legacy content is rendered automatically. Painting remains in the existing 2D editor.
export function getUnsupportedSceneLayers(_layer?: MapLayerConfig, _annotationCount = 0, editingLegacyLayer = false) {
  const reasons: string[] = [];
  if (editingLegacyLayer) reasons.push("ferramenta de Fog/anotação ativa");
  return reasons;
}
