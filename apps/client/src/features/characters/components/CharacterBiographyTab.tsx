import type { SheetForm } from "../types/characterSheet";

import styles from "./CharacterBiographyTab.module.css";

interface CharacterBiographyTabProps {
  form: SheetForm;
  onChange: (updater: (current: SheetForm) => SheetForm) => void;
}

export default function CharacterBiographyTab({
  form,
  onChange,
}: CharacterBiographyTabProps) {
  const updateBiography = (
    field: keyof SheetForm["biography"],
    value: string,
  ) => {
    onChange((current) => ({
      ...current,
      biography: {
        ...current.biography,
        [field]: value,
      },
    }));
  };

  return (
    <div className={styles.layout}>
      <section className={styles.heroCard}>
        <div>
          <span>Biografia</span>
          <h2>{form.name || "Novo personagem"}</h2>
          <p>
            Aparência, personalidade e história ficam separados da parte
            mecânica da ficha para a leitura continuar limpa durante a mesa.
          </p>
        </div>

        <div className={styles.summary}>
          <strong>{form.race || "Espécie"}</strong>
          <span>{form.className || "Classe"}</span>
          <small>{form.background || "Antecedente"}</small>
        </div>
      </section>

      <div className={styles.columns}>
        <section className={styles.card}>
          <h3>Identidade narrativa</h3>

          <TextareaField
            label="Aparência"
            value={form.biography.appearance}
            onChange={(value) => updateBiography("appearance", value)}
          />

          <TextareaField
            label="Traços de personalidade"
            value={form.biography.personalityTraits}
            onChange={(value) =>
              updateBiography("personalityTraits", value)
            }
          />

          <TextareaField
            label="Ideais"
            value={form.biography.ideals}
            onChange={(value) => updateBiography("ideals", value)}
          />

          <TextareaField
            label="Vínculos"
            value={form.biography.bonds}
            onChange={(value) => updateBiography("bonds", value)}
          />

          <TextareaField
            label="Defeitos"
            value={form.biography.flaws}
            onChange={(value) => updateBiography("flaws", value)}
          />
        </section>

        <section className={styles.card}>
          <h3>História e relações</h3>

          <TextareaField
            label="História"
            value={form.biography.backstory}
            large
            onChange={(value) => updateBiography("backstory", value)}
          />

          <TextareaField
            label="Aliados"
            value={form.biography.allies}
            onChange={(value) => updateBiography("allies", value)}
          />

          <TextareaField
            label="Organizações / facções"
            value={form.biography.organizations}
            onChange={(value) => updateBiography("organizations", value)}
          />
        </section>
      </div>
    </div>
  );
}

function TextareaField(props: {
  label: string;
  value: string;
  large?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <textarea
        className={props.large ? styles.largeTextarea : ""}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}
