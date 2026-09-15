import type {
  FogOfWarConfig,
  MapImage,
  MapLayerConfig,
  MapLayerConfigV2,
  MapObject,
  MapSettings,
  TerrainCell,
  TerrainType,
  WallMaterial,
  WallSegment,
} from "../types/map";
import { clamp } from "../utils/math";
import { filterScene3DForPlayers, normalizeScene3DConfig } from "./scene3dRules";
import { isFogAreaVisible } from "./fogVisibility";

export const DEFAULT_FOG_OF_WAR: FogOfWarConfig = {
  enabled: false,
  opacity: 0.92,
  mode: "hidden_cells",
  cells: {},
};

export const DEFAULT_MAP_LAYER_CONFIG: MapLayerConfig = {
  version: 2,
  terrainCells: {},
  walls: [],
  objects: [],
  images: [],
  fogOfWar: DEFAULT_FOG_OF_WAR,
  scene3d: normalizeScene3DConfig(),
};

export const DEFAULT_MAP_SETTINGS: MapSettings = {
  pageName: "Nova página",
  widthCells: 24,
  heightCells: 18,
  cellSize: 40,
  backgroundImage: "/mapa.jpg",
  layerConfig: DEFAULT_MAP_LAYER_CONFIG,
};

export function normalizeMapSettings(input: Partial<MapSettings>): MapSettings {
  const widthCells = clamp(
    Math.floor(Number(input.widthCells) || DEFAULT_MAP_SETTINGS.widthCells),
    1,
    500,
  );

  const heightCells = clamp(
    Math.floor(Number(input.heightCells) || DEFAULT_MAP_SETTINGS.heightCells),
    1,
    500,
  );

  const cellSize = clamp(
    Math.floor(Number(input.cellSize) || DEFAULT_MAP_SETTINGS.cellSize),
    20,
    200,
  );

  let backgroundImage: string | undefined;

  if (input.backgroundImage === undefined) {
    backgroundImage = DEFAULT_MAP_SETTINGS.backgroundImage;
  } else {
    const trimmed = input.backgroundImage.trim();
    // Preserve an explicit empty background through repeated normalization.
    // Player visibility and scene updates must not restore the default image.
    backgroundImage = trimmed;
  }

  return {
    mapId: input.mapId,
    pageName: input.pageName?.trim() || DEFAULT_MAP_SETTINGS.pageName,
    widthCells,
    heightCells,
    cellSize,
    backgroundImage,
    layerConfig: normalizeMapLayerConfig(input.layerConfig),
    backgroundImageWidth: input.backgroundImageWidth,
    backgroundImageHeight: input.backgroundImageHeight,
  };
}

export function getMapPixelSize(settings: MapSettings) {
  return {
    width: settings.widthCells * settings.cellSize,
    height: settings.heightCells * settings.cellSize,
  };
}

export function getGridSizeFromImage(
  imageWidth: number,
  imageHeight: number,
  cellSize: number,
) {
  return {
    widthCells: Math.max(1, Math.round(imageWidth / cellSize)),
    heightCells: Math.max(1, Math.round(imageHeight / cellSize)),
  };
}

export function getTerrainCellKey(x: number, y: number) {
  return `${x}:${y}`;
}

