import { useCallback, useMemo, useRef, useState } from "react";
import { screenToWorld } from "../utils/coords";
import type { Camera } from "./useCamera";
import {
  clampTokenToMap,
  getTokenDimensions,
  snapTokenToGrid,
} from "@shared/rules/tokenRules";
import type { Token } from "@shared/types/token";

interface DropResult {
  tokenId: string;
  x: number;
  y: number;
}

interface DragWaypoint {
  x: number;
  y: number;
  distanceFeet: number;
}

interface DragPreview {
  tokenId: string;
  originX: number;
  originY: number;
  widthCells?: number;
  heightCells?: number;
  waypoints: DragWaypoint[];
  x: number;
  y: number;
}

export function useTokenDrag(
  camera: Camera,
  moveToken: (id: string, x: number, y: number) => void,
  mapWidth: number,
  mapHeight: number,
  cellSize: number,
) {
  const cameraRef = useLatest(camera);
  const moveTokenRef = useLatest(moveToken);
  const mapWidthRef = useLatest(mapWidth);
  const mapHeightRef = useLatest(mapHeight);
  const cellSizeRef = useLatest(cellSize);
  const draggingId = useRef<string | null>(null);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const [preview, setPreviewState] = useState<DragPreview | null>(null);
  const previewRef = useRef<DragPreview | null>(null);

  const setPreview = useCallback(
    (
      next:
        | DragPreview
        | null
        | ((current: DragPreview | null) => DragPreview | null),
    ) => {
      setPreviewState((current) => {
        const resolved =
          typeof next === "function" ? next(current) : next;

        previewRef.current = resolved;

        return resolved;
      });
    },
    [],
  );

  const startDrag = useCallback((
    token: Token,
    e: React.PointerEvent | React.MouseEvent,
  ) => {
    draggingId.current = token.id;

    const world = screenToWorld(e.clientX, e.clientY, cameraRef.current);

    dragOffset.current = {
      x: world.x - token.x,
      y: world.y - token.y,
    };

    setPreview({
      tokenId: token.id,
      originX: token.x,
      originY: token.y,
      widthCells: token.widthCells,
      heightCells: token.heightCells,
      waypoints: [],
      x: token.x,
      y: token.y,
    });
  }, [cameraRef, setPreview]);

  const onMove = useCallback((e: React.PointerEvent | React.MouseEvent) => {
    if (!draggingId.current) return;

    const currentPreview = previewRef.current;
    const currentCellSize = cellSizeRef.current;
    const world = screenToWorld(e.clientX, e.clientY, cameraRef.current);

    const rawX = world.x - dragOffset.current.x;
    const rawY = world.y - dragOffset.current.y;

    const snapped = snapTokenToGrid(rawX, rawY, currentCellSize);
    const dimensions = getTokenDimensions(
      {
        id: currentPreview?.tokenId ?? "",
        x: currentPreview?.x ?? 0,
        y: currentPreview?.y ?? 0,
        widthCells: currentPreview?.widthCells,
        heightCells: currentPreview?.heightCells,
      },
      currentCellSize,
    );

    const clamped = clampTokenToMap(
      snapped.x,
      snapped.y,
      mapWidthRef.current,
      mapHeightRef.current,
      dimensions.width,
      dimensions.height,
    );

    setPreview((current) =>
      current
        ? {
            ...current,
            x: clamped.x,
            y: clamped.y,
          }
        : null,
    );
  }, [cameraRef, cellSizeRef, mapHeightRef, mapWidthRef, setPreview]);

  const addWaypoint = useCallback(() => {
    setPreview((current) => {
      if (!draggingId.current || !current) return current;

      const lastPoint =
        current.waypoints[current.waypoints.length - 1] ?? {
          x: current.originX,
          y: current.originY,
        };

      if (lastPoint.x === current.x && lastPoint.y === current.y) {
        return current;
      }

      return {
        ...current,
        waypoints: [
          ...current.waypoints,
          {
            x: current.x,
            y: current.y,
            distanceFeet: getPathDistanceFeet(
              current.originX,
              current.originY,
              [...current.waypoints, { x: current.x, y: current.y }],
              cellSizeRef.current,
            ),
          },
        ],
      };
    });
  }, [cellSizeRef, setPreview]);

  const drop = useCallback((): DropResult | null => {
    const currentPreview = previewRef.current;

    if (!draggingId.current || !currentPreview) return null;

    const dropped = {
      tokenId: draggingId.current,
      x: currentPreview.x,
      y: currentPreview.y,
    };

    moveTokenRef.current(dropped.tokenId, dropped.x, dropped.y);

    return dropped;
  }, [moveTokenRef]);

  const stopDrag = useCallback(() => {
    draggingId.current = null;
    dragOffset.current = { x: 0, y: 0 };
    setPreview(null);
  }, [setPreview]);

  return useMemo(
    () => ({
      startDrag,
      onMove,
      addWaypoint,
      drop,
      stopDrag,
      preview,
    }),
    [addWaypoint, drop, onMove, preview, startDrag, stopDrag],
  );
}

function useLatest<T>(value: T) {
  const ref = useRef(value);

  ref.current = value;

  return ref;
}

function getPathDistanceFeet(
  originX: number,
  originY: number,
  points: {
    x: number;
    y: number;
  }[],
  cellSize: number,
) {
  let total = 0;
  let from = {
    x: originX,
    y: originY,
  };

  for (const point of points) {
    total += getSegmentDistanceFeet(from, point, cellSize);
    from = point;
  }

  return total;
}

function getSegmentDistanceFeet(
  from: {
    x: number;
    y: number;
  },
  to: {
    x: number;
    y: number;
  },
  cellSize: number,
) {
  const cellsX = Math.abs(to.x - from.x) / cellSize;
  const cellsY = Math.abs(to.y - from.y) / cellSize;

  return Math.round(Math.max(cellsX, cellsY) * 5);
}
