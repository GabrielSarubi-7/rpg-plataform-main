import { useState } from "react";

import { emitDiceRoll } from "@/features/dice/services/diceSocketService";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";

import type {
  DiceRollFollowUp,
  DiceRollResult,
} from "@shared/types/dice";

interface Props {
  dice: DiceRollResult;
  text?: string;
  followUp?: DiceRollFollowUp;
  canUseFollowUp: boolean;
  roomCode: string;
  characterName: string;
  color?: string;
}

function getRollStyle(roll: number, sides: number) {
  if (roll === sides) {
    return {
      color: "#4ade80",
      fontWeight: 900,
      textShadow: "0 0 8px rgba(74, 222, 128, 0.55)",
    };
  }

  if (roll === 1) {
    return {
      color: "#ff5a5a",
      fontWeight: 900,
      textShadow: "0 0 8px rgba(255, 90, 90, 0.45)",
    };
  }

  return {
    color: "#93c5fd",
    fontWeight: 800,
    textShadow: "0 0 7px rgba(59, 130, 246, 0.32)",
  };
}

export default function DiceChatMessage({
  dice,
  text,
  followUp,
  canUseFollowUp,
  roomCode,
  characterName,
  color,
}: Props) {
  const [rollingDamage, setRollingDamage] = useState(false);
  const [damageError, setDamageError] = useState<string | null>(null);
  const playerName = useLobbyStore((state) => state.playerName);
  const label = getDiceLabel(text, dice.expression);
  const canRollDamage =
    canUseFollowUp &&
    followUp?.kind === "damage" &&
    dice.sides === 20 &&
    dice.outcome !== "fumble";
  const damageExpression =
    dice.outcome === "critical" && followUp?.criticalExpression
      ? followUp.criticalExpression
      : followUp?.normalExpression;
  const damageLabel =
    dice.outcome === "critical"
      ? `Dano critico: ${followUp?.actionName ?? "ataque"}`
      : `Dano: ${followUp?.actionName ?? "ataque"}`;
  const heading = getDiceHeading(dice);

  const handleRollDamage = async () => {
    if (!canRollDamage || !followUp || !damageExpression) return;

    try {
      setRollingDamage(true);
      setDamageError(null);

      await emitDiceRoll({
        roomCode,
        playerName: playerName || characterName,
        expression: damageExpression,
        isGmRoll: false,
        label: damageLabel,
        characterName,
        color,
      });
    } catch (error) {
      setDamageError(
        error instanceof Error ? error.message : "Erro ao rolar dano.",
      );
    } finally {
      setRollingDamage(false);
    }
  };

  return (
    <div
      style={{
        animation:
          dice.outcome === "critical"
            ? "diceCriticalPulse 0.8s ease-in-out"
            : dice.outcome === "fumble"
              ? "diceFumbleShake 0.45s ease-in-out"
              : undefined,
      }}
    >
      <strong
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          color: heading.color,
          letterSpacing: 0,
        }}
      >
        <span
          style={{
            minWidth: 42,
            border: `1px solid ${heading.border}`,
            borderRadius: 999,
            background: heading.background,
            color: heading.color,
            padding: "2px 8px",
            fontSize: 11,
            fontWeight: 900,
            textAlign: "center",
            textTransform: "uppercase",
            boxShadow: heading.shadow,
          }}
        >
          {heading.badge}
        </span>
        <span>{heading.label}</span>
        {dice.isGmRoll && (
          <span
            style={{
              border: "1px solid rgba(251, 191, 36, 0.48)",
              borderRadius: 999,
              background: "rgba(120, 53, 15, 0.38)",
              color: "#fef3c7",
              padding: "2px 7px",
              fontSize: 10,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            privado
          </span>
        )}
      </strong>

      {label && (
        <div
          style={{
            marginTop: 6,
            color: "#d9d1c6",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      )}

      <div style={{ marginTop: 4 }}>
        {dice.expression}: [
        {dice.rolls.map((roll, index) => (
          <span key={`${roll}-${index}`}>
            <span style={getRollStyle(roll, dice.sides)}>{roll}</span>
            {index < dice.rolls.length - 1 ? ", " : ""}
          </span>
        ))}
        ]
        {dice.modifier !== 0 &&
          ` ${dice.modifier > 0 ? "+" : "-"} ${Math.abs(dice.modifier)}`}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: dice.outcome === "normal" ? 18 : 24,
          fontWeight: 800,
        }}
      >
        Total: {dice.total}
      </div>

      {canRollDamage && damageExpression && (
        <button
          type="button"
          onClick={() => void handleRollDamage()}
          disabled={rollingDamage}
          style={{
            width: "100%",
            marginTop: 10,
            border: "1px solid rgba(255, 213, 74, 0.34)",
            borderRadius: 8,
            padding: "8px 10px",
            background:
              dice.outcome === "critical"
                ? "linear-gradient(135deg, rgba(22, 101, 52, 0.72), rgba(5, 46, 22, 0.86))"
                : "rgba(92, 52, 161, 0.32)",
            color: "#fff7dc",
            cursor: rollingDamage ? "wait" : "pointer",
            fontWeight: 800,
          }}
        >
          {rollingDamage
            ? "Rolando..."
            : `${damageLabel} (${damageExpression})`}
        </button>
      )}

      {damageError && (
        <div
          style={{
            marginTop: 8,
            color: "#ffb4b4",
            fontSize: 12,
          }}
        >
          {damageError}
        </div>
      )}
    </div>
  );
}

function getDiceLabel(text: string | undefined, expression: string) {
  if (!text) return null;

  const marker = " rolou ";
  const start = text.indexOf(marker);
  const expressionMarker = ` (${expression})`;
  const end = text.indexOf(expressionMarker);

  if (start === -1 || end === -1 || end <= start + marker.length) {
    return null;
  }

  return text.slice(start + marker.length, end);
}

function getDiceHeading(dice: DiceRollResult) {
  if (dice.outcome === "critical") {
    return {
      badge: "20",
      label: dice.isGmRoll ? "CRITICO DO GM!" : "CRITICO!",
      color: "#dcfce7",
      border: "rgba(74, 222, 128, 0.72)",
      background:
        "linear-gradient(180deg, rgba(22, 163, 74, 0.52), rgba(20, 83, 45, 0.76))",
      shadow: "0 0 14px rgba(74, 222, 128, 0.28)",
    };
  }

  if (dice.outcome === "fumble") {
    return {
      badge: "1",
      label: dice.isGmRoll ? "FALHA CRITICA DO GM!" : "FALHA CRITICA!",
      color: "#fee2e2",
      border: "rgba(248, 113, 113, 0.74)",
      background:
        "linear-gradient(180deg, rgba(185, 28, 28, 0.62), rgba(69, 10, 10, 0.82))",
      shadow: "0 0 14px rgba(248, 113, 113, 0.24)",
    };
  }

  if (dice.isGmRoll) {
    return {
      badge: "GM",
      label: "Rolagem secreta do GM",
      color: "#fef3c7",
      border: "rgba(251, 191, 36, 0.62)",
      background:
        "linear-gradient(180deg, rgba(146, 64, 14, 0.56), rgba(41, 25, 12, 0.88))",
      shadow: "0 0 14px rgba(251, 191, 36, 0.18)",
    };
  }

  return {
    badge: "D",
    label: "Rolagem",
    color: "#e0e7ff",
    border: "rgba(147, 197, 253, 0.48)",
    background:
      "linear-gradient(180deg, rgba(30, 64, 175, 0.34), rgba(15, 23, 42, 0.72))",
    shadow: "none",
  };
}