export function normalizeMapLayerConfig(value: unknown): MapLayerConfigV2 {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return cloneDefaultLayerConfig();
  }

  const raw = value as {
    terrainCells?: unknown;
    walls?: unknown;
    objects?: unknown;
    images?: unknown;
    fogOfWar?: unknown;
    scene3d?: unknown;
  };
  const terrainCells: Record<string, TerrainCell> = {};

  if (
    raw.terrainCells &&
    typeof raw.terrainCells === "object" &&
    !Array.isArray(raw.terrainCells)
  ) {
    for (const cell of Object.values(raw.terrainCells)) {
      const normalized = normalizeTerrainCell(cell);

      if (!normalized) continue;

      terrainCells[getTerrainCellKey(normalized.x, normalized.y)] = normalized;
    }
  }

  return {
    version: 2,
    terrainCells,
    walls: Array.isArray(raw.walls)
      ? raw.walls
          .map(normalizeWallSegment)
          .filter((wall): wall is WallSegment => Boolean(wall))
      : [],
    objects: Array.isArray(raw.objects)
      ? raw.objects
          .map(normalizeMapObject)
          .filter((object): object is MapObject => Boolean(object))
      : [],
    images: Array.isArray(raw.images)
      ? raw.images
          .map(normalizeMapImage)
          .filter((image): image is MapImage => Boolean(image))
      : [],
    fogOfWar: normalizeFogOfWarConfig(raw.fogOfWar),
    scene3d: normalizeScene3DConfig(raw.scene3d),
  };
}

function cloneDefaultLayerConfig(): MapLayerConfigV2 {
  return {
    version: 2,
    terrainCells: {},
    walls: [],
    objects: [],
    images: [],
    fogOfWar: cloneDefaultFogOfWar(),
    scene3d: normalizeScene3DConfig(),
  };
}

function cloneDefaultFogOfWar(): FogOfWarConfig {
  return {
    ...DEFAULT_FOG_OF_WAR,
    cells: {},
  };
}

function normalizeTerrainCell(value: unknown): TerrainCell | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const cell = value as Partial<TerrainCell>;
  const x = Math.floor(Number(cell.x));
  const y = Math.floor(Number(cell.y));

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  return {
    x,
    y,
    type: normalizeTerrainType(cell.type),
    height: clamp(Math.floor(Number(cell.height) || 0), -10, 30),
  };
}

function normalizeWallSegment(value: unknown): WallSegment | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const wall = value as Partial<WallSegment>;
  const x = Math.floor(Number(wall.x));
  const y = Math.floor(Number(wall.y));

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  return {
    id:
      typeof wall.id === "string"
        ? wall.id
        : `${x}:${y}:${wall.orientation ?? "horizontal"}`,
    x,
    y,
    orientation: wall.orientation === "vertical" ? "vertical" : "horizontal",
    height: clamp(Math.floor(Number(wall.height) || 10), 1, 80),
    material: normalizeWallMaterial(wall.material),
  };
}

function normalizeMapObject(value: unknown): MapObject | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const object = value as Partial<MapObject>;
  const x = Math.floor(Number(object.x));
  const y = Math.floor(Number(object.y));

  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  return {
    id: typeof object.id === "string" ? object.id : `${x}:${y}:object`,
    x,
    y,
    widthCells: clamp(Math.floor(Number(object.widthCells) || 1), 1, 20),
    heightCells: clamp(Math.floor(Number(object.heightCells) || 1), 1, 20),
    elevation: clamp(Math.floor(Number(object.elevation) || 0), -10, 80),
    height: clamp(Math.floor(Number(object.height) || 5), 1, 120),
    type:
      object.type === "tree" ||
      object.type === "crate" ||
      object.type === "pillar" ||
      object.type === "door" ||
      object.type === "bridge" ||
      object.type === "stairs" ||
      object.type === "platform" ||
      object.type === "campfire" ||
      object.type === "custom"
        ? object.type
        : "rock",
    name: typeof object.name === "string" ? object.name : undefined,
  };
}

function normalizeMapImage(value: unknown): MapImage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const image = value as Partial<MapImage>;
  const source = typeof image.image === "string" ? image.image.trim() : "";
  const x = Number(image.x);
  const y = Number(image.y);
  const width = Number(image.width);
  const height = Number(image.height);

  if (
    !source ||
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  ) {
    return null;
  }

  return {
    id:
      typeof image.id === "string" && image.id.trim()
        ? image.id
        : `${x}:${y}:image`,
    image: source,
    name:
      typeof image.name === "string" && image.name.trim()
        ? image.name.trim()
        : undefined,
    x: clamp(x, -100_000, 100_000),
    y: clamp(y, -100_000, 100_000),
    width: clamp(width, 8, 20_000),
    height: clamp(height, 8, 20_000),
  };
}

