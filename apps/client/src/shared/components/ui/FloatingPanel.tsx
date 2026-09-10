import { useEffect, useRef, useState } from "react";

import { type PanelId, useUiStore } from "@/features/ui/store/uiStore";

import styles from "./FloatingPanel.module.css";

interface FloatingPanelProps {
  panelId: PanelId;
  title: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export default function FloatingPanel({
  panelId,
  title,
  width,
  height,
  children,
}: FloatingPanelProps) {
  const panel = useUiStore((state) => state.panels[panelId]);
  const closePanel = useUiStore((state) => state.closePanel);
  const setPanelPosition = useUiStore((state) => state.setPanelPosition);

  const [visualPosition, setVisualPosition] = useState<Position>({
    x: panel.x,
    y: panel.y,
  });

  const visualPositionRef = useRef<Position>({
    x: panel.x,
    y: panel.y,
  });

  const dragRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startPanelX: number;
    startPanelY: number;
  } | null>(null);

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (dragRef.current) return;

    const nextPosition = {
      x: panel.x,
      y: panel.y,
    };

    visualPositionRef.current = nextPosition;
    setVisualPosition(nextPosition);
  }, [panel.x, panel.y]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!panel.open) {
    return null;
  }

  const stopUiEvent = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const scheduleVisualPosition = (position: Position) => {
    visualPositionRef.current = position;

    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setVisualPosition(visualPositionRef.current);
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startPanelX: visualPositionRef.current.x,
      startPanelY: visualPositionRef.current.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    const nextPosition = {
      x: drag.startPanelX + event.clientX - drag.startPointerX,
      y: drag.startPanelY + event.clientY - drag.startPointerY,
    };

    scheduleVisualPosition(nextPosition);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;

    const finalPosition = visualPositionRef.current;
    setPanelPosition(panelId, finalPosition.x, finalPosition.y);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    closePanel(panelId);
  };

  return (
    <section
      data-ui-layer="true"
      className={styles.panel}
      style={{
        width,
        height,
        transform: `translate3d(${visualPosition.x}px, ${visualPosition.y}px, 0)`,
      }}
      onPointerDown={stopUiEvent}
      onPointerMove={stopUiEvent}
      onPointerUp={stopUiEvent}
      onClick={stopUiEvent}
      onWheel={stopUiEvent}
      onContextMenu={stopUiEvent}
    >
      <header
        className={styles.header}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <strong className={styles.title}>{title}</strong>

        <button
          type="button"
          className={styles.closeButton}
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={handleClose}
          title="Fechar painel"
          aria-label="Fechar painel"
        >
          ×
        </button>
      </header>

      <div className={`game-scrollbar ${styles.content}`}>{children}</div>
    </section>
  );
}