export type TerrainType =
  | "stone"
  | "grass"
  | "dirt"
  | "wood"
  | "water"
  | "lava"
  | "snow"
  | "void";

export type WallMaterial = "stone" | "wood" | "metal" | "force";

export interface TerrainCell {
  x: number;
  y: number;
  type: TerrainType;
  height: number;
}

export interface WallSegment {
  id: string;
  x: number;
  y: number;
  orientation: "horizontal" | "vertical";
  height: number;
  material: WallMaterial;
}

export interface MapObject {
  id: string;
  x: number;
  y: number;
  widthCells: number;
  heightCells: number;
  elevation: number;
  height: number;
  type:
    | "rock"
    | "tree"
    | "crate"
    | "pillar"
    | "door"
    | "bridge"
    | "stairs"
    | "platform"
    | "campfire"
    | "custom";
  name?: string;
}

export interface MapImage {
  id: string;
  image: string;
  name?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FogOfWarConfig {
  enabled: boolean;
  opacity: number;
  mode: "hidden_cells" | "revealed_cells";
  cells: Record<string, true>;
}

export interface MapLayerConfig {
  version: 1;
  terrainCells: Record<string, TerrainCell>;
  walls: WallSegment[];
  objects: MapObject[];
  images: MapImage[];
  fogOfWar: FogOfWarConfig;
}

export interface MapSettings {
  mapId?: string;
  pageName: string;
  widthCells: number;
  heightCells: number;
  cellSize: number;
  backgroundImage?: string;
  layerConfig?: MapLayerConfig;

  backgroundImageWidth?: number;
  backgroundImageHeight?: number;
}
