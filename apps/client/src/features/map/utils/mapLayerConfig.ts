import type { MapLayerConfig, MapObject } from "@shared/types/map";
import { normalizeMapLayerConfig } from "@shared/rules/mapRules";
export function cloneLayerConfig(layer: MapLayerConfig): MapLayerConfig {
  return {
    ...normalizeMapLayerConfig(layer),
    terrainCells: Object.fromEntries(
      Object.entries(layer.terrainCells).map(([key, cell]) => [
        key,
        {
          ...cell,
        },
      ]),
    ),
    walls: layer.walls.map((wall) => ({
      ...wall,
    })),
    objects: layer.objects.map((object) => ({
      ...object,
    })),
    images: layer.images.map((image) => ({
      ...image,
    })),
    fogOfWar: {
      ...layer.fogOfWar,
      cells: {
        ...layer.fogOfWar.cells,
      },
    },
  };
}

export function pruneLayerConfig(
  layer: MapLayerConfig,
  width: number,
  height: number,
): MapLayerConfig {
  const terrainCells = Object.fromEntries(
    Object.entries(layer.terrainCells).filter(
      ([, cell]) => cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height,
    ),
  );
  const fogCells = Object.fromEntries(
    Object.entries(layer.fogOfWar.cells).filter(([key]) => {
      const [x, y] = key.split(":").map(Number);

      return (
        Number.isFinite(x) &&
        Number.isFinite(y) &&
        x >= 0 &&
        y >= 0 &&
        x < width &&
        y < height
      );
    }),
  );

  return {
    ...normalizeMapLayerConfig(layer),
    terrainCells,
    walls: layer.walls.filter(
      (wall) =>
        wall.x >= 0 &&
        wall.y >= 0 &&
        wall.x <= width &&
        wall.y <= height,
    ),
    objects: layer.objects.filter(
      (object: MapObject) =>
        object.x >= 0 &&
        object.y >= 0 &&
        object.x < width &&
        object.y < height,
    ),
    images: layer.images.map((image) => ({
      ...image,
    })),
    fogOfWar: {
      ...layer.fogOfWar,
      cells: fogCells,
    },
  };
}
