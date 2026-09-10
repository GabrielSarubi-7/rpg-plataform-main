import { useMemo } from "react";

import { useActionTargetingStore } from "../store/actionTargetingStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";

import {
  getTokenCenter,
  resolveActionTargeting,
} from "@shared/rules/targetingRules";

import {
  ftToPx,
  getConePolygonPoints,
  getLinePolygonPoints,
  pointsToSvg,
} from "../utils/targetingGeometry";

import type { CharacterAction } from "../types/actionTypes";
import type {
  ActionUsedPayload,
  RoomActionEffect,
} from "@shared/types/multiplayer";
import type { Point } from "@shared/rules/targetingRules";
import { getTokenDimensions } from "@shared/rules/tokenRules";

import styles from "./ActionPreviewLayer.module.css";

interface ActionPreviewLayerProps {
  width: number;
  height: number;
  cellSize: number;
  mode?: "2d" | "2.5d";
}

export default function ActionPreviewLayer({
  width,
  height,
  cellSize,
  mode = "2d",
}: ActionPreviewLayerProps) {
  const activeAction = useActionTargetingStore(
    (state) => state.activeAction,
  );
  const casterTokenId = useActionTargetingStore(
    (state) => state.casterTokenId,
  );
  const mouseWorldPosition = useActionTargetingStore(
    (state) => state.mouseWorldPosition,
  );
  const resolvedActions = useActionTargetingStore(
    (state) => state.resolvedActions,
  );
  const activeEffects = useLobbyStore((state) => state.activeEffects);

  const tokens = useTokenStore((state) => state.tokens);
  const pixelsPerFoot = cellSize / 5;

  const localPreview = useMemo(() => {
    if (!activeAction || !casterTokenId) {
      return null;
    }

    const casterToken = tokens[casterTokenId];

    if (!casterToken) {
      return null;
    }

    const origin = getTokenCenter(casterToken, cellSize);
    const requestedPoint = mouseWorldPosition ?? origin;
    const resolved = resolveActionTargeting({
      action: activeAction,
      tokens,
      casterTokenId,
      origin,
      requestedPoint,
      tokenSize: cellSize,
      pixelsPerFoot,
    });

    return {
      action: activeAction,
      origin,
      targetPoint: resolved.targetPoint,
      requestedPoint,
      direction: resolved.direction ?? { x: 1, y: 0 },
      affectedTokenIds: resolved.affectedTokenIds,
      isWithinRange: resolved.isWithinRange,
      rangeBand: resolved.rangeBand,
    };
  }, [
    activeAction,
    casterTokenId,
    tokens,
    mouseWorldPosition,
    cellSize,
    pixelsPerFoot,
  ]);

  return (
    <svg
      className={`${styles.layer} ${mode === "2.5d" ? styles.layer25d : ""}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {activeEffects.map((effect) => (
        <PersistentActionEffectPreview
          key={effect.id}
          effect={effect}
          tokens={tokens}
          cellSize={cellSize}
        />
      ))}

      {resolvedActions.map((payload) => (
        <ResolvedActionPreview
          key={payload.useId}
          payload={payload}
          tokens={tokens}
          cellSize={cellSize}
        />
      ))}

      {localPreview && (
        <PreviewShape
          action={localPreview.action}
          origin={localPreview.origin}
          targetPoint={localPreview.targetPoint}
          direction={localPreview.direction}
          affectedTokenIds={localPreview.affectedTokenIds}
          tokens={tokens}
          cellSize={cellSize}
          isWithinRange={localPreview.isWithinRange}
          rangeBand={localPreview.rangeBand}
        />
      )}
    </svg>
  );
}

function PersistentActionEffectPreview(props: {
  effect: RoomActionEffect;
  tokens: ReturnType<typeof useTokenStore.getState>["tokens"];
  cellSize: number;
}) {
  const direction =
    props.effect.targeting.direction ??
    buildDirection(
      props.effect.targeting.origin,
      props.effect.targeting.targetPoint ?? props.effect.targeting.origin,
    );
  const targetPoint =
    props.effect.targeting.targetPoint ?? props.effect.targeting.origin;

  return (
    <g className={styles.persistentPreview}>
      <PreviewShape
        action={props.effect.action}
        origin={props.effect.targeting.origin}
        targetPoint={targetPoint}
        direction={direction}
        affectedTokenIds={props.effect.targeting.affectedTokenIds ?? []}
        tokens={props.tokens}
        cellSize={props.cellSize}
        isWithinRange
        rangeBand="normal"
      />

      <text
        x={targetPoint.x}
        y={targetPoint.y - Math.max(16, props.cellSize * 0.42)}
        className={styles.effectLabel}
        textAnchor="middle"
      >
        {props.effect.name} - {props.effect.remainingTurns} turno
        {props.effect.remainingTurns === 1 ? "" : "s"}
      </text>
    </g>
  );
}

function ResolvedActionPreview(props: {
  payload: ActionUsedPayload;
  tokens: ReturnType<typeof useTokenStore.getState>["tokens"];
  cellSize: number;
}) {
  const direction =
    props.payload.targeting.direction ??
    buildDirection(
      props.payload.targeting.origin,
      props.payload.targeting.targetPoint ?? props.payload.targeting.origin,
    );

  return (
    <g className={styles.resolvedPreview}>
      <PreviewShape
        action={props.payload.action}
        origin={props.payload.targeting.origin}
        targetPoint={
          props.payload.targeting.targetPoint ?? props.payload.targeting.origin
        }
        direction={direction}
        affectedTokenIds={props.payload.targeting.affectedTokenIds ?? []}
        tokens={props.tokens}
        cellSize={props.cellSize}
        isWithinRange
        rangeBand="normal"
      />
    </g>
  );
}

function PreviewShape(props: {
  action: CharacterAction;
  origin: Point;
  targetPoint: Point;
  direction: Point;
  affectedTokenIds: string[];
  tokens: ReturnType<typeof useTokenStore.getState>["tokens"];
  cellSize: number;
  isWithinRange: boolean;
  rangeBand: "normal" | "long" | "invalid" | null;
}) {
  const { action, origin, targetPoint, direction, cellSize } = props;
  const targeting = action.targeting;
  const visual = action.visual;
  const pixelsPerFoot = cellSize / 5;
  const strokeColor =
    props.rangeBand === "invalid" || !props.isWithinRange
      ? "#ff6b6b"
      : visual.borderColor;

  const rangeFt =
    targeting.longRangeFt ?? targeting.rangeFt ?? targeting.normalRangeFt ?? 0;
  const normalRangeFt = targeting.normalRangeFt ?? targeting.rangeFt ?? 0;

  return (
    <>
      {targeting.showCasterRange && rangeFt > 0 && (
        <>
          {targeting.normalRangeFt && targeting.longRangeFt && (
            <circle
              cx={origin.x}
              cy={origin.y}
              r={ftToPx(normalRangeFt, cellSize)}
              className={styles.range}
              stroke={visual.borderColor}
            />
          )}

          <circle
            cx={origin.x}
            cy={origin.y}
            r={ftToPx(rangeFt, cellSize)}
            className={styles.range}
            stroke={strokeColor}
          />
        </>
      )}

      {targeting.showPathLine && (
        <>
          <line
            x1={origin.x}
            y1={origin.y}
            x2={targetPoint.x}
            y2={targetPoint.y}
            className={styles.pathGlow}
            stroke={visual.projectileColor ?? strokeColor}
          />

          <line
            x1={origin.x}
            y1={origin.y}
            x2={targetPoint.x}
            y2={targetPoint.y}
            className={styles.path}
            stroke={visual.projectileColor ?? strokeColor}
            strokeDasharray={visual.lineStyle === "solid" ? undefined : "10 8"}
          />
        </>
      )}

      {targeting.shape === "self" && (
        <circle
          cx={origin.x}
          cy={origin.y}
          r={cellSize * 0.65}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {targeting.shape === "self_emanation" && (
        <circle
          cx={origin.x}
          cy={origin.y}
          r={ftToPx(targeting.radiusFt ?? 0, cellSize)}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {targeting.shape === "melee_reach" && (
        <circle
          cx={origin.x}
          cy={origin.y}
          r={ftToPx(targeting.reachFt ?? 5, cellSize)}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {(targeting.shape === "point_sphere" ||
        targeting.shape === "cylinder") &&
        targeting.showImpactArea !== false && (
          <>
            <circle
              cx={targetPoint.x}
              cy={targetPoint.y}
              r={ftToPx(targeting.radiusFt ?? 0, cellSize)}
              fill={visual.color}
              fillOpacity={visual.opacity}
              stroke={strokeColor}
              className={styles.shape}
            />
            <circle
              cx={targetPoint.x}
              cy={targetPoint.y}
              r={Math.max(6, cellSize * 0.16)}
              fill={strokeColor}
              fillOpacity={0.86}
              className={styles.impactCore}
            />
          </>
        )}

      {targeting.shape === "cube" && targeting.showImpactArea !== false && (
        <rect
          x={targetPoint.x - ftToPx(targeting.sizeFt ?? 0, cellSize) / 2}
          y={targetPoint.y - ftToPx(targeting.sizeFt ?? 0, cellSize) / 2}
          width={ftToPx(targeting.sizeFt ?? 0, cellSize)}
          height={ftToPx(targeting.sizeFt ?? 0, cellSize)}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {targeting.shape === "cone" && (
        <polygon
          points={pointsToSvg(
            getConePolygonPoints({
              origin,
              direction,
              length: ftToPx(targeting.lengthFt ?? 0, cellSize),
              angleDeg: targeting.angleDeg ?? 53.13,
            }),
          )}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {targeting.shape === "line" && (
        <polygon
          points={pointsToSvg(
            getLinePolygonPoints({
              origin,
              direction,
              length: ftToPx(targeting.lengthFt ?? 0, cellSize),
              width: ftToPx(targeting.widthFt ?? 5, cellSize),
            }),
          )}
          fill={visual.color}
          fillOpacity={visual.opacity}
          stroke={strokeColor}
          className={styles.shape}
        />
      )}

      {visual.showAffectedTokens !== false &&
        props.affectedTokenIds.map((tokenId) => {
          const token = props.tokens[tokenId];

          if (!token) return null;

          const center = getTokenCenter(token, cellSize);
          const dimensions = getTokenDimensions(token, cellSize);

          return (
            <circle
              key={token.id}
              cx={center.x}
              cy={center.y}
              r={Math.max(dimensions.width, dimensions.height) * 0.58}
              className={styles.affectedToken}
              stroke={strokeColor}
            />
          );
        })}
    </>
  );
}

function buildDirection(origin: Point, point: Point) {
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
