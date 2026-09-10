import { useMemo, type CSSProperties } from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import type { Character } from "@/features/characters/services/characterApi";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";
import { useUiStore } from "@/features/ui/store/uiStore";
import type { TurnEntry } from "@shared/types/turn";

import {
  emitTurnEntryMove,
  emitTurnEntryRemove,
  emitTurnEntryUpsert,
  emitTurnNext,
} from "../services/turnSocketService";

import styles from "./TurnTrackerBar.module.css";

const VISIBLE_TURN_COUNT = 7;

export default function TurnTrackerBar() {
  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const turnState = useLobbyStore((state) => state.turnState);
  const rightSidebarCollapsed = useUiStore((state) => state.rightSidebarCollapsed);
  const rightSidebarWidth = useUiStore((state) => state.rightSidebarWidth);
  const turnTrackerScale = useUiStore((state) => state.turnTrackerScale);
  const setTurnTrackerScale = useUiStore((state) => state.setTurnTrackerScale);
  const tokens = useTokenStore((state) => state.tokens);
  const characters = useCharacterStore((state) => state.characters);

  const canManageTurns = canManageCampaign(activeCampaign, user?.id);
  const roomCode = lobbyCode ?? activeCampaign?.id ?? null;
  const entries = turnState.entries;
  const currentEntry = entries[turnState.currentIndex] ?? null;
  const visibleEntries = useMemo(
    () => getVisibleEntries(entries, turnState.currentIndex, VISIBLE_TURN_COUNT),
    [entries, turnState.currentIndex],
  );

  if (!turnState.active) {
    return null;
  }

  const canControlEntry = (entry: TurnEntry) => {
    if (canManageTurns) return true;

    const token = tokens[entry.tokenId];

    if (!user || !token?.characterId) return false;

    const character = characters.find(
      (currentCharacter) => currentCharacter.id === token.characterId,
    );

    return canControlCharacter(character, user.id);
  };

  const canPassTurn =
    canManageTurns || Boolean(currentEntry && canControlEntry(currentEntry));

  const passTurn = () => {
    if (!roomCode || !canPassTurn) return;

    emitTurnNext(roomCode, authToken);
  };

  const updateInitiative = (entry: TurnEntry, value: string) => {
    if (!roomCode || !canControlEntry(entry)) return;

    const initiative = Number(value);

    if (!Number.isFinite(initiative)) return;

    emitTurnEntryUpsert(
      roomCode,
      {
        tokenId: entry.tokenId,
        initiative,
      },
      authToken,
    );
  };

  return (
    <section
      data-ui-layer="true"
      className={styles.tracker}
      style={{
        "--right-sidebar-space": rightSidebarCollapsed
          ? "64px"
          : `${rightSidebarWidth + 16}px`,
        "--turn-tracker-scale": String(turnTrackerScale),
      } as CSSProperties}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <div className={styles.titlePlate}>
        <span>Fila de turnos</span>
        <small>Rodada {turnState.round}</small>
        <div className={styles.sizeControls}>
          <button
            type="button"
            onClick={() => setTurnTrackerScale(turnTrackerScale - 0.05)}
            title="Diminuir fila"
            aria-label="Diminuir fila de turnos"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setTurnTrackerScale(1)}
            title="Tamanho padrao"
            aria-label="Restaurar tamanho da fila de turnos"
          >
            1x
          </button>
          <button
            type="button"
            onClick={() => setTurnTrackerScale(turnTrackerScale + 0.05)}
            title="Aumentar fila"
            aria-label="Aumentar fila de turnos"
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.frame}>
        <div className={styles.sidePanel}>
          <span className={styles.roundLabel}>Turno</span>
          <strong>{currentEntry ? turnState.currentIndex + 1 : "-"}</strong>
        </div>

        <div className={styles.carousel} aria-label="Fila de turnos">
          {visibleEntries.length === 0 ? (
            <div className={styles.emptyState}>
              Role iniciativa pela ficha para entrar na fila.
            </div>
          ) : (
            visibleEntries.map((entry) => {
              const token = tokens[entry.tokenId];
              const character = entry.characterId
                ? characters.find((item) => item.id === entry.characterId)
                : null;
              const image =
                entry.image ||
                token?.image ||
                character?.defaultTokenImage ||
                character?.portraitImage ||
                "";
              const name = entry.name || token?.name || character?.name || "Turno";
              const isCurrent = entry.id === currentEntry?.id;
              const canEditEntry = canControlEntry(entry);

              return (
                <article
                  key={entry.id}
                  className={`${styles.entry} ${isCurrent ? styles.entryCurrent : ""}`}
                  title={name}
                >
                  {canManageTurns && (
                    <div className={styles.entryTools}>
                      <button
                        type="button"
                        onClick={() =>
                          roomCode &&
                          emitTurnEntryMove(roomCode, entry.tokenId, -1, authToken)
                        }
                        aria-label="Mover para a esquerda"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          roomCode &&
                          emitTurnEntryMove(roomCode, entry.tokenId, 1, authToken)
                        }
                        aria-label="Mover para a direita"
                      >
                        ›
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          roomCode &&
                          emitTurnEntryRemove(roomCode, entry.tokenId, authToken)
                        }
                        aria-label="Remover da fila"
                      >
                        x
                      </button>
                    </div>
                  )}

                  <div className={styles.portrait}>
                    {image ? (
                      <img src={resolveAssetUrl(image)} alt="" />
                    ) : (
                      <span>{name.slice(0, 1).toUpperCase()}</span>
                    )}
                  </div>

                  <input
                    key={`${entry.id}-${entry.initiative}`}
                    className={styles.initiativeInput}
                    type="number"
                    defaultValue={entry.initiative}
                    disabled={!canEditEntry}
                    onBlur={(event) => updateInitiative(entry, event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.currentTarget.blur();
                      }
                    }}
                    aria-label={`Iniciativa de ${name}`}
                  />

                  {isCurrent && <span className={styles.currentLabel}>Atual</span>}
                </article>
              );
            })
          )}
        </div>

        <button
          type="button"
          className={styles.passButton}
          onClick={passTurn}
          disabled={!canPassTurn}
        >
          Passar turno
        </button>
      </div>
    </section>
  );
}

function getVisibleEntries(
  entries: TurnEntry[],
  currentIndex: number,
  visibleCount: number,
) {
  if (entries.length <= visibleCount) {
    return entries;
  }

  const safeCurrent = Math.max(0, Math.min(entries.length - 1, currentIndex));
  const half = Math.floor(visibleCount / 2);

  return Array.from({ length: visibleCount }, (_, index) => {
    const offset = index - half;
    const entryIndex = (safeCurrent + offset + entries.length) % entries.length;

    return entries[entryIndex];
  });
}

function canControlCharacter(
  character: Character | null | undefined,
  userId: string,
) {
  if (!character) return false;

  return (
    character.ownerUserId === userId ||
    character.createdByUserId === userId ||
    Boolean(
      character.permissions?.some(
        (permission) => permission.userId === userId && permission.canControl,
      ),
    )
  );
}
