import {
  useRef,
  type CSSProperties,
  type PointerEvent,
  type SyntheticEvent,
} from "react";

import AudioPanel from "@/features/audio/components/AudioPanel";
import ChatPanel from "@/features/chat/components/ChatPanel";
import CharactersPanel from "@/features/characters/components/CharactersPanel";
import MapsPanel from "@/features/map/components/MapsPanel";
import GameSettingsPanel from "./GameSettingsPanel";

import {
  type RightSidebarTab,
  useUiStore,
} from "@/features/ui/store/uiStore";

import styles from "./RightSidebar.module.css";

const TABS: {
  id: RightSidebarTab;
  label: string;
  icon: string;
}[] = [
  {
    id: "chat",
    label: "Chat",
    icon: "\u{1F4AC}",
  },
  {
    id: "maps",
    label: "Mapas",
    icon: "\u{1F5FA}\uFE0F",
  },
  {
    id: "audio",
    label: "Audio",
    icon: "\u{1F3B5}",
  },
  {
    id: "characters",
    label: "Fichas",
    icon: "\u265F",
  },
  {
    id: "settings",
    label: "Configuracoes",
    icon: "\u2699\uFE0F",
  },
];

export default function RightSidebar() {
  const rightSidebarCollapsed = useUiStore(
    (state) => state.rightSidebarCollapsed,
  );
  const rightSidebarWidth = useUiStore((state) => state.rightSidebarWidth);
  const setRightSidebarWidth = useUiStore(
    (state) => state.setRightSidebarWidth,
  );
  const toggleRightSidebar = useUiStore((state) => state.toggleRightSidebar);
  const rightSidebarTab = useUiStore((state) => state.rightSidebarTab);
  const setRightSidebarTab = useUiStore((state) => state.setRightSidebarTab);

  const resizeRef = useRef<{
    pointerId: number;
    startX: number;
    startWidth: number;
  } | null>(null);

  const stopUiEvent = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const startResize = (event: PointerEvent<HTMLButtonElement>) => {
    if (rightSidebarCollapsed || event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    resizeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: rightSidebarWidth,
    };
  };

  const moveResize = (event: PointerEvent<HTMLButtonElement>) => {
    const resize = resizeRef.current;

    if (!resize || resize.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();
    setRightSidebarWidth(resize.startWidth + resize.startX - event.clientX);
  };

  const stopResize = (event: PointerEvent<HTMLButtonElement>) => {
    const resize = resizeRef.current;

    if (!resize || resize.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    resizeRef.current = null;
  };

  return (
    <aside
      data-ui-layer="true"
      className={`${styles.sidebar} ${
        rightSidebarCollapsed ? styles.collapsed : ""
      }`}
      style={
        {
          "--right-sidebar-width": `${rightSidebarWidth}px`,
        } as CSSProperties
      }
      onPointerDown={stopUiEvent}
      onPointerMove={stopUiEvent}
      onPointerUp={stopUiEvent}
      onClick={stopUiEvent}
      onWheel={stopUiEvent}
      onContextMenu={stopUiEvent}
    >
      {!rightSidebarCollapsed && (
        <button
          type="button"
          className={styles.resizeHandle}
          onPointerDown={startResize}
          onPointerMove={moveResize}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
          title="Alterar largura"
          aria-label="Alterar largura da barra direita"
        />
      )}

      <div className={styles.tabRail}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabButton} ${
              rightSidebarTab === tab.id ? styles.tabButtonActive : ""
            }`}
            onClick={() => setRightSidebarTab(tab.id)}
            title={tab.label}
            aria-label={tab.label}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
          </button>
        ))}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={toggleRightSidebar}
          title={
            rightSidebarCollapsed
              ? "Expandir menu lateral"
              : "Recolher menu lateral"
          }
          aria-label={
            rightSidebarCollapsed
              ? "Expandir menu lateral"
              : "Recolher menu lateral"
          }
        >
          {rightSidebarCollapsed ? "<" : ">"}
        </button>
      </div>

      {!rightSidebarCollapsed && (
        <div className={styles.content}>
          {rightSidebarTab === "chat" && <ChatPanel />}
          {rightSidebarTab === "maps" && <MapsPanel />}
          {rightSidebarTab === "audio" && <AudioPanel />}
          {rightSidebarTab === "characters" && <CharactersPanel />}
          {rightSidebarTab === "settings" && <GameSettingsPanel />}
        </div>
      )}
    </aside>
  );
}
