import { useEffect, useMemo, useRef, useState } from "react";

import ActionEditorSection from "@/features/actions/components/ActionEditorSection";
import { uploadImageAsset } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { emitDiceRoll } from "@/features/dice/services/diceSocketService";
import type { DiceRollFollowUp } from "@shared/types/dice";
import { emitChatMessage } from "@/features/chat/services/chatSocketService";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";
import { emitTurnEntryUpsert } from "@/features/turns/services/turnSocketService";
import { useUiStore } from "@/features/ui/store/uiStore";
import {
  emitCharacterDeleted,
  emitCharacterUpdated,
} from "../services/characterSocketService";
import ConfirmDialog, {
  type ConfirmDialogTone,
} from "@/shared/components/ui/ConfirmDialog";
import { useCharacterStore } from "../store/characterStore";
import CharacterBiographyTab from "./CharacterBiographyTab";
import CharacterSettingsTab from "./CharacterSettingsTab";
import CharacterSheetTab from "./CharacterSheetTab";
import {
  buildActionAnnouncement,
  prepareActionRolls,
} from "@/features/actions/utils/actionRolls";

import type { Character } from "../services/characterApi";
import type { DiceRollResult } from "@shared/types/dice";
import {
  DEFAULT_SHEET_FORM,
  applySheetTemplate,
  getAbilityList,
  getSkillList,
  mergeSheetFormIntoDataJson,
  normalizeSheetForm,
  type SheetForm,
} from "../types/characterSheet";
import { normalizeCampaignSettings } from "@shared/rules/campaignSettingsRules";

import styles from "./CharacterEditorModal.module.css";

type CharacterEditorTab = "sheet" | "actions" | "bio" | "settings";
type CharacterEditorPresentation = "floating" | "detached";

interface CharacterEditorModalProps {
  presentation?: CharacterEditorPresentation;
}

interface Position {
  x: number;
  y: number;
}

interface ConfirmationRequest {
  title: string;
  message: string;
  confirmLabel: string;
  tone?: ConfirmDialogTone;
}

