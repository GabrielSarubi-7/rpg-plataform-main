import type { Token } from "@shared/types/token";
import { clampTokenToMap, getTokenDimensions, snapTokenToGrid } from "@shared/rules/tokenRules";

export interface WorldPoint { x: number; y: number; z: number }
export interface PixelPoint { x: number; y: number }

// Legacy x/y are the footprint's top-left in pixels. Three X/Z are its center
// in cells; Three Y is elevation. Combat continues to use the legacy plane.
export const FEET_PER_CELL = 5;
export const feetToWorldUnits = (feet: number) => feet / FEET_PER_CELL;
export const worldUnitsToFeet = (units: number) => units * FEET_PER_CELL;

function requireCellSize(cellSize: number) {
  if (!Number.isFinite(cellSize) || cellSize <= 0) throw new RangeError("Invalid cell size");
  return cellSize;
}
export const pixelsToWorldUnits = (px: number, cellSize: number) => px / requireCellSize(cellSize);
export const worldUnitsToPixels = (units: number, cellSize: number) => units * requireCellSize(cellSize);
export function pixelPointToWorld(point: PixelPoint, cellSize: number, elevationFt = 0): WorldPoint {
  return { x: pixelsToWorldUnits(point.x, cellSize), y: feetToWorldUnits(elevationFt), z: pixelsToWorldUnits(point.y, cellSize) };
}
export function worldPointToPixels(point: WorldPoint, cellSize: number): PixelPoint {
  return { x: worldUnitsToPixels(point.x, cellSize), y: worldUnitsToPixels(point.z, cellSize) };
}
export function worldPointToCell(point: WorldPoint) {
  return { col: Math.floor(point.x), row: Math.floor(point.z) };
}
export function legacyTokenToWorldPosition(token: Token, cellSize: number): WorldPoint {
  const size = getTokenDimensions(token, cellSize);
  return pixelPointToWorld({ x: token.x + size.width / 2, y: token.y + size.height / 2 }, cellSize, token.elevation ?? 0);
}
export function worldPositionToLegacyToken(point: WorldPoint, token: Token, cellSize: number) {
  const size = getTokenDimensions(token, cellSize);
  const pixels = worldPointToPixels(point, cellSize);
  return { x: pixels.x - size.width / 2, y: pixels.y - size.height / 2, elevation: worldUnitsToFeet(point.y) };
}
export function constrainTokenPosition(point: PixelPoint, token: Token, cellSize: number, mapWidth: number, mapHeight: number) {
  const snapped = snapTokenToGrid(point.x, point.y, requireCellSize(cellSize));
  const size = getTokenDimensions(token, cellSize);
  return clampTokenToMap(snapped.x, snapped.y, mapWidth, mapHeight, size.width, size.height);
}

// Same geometry as CSS object-fit: contain; object-position: center.
export function fitContainedImage(width: number, height: number, imageWidth: number, imageHeight: number) {
  const scale = Math.min(width / imageWidth, height / imageHeight);
  return { width: imageWidth * scale, height: imageHeight * scale, x: (width - imageWidth * scale) / 2, y: (height - imageHeight * scale) / 2 };
}
