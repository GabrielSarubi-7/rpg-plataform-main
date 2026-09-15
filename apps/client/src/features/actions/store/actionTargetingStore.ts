import { create } from "zustand";

import type { CharacterAction } from "../types/actionTypes";
import type { ActionUsedPayload } from "@shared/types/multiplayer";

interface Point {
  x: number;
  y: number;
}

interface ActionTargetingStore {
  activeAction: CharacterAction | null;
  casterTokenId: string | null;
  mouseWorldPosition: Point | null;
  isTargeting: boolean;
  resolvedActions: ActionUsedPayload[];

  startTargeting: (action: CharacterAction, casterTokenId: string) => void;
  updateMousePosition: (point: Point) => void;
  cancelTargeting: () => void;
  addResolvedAction: (action: ActionUsedPayload) => void;
  removeResolvedAction: (useId: string) => void;
}

export const useActionTargetingStore = create<ActionTargetingStore>((set) => ({
  activeAction: null,
  casterTokenId: null,
  mouseWorldPosition: null,
  isTargeting: false,
  resolvedActions: [],

  startTargeting: (action, casterTokenId) =>
    set({
      activeAction: action,
      casterTokenId,
      mouseWorldPosition: null,
      isTargeting: true,
    }),

  updateMousePosition: (mouseWorldPosition) =>
    set({
      mouseWorldPosition,
    }),

  cancelTargeting: () =>
    set({
      activeAction: null,
      casterTokenId: null,
      mouseWorldPosition: null,
      isTargeting: false,
    }),

  addResolvedAction: (action) =>
    set((state) => ({
      resolvedActions: [...state.resolvedActions.filter((existing) => existing.useId !== action.useId), action].slice(-32),
    })),

  removeResolvedAction: (useId) =>
    set((state) => ({
      resolvedActions: state.resolvedActions.filter(
        (action) => action.useId !== useId,
      ),
    })),
}));
