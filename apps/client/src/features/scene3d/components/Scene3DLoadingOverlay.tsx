import styles from "./Scene3D.module.css";

export default function Scene3DLoadingOverlay({ message = "Carregando cena 3D…", onReturnTo2D }: { message?: string; onReturnTo2D: () => void }) {
  return <div className={styles.cover} data-ui-layer="true" role="status">
    <div className={styles.card}>
      <strong>{message}</strong>
      <button type="button" onClick={onReturnTo2D}>Voltar ao 2D</button>
    </div>
  </div>;
}
