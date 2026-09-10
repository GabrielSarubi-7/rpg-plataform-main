import { useLayoutEffect, useRef } from "react";
import type { TokenStandMode } from "@shared/types/token";
import type { TokenConditionId } from "@shared/types/tokenStatus";
import { TOKEN_SIZE_OPTIONS } from "@shared/rules/tokenRules";

import { TOKEN_CONDITIONS } from "../constants/tokenConditions";

import styles from "./TokenContextMenu.module.css";

interface TokenContextMenuProps {
  x: number;
  y: number;
  canResizeToken: boolean;
  canOpenCharacter: boolean;
  canShowHealthBar: boolean;
  sizeCells: number;
  healthBarVisible: boolean;
  activeConditions: TokenConditionId[];
  elevation: number;
  standMode: TokenStandMode;
  onOpenCharacter: () => void;
  onToggleHealthBar: () => void;
  onToggleCondition: (condition: TokenConditionId) => void;
  onClearConditions: () => void;
  onChangeElevation: (delta: number) => void;
  onSetStandMode: (standMode: TokenStandMode) => void;
  onSetSize: (sizeCells: number) => void;
  onDeleteToken: () => void;
  onClose: () => void;
}

export default function TokenContextMenu({
  x,
  y,
  canResizeToken,
  canOpenCharacter,
  canShowHealthBar,
  sizeCells,
  healthBarVisible,
  activeConditions,
  elevation,
  standMode,
  onOpenCharacter,
  onToggleHealthBar,
  onToggleCondition,
  onClearConditions,
  onChangeElevation,
  onSetStandMode,
  onSetSize,
  onDeleteToken,
  onClose,
}: TokenContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const position = () => {
      const bounds = menu.getBoundingClientRect();
      menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - bounds.width - 8))}px`;
      menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - bounds.height - 8))}px`;
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(menu);
    window.addEventListener("resize", position);
    return () => { observer.disconnect(); window.removeEventListener("resize", position); };
  }, [x, y]);
  return (
    <div
      ref={menuRef}
      data-ui-layer="true"
      className={styles.menu}
      style={{
        left: x,
        top: y,
      }}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {canOpenCharacter && (
        <button type="button" onClick={onOpenCharacter}>
          Abrir ficha
        </button>
      )}

      {canResizeToken && (
        <div className={styles.section}>
          <strong>Tamanho no mapa</strong>

          <div className={styles.sizeButtons}>
            {TOKEN_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                className={sizeCells === size ? styles.modeActive : ""}
                onClick={() => onSetSize(size)}
                title={`${size} × ${size} quadrados`}
              >
                <span
                  className={styles.sizeSwatch}
                  aria-hidden
                  style={{
                    gridTemplateColumns: `repeat(${size}, 4px)`,
                    gridTemplateRows: `repeat(${size}, 4px)`,
                  }}
                >
                  {Array.from({ length: size * size }).map((_, index) => (
                    <i key={index} />
                  ))}
                </span>
                {size * size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <strong>Exibição</strong>

        <button
          type="button"
          onClick={onToggleHealthBar}
          disabled={!canShowHealthBar}
        >
          <span>{healthBarVisible ? "☑" : "☐"}</span>
          Barra de PV
        </button>

        {!canShowHealthBar && (
          <small>Vincule o token a uma ficha para mostrar PV.</small>
        )}
      </div>

      <div className={styles.section}>
        <strong>Visual 2.5D</strong>

        <div className={styles.modeButtons}>
          <button
            type="button"
            className={standMode === "auto" ? styles.modeActive : ""}
            onClick={() => onSetStandMode("auto")}
          >
            Auto
          </button>

          <button
            type="button"
            className={standMode === "flat" ? styles.modeActive : ""}
            onClick={() => onSetStandMode("flat")}
          >
            Plano
          </button>

          <button
            type="button"
            className={standMode === "billboard" ? styles.modeActive : ""}
            onClick={() => onSetStandMode("billboard")}
          >
            Em pé
          </button>
        </div>

        <div className={styles.elevationRow}>
          <span>Altura</span>
          <strong>{elevation} ft</strong>
        </div>

        <div className={styles.elevationButtons}>
          <button type="button" onClick={() => onChangeElevation(-5)}>
            −5
          </button>

          <button type="button" onClick={() => onChangeElevation(5)}>
            +5
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <strong>Efeitos</strong>

          {activeConditions.length > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={onClearConditions}
            >
              Limpar
            </button>
          )}
        </div>

        <div className={styles.conditions}>
          {TOKEN_CONDITIONS.map((condition) => {
            const active = activeConditions.includes(condition.id);

            return (
              <button
                key={condition.id}
                type="button"
                className={active ? styles.conditionActive : ""}
                onClick={() => onToggleCondition(condition.id)}
                title={condition.label}
              >
                <span>{condition.icon}</span>
                {condition.label}
              </button>
            );
          })}
        </div>
      </div>

      <button type="button" className={styles.danger} onClick={onDeleteToken}>
        Deletar token
      </button>

      <button type="button" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}