export default function CharacterEditorModal({
  presentation = "floating",
}: CharacterEditorModalProps) {
  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const lobbyPlayerName = useLobbyStore((state) => state.playerName);
  const turnState = useLobbyStore((state) => state.turnState);
  const confirmSheetRolls = useUiStore((state) => state.confirmSheetRolls);
  const playerColor = useUiStore((state) => state.playerColor);
  const tokens = useTokenStore((state) => state.tokens);

  const characters = useCharacterStore((state) => state.characters);
  const editorOpen = useCharacterStore((state) => state.editorOpen);
  const editorMode = useCharacterStore((state) => state.editorMode);
  const selectedCharacterId = useCharacterStore(
    (state) => state.selectedCharacterId,
  );
  const activeCharacterId = useCharacterStore(
    (state) => state.activeCharacterId,
  );
  const saving = useCharacterStore((state) => state.saving);
  const createCharacter = useCharacterStore((state) => state.createCharacter);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const deleteCharacter = useCharacterStore((state) => state.deleteCharacter);
  const closeCharacterEditor = useCharacterStore(
    (state) => state.closeCharacterEditor,
  );
  const openEditCharacterEditor = useCharacterStore(
    (state) => state.openEditCharacterEditor,
  );
  const setActiveCharacterId = useCharacterStore(
    (state) => state.setActiveCharacterId,
  );

  const selectedCharacter = useMemo(() => {
    if (!selectedCharacterId) return null;

    return (
      characters.find((character) => character.id === selectedCharacterId) ??
      null
    );
  }, [characters, selectedCharacterId]);

  const role = getUserRole(activeCampaign, user?.id);
  const isGm = role === "owner" || role === "gm";
  const sheetTemplate = useMemo(
    () => normalizeCampaignSettings(activeCampaign?.settingsJson).sheetTemplate,
    [activeCampaign?.settingsJson],
  );
  const abilityList = useMemo(
    () => getAbilityList(sheetTemplate),
    [sheetTemplate],
  );
  const skillList = useMemo(
    () => getSkillList(sheetTemplate),
    [sheetTemplate],
  );
  const canSetSelectedCharacterActive = Boolean(
    selectedCharacter &&
      (isGm || selectedCharacter.ownerUserId === user?.id),
  );

  const [form, setForm] = useState<SheetForm>(DEFAULT_SHEET_FORM);
  const [activeTab, setActiveTab] =
    useState<CharacterEditorTab>("sheet");
  const [localError, setLocalError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [identityCollapsed, setIdentityCollapsed] = useState(true);
  const [confirmationRequest, setConfirmationRequest] =
    useState<ConfirmationRequest | null>(null);
  const [floatingPosition, setFloatingPosition] = useState<Position>(() =>
    getInitialFloatingPosition(),
  );

  const shellRef = useRef<HTMLDivElement | null>(null);
  const confirmationResolverRef = useRef<((confirmed: boolean) => void) | null>(
    null,
  );
  const dragRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startWindowX: number;
    startWindowY: number;
  } | null>(null);
  const wasEditorOpenRef = useRef(false);
  const loadedFormKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!editorOpen) {
      wasEditorOpenRef.current = false;
      loadedFormKeyRef.current = null;
      return;
    }

    if (!wasEditorOpenRef.current) {
      setLocalError(null);
      setActiveTab("sheet");
      setIdentityCollapsed(true);

      if (presentation === "floating") {
        setFloatingPosition(getInitialFloatingPosition());
      }
    }

    wasEditorOpenRef.current = true;
  }, [editorOpen, presentation]);

  useEffect(() => {
    if (!editorOpen) return;

    if (editorMode === "create") {
      if (loadedFormKeyRef.current !== "create") {
        setForm(
          applySheetTemplate(
            {
              ...DEFAULT_SHEET_FORM,
              type: "pc",
            },
            sheetTemplate,
          ),
        );
        loadedFormKeyRef.current = "create";
      }
      return;
    }

    if (
      selectedCharacter &&
      loadedFormKeyRef.current !== selectedCharacter.id
    ) {
      setForm(characterToForm(selectedCharacter, sheetTemplate));
      loadedFormKeyRef.current = selectedCharacter.id;
    }
  }, [editorOpen, editorMode, selectedCharacter, sheetTemplate]);

  if (!editorOpen) {
    return null;
  }

  const title =
    editorMode === "create"
      ? "Criar personagem"
      : (selectedCharacter?.name ?? "Ficha");

  const handleImageFile = async (
    file: File | undefined,
    field: "portraitImage" | "defaultTokenImage" | "sprite25dImage",
  ) => {
    if (!file || !authToken) return;

    try {
      setLocalError(null);
      const imageUrl = await uploadImageAsset(authToken, file, {
        maxDimension:
          field === "defaultTokenImage"
            ? 2048
            : field === "sprite25dImage"
              ? 2048
              : 1200,
        quality: field === "defaultTokenImage" ? 0.92 : 0.88,
      });

      setForm((current) => ({
        ...current,
        [field]: imageUrl,
      }));
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Erro ao enviar imagem.",
      );
    }
  };

  const handleSave = async () => {
    if (!authToken || !activeCampaign) {
      setLocalError("Entre em uma campanha para salvar a ficha.");
      return;
    }

    const name = form.name.trim();

    if (name.length < 2) {
      setLocalError("Nome da ficha precisa ter pelo menos 2 caracteres.");
      return;
    }

    try {
      setLocalError(null);

      const finalType = isGm ? form.type : "pc";
      const sheetData = mergeSheetFormIntoDataJson(
        {
          ...form,
          name,
          type: finalType,
        },
        selectedCharacter?.sheet?.dataJson,
        sheetTemplate,
      );

      if (editorMode === "create") {
        const created = await createCharacter(authToken, activeCampaign.id, {
          name,
          type: finalType,
          visibility: form.visibility,
          portraitImage: form.portraitImage.trim() || undefined,
          defaultTokenImage: form.defaultTokenImage.trim() || undefined,
        });

        const updated = await updateCharacter(
          authToken,
          activeCampaign.id,
          created.id,
          {
            sheetData,
          },
        );

        if (lobbyCode) {
          emitCharacterUpdated(lobbyCode, authToken, updated);
        }

        openEditCharacterEditor(updated.id);
        return;
      }

      if (!selectedCharacter) return;

      const updated = await persistExistingCharacterForm({
        ...form,
        name,
        type: finalType,
      });

      if (!updated) return;
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Erro ao salvar ficha.",
      );
    }
  };

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing ||
      saving ||
      deleting ||
      confirmationRequest
    ) {
      return;
    }

    const target = event.target;

    if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLButtonElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    ) {
      return;
    }

    if (
      target instanceof HTMLInputElement &&
      ["checkbox", "color", "file"].includes(target.type)
    ) {
      return;
    }

    event.preventDefault();
    void handleSave();
  };

  const handleSheetRoll = async (input: {
    label: string;
    expression: string;
    followUp?: DiceRollFollowUp;
  }) => {
    const roomCode = lobbyCode ?? activeCampaign?.id;

    if (!roomCode) {
      setLocalError("Entre em uma mesa para rolar pela ficha.");
      return null;
    }

    if (confirmSheetRolls) {
      const confirmed = await requestConfirmation({
        title: `Rolar ${input.label}?`,
        message: `A ficha vai rolar ${input.expression} e enviar o resultado para o chat da mesa.`,
        confirmLabel: "Rolar",
      });

      if (!confirmed) {
        return null;
      }
    }

    try {
      setLocalError(null);

      return await emitDiceRoll({
        roomCode,
        playerName: lobbyPlayerName || user?.name || "Jogador",
        expression: input.expression,
        isGmRoll: false,
        label: input.label,
        characterName: form.name.trim() || selectedCharacter?.name,
        followUp: input.followUp,
        color: playerColor,
      });
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Erro ao rolar pela ficha.",
      );
      return null;
    }
  };

  const handleDeathSaveRoll = async () => {
    const result = await handleSheetRoll({
      label: "Teste contra a morte",
      expression: "1d20",
    });

    if (!result) return;

    const nextForm = applyDeathSaveResult(form, result);
    setForm(nextForm);

    if (editorMode === "edit") {
      await persistExistingCharacterForm(nextForm);
    }
  };

  const handleInitiativeRoll = async () => {
    const result = await handleSheetRoll({
      label: "Iniciativa",
      expression: formatModifierExpression(form.initiative),
    });

    if (!result) return;

    const roomCode = lobbyCode ?? activeCampaign?.id;
    const token = selectedCharacter
      ? Object.values(tokens).find(
          (currentToken) => currentToken.characterId === selectedCharacter.id,
        )
      : null;

    if (roomCode && turnState.active && token) {
      emitTurnEntryUpsert(
        roomCode,
        {
          tokenId: token.id,
          initiative: result.total,
        },
        authToken,
      );
    }
  };

  const handleAnnounceAction = async (actionId: string) => {
    const roomCode = lobbyCode ?? activeCampaign?.id;
    const action = form.actions.find((current) => current.id === actionId);

    if (!roomCode || !action) {
      setLocalError("Entre em uma mesa para enviar ações ao chat.");
      return;
    }

    const rolls = prepareActionRolls(action, form, sheetTemplate);

    emitChatMessage(
      roomCode,
      lobbyPlayerName || user?.name || "Jogador",
      buildActionAnnouncement({
        actorName: form.name.trim() || selectedCharacter?.name || "Personagem",
        action,
        rolls,
        template: sheetTemplate,
      }),
    );
  };

  const handleRollActionAttack = async (actionId: string) => {
    const action = form.actions.find((current) => current.id === actionId);

    if (!action) return;

    const rolls = prepareActionRolls(action, form, sheetTemplate);

    if (!rolls.attackExpression) return;

    await handleSheetRoll({
      label: `Acerto: ${action.name}`,
      expression: rolls.attackExpression,
      followUp: rolls.damageExpression
        ? {
            kind: "damage",
            actionName: action.name,
            normalExpression: rolls.damageExpression,
            criticalExpression: rolls.criticalDamageExpression,
            damageType: action.roll.damageType,
          }
        : undefined,
    });
  };

  const handleRollActionDamage = async (actionId: string) => {
    const action = form.actions.find((current) => current.id === actionId);

    if (!action) return;

    const rolls = prepareActionRolls(action, form, sheetTemplate);

    if (!rolls.damageExpression) return;

    await handleSheetRoll({
      label: `Dano: ${action.name}`,
      expression: rolls.damageExpression,
    });
  };

  const handleManualDeathSaveChange = (
    field: "deathSaveSuccesses" | "deathSaveFailures",
    value: number,
  ) => {
    const nextForm = {
      ...form,
      [field]: clampDeathSaveCount(value),
    };

    setForm(nextForm);

    if (editorMode === "edit") {
      void persistExistingCharacterForm(nextForm);
    }
  };

  const handleReviveCharacter = async () => {
    const nextForm = {
      ...form,
      hpCurrent: 1,
      deathSaveSuccesses: 0,
      deathSaveFailures: 0,
    };

    setForm(nextForm);

    if (editorMode === "edit") {
      await persistExistingCharacterForm(nextForm);
    }
  };

  const handleStabilizeCharacter = async () => {
    const nextForm = {
      ...form,
      hpCurrent: 0,
      deathSaveSuccesses: 3,
      deathSaveFailures: 0,
    };

    setForm(nextForm);

    if (editorMode === "edit") {
      await persistExistingCharacterForm(nextForm);
    }
  };

  const handleDeleteCharacter = async () => {
    if (!authToken || !activeCampaign || !selectedCharacter) {
      return;
    }

    const confirmed = await requestConfirmation({
      title: `Deletar ${selectedCharacter.name}?`,
      message:
        "A ficha sai da lista da campanha, mas tokens já colocados no mapa não serão apagados automaticamente.",
      confirmLabel: "Deletar ficha",
      tone: "danger",
    });

    if (!confirmed) return;

    try {
      setDeleting(true);
      setLocalError(null);

      await deleteCharacter(authToken, activeCampaign.id, selectedCharacter.id);

      notifyOpener({
        source: "rpg-platform",
        type: "character:deleted",
        characterId: selectedCharacter.id,
      });

      if (lobbyCode) {
        emitCharacterDeleted(lobbyCode, authToken, selectedCharacter.id);
      }

      handleClose();
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Erro ao deletar ficha.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    if (presentation === "detached") {
      window.close();
      return;
    }

    closeCharacterEditor();
  };

  const handleOpenDetachedWindow = () => {
    if (editorMode !== "edit" || !selectedCharacter) {
      setLocalError("Salve a ficha antes de destacá-la em outra janela.");
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("characterWindow", selectedCharacter.id);

    const detachedWindow = window.open(
      url.toString(),
      `rpg-character-${selectedCharacter.id}`,
      "popup=yes,width=1280,height=900",
    );

    if (!detachedWindow) {
      setLocalError(
        "O navegador bloqueou a nova janela. Permita pop-ups para destacar a ficha.",
      );
      return;
    }

    detachedWindow.focus();
    closeCharacterEditor();
  };

  const handleHeaderPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (presentation !== "floating") return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startWindowX: floatingPosition.x,
      startWindowY: floatingPosition.y,
    };
  };

  const handleHeaderPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const drag = dragRef.current;

    if (
      presentation !== "floating" ||
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const nextPosition = clampFloatingPosition({
      x: drag.startWindowX + event.clientX - drag.startPointerX,
      y: drag.startWindowY + event.clientY - drag.startPointerY,
      shell: shellRef.current,
    });

    setFloatingPosition(nextPosition);
  };

  const handleHeaderPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (
      presentation !== "floating" ||
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
  };

  const stopUiEvent = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const requestConfirmation = (request: ConfirmationRequest) => {
    return new Promise<boolean>((resolve) => {
      confirmationResolverRef.current = resolve;
      setConfirmationRequest(request);
    });
  };

  const resolveConfirmation = (confirmed: boolean) => {
    confirmationResolverRef.current?.(confirmed);
    confirmationResolverRef.current = null;
    setConfirmationRequest(null);
  };

  const persistExistingCharacterForm = async (nextForm: SheetForm) => {
    if (!authToken || !activeCampaign || !selectedCharacter) {
      return null;
    }

    const name = nextForm.name.trim();
    const finalType = isGm ? nextForm.type : "pc";
    const sheetData = mergeSheetFormIntoDataJson(
      {
        ...nextForm,
        name,
        type: finalType,
      },
      selectedCharacter.sheet?.dataJson,
      sheetTemplate,
    );

    const updated = await updateCharacter(
      authToken,
      activeCampaign.id,
      selectedCharacter.id,
      {
        name,
        type: finalType,
        visibility: nextForm.visibility,
        portraitImage: nextForm.portraitImage.trim() || null,
        defaultTokenImage: nextForm.defaultTokenImage.trim() || null,
        sheetData,
      },
    );

    notifyOpener({
      source: "rpg-platform",
      type: "character:updated",
      character: updated,
    });

    if (lobbyCode) {
      emitCharacterUpdated(lobbyCode, authToken, updated);
    }

    return updated;
  };

  return (
    <>
      <div
      ref={shellRef}
      className={`${styles.windowShell} ${
        presentation === "floating"
          ? styles.floatingShell
          : styles.detachedShell
      }`}
      style={
        presentation === "floating"
          ? {
              transform: `translate3d(${floatingPosition.x}px, ${floatingPosition.y}px, 0)`,
            }
          : undefined
      }
      data-ui-layer="true"
      onPointerDown={stopUiEvent}
      onPointerMove={stopUiEvent}
      onPointerUp={stopUiEvent}
      onKeyDown={handleEditorKeyDown}
      onWheel={stopUiEvent}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <header
        className={`${styles.topbar} ${
          presentation === "floating" ? styles.draggableTopbar : ""
        }`}
        onPointerDown={handleHeaderPointerDown}
        onPointerMove={handleHeaderPointerMove}
        onPointerUp={handleHeaderPointerUp}
        onPointerCancel={handleHeaderPointerUp}
      >
        <div className={styles.titleArea}>
          <div className={styles.roundIcon}>
            {(form.name || title).slice(0, 1).toUpperCase()}
          </div>

          <strong>{title}</strong>
        </div>

        <div className={styles.windowActions}>
          {presentation === "floating" && (
            <button
              type="button"
              className={styles.headerButton}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={handleOpenDetachedWindow}
              title="Abrir em janela separada"
              aria-label="Abrir em janela separada"
            >
              ↗
            </button>
          )}

          <button
            type="button"
            className={styles.closeButton}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={handleClose}
            title="Fechar ficha"
            aria-label="Fechar ficha"
          >
            ×
          </button>
        </div>
      </header>

      <nav className={styles.tabs}>
        <TabButton
          label="Ficha"
          active={activeTab === "sheet"}
          onClick={() => setActiveTab("sheet")}
        />
        <TabButton
          label="Ações"
          active={activeTab === "actions"}
          onClick={() => setActiveTab("actions")}
        />
        <TabButton
          label="Biografia"
          active={activeTab === "bio"}
          onClick={() => setActiveTab("bio")}
        />
        <TabButton
          label="Configurações"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </nav>

      <div className={`${styles.body} game-scrollbar`}>
        {activeTab === "sheet" && (
          <CharacterSheetTab
            form={form}
            abilityList={abilityList}
            skillList={skillList}
            sheetTemplate={sheetTemplate}
            isGm={isGm}
            isActiveCharacter={
              Boolean(selectedCharacterId) &&
              activeCharacterId === selectedCharacterId
            }
            canSetActiveCharacter={canSetSelectedCharacterActive}
            onChange={(updater) => setForm((current) => updater(current))}
            onSetActiveCharacter={(active) =>
              setActiveCharacterId(active ? selectedCharacterId : null)
            }
            onOpenSettings={() => setActiveTab("settings")}
            identityCollapsed={identityCollapsed}
            onToggleIdentityCollapsed={() =>
              setIdentityCollapsed((current) => !current)
            }
            onRoll={handleSheetRoll}
            onRollInitiative={handleInitiativeRoll}
            onRollDeathSave={handleDeathSaveRoll}
            onSetDeathSaveSuccesses={(value) =>
              handleManualDeathSaveChange("deathSaveSuccesses", value)
            }
            onSetDeathSaveFailures={(value) =>
              handleManualDeathSaveChange("deathSaveFailures", value)
            }
            onStabilize={handleStabilizeCharacter}
            onRevive={handleReviveCharacter}
            onAnnounceAction={handleAnnounceAction}
            onRollActionAttack={handleRollActionAttack}
            onRollActionDamage={handleRollActionDamage}
          />
        )}

        {activeTab === "actions" && (
          <ActionEditorSection
            actions={form.actions}
            resources={form.resources}
            abilityList={abilityList}
            canEditResourceCurrent={
              isGm || form.resourceSettings.playersCanEditCurrent
            }
            onChange={(actions) =>
              setForm((current) => ({
                ...current,
                actions,
              }))
            }
            onResourcesChange={(resources) =>
              setForm((current) => ({
                ...current,
                resources,
              }))
            }
          />
        )}

        {activeTab === "bio" && (
          <CharacterBiographyTab
            form={form}
            onChange={(updater) => setForm((current) => updater(current))}
          />
        )}

        {activeTab === "settings" && (
          <CharacterSettingsTab
            form={form}
            isGm={isGm}
            onChange={(updater) => setForm((current) => updater(current))}
            onImageTextChange={(field, value) =>
              setForm((current) => ({
                ...current,
                [field]: value,
              }))
            }
            onImageFileChange={(field, file) => void handleImageFile(file, field)}
          />
        )}
      </div>

      {localError && <div className={styles.error}>{localError}</div>}

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          {editorMode === "edit" && selectedCharacter && (
            <button
              type="button"
              className={styles.dangerButton}
              onClick={handleDeleteCharacter}
              disabled={saving || deleting}
            >
              {deleting ? "Deletando..." : "Deletar ficha"}
            </button>
          )}
        </div>

        <div className={styles.footerActions}>
          <button
            type="button"
            className="game-button"
            onClick={handleClose}
            disabled={saving || deleting}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="game-button game-button-primary"
            onClick={handleSave}
            disabled={saving || deleting}
          >
            {saving ? "Salvando..." : "Salvar ficha"}
          </button>
        </div>
      </footer>
      </div>

      <ConfirmDialog
        open={Boolean(confirmationRequest)}
        title={confirmationRequest?.title ?? ""}
        message={confirmationRequest?.message ?? ""}
        confirmLabel={confirmationRequest?.confirmLabel}
        tone={confirmationRequest?.tone}
        onConfirm={() => resolveConfirmation(true)}
        onCancel={() => resolveConfirmation(false)}
      />
    </>
  );
}

