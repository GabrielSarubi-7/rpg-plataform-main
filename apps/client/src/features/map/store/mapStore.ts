import { create } from "zustand";
import type { MapSettings } from "@shared/types/map";
import {
  DEFAULT_MAP_SETTINGS,
  getMapPixelSize,
  normalizeMapSettings,
} from "@shared/rules/mapRules";

interface MapStore extends MapSettings {
  width: number;
  height: number;
  settingsSignature: string;

  setMapSettings: (settings: Partial<MapSettings>) => void;
}

function buildMapState(settings: MapSettings) {
  const size = getMapPixelSize(settings);

  return {
    ...settings,
    width: size.width,
    height: size.height,
    settingsSignature: getMapSettingsSignature(settings),
  };
}

export const useMapStore = create<MapStore>((set) => ({
  ...buildMapState(DEFAULT_MAP_SETTINGS),

  setMapSettings: (settings) => {
    const normalized = normalizeMapSettings(settings);

    set((state) => {
      const settingsSignature = getMapSettingsSignature(normalized);

      if (state.settingsSignature === settingsSignature) {
        return state;
      }

      return {
        ...buildMapState(normalized),
        settingsSignature,
      };
    });
  },
}));

function getMapSettingsSignature(settings: MapSettings) {
  return JSON.stringify({
    mapId: settings.mapId ?? null,
    pageName: settings.pageName,
    widthCells: settings.widthCells,
    heightCells: settings.heightCells,
    cellSize: settings.cellSize,
    backgroundImage: settings.backgroundImage ?? null,
    backgroundImageWidth: settings.backgroundImageWidth ?? null,
    backgroundImageHeight: settings.backgroundImageHeight ?? null,
    layerConfig: settings.layerConfig ?? null,
  });
}
