import { useMemo } from "react";
import { DoubleSide, Shape } from "three";
import { Line } from "@react-three/drei/core/Line";
import { useActionTargetingStore } from "@/features/actions/store/actionTargetingStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { getConePolygonPoints, getLinePolygonPoints } from "@/features/actions/utils/targetingGeometry";
import { getDirection, getTokenCenter, resolveActionTargeting, type Point } from "@shared/rules/targetingRules";
import type { CharacterAction } from "@shared/types/action";
import type { Token } from "@shared/types/token";
import { getTokenDimensions } from "@shared/rules/tokenRules";
import { feetToWorldUnits, pixelPointToWorld, pixelsToWorldUnits } from "../utils/coordinates3d";

export default function ActionPreview3D({ tokens, cellSize }: { tokens: Record<string, Token>; cellSize: number }) {
  const action = useActionTargetingStore((s) => s.activeAction);
  const casterId = useActionTargetingStore((s) => s.casterTokenId);
  const mouse = useActionTargetingStore((s) => s.mouseWorldPosition);
  const resolvedActions = useActionTargetingStore((s) => s.resolvedActions);
  const effects = useLobbyStore((s) => s.activeEffects);
  const local = useMemo(() => {
    if (!action || !casterId || !tokens[casterId]) return null;
    const origin = getTokenCenter(tokens[casterId], cellSize);
    const resolved = resolveActionTargeting({ action, tokens, casterTokenId: casterId, origin, requestedPoint: mouse ?? origin, tokenSize: cellSize, pixelsPerFoot: cellSize / 5 });
    return { action, origin, ...resolved };
  }, [action, casterId, tokens, cellSize, mouse]);
  return <group>
    {[...effects, ...resolvedActions].map((effect) => <Preview key={"useId" in effect ? effect.useId : effect.id}
      action={effect.action} origin={effect.targeting.origin} targetPoint={effect.targeting.targetPoint ?? effect.targeting.origin}
      affectedTokenIds={effect.targeting.affectedTokenIds ?? []} tokens={tokens} cellSize={cellSize} valid />)}
    {local && <Preview {...local} tokens={tokens} cellSize={cellSize} valid={local.isWithinRange && local.rangeBand !== "invalid"} />}
  </group>;
}

function Preview({ action, origin, targetPoint, affectedTokenIds, tokens, cellSize, valid }: {
  action: CharacterAction; origin: Point; targetPoint: Point; affectedTokenIds: string[];
  tokens: Record<string, Token>; cellSize: number; valid: boolean;
}) {
  const t = action.targeting;
  const color = valid ? action.visual.borderColor : "#ff6b6b";
  const from = pixelPointToWorld(origin, cellSize);
  const to = pixelPointToWorld(targetPoint, cellSize);
  const range = feetToWorldUnits(t.longRangeFt ?? t.rangeFt ?? t.normalRangeFt ?? 0);
  const center = ["self", "self_emanation", "melee_reach", "cone", "line"].includes(t.shape) ? from : to;
  const shape = useMemo(() => {
    const geometry = new Shape();
    const direction = getDirection(origin, targetPoint);
    let points: Point[] | undefined;
    if (t.shape === "cone") points = getConePolygonPoints({ origin: { x: 0, y: 0 }, direction, length: feetToWorldUnits(t.lengthFt ?? 0), angleDeg: t.angleDeg ?? 53.13 });
    if (t.shape === "line") points = getLinePolygonPoints({ origin: { x: 0, y: 0 }, direction, length: feetToWorldUnits(t.lengthFt ?? 0), width: feetToWorldUnits(t.widthFt ?? 5) });
    if (t.shape === "cube") { const half = feetToWorldUnits(t.sizeFt ?? 0) / 2; points = [{ x: -half, y: -half }, { x: half, y: -half }, { x: half, y: half }, { x: -half, y: half }]; }
    if (points) {
      // Rotated plane local +Y is world -Z.
      points.forEach((p, i) => i ? geometry.lineTo(p.x, -p.y) : geometry.moveTo(p.x, -p.y));
      geometry.closePath();
    } else {
      const radius = t.shape === "self" ? 0.65 : feetToWorldUnits(t.shape === "melee_reach" ? t.reachFt ?? 5 : t.radiusFt ?? 0);
      if (radius <= 0) return null;
      geometry.absarc(0, 0, radius, 0, Math.PI * 2, false);
    }
    if ((t.shape === "cube" || t.shape === "point_sphere" || t.shape === "cylinder") && t.showImpactArea === false) return null;
    return geometry;
  }, [t, origin.x, origin.y, targetPoint.x, targetPoint.y]);
  return <group>
    {t.showCasterRange && Boolean(t.normalRangeFt && t.longRangeFt) &&
      <Ring x={from.x} z={from.z} radius={feetToWorldUnits(t.normalRangeFt!)} color={action.visual.borderColor} />}
    {t.showCasterRange && range > 0 && <Ring x={from.x} z={from.z} radius={range} color={color} />}
    {t.showPathLine && <Line points={[[from.x, 0.04, from.z], [to.x, 0.04, to.z]]} color={color} lineWidth={2} raycast={() => {}} />}
    {shape && <mesh position={[center.x, 0.03, center.z]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
      <shapeGeometry args={[shape, 48]} />
      <meshBasicMaterial color={valid ? action.visual.color : color} transparent opacity={action.visual.opacity} depthWrite={false} side={DoubleSide} />
    </mesh>}
    {action.visual.showAffectedTokens !== false && affectedTokenIds.map((id) => {
      const token = tokens[id];
      if (!token) return null;
      const center = pixelPointToWorld(getTokenCenter(token, cellSize), cellSize);
      const size = getTokenDimensions(token, cellSize);
      return <Ring key={id} x={center.x} z={center.z} radius={pixelsToWorldUnits(Math.max(size.width, size.height) * 0.58, cellSize)} color={color} />;
    })}
  </group>;
}
function Ring({ x, z, radius, color }: { x: number; z: number; radius: number; color: string }) {
  return <mesh position={[x, 0.04, z]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => {}}>
    <ringGeometry args={[Math.max(0, radius - 0.03), radius + 0.03, 64]} />
    <meshBasicMaterial color={color} transparent opacity={0.8} depthWrite={false} side={DoubleSide} />
  </mesh>;
}
