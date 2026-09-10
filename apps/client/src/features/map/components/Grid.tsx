import { useId } from "react";

interface Props {
  width: number;
  height: number;
  zoom: number;
  cellSize: number;
  mode?: "2d" | "2.5d";
}

const MAJOR_GRID_EVERY = 5;

export default function Grid({
  width,
  height,
  zoom,
  cellSize,
  mode = "2d",
}: Props) {
  const minorPatternId = useSvgId("grid-minor");
  const majorPatternId = useSvgId("grid-major");
  const isCinematic = mode === "2.5d";
  const minorOpacity = isCinematic
    ? zoom < 0.25
      ? 0.08
      : zoom < 0.45
        ? 0.11
        : 0.16
    : zoom < 0.25
      ? 0.028
      : zoom < 0.45
        ? 0.045
        : 0.075;
  const majorOpacity = isCinematic
    ? zoom < 0.25
      ? 0.16
      : 0.26
    : zoom < 0.25
      ? 0.11
      : 0.16;
  const lineWidth = isCinematic
    ? Math.max(2.2 / Math.max(zoom, 0.1), 0.9)
    : Math.max(1 / Math.max(zoom, 0.1), 0.55);
  const majorLineWidth = isCinematic
    ? Math.max(3.4 / Math.max(zoom, 0.1), 1.35)
    : Math.max(1.55 / Math.max(zoom, 0.1), 0.85);
  const majorCellSize = cellSize * MAJOR_GRID_EVERY;
  const minorStroke = isCinematic
    ? `rgba(255,255,255,${minorOpacity})`
    : `rgba(255,255,255,${minorOpacity})`;
  const majorStroke = `rgba(168,220,255,${majorOpacity})`;

  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
        mixBlendMode: isCinematic ? "screen" : "normal",
        filter: isCinematic
          ? "drop-shadow(0 0 2px rgba(255,255,255,0.32))"
          : undefined,
        }}
    >
      <defs>
        <pattern
          id={minorPatternId}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 H 0 V ${cellSize}`}
            fill="none"
            stroke={minorStroke}
            strokeWidth={lineWidth}
            shapeRendering="crispEdges"
          />
        </pattern>

        <pattern
          id={majorPatternId}
          width={majorCellSize}
          height={majorCellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${majorCellSize} 0 H 0 V ${majorCellSize}`}
            fill="none"
            stroke={majorStroke}
            strokeWidth={majorLineWidth}
            shapeRendering="crispEdges"
          />
        </pattern>
      </defs>

      <rect width={width} height={height} fill={`url(#${minorPatternId})`} />
      <rect width={width} height={height} fill={`url(#${majorPatternId})`} />
    </svg>
  );
}

function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}
