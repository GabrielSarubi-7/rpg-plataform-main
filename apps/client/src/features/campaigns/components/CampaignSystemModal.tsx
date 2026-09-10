import {
  AVAILABLE_CAMPAIGN_SYSTEMS,
  getCampaignSystemDefinition,
} from "@shared/rules/systemRegistry";
import type { CampaignSystemId } from "@shared/types/campaignSettings";

import styles from "./CampaignSystemModal.module.css";

interface CampaignSystemModalProps {
  open: boolean;
  selectedSystemId: CampaignSystemId;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  onSelect: (systemId: CampaignSystemId) => void;
  onClose: () => void;
}

export default function CampaignSystemModal({
  open,
  selectedSystemId,
  loading = false,
  title = "Selecionar sistema",
  subtitle = "Escolha a base de regras que define ficha, pericias, recursos e calculos da campanha.",
  onSelect,
  onClose,
}: CampaignSystemModalProps) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <section className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span>Catalogo de sistemas</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <button type="button" onClick={onClose} aria-label="Fechar">
            x
          </button>
        </header>

        <div className={styles.list}>
          {AVAILABLE_CAMPAIGN_SYSTEMS.map((system) => {
            const selected = system.id === selectedSystemId;

            return (
              <button
                key={system.id}
                type="button"
                className={`${styles.systemCard} ${
                  selected ? styles.systemCardActive : ""
                }`}
                onClick={() => onSelect(system.id)}
                disabled={loading}
              >
                <span className={styles.systemMark}>{system.versionLabel}</span>

                <span className={styles.systemInfo}>
                  <strong>{system.name}</strong>
                  <span>{system.description}</span>
                  <small>
                    {system.rules.defenseLabel} · {system.rules.rollFormula}
                  </small>
                </span>

                <span className={styles.status}>
                  {selected ? "Selecionado" : "Disponivel"}
                </span>
              </button>
            );
          })}
        </div>

        <footer className={styles.footer}>
          <button type="button" onClick={onClose}>
            Fechar
          </button>
        </footer>
      </section>
    </div>
  );
}

export function getCampaignSystemSummary(systemId: CampaignSystemId) {
  return getCampaignSystemDefinition(systemId);
}
