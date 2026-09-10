import { create } from "zustand";

import type {
  Token as SharedToken,
  TokenStandMode,
} from "@shared/types/token";
import type { TokenConditionId } from "@shared/types/tokenStatus";

export type Token = SharedToken;

interface TokenStore {
  tokens: Record<string, Token>;
  selectedTokenId: string | null;
  selectedTokenIds: string[];

  setTokens: (tokens: Record<string, Token>) => void;
  addToken: (token: Token) => void;
  addTokenAt: (x: number, y: number) => void;
  moveToken: (id: string, x: number, y: number) => void;
  removeToken: (id: string) => void;
  setTokenHealthBarVisible: (id: string, visible: boolean) => void;
  toggleTokenCondition: (id: string, condition: TokenConditionId) => void;
  clearTokenConditions: (id: string) => void;
  setTokenElevation: (id: string, elevation: number) => void;
  setTokenStandMode: (id: string, standMode: TokenStandMode) => void;
  setTokenSize: (id: string, sizeCells: number) => void;

  setSelectedToken: (id: string | null) => void;
  setSelectedTokens: (ids: string[]) => void;
  updateToken: (id: string, input: Partial<Omit<Token, "id">>) => void;
  updateTokenImage: (id: string, image: string) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: {},
  selectedTokenId: null,
  selectedTokenIds: [],

  setTokens: (tokens) =>
    set((state) => {
      const nextTokens = mergeTokenRecords(state.tokens, tokens);
      const selectedTokenIds = state.selectedTokenIds.filter(
        (id) => Boolean(nextTokens[id]),
      );
      const selectedTokenId =
        state.selectedTokenId && nextTokens[state.selectedTokenId]
          ? state.selectedTokenId
          : selectedTokenIds[0] ?? null;

      if (
        nextTokens === state.tokens &&
        selectedTokenId === state.selectedTokenId &&
        areStringArraysEqual(selectedTokenIds, state.selectedTokenIds)
      ) {
        return state;
      }

      return {
        tokens: nextTokens,
        selectedTokenId,
        selectedTokenIds,
      };
    }),

  addToken: (token) =>
    set((state) => ({
      tokens: {
        ...state.tokens,
        [token.id]: token,
      },
    })),

  addTokenAt: (x, y) =>
    set((state) => {
      const id = crypto.randomUUID();

      return {
        tokens: {
          ...state.tokens,
          [id]: { id, x, y },
        },
      };
    }),

  moveToken: (id, x, y) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;
      if (token.x === x && token.y === y) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            x,
            y,
          },
        },
      };
    }),

  removeToken: (id) =>
    set((state) => {
      if (!state.tokens[id]) return state;

      const nextTokens = { ...state.tokens };

      delete nextTokens[id];

      const selectedTokenIds = state.selectedTokenIds.filter(
        (selectedId) => selectedId !== id,
      );

      return {
        tokens: nextTokens,
        selectedTokenId:
          state.selectedTokenId === id
            ? selectedTokenIds[0] ?? null
            : state.selectedTokenId,
        selectedTokenIds,
      };
    }),

  setTokenHealthBarVisible: (id, visible) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            showHealthBar: visible,
          },
        },
      };
    }),

  toggleTokenCondition: (id, condition) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      const conditions = token.conditions ?? [];
      const nextConditions = conditions.includes(condition)
        ? conditions.filter((current) => current !== condition)
        : [...conditions, condition];

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            conditions: nextConditions,
          },
        },
      };
    }),

  clearTokenConditions: (id) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            conditions: [],
          },
        },
      };
    }),

  setTokenElevation: (id, elevation) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            elevation,
          },
        },
      };
    }),

  setTokenStandMode: (id, standMode) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            standMode,
          },
        },
      };
    }),

  setTokenSize: (id, sizeCells) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            widthCells: sizeCells,
            heightCells: sizeCells,
          },
        },
      };
    }),

  setSelectedToken: (id) =>
    set({
      selectedTokenId: id,
      selectedTokenIds: id ? [id] : [],
    }),

  setSelectedTokens: (ids) => {
    const uniqueIds = Array.from(new Set(ids));

    set({
      selectedTokenId: uniqueIds[0] ?? null,
      selectedTokenIds: uniqueIds,
    });
  },

  updateToken: (id, input) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;
      if (isTokenPatchEqual(token, input)) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            ...input,
          },
        },
      };
    }),

  updateTokenImage: (id, image) =>
    set((state) => {
      const token = state.tokens[id];

      if (!token) return state;
      if ((token.image ?? "") === image) return state;

      return {
        tokens: {
          ...state.tokens,
          [id]: {
            ...token,
            image,
          },
        },
      };
    }),
}));

function mergeTokenRecords(
  currentTokens: Record<string, Token>,
  nextTokens: Record<string, Token>,
) {
  const currentIds = Object.keys(currentTokens);
  const nextIds = Object.keys(nextTokens);

  if (currentIds.length !== nextIds.length) {
    return reuseEqualTokenObjects(currentTokens, nextTokens);
  }

  let changed = false;
  const merged: Record<string, Token> = {};

  for (const id of nextIds) {
    const currentToken = currentTokens[id];
    const nextToken = nextTokens[id];

    if (!currentToken) {
      changed = true;
      merged[id] = nextToken;
      continue;
    }

    if (areTokensEqual(currentToken, nextToken)) {
      merged[id] = currentToken;
    } else {
      changed = true;
      merged[id] = nextToken;
    }
  }

  return changed ? merged : currentTokens;
}

function reuseEqualTokenObjects(
  currentTokens: Record<string, Token>,
  nextTokens: Record<string, Token>,
) {
  return Object.fromEntries(
    Object.entries(nextTokens).map(([id, token]) => {
      const currentToken = currentTokens[id];

      return [
        id,
        currentToken && areTokensEqual(currentToken, token)
          ? currentToken
          : token,
      ];
    }),
  );
}

function areTokensEqual(left: Token, right: Token) {
  return (
    left.id === right.id &&
    left.characterId === right.characterId &&
    left.name === right.name &&
    left.image === right.image &&
    left.x === right.x &&
    left.y === right.y &&
    left.widthCells === right.widthCells &&
    left.heightCells === right.heightCells &&
    left.showHealthBar === right.showHealthBar &&
    left.elevation === right.elevation &&
    left.standMode === right.standMode &&
    areStringArraysEqual(left.conditions ?? [], right.conditions ?? [])
  );
}

function isTokenPatchEqual(
  token: Token,
  input: Partial<Omit<Token, "id">>,
) {
  return Object.entries(input).every(([key, value]) => {
    const tokenValue = token[key as keyof Omit<Token, "id">];

    return Array.isArray(tokenValue) && Array.isArray(value)
      ? areStringArraysEqual(tokenValue, value)
      : tokenValue === value;
  });
}

function areStringArraysEqual(left: readonly string[], right: readonly string[]) {
  if (left.length !== right.length) return false;

  return left.every((item, index) => item === right[index]);
}
