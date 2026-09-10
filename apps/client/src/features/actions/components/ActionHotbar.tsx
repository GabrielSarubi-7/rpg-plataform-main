import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { emitCharacterUpdated } from "@/features/characters/services/characterSocketService";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";
import { emitTurnNext } from "@/features/turns/services/turnSocketService";
import {
  canUseActionResources,
  formatActionResourceCost,
  mergeSheetFormIntoDataJson,
  normalizeSheetForm,
  recoverCharacterResources,
  type CharacterResource,
  type CharacterResourceRecovery,
  type SheetForm,
} from "@/features/characters/types/characterSheet";

import { useActionTargetingStore } from "../store/actionTargetingStore";
import { normalizeCampaignSettings } from "@shared/rules/campaignSettingsRules";

import type {
  CharacterAction,
  CharacterActionKind,
} from "../types/actionTypes";

import styles from "./ActionHotbar.module.css";

type FilterId = "all" | "attacks" | "spells" | "features" | "items";

const FILTERS: {
  id: FilterId;
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "attacks", label: "Ataques" },
  { id: "spells", label: "Magias" },
  { id: "features", label: "Habilidades" },
  { id: "items", label: "Itens" },
];

const HOTBAR_LOCK_KEY = "rpg-platform-action-hotbar-locked";
const HOTBAR_POSITION_KEY = "rpg-platform-action-hotbar-position";

