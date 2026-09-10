import type { FogOfWarConfig, MapLayerConfig } from "@shared/types/map";
import { DEFAULT_FOG_OF_WAR, getTerrainCellKey } from "@shared/rules/mapRules";

export function getFogBrushCells(input: {
  centerX: number;
  centerY: number;
  brushSize: number;
  widthCells: number;
  heightCells: number;
}) {
  const size = Math.max(1, Math.floor(input.brushSize) || 1);
  const offset = Math.floor(size / 2);
  const cells: { x: number; y: number; key: string }[] = [];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const cellX = input.centerX + x - offset;
      const cellY = input.centerY + y - offset;

      if (
        cellX < 0 ||
        cellY < 0 ||
        cellX >= input.widthCells ||
        cellY >= input.heightCells
      ) {
        continue;
      }

      cells.push({
        x: cellX,
        y: cellY,
        key: getTerrainCellKey(cellX, cellY),
      });
    }
  }

  return cells;
}

export function applyFogBrush(input: {
  fog: FogOfWarConfig;
  cellKeys: string[];
  action: "reveal" | "hide";
}) {
  const cells = { ...input.fog.cells };

  for (const key of input.cellKeys) {
    if (input.fog.mode === "hidden_cells") {
      if (input.action === "hide") {
        cells[key] = true;
      } else {
        delete cells[key];
      }
    } else if (input.action === "reveal") {
      cells[key] = true;
    } else {
      delete cells[key];
    }
  }

  return {
    ...input.fog,
    cells,
  };
}

export function withFogOfWar(
  layerConfig: MapLayerConfig | undefined,
  fogOfWar: Partial<FogOfWarConfig>,
): MapLayerConfig {
  const baseFog = layerConfig?.fogOfWar ?? DEFAULT_FOG_OF_WAR;

  return {
    version: 1,
    terrainCells: layerConfig?.terrainCells ?? {},
    walls: layerConfig?.walls ?? [],
    objects: layerConfig?.objects ?? [],
    images: layerConfig?.images ?? [],
    fogOfWar: {
      ...baseFog,
      ...fogOfWar,
      cells: fogOfWar.cells ?? baseFog.cells ?? {},
    },
  };
}
