import { create } from "zustand";

import type {
  AnnotationTool,
  AnnotationVisibility,
  MapAnnotation,
  PenAnnotation,
  TextAnnotation,
} from "@shared/types/annotation";

interface AnnotationStore {
  tool: AnnotationTool;
  visibility: AnnotationVisibility;
  color: string;
  size: number;
  fontSize: number;
  annotations: Record<string, MapAnnotation>;

  setTool: (tool: AnnotationTool) => void;
  setVisibility: (visibility: AnnotationVisibility) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setFontSize: (fontSize: number) => void;
  setAnnotations: (annotations: Record<string, MapAnnotation>) => void;

  addPenAnnotation: (annotation: PenAnnotation) => void;
  updatePenPoints: (annotationId: string, points: PenAnnotation["points"]) => void;
  addTextAnnotation: (annotation: TextAnnotation) => void;
  removeAnnotation: (annotationId: string) => void;
  clearAnnotations: () => void;
}

const PLAYER_COLOR_KEY = "rpg-platform-player-color";
const DEFAULT_ANNOTATION_COLOR = "#3b82f6";

export const useAnnotationStore = create<AnnotationStore>((set) => ({
  tool: "none",
  visibility: "public",
  color: readInitialColor(),
  size: 4,
  fontSize: 18,
  annotations: {},

  setTool: (tool) => set({ tool }),
  setVisibility: (visibility) => set({ visibility }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size: clampNumber(size, 1, 18) }),
  setFontSize: (fontSize) => set({ fontSize: clampNumber(fontSize, 8, 72) }),
  setAnnotations: (annotations) =>
    set((state) =>
      areAnnotationsEqual(state.annotations, annotations)
        ? state
        : { annotations },
    ),

  addPenAnnotation: (annotation) =>
    set((state) => ({
      annotations: {
        ...state.annotations,
        [annotation.id]: annotation,
      },
    })),

  updatePenPoints: (annotationId, points) =>
    set((state) => {
      const annotation = state.annotations[annotationId];

      if (!annotation || annotation.type !== "pen") {
        return state;
      }

      return {
        annotations: {
          ...state.annotations,
          [annotationId]: {
            ...annotation,
            points,
          },
        },
      };
    }),

  addTextAnnotation: (annotation) =>
    set((state) => ({
      annotations: {
        ...state.annotations,
        [annotation.id]: annotation,
      },
    })),

  removeAnnotation: (annotationId) =>
    set((state) => {
      const nextAnnotations = { ...state.annotations };
      delete nextAnnotations[annotationId];

      return {
        annotations: nextAnnotations,
      };
    }),

  clearAnnotations: () =>
    set({
      annotations: {},
    }),
}));

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

function readInitialColor() {
  const color = localStorage.getItem(PLAYER_COLOR_KEY)?.trim();

  return color && /^#[0-9a-f]{6}$/i.test(color)
    ? color
    : DEFAULT_ANNOTATION_COLOR;
}

function areAnnotationsEqual(
  left: Record<string, MapAnnotation>,
  right: Record<string, MapAnnotation>,
) {
  if (left === right) return true;

  const leftIds = Object.keys(left);
  const rightIds = Object.keys(right);

  if (leftIds.length !== rightIds.length) return false;

  return rightIds.every((id) => {
    const leftAnnotation = left[id];
    const rightAnnotation = right[id];

    return (
      leftAnnotation === rightAnnotation ||
      JSON.stringify(leftAnnotation) === JSON.stringify(rightAnnotation)
    );
  });
}
