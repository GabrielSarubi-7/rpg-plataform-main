import type { Token } from "../types/token";

export const TOKEN_SIZE_OPTIONS = [1, 2, 3, 4] as const;

export function normalizeTokenSizeCells(value: unknown) {
  const size = Math.floor(Number(value) || 1);

  return Math.max(1, Math.min(4, size));
}

export function getTokenDimensions(token: Token, cellSize: number) {
  const widthCells = normalizeTokenSizeCells(token.widthCells);
  const heightCells = normalizeTokenSizeCells(token.heightCells);

  return {
    widthCells,
    heightCells,
    width: widthCells * cellSize,
    height: heightCells * cellSize,
  };
}

export function getCellFromWorldPosition(
  x: number,
  y: number,
  cellSize: number,
) {
  return {
    col: Math.floor(x / cellSize),
    row: Math.floor(y / cellSize),
  };
}

export function getTokenPositionFromCell(
  col: number,
  row: number,
  cellSize: number,
) {
  return {
    x: col * cellSize,
    y: row * cellSize,
  };
}

export function getTokenPositionFromMouse(
  worldX: number,
  worldY: number,
  cellSize: number,
) {
  const cell = getCellFromWorldPosition(worldX, worldY, cellSize);

  return getTokenPositionFromCell(cell.col, cell.row, cellSize);
}

export function snapTokenToGrid(
  x: number,
  y: number,
  cellSize: number,
) {
  const col = Math.round(x / cellSize);
  const row = Math.round(y / cellSize);

  return getTokenPositionFromCell(col, row, cellSize);
}

export function clampTokenToMap(
  x: number,
  y: number,
  mapWidth: number,
  mapHeight: number,
  tokenWidth: number,
  tokenHeight = tokenWidth,
) {
  return {
    x: Math.max(0, Math.min(mapWidth - tokenWidth, x)),
    y: Math.max(0, Math.min(mapHeight - tokenHeight, y)),
  };
}