export default function ActionHotbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<FilterId>("all");
  const [restMenuOpen, setRestMenuOpen] = useState(false);
  const [locked, setLocked] = useState(() => {
    return window.localStorage.getItem(HOTBAR_LOCK_KEY) !== "false";
  });
  const [position, setPosition] = useState<{
    x: number;
    y: number;
  } | null>(() => {
    const saved = window.localStorage.getItem(HOTBAR_POSITION_KEY);

    if (!saved) return null;

    try {
      const parsed = JSON.parse(saved) as { x?: unknown; y?: unknown };

      if (
        typeof parsed.x === "number" &&
        Number.isFinite(parsed.x) &&
        typeof parsed.y === "number" &&
        Number.isFinite(parsed.y)
      ) {
        return {
          x: parsed.x,
          y: parsed.y,
        };
      }
    } catch {
      return null;
    }

    return null;
  });
  const dragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const turnState = useLobbyStore((state) => state.turnState);

  const selectedTokenId = useTokenStore((state) => state.selectedTokenId);
  const tokens = useTokenStore((state) => state.tokens);
  const characters = useCharacterStore((state) => state.characters);
  const activeCharacterId = useCharacterStore((state) => state.activeCharacterId);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  const activeAction = useActionTargetingStore(
    (state) => state.activeAction,
  );
  const startTargeting = useActionTargetingStore(
    (state) => state.startTargeting,
  );
  const cancelTargeting = useActionTargetingStore(
    (state) => state.cancelTargeting,
  );

  const selectedToken = selectedTokenId ? tokens[selectedTokenId] : null;
  const sheetTemplate = useMemo(
    () => normalizeCampaignSettings(activeCampaign?.settingsJson).sheetTemplate,
    [activeCampaign?.settingsJson],
  );
  const character = activeCharacterId
    ? characters.find(
        (currentCharacter) => currentCharacter.id === activeCharacterId,
      ) ?? null
    : null;
  const casterToken = character
    ? selectedToken?.characterId === character.id
      ? selectedToken
      : Object.values(tokens).find((token) => token.characterId === character.id) ??
        null
    : null;

  const sheetForm = useMemo(
    () =>
      character
        ? normalizeSheetForm({
            characterName: character.name,
            characterType: character.type,
            characterVisibility: character.visibility,
            portraitImage: character.portraitImage,
            defaultTokenImage: character.defaultTokenImage,
            dataJson: character.sheet?.dataJson,
            sheetTemplate,
          })
        : null,
    [character, sheetTemplate],
  );

  const actions = sheetForm?.actions ?? [];
  const resources = sheetForm?.resources ?? [];
  const currentTurnEntry = turnState.entries[turnState.currentIndex] ?? null;
  const canManageTurns = canManageCampaign(activeCampaign, user?.id);
  const canUseCurrentTurn =
    !turnState.active ||
    canManageTurns ||
    Boolean(casterToken && currentTurnEntry?.tokenId === casterToken.id);

  const visibleActions = useMemo(
    () => actions.filter((action) => matchesFilter(action, filter)),
    [actions, filter],
  );
  const statusText = !activeCharacterId
    ? "Marque uma ficha como ativa na tela de personagem."
    : !character
      ? "A ficha ativa não foi encontrada."
      : !casterToken
        ? "A ficha ativa precisa de um token no mapa."
        : `${actions.length} ação(ões) disponíveis`;

  const turnStatusText =
    casterToken && !canUseCurrentTurn
      ? "Aguarde o turno desta ficha."
      : statusText;

  const handleActionClick = (action: CharacterAction) => {
    if (!casterToken) return;
    if (!canUseCurrentTurn) return;

    if (sheetForm && !canUseActionResources(sheetForm, action)) {
      return;
    }

    if (activeAction?.id === action.id) {
      cancelTargeting();
      return;
    }

    startTargeting(action, casterToken.id);
  };

  const handleRecover = async (recovery: CharacterResourceRecovery) => {
    if (!authToken || !activeCampaign || !character || !sheetForm) return;

    const recoveredForm = recoverCharacterResources(sheetForm, recovery);
    const changed = recoveredForm.resources.some(
      (resource, index) => resource.current !== sheetForm.resources[index]?.current,
    );

    if (!changed) return;

    try {
      const updated = await updateCharacter(
        authToken,
        activeCampaign.id,
        character.id,
        {
          sheetData: mergeSheetFormIntoDataJson(
            recoveredForm,
            character.sheet?.dataJson,
            sheetTemplate,
          ),
        },
      );

      emitCharacterUpdated(activeCampaign.id, authToken, updated);
    } catch (error) {
      console.error("Erro ao recuperar recursos:", error);
    }
  };

  const handlePassTurn = async () => {
    await handleRecover("turn_end");

    const roomCode = lobbyCode ?? activeCampaign?.id;

    if (roomCode && turnState.active) {
      emitTurnNext(roomCode, authToken);
    }
  };

  useEffect(() => {
    window.localStorage.setItem(HOTBAR_LOCK_KEY, String(locked));
  }, [locked]);

  useEffect(() => {
    if (position) {
      window.localStorage.setItem(HOTBAR_POSITION_KEY, JSON.stringify(position));
      return;
    }

    window.localStorage.removeItem(HOTBAR_POSITION_KEY);
  }, [position]);

  useEffect(() => {
    if (collapsed) {
      setRestMenuOpen(false);
    }
  }, [collapsed]);

  const beginDrag = (event: PointerEvent<HTMLElement>) => {
    if (collapsed || locked || event.button !== 0) return;

    if (
      event.target instanceof HTMLElement &&
      event.target.closest("button, input, select, textarea, a")
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = Math.max(
      8,
      Math.min(window.innerWidth - rect.width - 8, event.clientX - drag.offsetX),
    );
    const nextY = Math.max(
      8,
      Math.min(window.innerHeight - rect.height - 8, event.clientY - drag.offsetY),
    );

    setPosition({
      x: nextX,
      y: nextY,
    });
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  };

  return (
    <section
      data-ui-layer="true"
      className={`${styles.hotbar} ${collapsed ? styles.collapsed : ""}`}
      style={
        position && !collapsed
          ? {
              left: position.x,
              top: position.y,
              bottom: "auto",
              transform: "none",
            }
          : undefined
      }
      onPointerDown={(event) => {
        event.stopPropagation();
        beginDrag(event);
      }}
      onPointerMove={(event) => {
        event.stopPropagation();
        moveDrag(event);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        endDrag(event);
      }}
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <div className={styles.topControls}>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setCollapsed((value) => !value)}
          title={collapsed ? "Abrir acoes" : "Recolher acoes"}
          aria-label={collapsed ? "Abrir acoes" : "Recolher acoes"}
      >
        {collapsed ? "▲ Ações" : "▼ Recolher"}
        </button>

        <button
          type="button"
          className={styles.lockButton}
          onClick={() => setLocked((value) => !value)}
          title={locked ? "Destravar barra" : "Fixar barra"}
          aria-label={locked ? "Destravar barra" : "Fixar barra"}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
      </div>

      {!collapsed && (
        <>
          <header className={styles.header}>
            <div>
              <strong>{character?.name ?? "Ações"}</strong>
              <span>{turnStatusText}</span>
            </div>

            <nav className={styles.filters}>
              {FILTERS.map((currentFilter) => (
                <button
                  key={currentFilter.id}
                  type="button"
                  className={
                    filter === currentFilter.id ? styles.filterActive : ""
                  }
                  onClick={() => setFilter(currentFilter.id)}
                >
                  {currentFilter.label}
                </button>
              ))}
            </nav>
          </header>

          {sheetForm && resources.length > 0 && (
            <div className={styles.resourceStrip}>
              {resources.map((resource) => (
                <ResourceBadge key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          <div className={styles.actions}>
            {visibleActions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={`${styles.actionButton} ${
                  activeAction?.id === action.id
                    ? styles.actionButtonActive
                    : ""
                } ${
                  sheetForm && !canUseActionResources(sheetForm, action)
                    ? styles.actionButtonDisabled
                    : ""
                } ${
                  !casterToken || !canUseCurrentTurn
                    ? styles.actionButtonDisabled
                    : ""
                }`}
                disabled={
                  !casterToken ||
                  !canUseCurrentTurn ||
                  Boolean(sheetForm && !canUseActionResources(sheetForm, action))
                }
                onClick={() => handleActionClick(action)}
                title={buildActionTooltip(action, sheetForm)}
              >
                <ActionIcon action={action} />
                <small>{action.name}</small>
              </button>
            ))}

            {character && visibleActions.length === 0 && (
              <div className={styles.emptyState}>
                Nenhuma ação nesta categoria.
              </div>
            )}
          </div>

          {sheetForm && (
            <div className={styles.actionFooter}>
              <button
                type="button"
                className={styles.turnButton}
                onClick={() => void handlePassTurn()}
                disabled={!canUseCurrentTurn}
              >
                Passar turno
              </button>

              <div className={styles.restControl}>
                <button
                  type="button"
                  className={styles.restToggle}
                  onClick={() => setRestMenuOpen((value) => !value)}
                  aria-expanded={restMenuOpen}
                  aria-label="Abrir descansos"
                  title="Descansos"
                >
                  Zzz
                </button>

                {restMenuOpen && (
                  <div className={styles.restMenu}>
                    <button
                      type="button"
                      onClick={() => {
                        setRestMenuOpen(false);
                        void handleRecover("short_rest");
                      }}
                    >
                      Rapido
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRestMenuOpen(false);
                        void handleRecover("medium_rest");
                      }}
                    >
                      Medio
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRestMenuOpen(false);
                        void handleRecover("long_rest");
                      }}
                    >
                      Longo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ResourceBadge({ resource }: { resource: CharacterResource }) {
  const pipCount = Math.min(resource.max, 12);

  return (
    <div className={styles.resourceBadge}>
      <ResourceIcon resource={resource} />

      <div>
        <strong>{resource.name}</strong>
        <span>
          {resource.current}/{resource.max}
        </span>
      </div>

      <div className={styles.resourcePips}>
        {Array.from({ length: Math.max(0, pipCount) }).map((_, index) => (
          <i
            key={index}
            className={index < resource.current ? styles.resourcePipFilled : ""}
            style={{ "--resource-color": resource.color } as CSSProperties}
          />
        ))}
        {resource.max > pipCount && <em>+</em>}
      </div>
    </div>
  );
}

function ResourceIcon({ resource }: { resource: CharacterResource }) {
  if (resource.iconImage) {
    return (
      <img
        src={resolveAssetUrl(resource.iconImage)}
        alt=""
        className={styles.resourceIcon}
      />
    );
  }

  return (
    <span
      className={styles.resourceIcon}
      style={{ "--resource-color": resource.color } as CSSProperties}
    >
      {resource.icon || "✦"}
    </span>
  );
}

function ActionIcon({ action }: { action: CharacterAction }) {
  if (action.iconImage) {
    return (
      <img
        src={resolveAssetUrl(action.iconImage)}
        alt=""
        className={styles.actionIconImage}
      />
    );
  }

  return <span>{action.icon || "✦"}</span>;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M6 11h12v9H6z" />
    </svg>
  );
}

function UnlockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 9.5-2" />
      <path d="M6 11h12v9H6z" />
    </svg>
  );
}

function matchesFilter(action: CharacterAction, filter: FilterId) {
  if (filter === "all") return true;

  if (filter === "attacks") {
    return ["melee_attack", "ranged_attack", "thrown_attack"].includes(
      action.kind,
    );
  }

  if (filter === "spells") {
    return action.kind === "spell";
  }

  if (filter === "features") {
    return action.kind === "feature" || action.kind === "custom";
  }

  return action.kind === "item";
}

function buildActionTooltip(action: CharacterAction, form: SheetForm | null) {
  const range =
    action.targeting.longRangeFt ??
    action.targeting.rangeFt ??
    action.targeting.reachFt ??
    action.targeting.lengthFt;
  const parts = [action.name, formatKind(action.kind)];
  const costLabel = form ? formatActionResourceCost(form, action) : "";

  if (range) {
    parts.push(`${range} ft`);
  }

  if (action.roll.damage) {
    parts.push(action.roll.damage);
  }

  if (costLabel) {
    parts.push(`Custo: ${costLabel}`);
  }

  return parts.join(" - ");
}

function formatKind(kind: CharacterActionKind) {
  switch (kind) {
    case "spell":
      return "Magia";
    case "melee_attack":
      return "Ataque corpo a corpo";
    case "ranged_attack":
      return "Ataque à distância";
    case "thrown_attack":
      return "Ataque arremessado";
    case "feature":
      return "Habilidade";
    case "item":
      return "Item";
    case "custom":
      return "Customizada";
  }
}
