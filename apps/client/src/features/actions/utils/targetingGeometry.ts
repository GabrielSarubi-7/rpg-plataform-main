import type { Point } from "@shared/rules/targetingRules";

export function ftToPx(feet: number, cellSize: number) {
  return (feet * cellSize) / 5;
}

export function getConePolygonPoints(input: {
  origin: Point;
  direction: Point;
  length: number;
  angleDeg: number;
}) {
  const halfAngle = (input.angleDeg * Math.PI) / 360;
  const directionAngle = Math.atan2(input.direction.y, input.direction.x);
  const leftAngle = directionAngle - halfAngle;
  const rightAngle = directionAngle + halfAngle;

  return [
    input.origin,
    {
      x: input.origin.x + Math.cos(leftAngle) * input.length,
      y: input.origin.y + Math.sin(leftAngle) * input.length,
    },
    {
      x: input.origin.x + Math.cos(rightAngle) * input.length,
      y: input.origin.y + Math.sin(rightAngle) * input.length,
    },
  ];
}

export function getLinePolygonPoints(input: {
  origin: Point;
  direction: Point;
  length: number;
  width: number;
}) {
  const perpendicular = {
    x: -input.direction.y,
    y: input.direction.x,
  };
  const halfWidth = input.width / 2;
  const end = {
    x: input.origin.x + input.direction.x * input.length,
    y: input.origin.y + input.direction.y * input.length,
  };

  return [
    {
      x: input.origin.x + perpendicular.x * halfWidth,
      y: input.origin.y + perpendicular.y * halfWidth,
    },
    {
      x: end.x + perpendicular.x * halfWidth,
      y: end.y + perpendicular.y * halfWidth,
    },
    {
      x: end.x - perpendicular.x * halfWidth,
      y: end.y - perpendicular.y * halfWidth,
    },
    {
      x: input.origin.x - perpendicular.x * halfWidth,
      y: input.origin.y - perpendicular.y * halfWidth,
    },
  ];
}

export function pointsToSvg(points: Point[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

