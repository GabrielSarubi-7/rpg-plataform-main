import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import {
  emitTurnStart,
  emitTurnStop,
  emitTurnEntryUpsert,
} from "@/features/turns/services/turnSocketService";
import { useTokenStore } from "@/features/tokens/store/tokenStore";
import { useCharacterStore } from "../store/characterStore";
import { normalizeCampaignSettings } from "@shared/rules/campaignSettingsRules";
import { normalizeSheetForm } from "../types/characterSheet";

import type { Character } from "../services/characterApi";
import type {
  CampaignCharacterAssignments,
  CampaignCharacterCategory,
} from "@shared/types/campaignSettings";

import styles from "./CharactersPanel.module.css";

interface DragCharacterData {
  id: string;
  name: string;
  image?: string;
}

type CharacterCategory = CampaignCharacterCategory;
type CharacterAssignments = CampaignCharacterAssignments;

type CategoryEditorState =
  | {
      mode: "create";
      parentId: string | null;
      name: string;
    }
  | {
      mode: "rename";
      categoryId: string;
      name: string;
    };

const ROOT_CATEGORY_DROP_ID = "__root__";

type TurnEntryEditorState = {
  characterId: string;
  initiative: string;
  error: string | null;
};

export default function CharactersPanel() {
  const authToken = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const updateCampaignSettings = useCampaignStore(
    (state) => state.updateSettings,
  );
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const turnState = useLobbyStore((state) => state.turnState);
  const tokens = useTokenStore((state) => state.tokens);

  const characters = useCharacterStore((state) => state.characters);
  const loading = useCharacterStore((state) => state.loading);
  const error = useCharacterStore((state) => state.error);
  const activeCharacterId = useCharacterStore(
    (state) => state.activeCharacterId,
  );
  const loadCharacters = useCharacterStore((state) => state.loadCharacters);
  const openCreateCharacterEditor = useCharacterStore(
    (state) => state.openCreateCharacterEditor,
  );
  const openEditCharacterEditor = useCharacterStore(
    (state) => state.openEditCharacterEditor,
  );
  const setActiveCharacterId = useCharacterStore(
    (state) => state.setActiveCharacterId,
  );

  const [categories, setCategories] = useState<CharacterCategory[]>([]);
  const [assignments, setAssignments] = useState<CharacterAssignments>({});
  const [storageReadyCampaignId, setStorageReadyCampaignId] = useState<
    string | null
  >(null);
  const [manualExpanded, setManualExpanded] = useState(true);
  const [playersExpanded, setPlayersExpanded] = useState(true);
  const [publicExpanded, setPublicExpanded] = useState(true);
  const [categoryEditor, setCategoryEditor] =
    useState<CategoryEditorState | null>(null);
  const [categoryToDelete, setCategoryToDelete] =
    useState<CharacterCategory | null>(null);
  const [dragOverCategoryId, setDragOverCategoryId] = useState<string | null>(
    null,
  );
  const [draggedCharacterId, setDraggedCharacterId] = useState<string | null>(
    null,
  );
  const [movePickerCharacterId, setMovePickerCharacterId] = useState<
    string | null
  >(null);
  const [turnEntryEditor, setTurnEntryEditor] =
    useState<TurnEntryEditorState | null>(null);
  const lastRemoteLibrarySignatureRef = useRef<string | null>(null);

  const campaignId = activeCampaign?.id;
  const roomCode = lobbyCode ?? activeCampaign?.id;
  const userRole = getUserRole(activeCampaign, user?.id);
  const isGm = userRole === "owner" || userRole === "gm";
  const sheetTemplate = useMemo(
    () => normalizeCampaignSettings(activeCampaign?.settingsJson).sheetTemplate,
    [activeCampaign?.settingsJson],
  );

  const persistCharacterLibrary = useCallback(
    (
      nextCategories: CharacterCategory[],
      nextAssignments: CharacterAssignments,
    ) => {
      if (
        !authToken ||
        !activeCampaign ||
        !isGm ||
        !campaignId ||
        storageReadyCampaignId !== campaignId
      ) {
        return;
      }

      const signature = getLibrarySignature(nextCategories, nextAssignments);

      if (lastRemoteLibrarySignatureRef.current === signature) {
        return;
      }

      const settings = normalizeCampaignSettings(activeCampaign.settingsJson);

      void updateCampaignSettings(authToken, campaignId, {
        ...settings,
        characterLibrary: {
          categories: nextCategories,
          assignments: nextAssignments,
        },
      }).then((updatedCampaign) => {
        if (updatedCampaign) {
          lastRemoteLibrarySignatureRef.current = signature;
        }
      });
    },
    [
      activeCampaign,
      authToken,
      campaignId,
      isGm,
      storageReadyCampaignId,
      updateCampaignSettings,
    ],
  );

  useEffect(() => {
    if (!authToken || !activeCampaign) return;

    loadCharacters(authToken, activeCampaign.id);
  }, [authToken, activeCampaign, loadCharacters]);

  useEffect(() => {
    if (!campaignId) {
      setCategories([]);
      setAssignments({});
      setStorageReadyCampaignId(null);
      return;
    }

    const settings = normalizeCampaignSettings(activeCampaign?.settingsJson);
    const storedCategories = readStoredValue<CharacterCategory[]>(
      getCategoriesStorageKey(campaignId),
      [],
    );
    const storedAssignments = readStoredValue<CharacterAssignments>(
      getAssignmentsStorageKey(campaignId),
      {},
    );
    const hasRemoteLibrary =
      settings.characterLibrary.categories.length > 0 ||
      Object.keys(settings.characterLibrary.assignments).length > 0;
    const nextCategories = hasRemoteLibrary
      ? settings.characterLibrary.categories
      : storedCategories;
    const nextAssignments = hasRemoteLibrary
      ? settings.characterLibrary.assignments
      : storedAssignments;

    lastRemoteLibrarySignatureRef.current = getLibrarySignature(
      settings.characterLibrary.categories,
      settings.characterLibrary.assignments,
    );
    setCategories(nextCategories);
    setAssignments(nextAssignments);
    setStorageReadyCampaignId(campaignId);
  }, [activeCampaign?.settingsJson, campaignId]);

  useEffect(() => {
    if (!campaignId || storageReadyCampaignId !== campaignId) return;

    localStorage.setItem(
      getCategoriesStorageKey(campaignId),
      JSON.stringify(categories),
    );
  }, [campaignId, categories, storageReadyCampaignId]);

  useEffect(() => {
    if (!campaignId || storageReadyCampaignId !== campaignId) return;

    localStorage.setItem(
      getAssignmentsStorageKey(campaignId),
      JSON.stringify(assignments),
    );
  }, [assignments, campaignId, storageReadyCampaignId]);

  useEffect(() => {
    if (
      !authToken ||
      !activeCampaign ||
      !isGm ||
      !campaignId ||
      storageReadyCampaignId !== campaignId
    ) {
      return;
    }

    const signature = getLibrarySignature(categories, assignments);

    if (lastRemoteLibrarySignatureRef.current === signature) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      persistCharacterLibrary(categories, assignments);
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
      persistCharacterLibrary(categories, assignments);
    };
  }, [
    activeCampaign,
    assignments,
    authToken,
    campaignId,
    categories,
    isGm,
    persistCharacterLibrary,
    storageReadyCampaignId,
    updateCampaignSettings,
  ]);

  const playerNameById = useMemo(() => {
    const names = new Map<string, string>();

    activeCampaign?.members?.forEach((member) => {
      const name = member.user?.name ?? member.displayName;

      if (name) {
        names.set(member.userId, name);
      }
    });

    if (user) {
      names.set(user.id, user.name);
    }

    return names;
  }, [activeCampaign?.members, user]);

  const playerUserIds = useMemo(() => {
    const ids = new Set<string>();

    activeCampaign?.members?.forEach((member) => {
      if (member.role === "player") {
        ids.add(member.userId);
      }
    });

    return ids;
  }, [activeCampaign?.members]);

  const manualCharacters = useMemo(() => {
    return characters.filter((character) => {
      if (isPlayerCharacter(character, playerUserIds)) return false;

      const assignedCategoryId = assignments[character.id];

      return assignedCategoryId === undefined || assignedCategoryId === null;
    });
  }, [assignments, characters, playerUserIds]);

  const charactersByCategory = useMemo(() => {
    const map = new Map<string, Character[]>();
    const categoryIds = new Set(categories.map((category) => category.id));

    characters.forEach((character) => {
      if (isPlayerCharacter(character, playerUserIds)) return;

      const categoryId = assignments[character.id];

      if (!categoryId || !categoryIds.has(categoryId)) return;

      const group = map.get(categoryId) ?? [];
      group.push(character);
      map.set(categoryId, group);
    });

    return map;
  }, [assignments, categories, characters, playerUserIds]);

  const playerGroups = useMemo(() => {
    const groups = new Map<string, Character[]>();

    characters.forEach((character) => {
      if (!isPlayerCharacter(character, playerUserIds)) return;

      const shouldShow =
        isGm ||
        character.ownerUserId === user?.id ||
        character.visibility === "public";

      if (!shouldShow) return;

      const group = groups.get(character.ownerUserId) ?? [];
      group.push(character);
      groups.set(character.ownerUserId, group);
    });

    return [...groups.entries()].sort(([firstUserId], [secondUserId]) =>
      getPlayerName(firstUserId, playerNameById).localeCompare(
        getPlayerName(secondUserId, playerNameById),
      ),
    );
  }, [characters, isGm, playerNameById, playerUserIds, user?.id]);

  const publicPlayerGroups = useMemo(() => {
    return playerGroups
      .map(([ownerUserId, groupCharacters]) => [
        ownerUserId,
        groupCharacters.filter(
          (character) =>
            character.visibility === "public" &&
            character.ownerUserId !== user?.id,
        ),
      ] as const)
      .filter(([, groupCharacters]) => groupCharacters.length > 0);
  }, [playerGroups, user?.id]);

  const movePickerCharacter = useMemo(() => {
    if (!movePickerCharacterId) return null;

    const character = characters.find(
      (item) => item.id === movePickerCharacterId,
    );

    if (!character || isPlayerCharacter(character, playerUserIds)) return null;

    return character;
  }, [characters, movePickerCharacterId, playerUserIds]);

  const turnEntryCharacter = useMemo(() => {
    if (!turnEntryEditor) return null;

    return (
      characters.find((character) => character.id === turnEntryEditor.characterId) ??
      null
    );
  }, [characters, turnEntryEditor]);

  const tokenByCharacterId = useMemo(() => {
    const map = new Map<string, (typeof tokens)[string]>();

    Object.values(tokens).forEach((token) => {
      if (token.characterId && !map.has(token.characterId)) {
        map.set(token.characterId, token);
      }
    });

    return map;
  }, [tokens]);

  const canControlCharacterForTurns = (character: Character) => {
    if (isGm) return true;
    if (!user?.id) return false;

    return (
      character.ownerUserId === user.id ||
      character.createdByUserId === user.id ||
      Boolean(
        character.permissions?.some(
          (permission) =>
            permission.userId === user.id && permission.canControl,
        ),
      )
    );
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    character: Character,
  ) => {
    setDraggedCharacterId(character.id);

    const dragData: DragCharacterData = {
      id: character.id,
      name: character.name,
      image:
        character.defaultTokenImage ??
        character.portraitImage ??
        undefined,
    };

    event.dataTransfer.setData(
      "application/rpg-character",
      JSON.stringify(dragData),
    );

    event.dataTransfer.setData("application/rpg-character-id", character.id);
    event.dataTransfer.setData("text/plain", character.name);
    event.dataTransfer.effectAllowed = "copyMove";
  };

  const startCreateCategory = (parentId: string | null) => {
    setCategoryEditor({
      mode: "create",
      parentId,
      name: parentId ? "Nova subcategoria" : "Nova categoria",
    });
  };

  const startRenameCategory = (category: CharacterCategory) => {
    setCategoryEditor({
      mode: "rename",
      categoryId: category.id,
      name: category.name,
    });
  };

  const submitCategoryEditor = (event: React.FormEvent) => {
    event.preventDefault();

    if (!categoryEditor) return;

    const name = categoryEditor.name.trim();

    if (!name) return;

    if (categoryEditor.mode === "create") {
      setCategories((current) => [
        ...current,
        {
          id: createLocalId(),
          name,
          parentId: categoryEditor.parentId,
          expanded: true,
        },
      ]);
    } else {
      setCategories((current) =>
        current.map((item) =>
          item.id === categoryEditor.categoryId
            ? {
                ...item,
                name,
              }
            : item,
        ),
      );
    }

    setCategoryEditor(null);
  };

  const deleteCategory = (categoryId: string) => {
    const childIds = collectCategoryTreeIds(categories, categoryId);

    setCategories((current) =>
      current.filter((category) => !childIds.has(category.id)),
    );

    setAssignments((current) => {
      const next = {
        ...current,
      };

      Object.entries(next).forEach(([characterId, assignedCategoryId]) => {
        if (assignedCategoryId && childIds.has(assignedCategoryId)) {
          next[characterId] = null;
        }
      });

      return next;
    });

    setCategoryToDelete(null);
  };

  const toggleCategory = (categoryId: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              expanded: !category.expanded,
            }
          : category,
      ),
    );
  };

  const assignCharacterCategory = (
    characterId: string,
    categoryId: string | null,
  ) => {
    const character = characters.find((item) => item.id === characterId);

    if (!character || isPlayerCharacter(character, playerUserIds)) return;

    setAssignments((current) => ({
      ...current,
      [characterId]: categoryId,
    }));
  };

  const moveCharacterToCategory = (
    characterId: string,
    categoryId: string | null,
  ) => {
    assignCharacterCategory(characterId, categoryId);
    setMovePickerCharacterId(null);
  };

  const handleCategoryDragOver = (
    event: React.DragEvent<HTMLElement>,
    categoryId: string | null,
  ) => {
    if (!isGm) return;

    const characterId = draggedCharacterId;
    const character = characters.find((item) => item.id === characterId);

    if (!character || isPlayerCharacter(character, playerUserIds)) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDragOverCategoryId(categoryId ?? ROOT_CATEGORY_DROP_ID);
  };

  const handleCategoryDrop = (
    event: React.DragEvent<HTMLElement>,
    categoryId: string | null,
  ) => {
    if (!isGm) return;

    const characterId = event.dataTransfer.getData(
      "application/rpg-character-id",
    );

    if (!characterId) return;

    event.preventDefault();
    assignCharacterCategory(characterId, categoryId);
    setDragOverCategoryId(null);
  };

  const clearDragTarget = () => {
    setDragOverCategoryId(null);
  };

  const handleCharacterDragEnd = () => {
    setDraggedCharacterId(null);
    setDragOverCategoryId(null);
  };

  const startTurns = () => {
    if (!roomCode || !isGm) return;

    emitTurnStart(roomCode, authToken);
  };

  const stopTurns = () => {
    if (!roomCode || !isGm) return;

    emitTurnStop(roomCode, authToken);
  };

  const openTurnEntryEditor = (character: Character) => {
    const token = tokenByCharacterId.get(character.id);

    if (!roomCode || !turnState.active || !token) return;
    if (!canControlCharacterForTurns(character)) return;

    const existingEntry = turnState.entries.find(
      (entry) => entry.tokenId === token.id,
    );
    const form = normalizeSheetForm({
      characterName: character.name,
      characterType: character.type,
      characterVisibility: character.visibility,
      portraitImage: character.portraitImage,
      defaultTokenImage: character.defaultTokenImage,
      dataJson: character.sheet?.dataJson,
      sheetTemplate,
    });

    setTurnEntryEditor({
      characterId: character.id,
      initiative: String(existingEntry?.initiative ?? form.initiative ?? 0),
      error: null,
    });
  };

  const submitTurnEntryEditor = (event: React.FormEvent) => {
    event.preventDefault();

    if (!turnEntryEditor || !turnEntryCharacter || !roomCode) return;

    const token = tokenByCharacterId.get(turnEntryCharacter.id);

    if (!token) {
      setTurnEntryEditor((current) =>
        current
          ? {
              ...current,
              error: "Crie ou vincule um token desta ficha no mapa primeiro.",
            }
          : current,
      );
      return;
    }

    const initiative = Number(turnEntryEditor.initiative.replace(",", "."));

    if (!Number.isFinite(initiative)) {
      setTurnEntryEditor((current) =>
        current
          ? {
              ...current,
              error: "Informe um numero de iniciativa valido.",
            }
          : current,
      );
      return;
    }

    emitTurnEntryUpsert(
      roomCode,
      {
        tokenId: token.id,
        initiative,
      },
      authToken,
    );

    setTurnEntryEditor(null);
  };

  const renderCharacterRow = (character: Character, compact = false) => {
    const image =
      character.defaultTokenImage ?? character.portraitImage ?? "";
    const canOrganize =
      isGm && !isPlayerCharacter(character, playerUserIds);
    const canSetActive = isGm || character.ownerUserId === user?.id;
    const canQueueTurn = turnState.active && canControlCharacterForTurns(character);
    const linkedToken = tokenByCharacterId.get(character.id);
    const isActive = activeCharacterId === character.id;

    return (
      <div
        key={character.id}
        className={`${styles.characterRow} ${compact ? styles.compactRow : ""} ${
          isActive ? styles.activeCharacterRow : ""
        }`}
        draggable
        onDragStart={(event) => handleDragStart(event, character)}
        onDragEnd={handleCharacterDragEnd}
        onClick={() => openEditCharacterEditor(character.id)}
        title="Clique para abrir. Arraste para o mapa para criar um token."
      >
        <div
          className={styles.avatar}
          style={{
            backgroundImage: image ? `url(${resolveAssetUrl(image)})` : undefined,
          }}
        >
          {!image && character.name.slice(0, 1).toUpperCase()}
        </div>

        <div className={styles.characterText}>
          <strong>{character.name}</strong>
          <span>{formatCharacterType(character.type)}</span>
        </div>

        {canSetActive && (
          <button
            type="button"
            className={`${styles.activeButton} ${
              isActive ? styles.activeButtonOn : ""
            }`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              setActiveCharacterId(isActive ? null : character.id);
            }}
            title={
              isActive
                ? "Desativar esta ficha"
                : "Usar esta ficha na barra de ações"
            }
          >
            {isActive ? "Ativo" : "Ativar"}
          </button>
        )}

        {turnState.active && (
          <button
            type="button"
            className={styles.turnButton}
            disabled={!canQueueTurn || !linkedToken}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              openTurnEntryEditor(character);
            }}
            title={
              !linkedToken
                ? "Crie um token desta ficha no mapa antes de adicionar a fila"
                : canQueueTurn
                  ? "Adicionar ou ajustar esta ficha na fila de turnos"
                  : "Voce nao controla esta ficha"
            }
          >
            Fila
          </button>
        )}

        {canOrganize && (
          <button
            type="button"
            className={styles.moveButton}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              setMovePickerCharacterId(character.id);
            }}
          >
            Mover
          </button>
        )}
      </div>
    );
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.createButton}
          onClick={openCreateCharacterEditor}
        >
          + Personagem
        </button>

        {isGm && (
          <button
            type="button"
            className={styles.categoryButton}
            onClick={() => startCreateCategory(null)}
          >
            + Categoria
          </button>
        )}
      </header>

      <div className={styles.content}>
        {loading && <div className={styles.status}>Carregando fichas...</div>}

        {error && <div className={styles.error}>{error}</div>}

        {!loading && characters.length === 0 && (
          <div className={styles.empty}>Nenhuma ficha criada.</div>
        )}

        {isGm ? (
          <>
            <TreeHeader
              label="Fichas"
              expanded={manualExpanded}
              onToggle={() => setManualExpanded((current) => !current)}
              onCreateChild={() => startCreateCategory(null)}
              dropActive={dragOverCategoryId === ROOT_CATEGORY_DROP_ID}
              onDragOver={(event) => handleCategoryDragOver(event, null)}
              onDragLeave={clearDragTarget}
              onDrop={(event) => handleCategoryDrop(event, null)}
            />

            {manualExpanded && (
              <div className={styles.list}>
                {manualCharacters.map((character) =>
                  renderCharacterRow(character),
                )}

                {categories
                  .filter((category) => category.parentId === null)
                  .map((category) => (
                    <CategoryNode
                      key={category.id}
                      category={category}
                      categories={categories}
                      charactersByCategory={charactersByCategory}
                      renderCharacterRow={renderCharacterRow}
                      onToggle={toggleCategory}
                      onCreateChild={startCreateCategory}
                      onRename={startRenameCategory}
                      onDelete={setCategoryToDelete}
                      dragOverCategoryId={dragOverCategoryId}
                      onDragOver={handleCategoryDragOver}
                      onDragLeave={clearDragTarget}
                      onDrop={handleCategoryDrop}
                    />
                  ))}
              </div>
            )}

            <TreeHeader
              label="Players"
              expanded={playersExpanded}
              onToggle={() => setPlayersExpanded((current) => !current)}
            />

            {playersExpanded && (
              <div className={styles.list}>
                {playerGroups.map(([ownerUserId, groupCharacters]) => (
                  <PlayerNode
                    key={ownerUserId}
                    name={getPlayerName(ownerUserId, playerNameById)}
                    characters={groupCharacters}
                    renderCharacterRow={renderCharacterRow}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <TreeHeader
              label="Minhas fichas"
              expanded={manualExpanded}
              onToggle={() => setManualExpanded((current) => !current)}
            />

            {manualExpanded && (
              <div className={styles.list}>
                {characters
                  .filter((character) => character.ownerUserId === user?.id)
                  .map((character) => renderCharacterRow(character))}
              </div>
            )}

            <TreeHeader
              label="Fichas publicas"
              expanded={publicExpanded}
              onToggle={() => setPublicExpanded((current) => !current)}
            />

            {publicExpanded && (
              <div className={styles.list}>
                {publicPlayerGroups.length === 0 ? (
                  <div className={styles.empty}>Nenhuma ficha publica.</div>
                ) : (
                  publicPlayerGroups.map(([ownerUserId, groupCharacters]) => (
                    <PlayerNode
                      key={ownerUserId}
                      name={getPlayerName(ownerUserId, playerNameById)}
                      characters={groupCharacters}
                      renderCharacterRow={renderCharacterRow}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {isGm && (
        <footer className={styles.turnFooter}>
          <div>
            <strong>Fila de turnos</strong>
            <span className={turnState.active ? styles.turnStatusLive : ""}>
              {turnState.active ? "Ativa" : "Parada"}
            </span>
          </div>

          <div className={styles.turnButtons}>
            <button
              type="button"
              className={styles.startTurnButton}
              onClick={startTurns}
              disabled={!roomCode || turnState.active}
            >
              Iniciar turnos
            </button>

            <button
              type="button"
              className={styles.stopTurnButton}
              onClick={stopTurns}
              disabled={!roomCode || !turnState.active}
            >
              Encerrar
            </button>
          </div>
        </footer>
      )}

      {categoryEditor && (
        <div className={styles.categoryDialog} data-ui-layer="true">
          <form onSubmit={submitCategoryEditor}>
            <strong>
              {categoryEditor.mode === "create"
                ? "Nova categoria"
                : "Renomear categoria"}
            </strong>

            <input
              autoFocus
              value={categoryEditor.name}
              onChange={(event) =>
                setCategoryEditor((current) =>
                  current
                    ? {
                        ...current,
                        name: event.target.value,
                      }
                    : current,
                )
              }
            />

            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogSecondary}
                onClick={() => setCategoryEditor(null)}
              >
                Cancelar
              </button>

              <button type="submit" className={styles.dialogPrimary}>
                {categoryEditor.mode === "create" ? "Criar" : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {categoryToDelete && (
        <div className={styles.categoryDialog} data-ui-layer="true">
          <div className={styles.deleteDialog}>
            <strong>Remover categoria?</strong>
            <p>{categoryToDelete.name} e suas subcategorias serao removidas.</p>

            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogSecondary}
                onClick={() => setCategoryToDelete(null)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.dialogDanger}
                onClick={() => deleteCategory(categoryToDelete.id)}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {movePickerCharacter && (
        <div className={styles.categoryDialog} data-ui-layer="true">
          <div className={styles.moveDialog}>
            <strong>Mover ficha</strong>
            <p>{movePickerCharacter.name}</p>

            <div className={styles.moveOptions}>
              <button
                type="button"
                className={`${styles.moveOption} ${
                  assignments[movePickerCharacter.id] ? "" : styles.moveActive
                }`}
                onClick={() => moveCharacterToCategory(movePickerCharacter.id, null)}
              >
                Fichas
              </button>

              {getCategoryOptions(categories).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.moveOption} ${
                    assignments[movePickerCharacter.id] === option.id
                      ? styles.moveActive
                      : ""
                  }`}
                  style={{
                    paddingLeft: `${12 + option.depth * 14}px`,
                  }}
                  onClick={() =>
                    moveCharacterToCategory(movePickerCharacter.id, option.id)
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogSecondary}
                onClick={() => setMovePickerCharacterId(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {turnEntryEditor && turnEntryCharacter && (
        <div className={styles.categoryDialog} data-ui-layer="true">
          <form onSubmit={submitTurnEntryEditor}>
            <strong>Adicionar na fila</strong>
            <p>{turnEntryCharacter.name}</p>

            <label className={styles.turnEntryField}>
              <span>Iniciativa</span>
              <input
                autoFocus
                type="number"
                step={1}
                value={turnEntryEditor.initiative}
                onChange={(event) =>
                  setTurnEntryEditor((current) =>
                    current
                      ? {
                          ...current,
                          initiative: event.target.value,
                          error: null,
                        }
                      : current,
                  )
                }
              />
            </label>

            {turnEntryEditor.error && (
              <div className={styles.dialogError}>{turnEntryEditor.error}</div>
            )}

            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.dialogSecondary}
                onClick={() => setTurnEntryEditor(null)}
              >
                Cancelar
              </button>

              <button type="submit" className={styles.dialogPrimary}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function TreeHeader(props: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  onCreateChild?: () => void;
  dropActive?: boolean;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: () => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={`${styles.groupTitle} ${
        props.dropActive ? styles.dropActive : ""
      }`}
      onDragOver={props.onDragOver}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
    >
      <button
        type="button"
        className={styles.treeToggle}
        onClick={props.onToggle}
      >
        {props.expanded ? "-" : "+"}
      </button>
      <strong>{props.label}</strong>
      {props.onCreateChild && (
        <button
          type="button"
          className={styles.inlineAction}
          onClick={props.onCreateChild}
        >
          +
        </button>
      )}
    </div>
  );
}

function CategoryNode(props: {
  category: CharacterCategory;
  categories: CharacterCategory[];
  charactersByCategory: Map<string, Character[]>;
  renderCharacterRow: (character: Character, compact?: boolean) => ReactElement;
  onToggle: (categoryId: string) => void;
  onCreateChild: (parentId: string | null) => void;
  onRename: (category: CharacterCategory) => void;
  onDelete: (category: CharacterCategory) => void;
  dragOverCategoryId: string | null;
  onDragOver: (
    event: React.DragEvent<HTMLElement>,
    categoryId: string | null,
  ) => void;
  onDragLeave: () => void;
  onDrop: (
    event: React.DragEvent<HTMLElement>,
    categoryId: string | null,
  ) => void;
}) {
  const childCategories = props.categories.filter(
    (category) => category.parentId === props.category.id,
  );
  const characters = props.charactersByCategory.get(props.category.id) ?? [];

  return (
    <div className={styles.categoryNode}>
      <div
        className={`${styles.categoryTitle} ${
          props.dragOverCategoryId === props.category.id
            ? styles.dropActive
            : ""
        }`}
        onDragOver={(event) => props.onDragOver(event, props.category.id)}
        onDragLeave={props.onDragLeave}
        onDrop={(event) => props.onDrop(event, props.category.id)}
      >
        <button
          type="button"
          className={styles.treeToggle}
          onClick={() => props.onToggle(props.category.id)}
        >
          {props.category.expanded ? "-" : "+"}
        </button>
        <strong>{props.category.name}</strong>
        <button
          type="button"
          className={styles.inlineAction}
          onClick={() => props.onCreateChild(props.category.id)}
        >
          +
        </button>
        <button
          type="button"
          className={styles.inlineAction}
          onClick={() => props.onRename(props.category)}
        >
          Ren.
        </button>
        <button
          type="button"
          className={styles.inlineAction}
          onClick={() => props.onDelete(props.category)}
        >
          Del.
        </button>
      </div>

      {props.category.expanded && (
        <div className={styles.categoryChildren}>
          {characters.map((character) =>
            props.renderCharacterRow(character, true),
          )}

          {childCategories.map((category) => (
            <CategoryNode key={category.id} {...props} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

function PlayerNode(props: {
  name: string;
  characters: Character[];
  renderCharacterRow: (character: Character, compact?: boolean) => ReactElement;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.categoryNode}>
      <div className={styles.playerTitle}>
        <button
          type="button"
          className={styles.treeToggle}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "-" : "+"}
        </button>
        <strong>{props.name}</strong>
      </div>

      {expanded && (
        <div className={styles.categoryChildren}>
          {props.characters.map((character) =>
            props.renderCharacterRow(character, true),
          )}
        </div>
      )}
    </div>
  );
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

function getCategoriesStorageKey(campaignId: string) {
  return `rpg-platform-character-categories:${campaignId}`;
}

function getAssignmentsStorageKey(campaignId: string) {
  return `rpg-platform-character-category-assignments:${campaignId}`;
}

function readStoredValue<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getLibrarySignature(
  categories: CharacterCategory[],
  assignments: CharacterAssignments,
) {
  return JSON.stringify({
    categories,
    assignments,
  });
}

function createLocalId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function collectCategoryTreeIds(
  categories: CharacterCategory[],
  rootCategoryId: string,
) {
  const ids = new Set<string>([rootCategoryId]);
  let changed = true;

  while (changed) {
    changed = false;

    categories.forEach((category) => {
      if (category.parentId && ids.has(category.parentId) && !ids.has(category.id)) {
        ids.add(category.id);
        changed = true;
      }
    });
  }

  return ids;
}

function getCategoryOptions(categories: CharacterCategory[]) {
  const buildOptions = (parentId: string | null, depth: number): {
    id: string;
    label: string;
    depth: number;
  }[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .flatMap((category) => [
        {
          id: category.id,
          label: category.name,
          depth,
        },
        ...buildOptions(category.id, depth + 1),
      ]);
  };

  return buildOptions(null, 0);
}

function getPlayerName(userId: string, names: Map<string, string>) {
  return names.get(userId) ?? "Player";
}

function isPlayerCharacter(
  character: Character,
  playerUserIds: Set<string>,
): character is Character & { ownerUserId: string } {
  return Boolean(
    character.ownerUserId && playerUserIds.has(character.ownerUserId),
  );
}

function formatCharacterType(type: string) {
  if (type === "npc") return "NPC";
  if (type === "monster") return "Monstro";
  return "Personagem";
}
