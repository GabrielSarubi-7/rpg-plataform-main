import type { SyntheticEvent } from "react";

import styles from "./ToolDock.module.css";

interface DockButton {
  id: string;
  icon: string;
  title: string;
  active?: boolean;
  onClick: () => void;
}

interface Props {
  side: "left" | "right";
  collapsed: boolean;
  onToggleCollapsed: () => void;
  buttons: DockButton[];
}

export default function ToolDock({
  side,
  collapsed,
  onToggleCollapsed,
  buttons,
}: Props) {
  const stopUiEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const arrowIcon =
    side === "left"
      ? collapsed
        ? "›"
        : "‹"
      : collapsed
        ? "‹"
        : "›";

  return (
    <aside
      data-ui-layer="true"
      className={`${styles.dock} ${
        side === "left" ? styles.left : styles.right
      } ${collapsed ? styles.collapsed : ""}`}
      onPointerDown={stopUiEvent}
      onPointerMove={stopUiEvent}
      onPointerUp={stopUiEvent}
      onClick={stopUiEvent}
      onWheel={stopUiEvent}
      onContextMenu={stopUiEvent}
    >
      <button
        type="button"
        className={`${styles.toolButton} ${styles.toggleButton}`}
        onClick={onToggleCollapsed}
        title={collapsed ? "Expandir menu" : "Recolher menu"}
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      >
        <span className={styles.arrowIcon}>{arrowIcon}</span>
      </button>

      {!collapsed &&
        buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            className={`${styles.toolButton} ${
              button.active ? styles.toolButtonActive : ""
            }`}
            onClick={button.onClick}
            title={button.title}
            aria-label={button.title}
          >
            <span className={styles.icon}>{button.icon}</span>
          </button>
        ))}
    </aside>
  );
}