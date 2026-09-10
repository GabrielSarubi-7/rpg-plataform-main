import type { CharacterAction } from "../types/action";
import type { Token } from "../types/token";
import { getTokenDimensions } from "./tokenRules";

export interface Point {
  x: number;
  y: number;
}

export interface ResolvedActionTargeting {
  requestedPoint: Point;
  targetPoint: Point;
  direction?: Point;
  affectedTokenIds: string[];
  targetTokenIds: string[];
  isWithinRange: boolean;
  rangeBand: "normal" | "long" | "invalid" | null;
}

export function getTokenCenter(token: Token, tokenSize: number): Point {
  const dimensions = getTokenDimensions(token, tokenSize);

  return {
    x: token.x + dimensions.width / 2,
    y: token.y + dimensions.height / 2,
  };
}

export function getDistance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function getDirection(origin: Point, point: Point): Point {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return {
      x: 1,
      y: 0,
    };
  }

  return {
    x: dx / length,
    y: dy / length,
  };
}

export function clampPointToRange(
  origin: Point,
  point: Point,
  maxDistance: number,
): Point {
  const distance = getDistance(origin, point);

  if (distance <= maxDistance || maxDistance <= 0) {
    return point;
  }

  const direction = getDirection(origin, point);

  return {
    x: origin.x + direction.x * maxDistance,
    y: origin.y + direction.y * maxDistance,
  };
}

export function getTokenAtPoint(
  tokens: Record<string, Token>,
  point: Point,
  tokenSize: number,
) {
  return Object.values(tokens).find(
    (token) => {
      const dimensions = getTokenDimensions(token, tokenSize);

      return (
        point.x >= token.x &&
        point.x <= token.x + dimensions.width &&
        point.y >= token.y &&
        point.y <= token.y + dimensions.height
      );
    },
  );
}

export function getTokensInsideCircle(
  tokens: Record<string, Token>,
  center: Point,
  radius: number,
  tokenSize: number,
) {
  return Object.values(tokens)
    .filter((token) => getDistance(getTokenCenter(token, tokenSize), center) <= radius)
    .map((token) => token.id);
}

export function getTokensInsideSquare(
  tokens: Record<string, Token>,
  center: Point,
  size: number,
  tokenSize: number,
) {
  const half = size / 2;

  return Object.values(tokens)
    .filter((token) => {
      const point = getTokenCenter(token, tokenSize);

      return (
        point.x >= center.x - half &&
        point.x <= center.x + half &&
        point.y >= center.y - half &&
        point.y <= center.y + half
      );
    })
    .map((token) => token.id);
}

export function getTokensInsideCone(
  tokens: Record<string, Token>,
  origin: Point,
  targetPoint: Point,
  length: number,
  angleDeg: number,
  tokenSize: number,
) {
  const direction = getDirection(origin, targetPoint);
  const halfAngleRad = (angleDeg * Math.PI) / 360;

  return Object.values(tokens)
    .filter((token) => {
      const center = getTokenCenter(token, tokenSize);
      const distance = getDistance(origin, center);

      if (distance > length) {
        return false;
      }

      const tokenDirection = getDirection(origin, center);
      const dot =
        direction.x * tokenDirection.x + direction.y * tokenDirection.y;
      const angle = Math.acos(Math.max(-1, Math.min(1, dot)));

      return angle <= halfAngleRad;
    })
    .map((token) => token.id);
}

export function getTokensInsideLine(
  tokens: Record<string, Token>,
  origin: Point,
  targetPoint: Point,
  length: number,
  width: number,
  tokenSize: number,
) {
  const direction = getDirection(origin, targetPoint);

  return Object.values(tokens)
    .filter((token) => {
      const center = getTokenCenter(token, tokenSize);
      const relativeX = center.x - origin.x;
      const relativeY = center.y - origin.y;
      const projection = relativeX * direction.x + relativeY * direction.y;

      if (projection < 0 || projection > length) {
        return false;
      }

      const perpendicularDistance = Math.abs(
        relativeX * direction.y - relativeY * direction.x,
      );

      return perpendicularDistance <= width / 2;
    })
    .map((token) => token.id);
}