function normalizeFogOfWarConfig(value: unknown): FogOfWarConfig {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return cloneDefaultFogOfWar();
  }

  const fog = value as Partial<FogOfWarConfig>;
  const cells: Record<string, true> = {};

  if (fog.cells && typeof fog.cells === "object" && !Array.isArray(fog.cells)) {
    for (const key of Object.keys(fog.cells)) {
      if (/^-?\d+:-?\d+$/.test(key)) {
        cells[key] = true;
      }
    }
  }

  return {
    enabled: typeof fog.enabled === "boolean" ? fog.enabled : false,
    opacity: clamp(Number(fog.opacity) || DEFAULT_FOG_OF_WAR.opacity, 0.2, 1),
    mode:
      fog.mode === "revealed_cells" || fog.mode === "hidden_cells"
        ? fog.mode
        : "hidden_cells",
    cells,
  };
}

function normalizeTerrainType(value: unknown): TerrainType {
  if (
    value === "grass" ||
    value === "dirt" ||
    value === "wood" ||
    value === "water" ||
    value === "lava" ||
    value === "snow" ||
    value === "void"
  ) {
    return value;
  }

  return "stone";
}

function normalizeWallMaterial(value: unknown): WallMaterial {
  if (value === "wood" || value === "metal" || value === "force") {
    return value;
  }

  return "stone";
}

export function isMapImageVisibleToPlayers(
  image: MapImage,
  mapWidth: number,
  mapHeight: number,
) {
  return (
    image.x < mapWidth &&
    image.y < mapHeight &&
    image.x + image.width > 0 &&
    image.y + image.height > 0
  );
}

export function filterMapSettingsForPlayers(settings: MapSettings, authoritativeVisibility = false): MapSettings {
  const normalized = normalizeMapSettings(settings);
  const size = getMapPixelSize(normalized);
  const layerConfig = normalizeMapLayerConfig(normalized.layerConfig);

  const visible = (x: number, z: number, width?: number, depth?: number) => isFogAreaVisible(layerConfig.fogOfWar, x, z, width, depth);
  const scene = filterScene3DForPlayers(normalizeScene3DConfig(layerConfig.scene3d));
  if (scene.environment.visionEnabled && !authoritativeVisibility) {
    return { ...normalized, backgroundImage: "", layerConfig: { ...layerConfig, terrainCells: {}, walls: [], objects: [], images: [], scene3d: { ...scene, objects: [], lights: [], floors: [], bookmarks: [] }, fogOfWar: { enabled: true, opacity: 1, mode: "revealed_cells", cells: {} } } };
  }
  scene.objects = scene.objects.filter(({ transform: t }) => {
    // Object pivots are at their base, and rotations may move the full height sideways.
    const radius = Math.hypot(t.scale.x, t.scale.y, t.scale.z);
    return visible(t.position.x - radius, t.position.z - radius, radius * 2, radius * 2);
  });

  return {
    ...normalized,
    layerConfig: {
      ...layerConfig,
      scene3d: scene,
      terrainCells: Object.fromEntries(Object.entries(layerConfig.terrainCells).filter(([, cell]) => visible(cell.x, cell.y, 1, 1))),
      walls: layerConfig.walls.filter((wall) => visible(wall.x - 0.05, wall.y - 0.05, wall.orientation === "horizontal" ? 1.1 : 0.1, wall.orientation === "vertical" ? 1.1 : 0.1)),
      objects: layerConfig.objects.filter((object) => visible(object.x, object.y, object.widthCells, object.heightCells)),
      images: layerConfig.images.filter((image) =>
        isMapImageVisibleToPlayers(image, size.width, size.height) && visible(image.x / normalized.cellSize, image.y / normalized.cellSize, image.width / normalized.cellSize, image.height / normalized.cellSize),
      ),
    },
  };
}