function TabButton(props: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={props.active ? styles.tabActive : ""}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

function characterToForm(
  character: Character,
  sheetTemplate?: ReturnType<typeof normalizeCampaignSettings>["sheetTemplate"],
): SheetForm {
  return normalizeSheetForm({
    characterName: character.name,
    characterType: character.type,
    characterVisibility: character.visibility,
    portraitImage: character.portraitImage,
    defaultTokenImage: character.defaultTokenImage,
    dataJson: character.sheet?.dataJson,
    sheetTemplate,
  });
}

function formatModifierExpression(value: number) {
  if (value > 0) return `1d20+${value}`;
  if (value < 0) return `1d20${value}`;

  return "1d20";
}

function getUserRole(
  campaign: {
    ownerUserId: string;
    members?: {
      userId: string;
      role: string;
    }[];
  } | null,
  userId?: string,
) {
  if (!campaign || !userId) return "player";

  if (campaign.ownerUserId === userId) return "owner";

  return (
    campaign.members?.find((member) => member.userId === userId)?.role ??
    "player"
  );
}

function getInitialFloatingPosition(): Position {
  if (typeof window === "undefined") {
    return {
      x: 24,
      y: 24,
    };
  }

  const width = Math.min(1440, Math.max(window.innerWidth - 48, 0));
  const height = Math.min(900, Math.max(window.innerHeight - 48, 0));

  return {
    x: Math.max(12, Math.round((window.innerWidth - width) / 2)),
    y: Math.max(12, Math.round((window.innerHeight - height) / 2)),
  };
}

function clampFloatingPosition(input: {
  x: number;
  y: number;
  shell: HTMLDivElement | null;
}): Position {
  const width = input.shell?.offsetWidth ?? 1440;
  const height = input.shell?.offsetHeight ?? 900;
  const minVisibleSize = 72;

  return {
    x: Math.min(
      window.innerWidth - minVisibleSize,
      Math.max(-width + minVisibleSize, input.x),
    ),
    y: Math.min(
      window.innerHeight - minVisibleSize,
      Math.max(0, input.y),
    ),
  };
}

function notifyOpener(message: {
  source: "rpg-platform";
  type: "character:updated" | "character:deleted";
  character?: Character;
  characterId?: string;
}) {
  if (!window.opener) return;

  window.opener.postMessage(message, window.location.origin);
}

function applyDeathSaveResult(
  form: SheetForm,
  result: DiceRollResult,
): SheetForm {
  const naturalRoll = result.rolls[0];

  if (naturalRoll === 20) {
    return {
      ...form,
      hpCurrent: 1,
      deathSaveSuccesses: 0,
      deathSaveFailures: 0,
    };
  }

  if (naturalRoll === 1) {
    return {
      ...form,
      deathSaveFailures: clampDeathSaveCount(form.deathSaveFailures + 2),
    };
  }

  if (result.total >= 10) {
    return {
      ...form,
      deathSaveSuccesses: clampDeathSaveCount(form.deathSaveSuccesses + 1),
    };
  }

  return {
    ...form,
    deathSaveFailures: clampDeathSaveCount(form.deathSaveFailures + 1),
  };
}

function clampDeathSaveCount(value: number) {
  return Math.max(0, Math.min(3, value));
}
