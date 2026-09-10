import { useEffect, useRef, useState } from "react";

import { useChatStore } from "../store/chatStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { emitChatMessage } from "../services/chatSocketService";

import ChatMessageItem from "./ChatMessageItem";

import styles from "./ChatPanel.module.css";

export default function ChatPanel() {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = useChatStore((s) => s.messages);

  const lobbyCode = useLobbyStore((s) => s.lobbyCode);
  const playerName = useLobbyStore((s) => s.playerName);
  const players = useLobbyStore((s) => s.players);

  const activeCampaign = useCampaignStore((s) => s.activeCampaign);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMessage = () => {
    const value = text.trim();

    if (!value || !lobbyCode) return;

    emitChatMessage(lobbyCode, playerName, value);
    setText("");
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <strong className={styles.title}>Chat</strong>

        <div className={styles.roomInfo}>
          Mesa: <strong>{activeCampaign?.name ?? lobbyCode}</strong>
        </div>

        <div className={styles.playersInfo}>
          Jogadores: {players.map((player) => player.name).join(", ") || "—"}
        </div>
      </header>

      <div className={`game-scrollbar ${styles.messages}`}>
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}

        <div ref={bottomRef} />
      </div>

      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enviar mensagem..."
          className={`game-input ${styles.input}`}
        />

        <button type="submit" className="game-button game-button-primary">
          Enviar
        </button>
      </form>
    </section>
  );
}