export function resolveActionTargeting(input: {
  action: CharacterAction;
  tokens: Record<string, Token>;
  casterTokenId: string;
  origin: Point;
  requestedPoint: Point;
  tokenSize: number;
  pixelsPerFoot: number;
}): ResolvedActionTargeting {
  const {
    action,
    tokens,
    casterTokenId,
    origin,
    requestedPoint,
    tokenSize,
    pixelsPerFoot,
  } = input;

  const targeting = action.targeting;
  const rangeFt =
    targeting.longRangeFt ?? targeting.rangeFt ?? targeting.normalRangeFt ?? 0;
  const maxRangePx = rangeFt * pixelsPerFoot;
  const requestedDistance = getDistance(origin, requestedPoint);
  const isWithinRange = maxRangePx <= 0 || requestedDistance <= maxRangePx;
  const targetPoint =
    maxRangePx > 0
      ? clampPointToRange(origin, requestedPoint, maxRangePx)
      : requestedPoint;

  const direction = getDirection(origin, targetPoint);
  const normalRangePx =
    (targeting.normalRangeFt ?? targeting.rangeFt ?? 0) * pixelsPerFoot;
  const longRangePx = (targeting.longRangeFt ?? 0) * pixelsPerFoot;

  let rangeBand: ResolvedActionTargeting["rangeBand"] = null;

  if (longRangePx > 0) {
    rangeBand =
      requestedDistance <= normalRangePx
        ? "normal"
        : requestedDistance <= longRangePx
          ? "long"
          : "invalid";
  } else if (maxRangePx > 0) {
    rangeBand = isWithinRange ? "normal" : "invalid";
  }

  const tokenAtPoint = getTokenAtPoint(tokens, requestedPoint, tokenSize);
  const targetTokenIds: string[] = [];
  let affectedTokenIds: string[] = [];

  switch (targeting.shape) {
    case "self":
      affectedTokenIds = [casterTokenId];
      targetTokenIds.push(casterTokenId);
      break;

    case "self_emanation": {
      const radius = (targeting.radiusFt ?? 0) * pixelsPerFoot;
      affectedTokenIds = getTokensInsideCircle(
        tokens,
        origin,
        radius,
        tokenSize,
      );
      break;
    }

    case "single_target":
    case "ranged_projectile": {
      if (tokenAtPoint && isWithinRange) {
        targetTokenIds.push(tokenAtPoint.id);
        affectedTokenIds = [tokenAtPoint.id];
      }
      break;
    }

    case "melee_reach": {
      const reach = (targeting.reachFt ?? 5) * pixelsPerFoot;

      if (
        tokenAtPoint &&
        getDistance(origin, getTokenCenter(tokenAtPoint, tokenSize)) <= reach
      ) {
        targetTokenIds.push(tokenAtPoint.id);
        affectedTokenIds = [tokenAtPoint.id];
      }
      break;
    }

    case "point_sphere": {
      const radius = (targeting.radiusFt ?? 0) * pixelsPerFoot;
      affectedTokenIds = getTokensInsideCircle(
        tokens,
        targetPoint,
        radius,
        tokenSize,
      );
      break;
    }

    case "cone": {
      const length = (targeting.lengthFt ?? 0) * pixelsPerFoot;
      const angle = targeting.angleDeg ?? 53.13;
      affectedTokenIds = getTokensInsideCone(
        tokens,
        origin,
        targetPoint,
        length,
        angle,
        tokenSize,
      );
      break;
    }

    case "line": {
      const length = (targeting.lengthFt ?? 0) * pixelsPerFoot;
      const width = (targeting.widthFt ?? 5) * pixelsPerFoot;
      affectedTokenIds = getTokensInsideLine(
        tokens,
        origin,
        targetPoint,
        length,
        width,
        tokenSize,
      );
      break;
    }

    case "cube": {
      const size = (targeting.sizeFt ?? 0) * pixelsPerFoot;
      affectedTokenIds = getTokensInsideSquare(
        tokens,
        targetPoint,
        size,
        tokenSize,
      );
      break;
    }

    case "cylinder": {
      const radius = (targeting.radiusFt ?? 0) * pixelsPerFoot;
      affectedTokenIds = getTokensInsideCircle(
        tokens,
        targetPoint,
        radius,
        tokenSize,
      );
      break;
    }
  }

  return {
    requestedPoint,
    targetPoint,
    direction,
    affectedTokenIds,
    targetTokenIds,
    isWithinRange,
    rangeBand,
  };
}
