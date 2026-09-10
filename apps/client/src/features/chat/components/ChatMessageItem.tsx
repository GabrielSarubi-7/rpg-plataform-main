import type { ChatMessage } from "@shared/types/chat";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import DiceChatMessage from "./DiceChatMessage";
import TextChatMessage from "./TextChatMessage";

interface Props {
  message: ChatMessage;
}

export default function ChatMessageItem({ message }: Props) {
  const isDice = Boolean(message.type === "dice" && message.dice);
  const outcome = message.dice?.outcome;
  const isGmRoll = Boolean(message.dice?.isGmRoll);
  const playerId = useLobbyStore((state) => state.playerId);
  const rollColor = isDice ? normalizeChatColor(message.color) : null;

  return (
    <div>
      <div style={{ fontSize: 12, color: "#aaa", marginBottom: 3 }}>
        {message.playerName}
      </div>

      <div
        style={{
          background: getMessageBackground(
            isDice,
            outcome,
            rollColor,
            isGmRoll,
          ),

          border: getMessageBorder(isDice, outcome, rollColor, isGmRoll),

          padding: 8,
          borderRadius: 8,
          wordBreak: "break-word",
          boxShadow:
            getMessageShadow(isDice, outcome, isGmRoll),
        }}
      >
        {isDice && message.dice ? (
          <DiceChatMessage
            dice={message.dice}
            text={message.text}
            followUp={message.followUp}
            canUseFollowUp={message.playerId === playerId}
            roomCode={message.roomCode}
            characterName={message.playerName}
            color={message.color}
          />
        ) : (
          <TextChatMessage text={message.text} />
        )}
      </div>
    </div>
  );
}

function getMessageBackground(
  isDice: boolean | undefined,
  outcome: string | undefined,
  color: string | null,
  isGmRoll: boolean,
) {
  if (!isDice) return "#242424";

  if (outcome === "critical") {
    return "linear-gradient(135deg, rgba(5, 46, 22, 0.96), rgba(22, 101, 52, 0.94))";
  }

  if (outcome === "fumble") {
    return "linear-gradient(135deg, rgba(69, 10, 10, 0.96), rgba(127, 29, 29, 0.94))";
  }

  if (isGmRoll) {
    return "linear-gradient(135deg, rgba(92, 64, 22, 0.96), rgba(18, 14, 10, 0.98))";
  }

  if (color) {
    return `linear-gradient(135deg, ${hexToRgba(
      color,
      0.78,
    )}, rgba(15, 16, 22, 0.96))`;
  }

  return "linear-gradient(135deg, rgba(15, 32, 62, 0.96), rgba(20, 48, 96, 0.94))";
}

function getMessageBorder(
  isDice: boolean | undefined,
  outcome: string | undefined,
  color: string | null,
  isGmRoll: boolean,
) {
  if (!isDice) return "1px solid transparent";

  if (outcome === "critical") return "1px solid #22c55e";
  if (outcome === "fumble") return "1px solid #ef4444";
  if (isGmRoll) return "1px solid #f59e0b";

  return `1px solid ${color ?? "#3b82f6"}`;
}

function getMessageShadow(
  isDice: boolean | undefined,
  outcome: string | undefined,
  isGmRoll: boolean,
) {
  if (!isDice) return undefined;
  if (outcome === "critical") {
    return "0 0 18px rgba(34, 197, 94, 0.18) inset";
  }
  if (outcome === "fumble") {
    return "0 0 18px rgba(239, 68, 68, 0.18) inset";
  }
  if (isGmRoll) {
    return "0 0 22px rgba(245, 158, 11, 0.18) inset, 0 0 12px rgba(245, 158, 11, 0.12)";
  }

  return "0 0 18px rgba(59, 130, 246, 0.14) inset";
}

function normalizeChatColor(value: unknown) {
  if (typeof value !== "string") return null;

  const color = value.trim();

  return /^#[0-9a-f]{6}$/i.test(color) ? color : null;
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
