import { create } from "zustand";

export type FogTool = "none" | "reveal" | "hide";

interface FogToolStore {
  tool: FogTool;
  brushSize: number;
  setTool: (tool: FogTool) => void;
  setBrushSize: (brushSize: number) => void;
}

export const useFogToolStore = create<FogToolStore>((set) => ({
  tool: "none",
  brushSize: 4,

  setTool: (tool) => set({ tool }),
  setBrushSize: (brushSize) =>
    set({
      brushSize: Math.max(1, Math.min(20, Math.floor(brushSize) || 1)),
    }),
}));
