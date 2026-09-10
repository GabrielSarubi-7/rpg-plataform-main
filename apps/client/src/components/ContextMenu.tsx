// LEGACY: prototype menu kept for future map context-menu experiments.
// The production token menu currently lives in features/tokens/components.
interface Props {
  x: number;
  y: number;
  onAddToken: () => void;
}

export default function ContextMenu({ x, y, onAddToken }: Props) {
  return (
    <div
      data-ui-layer="true"
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      style={{
        position: "fixed",
        top: y,
        left: x,
        background: "#2c2c2c",
        padding: 10,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 999,
        userSelect: "none",
      }}
    >
      <button
        type="button"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onAddToken}
      >
        Criar token / ficha
      </button>
    </div>
  );
}
