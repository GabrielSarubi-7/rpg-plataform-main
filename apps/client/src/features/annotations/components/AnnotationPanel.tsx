import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useUiStore } from "@/features/ui/store/uiStore";
import FloatingPanel from "@/shared/components/ui/FloatingPanel";

import { emitAnnotationClear } from "../services/annotationSocketService";
import { useAnnotationStore } from "../store/annotationStore";

import styles from "./AnnotationPanel.module.css";

export default function AnnotationPanel() {
  const tool = useAnnotationStore((state) => state.tool);
  const visibility = useAnnotationStore((state) => state.visibility);
  const color = useAnnotationStore((state) => state.color);
  const size = useAnnotationStore((state) => state.size);
  const fontSize = useAnnotationStore((state) => state.fontSize);

  const setTool = useAnnotationStore((state) => state.setTool);
  const setVisibility = useAnnotationStore((state) => state.setVisibility);
  const setColor = useAnnotationStore((state) => state.setColor);
  const setSize = useAnnotationStore((state) => state.setSize);
  const setFontSize = useAnnotationStore((state) => state.setFontSize);
  const clearAnnotations = useAnnotationStore((state) => state.clearAnnotations);

  const authToken = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const playerColor = useUiStore((state) => state.playerColor);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const playerId = useLobbyStore((state) => state.playerId);
  const players = useLobbyStore((state) => state.players);
  const isGm =
    canManageCampaign(activeCampaign, user?.id) ||
    Boolean(players.find((player) => player.id === playerId)?.isGm);

  useEffect(() => {
    if (!isGm && visibility === "gm") {
      setVisibility("public");
    }
  }, [isGm, setVisibility, visibility]);

  useEffect(() => {
    setColor(playerColor);
  }, [playerColor, setColor]);

  const clearAllAnnotations = () => {
    if (!isGm) return;

    clearAnnotations();

    if (lobbyCode) {
      emitAnnotationClear(lobbyCode, authToken);
    }
  };

  return (
    <FloatingPanel
      panelId="annotations"
      title="Anotacoes"
      width={360}
      height={400}
    >
      <div className={styles.panel}>
        <section className={styles.section}>
          <strong className={styles.sectionTitle}>Ferramenta</strong>

          <div className={styles.buttonGrid}>
            <button
              type="button"
              className={`game-button ${
                tool === "pen" ? "game-button-primary" : ""
              }`}
              onClick={() => setTool(tool === "pen" ? "none" : "pen")}
            >
              Lapis
            </button>

            <button
              type="button"
              className={`game-button ${
                tool === "text" ? "game-button-primary" : ""
              }`}
              onClick={() => setTool(tool === "text" ? "none" : "text")}
            >
              Texto
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <strong className={styles.sectionTitle}>Visibilidade</strong>

          <div className={styles.buttonGrid}>
            <button
              type="button"
              className={`game-button ${
                visibility === "public" ? "game-button-primary" : ""
              }`}
              onClick={() => setVisibility("public")}
            >
              Todos
            </button>

            {isGm && (
              <button
                type="button"
                className={`game-button ${
                  visibility === "gm" ? "game-button-primary" : ""
                }`}
                onClick={() => setVisibility("gm")}
              >
                So GM
              </button>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <strong className={styles.sectionTitle}>Estilo</strong>

          <label className={styles.field}>
            <span>Cor</span>
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className={styles.colorInput}
            />
          </label>

          <label className={styles.field}>
            <span>Espessura do lapis</span>
            <input
              type="number"
              min={1}
              max={18}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="game-input"
            />
          </label>

          <label className={styles.field}>
            <span>Tamanho do texto</span>
            <input
              type="number"
              min={8}
              max={72}
              value={fontSize}
              onChange={(event) => setFontSize(Number(event.target.value))}
              className="game-input"
            />
          </label>
        </section>

        {isGm && (
          <button
            type="button"
            className="game-button"
            onClick={clearAllAnnotations}
          >
            Limpar anotacoes da sala
          </button>
        )}
      </div>
    </FloatingPanel>
  );
}
