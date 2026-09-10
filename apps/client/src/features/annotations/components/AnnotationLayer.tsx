import { useRef } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import type { Camera } from "@/features/map/hooks/useCamera";
import { screenToWorld } from "@/features/map/utils/coords";

import { useAnnotationStore } from "../store/annotationStore";
import { emitAnnotationUpsert } from "../services/annotationSocketService";
import type { PenAnnotation, TextAnnotation } from "@shared/types/annotation";

import styles from "./AnnotationLayer.module.css";

interface AnnotationLayerProps {
  width: number;
  height: number;
  camera: Camera;
}

export default function AnnotationLayer({
  width,
  height,
  camera,
}: AnnotationLayerProps) {
  const tool = useAnnotationStore((state) => state.tool);
  const visibility = useAnnotationStore((state) => state.visibility);
  const color = useAnnotationStore((state) => state.color);
  const size = useAnnotationStore((state) => state.size);
  const fontSize = useAnnotationStore((state) => state.fontSize);
  const annotations = useAnnotationStore((state) => state.annotations);

  const addPenAnnotation = useAnnotationStore((state) => state.addPenAnnotation);
  const updatePenPoints = useAnnotationStore((state) => state.updatePenPoints);
  const addTextAnnotation = useAnnotationStore((state) => state.addTextAnnotation);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const authToken = useAuthStore((state) => state.token);

  const activePenIdRef = useRef<string | null>(null);
  const activePointsRef = useRef<{ x: number; y: number }[]>([]);

  const getPointFromEvent = (event: React.PointerEvent<HTMLElement>) => {
    return screenToWorld(event.clientX, event.clientY, camera);
  };

  const stopMapEvent = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (tool === "none") return;
    if (event.button === 2) return;

    stopMapEvent(event);

    event.currentTarget.setPointerCapture(event.pointerId);

    const point = getPointFromEvent(event);

    if (tool === "pen") {
      const id = crypto.randomUUID();

      activePenIdRef.current = id;
      activePointsRef.current = [point];

      const annotation: PenAnnotation = {
        id,
        type: "pen",
        points: [point],
        color,
        size: Math.max(1, Math.min(18, size)),
        visibility,
      };

      addPenAnnotation(annotation);

      if (lobbyCode) {
        emitAnnotationUpsert(lobbyCode, annotation, authToken);
      }

      return;
    }

    if (tool === "text") {
      const text = window.prompt("Texto da anotação:");

      if (!text?.trim()) return;

      const annotation: TextAnnotation = {
        id: crypto.randomUUID(),
        type: "text",
        x: point.x,
        y: point.y,
        text: text.trim(),
        color,
        fontSize: Math.max(8, Math.min(72, fontSize)),
        visibility,
      };

      addTextAnnotation(annotation);

      if (lobbyCode) {
        emitAnnotationUpsert(lobbyCode, annotation, authToken);
      }
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (tool !== "pen") return;

    const activePenId = activePenIdRef.current;

    if (!activePenId) return;

    stopMapEvent(event);

    const point = getPointFromEvent(event);
    const nextPoints = [...activePointsRef.current, point];

    activePointsRef.current = nextPoints;
    updatePenPoints(activePenId, nextPoints);

    const annotation = annotations[activePenId];

    if (lobbyCode && annotation?.type === "pen") {
      emitAnnotationUpsert(
        lobbyCode,
        {
          ...annotation,
          points: nextPoints,
        },
        authToken,
      );
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (tool === "none") return;

    stopMapEvent(event);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activePenIdRef.current = null;
    activePointsRef.current = [];
  };

  const isActive = tool !== "none";

  return (
    <section
      className={`${styles.layer} ${isActive ? styles.layerActive : ""}`}
      style={{
        width,
        height,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onContextMenu={(event) => event.preventDefault()}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {Object.values(annotations).map((annotation) => {
          if (annotation.type !== "pen") return null;

          const points = annotation.points
            .map((point) => `${point.x},${point.y}`)
            .join(" ");

          return (
            <polyline
              key={annotation.id}
              points={points}
              fill="none"
              stroke={annotation.color}
              strokeWidth={annotation.size}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={annotation.visibility === "gm" ? 0.65 : 1}
            />
          );
        })}
      </svg>

      {Object.values(annotations).map((annotation) => {
        if (annotation.type !== "text") return null;

        return (
          <div
            key={annotation.id}
            className={styles.textAnnotation}
            style={{
              left: annotation.x,
              top: annotation.y,
              color: annotation.color,
              fontSize: annotation.fontSize,
              opacity: annotation.visibility === "gm" ? 0.65 : 1,
            }}
          >
            {annotation.text}
          </div>
        );
      })}
    </section>
  );
}
