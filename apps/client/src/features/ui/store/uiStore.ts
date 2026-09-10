import { create } from "zustand";
import { clamp } from "@shared/utils/math";

export type PanelId = "dice" | "pageSettings" | "annotations" | "fog";
export type RightSidebarTab =
  | "chat"
  | "maps"
  | "audio"
  | "characters"
  | "settings";
export type CameraMode = "2d" | "2.5d" | "3d";

const CONFIRM_SHEET_ROLLS_KEY = "rpg-platform-confirm-sheet-rolls";
const CAMERA_MODE_KEY = "rpg-platform-camera-mode";
const RIGHT_SIDEBAR_WIDTH_KEY = "rpg-platform-right-sidebar-width";
const TURN_TRACKER_SCALE_KEY = "rpg-platform-turn-tracker-scale";
const AUDIO_VOLUME_KEY = "rpg-platform-audio-volume";
const PLAYER_COLOR_KEY = "rpg-platform-player-color";
const DEFAULT_PLAYER_COLOR = "#3b82f6";

interface PanelState {
  open: boolean;
  x: number;
  y: number;
}

interface UiStore {
  leftDockCollapsed: boolean;
  rightSidebarCollapsed: boolean;
  rightSidebarWidth: number;
  turnTrackerScale: number;
  audioVolume: number;
  audioPlayerHidden: boolean;
  playerColor: string;
  rightSidebarTab: RightSidebarTab;
  confirmSheetRolls: boolean;
  cameraMode: CameraMode;
  panels: Record<PanelId, PanelState>;

  toggleDock: () => void;
  toggleRightSidebar: () => void;
  setRightSidebarWidth: (width: number) => void;
  setTurnTrackerScale: (scale: number) => void;
  setAudioVolume: (volume: number) => void;
  setAudioPlayerHidden: (hidden: boolean) => void;
  setPlayerColor: (color: string) => void;
  setRightSidebarTab: (tab: RightSidebarTab) => void;
  setConfirmSheetRolls: (value: boolean) => void;
  setCameraMode: (value: CameraMode) => void;
  togglePanel: (panelId: PanelId) => void;
  closePanel: (panelId: PanelId) => void;
  setPanelPosition: (panelId: PanelId, x: number, y: number) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  leftDockCollapsed: false,
  rightSidebarCollapsed: false,
  rightSidebarWidth: readNumberSetting(RIGHT_SIDEBAR_WIDTH_KEY, 520, 360, 760),
  turnTrackerScale: readNumberSetting(TURN_TRACKER_SCALE_KEY, 1, 0.7, 1.15),
  audioVolume: readNumberSetting(AUDIO_VOLUME_KEY, 0.8, 0, 1),
  audioPlayerHidden: false,
  playerColor: readColorSetting(PLAYER_COLOR_KEY, DEFAULT_PLAYER_COLOR),
  rightSidebarTab: "chat",
  confirmSheetRolls: readConfirmSheetRolls(),
  cameraMode: readCameraMode(),

  panels: {
    dice: {
      open: false,
      x: 72,
      y: 80,
    },
    pageSettings: {
      open: false,
      x: 72,
      y: 120,
    },
    annotations: {
      open: false,
      x: 72,
      y: 160,
    },
    fog: {
      open: false,
      x: 72,
      y: 200,
    },
  },

  toggleDock: () =>
    set((state) => ({
      leftDockCollapsed: !state.leftDockCollapsed,
    })),

  toggleRightSidebar: () =>
    set((state) => ({
      rightSidebarCollapsed: !state.rightSidebarCollapsed,
    })),

  setRightSidebarTab: (tab) =>
    set({
      rightSidebarTab: tab,
      rightSidebarCollapsed: false,
    }),

  setConfirmSheetRolls: (value) => {
    localStorage.setItem(CONFIRM_SHEET_ROLLS_KEY, String(value));

    set({
      confirmSheetRolls: value,
    });
  },

  setCameraMode: (value) => {
    localStorage.setItem(CAMERA_MODE_KEY, value);

    set({
      cameraMode: value,
    });
  },

  togglePanel: (panelId) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [panelId]: {
          ...state.panels[panelId],
          open: !state.panels[panelId].open,
        },
      },
    })),

  closePanel: (panelId) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [panelId]: {
          ...state.panels[panelId],
          open: false,
        },
      },
    })),

  setPanelPosition: (panelId, x, y) =>
    set((state) => ({
      panels: {
        ...state.panels,
        [panelId]: {
          ...state.panels[panelId],
          x,
          y,
        },
      },
    })),

  setRightSidebarWidth: (width) => {
    const nextWidth = clamp(width, 360, 760);

    localStorage.setItem(RIGHT_SIDEBAR_WIDTH_KEY, String(nextWidth));
    set({
      rightSidebarWidth: nextWidth,
    });
  },

  setTurnTrackerScale: (scale) => {
    const nextScale = Math.round(clamp(scale, 0.7, 1.15) * 100) / 100;

    localStorage.setItem(TURN_TRACKER_SCALE_KEY, String(nextScale));
    set({
      turnTrackerScale: nextScale,
    });
  },

  setAudioVolume: (volume) => {
    const nextVolume = Math.round(clamp(volume, 0, 1) * 100) / 100;

    localStorage.setItem(AUDIO_VOLUME_KEY, String(nextVolume));
    set({
      audioVolume: nextVolume,
    });
  },

  setAudioPlayerHidden: (hidden) => {
    set({
      audioPlayerHidden: hidden,
    });
  },

  setPlayerColor: (color) => {
    const nextColor = normalizeColor(color, DEFAULT_PLAYER_COLOR);

    localStorage.setItem(PLAYER_COLOR_KEY, nextColor);
    set({
      playerColor: nextColor,
    });
  },
}));

function readConfirmSheetRolls() {
  const storedValue = localStorage.getItem(CONFIRM_SHEET_ROLLS_KEY);

  if (storedValue === null) {
    return true;
  }

  return storedValue !== "false";
}

function readCameraMode(): CameraMode {
  const storedValue = localStorage.getItem(CAMERA_MODE_KEY);

  return storedValue === "3d" || storedValue === "2.5d" ? storedValue : "2d";
}

function readNumberSetting(
  key: string,
  fallback: number,
  min: number,
  max: number,
) {
  const value = Number(localStorage.getItem(key));

  return Number.isFinite(value) ? clamp(value, min, max) : fallback;
}

function readColorSetting(key: string, fallback: string) {
  return normalizeColor(localStorage.getItem(key), fallback);
}

function normalizeColor(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  const color = value.trim();

  return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}
