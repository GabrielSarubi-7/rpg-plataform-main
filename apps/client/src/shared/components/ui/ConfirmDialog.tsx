import styles from "./ConfirmDialog.module.css";

export type ConfirmDialogTone = "default" | "danger";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmDialogTone;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={`${styles.dialog} ${
          tone === "danger" ? styles.dangerDialog : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <div className={styles.crest} aria-hidden="true">
          {tone === "danger" ? "!" : "◆"}
        </div>

        <header>
          <span>{tone === "danger" ? "Ação irreversível" : "Confirmação"}</span>
          <h2 id="confirm-dialog-title">{title}</h2>
        </header>

        <p>{message}</p>

        <footer>
          <button type="button" onClick={onCancel}>
            {cancelLabel}
          </button>

          <button type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </footer>
      </section>
    </div>
  );
}
