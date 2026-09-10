import { create } from "zustand";

import type {
  Character,
  CharacterType,
  CharacterVisibility,
} from "../services/characterApi";

import {
  createCharacterRequest,
  deleteCharacterRequest,
  listCharactersRequest,
  updateCharacterRequest,
} from "../services/characterApi";

interface CharacterStore {
  characters: Character[];
  loading: boolean;
  saving: boolean;
  error: string | null;

  editorOpen: boolean;
  editorMode: "create" | "edit";
  selectedCharacterId: string | null;
  activeCharacterId: string | null;

  loadCharacters: (token: string, campaignId: string) => Promise<void>;

  createCharacter: (
    token: string,
    campaignId: string,
    input: {
      name: string;
      type?: CharacterType;
      visibility?: CharacterVisibility;
      portraitImage?: string;
      defaultTokenImage?: string;
    },
  ) => Promise<Character>;

  updateCharacter: (
    token: string,
    campaignId: string,
    characterId: string,
    input: {
      name?: string;
      type?: CharacterType;
      visibility?: CharacterVisibility;
      portraitImage?: string | null;
      defaultTokenImage?: string | null;
      sheetData?: unknown;
    },
  ) => Promise<Character>;

  deleteCharacter: (
    token: string,
    campaignId: string,
    characterId: string,
  ) => Promise<Character>;

  openCreateCharacterEditor: () => void;
  openEditCharacterEditor: (characterId: string) => void;
  closeCharacterEditor: () => void;
  setActiveCharacterId: (characterId: string | null) => void;
  upsertCharacterLocal: (character: Character) => void;
  removeCharacterLocal: (characterId: string) => void;
  clearError: () => void;
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  loading: false,
  saving: false,
  error: null,

  editorOpen: false,
  editorMode: "create",
  selectedCharacterId: null,
  activeCharacterId: null,

  loadCharacters: async (token, campaignId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await listCharactersRequest(token, campaignId);

      const activeCharacterId = get().activeCharacterId;

      set({
        characters: result.characters,
        activeCharacterId: result.characters.some(
          (character) => character.id === activeCharacterId,
        )
          ? activeCharacterId
          : null,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao carregar fichas.",
      });
    }
  },

  createCharacter: async (token, campaignId, input) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await createCharacterRequest(token, campaignId, input);

      set((state) => ({
        characters: [result.character, ...state.characters],
        saving: false,
      }));

      return result.character;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar ficha.";

      set({
        saving: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  updateCharacter: async (token, campaignId, characterId, input) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await updateCharacterRequest(
        token,
        campaignId,
        characterId,
        input,
      );

      set((state) => ({
        characters: state.characters.map((character) =>
          character.id === result.character.id ? result.character : character,
        ),
        saving: false,
      }));

      return result.character;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar ficha.";

      set({
        saving: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  deleteCharacter: async (token, campaignId, characterId) => {
    try {
      set({
        saving: true,
        error: null,
      });

      const result = await deleteCharacterRequest(
        token,
        campaignId,
        characterId,
      );

      set((state) => ({
        characters: state.characters.filter(
          (character) => character.id !== characterId,
        ),
        saving: false,
        editorOpen: false,
        selectedCharacterId: null,
        activeCharacterId:
          state.activeCharacterId === characterId ? null : state.activeCharacterId,
      }));

      return result.character;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao deletar ficha.";

      set({
        saving: false,
        error: message,
      });

      throw new Error(message);
    }
  },

  openCreateCharacterEditor: () =>
    set({
      editorOpen: true,
      editorMode: "create",
      selectedCharacterId: null,
    }),

  openEditCharacterEditor: (characterId) =>
    set({
      editorOpen: true,
      editorMode: "edit",
      selectedCharacterId: characterId,
    }),

  closeCharacterEditor: () =>
    set({
      editorOpen: false,
      selectedCharacterId: null,
    }),

  setActiveCharacterId: (characterId) =>
    set({
      activeCharacterId: characterId,
    }),

  upsertCharacterLocal: (character) =>
    set((state) => ({
      characters: state.characters.some((item) => item.id === character.id)
        ? state.characters.map((item) =>
            item.id === character.id ? character : item,
          )
        : [character, ...state.characters],
    })),

  removeCharacterLocal: (characterId) =>
    set((state) => ({
      characters: state.characters.filter(
        (character) => character.id !== characterId,
      ),
      editorOpen:
        state.selectedCharacterId === characterId ? false : state.editorOpen,
      selectedCharacterId:
        state.selectedCharacterId === characterId
          ? null
          : state.selectedCharacterId,
      activeCharacterId:
        state.activeCharacterId === characterId ? null : state.activeCharacterId,
    })),

  clearError: () =>
    set({
      error: null,
    }),
}));
