import { resolveAssetUrl } from "@/features/assets/assetApi";

import styles from "./TokenDragPreview.module.css";

interface DragPreview {
  tokenId: string;
  originX: number;
  originY: number;
  waypoints: {
    x: number;
    y: number;
    distanceFeet: number;
  }[];
  x: number;
  y: number;
}

interface Props {
  preview: DragPreview;
  cellSize: number;
  width: number;
  height: number;
  mapWidth: number;
  mapHeight: number;
  image?: string;
  name?: string;
}

export default function TokenDragPreview({
  preview,
  cellSize,
  width,
  height,
  mapWidth,
  mapHeight,
  image,
  name,
}: Props) {
  const targetCenter = {
    x: preview.x + width / 2,
    y: preview.y + height / 2,
  };
  const pathPoints = [
    {
      x: preview.originX,
      y: preview.originY,
      distanceFeet: 0,
    },
    ...preview.waypoints,
    {
      x: preview.x,
      y: preview.y,
      distanceFeet: getPathDistanceFeet(preview, cellSize),
    },
  ];
  const pathCenters = pathPoints.map((point) => ({
    ...point,
    centerX: point.x + width / 2,
    centerY: point.y + height / 2,
  }));
  const distanceFeet = pathPoints[pathPoints.length - 1]?.distanceFeet ?? 0;
  const markerId = `movement-arrow-${preview.tokenId}`;
  const label = `${distanceFeet} ft`;
  const previousCenter = pathCenters[Math.max(0, pathCenters.length - 2)];
  const labelOffset = getLabelOffset(
    targetCenter.x - previousCenter.centerX,
    targetCenter.y - previousCenter.centerY,
  );

  return (
    <div className={styles.layer} aria-hidden>
      <span
        className={styles.originRing}
        style={{
          left: preview.originX,
          top: preview.originY,
          width,
          height,
        }}
      />

      {distanceFeet > 0 && (
        <svg
          className={styles.arrow}
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="12"
              markerHeight="12"
              refX="9"
              refY="6"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M2 2 10 6 2 10Z" fill="rgba(248, 214, 141, 0.95)" />
            </marker>
          </defs>

          {pathCenters.slice(1).map((point, index) => {
            const from = pathCenters[index];

            return (
              <g key={`${point.centerX}:${point.centerY}:${index}`}>
                <line
                  className={styles.arrowHalo}
                  x1={from.centerX}
                  y1={from.centerY}
                  x2={point.centerX}
                  y2={point.centerY}
                />
                <line
                  className={styles.arrowLine}
                  x1={from.centerX}
                  y1={from.centerY}
                  x2={point.centerX}
                  y2={point.centerY}
                  markerEnd={`url(#${markerId})`}
                />
              </g>
            );
          })}

          {pathCenters.slice(1, -1).map((point, index) => (
            <g key={`waypoint:${point.centerX}:${point.centerY}:${index}`}>
              <circle
                className={styles.waypointMarker}
                cx={point.centerX}
                cy={point.centerY}
                r={8}
              />
              <text
                className={styles.waypointText}
                x={point.centerX}
                y={point.centerY - Math.max(width, height) * 0.62}
              >
                {point.distanceFeet} ft
              </text>
            </g>
          ))}

          <text
            className={styles.distanceText}
            x={(previousCenter.centerX + targetCenter.x) / 2 + labelOffset.x}
            y={(previousCenter.centerY + targetCenter.y) / 2 + labelOffset.y}
          >
            {label}
          </text>
        </svg>
      )}

      <div
        className={styles.ghost}
        style={{
          left: preview.x,
          top: preview.y,
          width,
          height,
        }}
      >
        {image ? (
          <img src={resolveAssetUrl(image)} alt="" draggable={false} />
        ) : (
          <span className={styles.fallback}>
            {(name || "T").slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function getPathDistanceFeet(preview: DragPreview, cellSize: number) {
  let total = 0;
  let from = {
    x: preview.originX,
    y: preview.originY,
  };

  for (const point of [...preview.waypoints, { x: preview.x, y: preview.y }]) {
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

function getLabelOffset(deltaX: number, deltaY: number) {
  const length = Math.hypot(deltaX, deltaY);

  if (length < 1) {
    return {
      x: 0,
      y: -12,
    };
  }

  return {
    x: (-deltaY / length) * 16,
    y: (deltaX / length) * 16 - 8,
  };
}
