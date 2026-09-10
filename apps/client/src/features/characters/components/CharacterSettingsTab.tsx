import { useId } from "react";

import type { CharacterVisibility } from "../services/characterApi";
import { resolveAssetUrl } from "@/features/assets/assetApi";

import type { SheetForm } from "../types/characterSheet";

import styles from "./CharacterSettingsTab.module.css";

interface CharacterSettingsTabProps {
  form: SheetForm;
  isGm: boolean;
  onChange: (updater: (current: SheetForm) => SheetForm) => void;
  onImageTextChange: (
    field: "portraitImage" | "defaultTokenImage" | "sprite25dImage",
    value: string,
  ) => void;
  onImageFileChange: (
    field: "portraitImage" | "defaultTokenImage" | "sprite25dImage",
    file?: File,
  ) => void;
}

export default function CharacterSettingsTab({
  form,
  isGm,
  onChange,
  onImageTextChange,
  onImageFileChange,
}: CharacterSettingsTabProps) {
  const updateField = <K extends keyof SheetForm>(
    key: K,
    value: SheetForm[K],
  ) => {
    onChange((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className={styles.layout}>
      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <span>Aparência do personagem</span>
          <p>
            Ajuste as imagens usadas na ficha, no token padrão arrastado para o
            mapa e no modo 2.5D.
          </p>
        </div>

        <div className={styles.imageGrid}>
          <ImageBox
            label="Retrato"
            value={form.portraitImage}
            onTextChange={(value) => onImageTextChange("portraitImage", value)}
            onFileChange={(file) =>
              onImageFileChange("portraitImage", file)
            }
          />

          <ImageBox
            label="Token padrão"
            value={form.defaultTokenImage}
            onTextChange={(value) =>
              onImageTextChange("defaultTokenImage", value)
            }
            onFileChange={(file) =>
              onImageFileChange("defaultTokenImage", file)
            }
          />

          <ImageBox
            label="Sprite 2.5D"
            value={form.sprite25dImage}
            previewValue={form.sprite25dImage || form.defaultTokenImage}
            fallbackActive={!form.sprite25dImage && !!form.defaultTokenImage}
            helperText="Usado quando a câmera inclina. Se ficar vazio, o token padrão é usado automaticamente."
            onTextChange={(value) =>
              onImageTextChange("sprite25dImage", value)
            }
            onFileChange={(file) =>
              onImageFileChange("sprite25dImage", file)
            }
          />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <span>Recursos e turnos</span>
          <p>
            Defina quem pode ajustar manualmente recursos como acoes, mana e
            cargas durante a mesa.
          </p>
        </div>

        <label className={styles.toggleRow}>
          <div>
            <strong>Bloquear edicao manual para players</strong>
            <span>
              Quando ativo, apenas o GM altera os valores atuais dos recursos na
              ficha. Usar habilidades, passar turno e descansos continuam
              funcionando.
            </span>
          </div>

          <input
            type="checkbox"
            disabled={!isGm}
            checked={!form.resourceSettings.playersCanEditCurrent}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                resourceSettings: {
                  ...current.resourceSettings,
                  playersCanEditCurrent: !event.target.checked,
                },
              }))
            }
          />
        </label>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <span>Classificação e visibilidade</span>
          <p>
            Essas opções controlam como a ficha aparece na campanha, sem mudar
            os dados mecânicos do personagem.
          </p>
        </div>

        <div className={styles.settingsGrid}>
          <SelectField
            label="Tipo de ficha"
            value={isGm ? form.type : "pc"}
            disabled={!isGm}
            options={[
              { value: "pc", label: "Personagem" },
              ...(isGm
                ? [
                    { value: "npc", label: "NPC" },
                    { value: "monster", label: "Monstro" },
                  ]
                : []),
            ]}
            onChange={(value) =>
              updateField("type", value as SheetForm["type"])
            }
          />

          <SelectField
            label="Visibilidade"
            value={form.visibility}
            options={getVisibilityOptions(isGm)}
            onChange={(value) =>
              updateField("visibility", value as CharacterVisibility)
            }
          />
        </div>

        <div className={styles.notice}>
          {isGm
            ? "Como GM/owner, você pode preparar fichas públicas, privadas ou visíveis só para a equipe de mesa."
            : "Jogadores continuam limitados a fichas de personagem; a visibilidade define quem pode enxergar a ficha na campanha."}
        </div>
      </section>
    </div>
  );
}

function getVisibilityOptions(isGm: boolean) {
  return [
    { value: "private", label: "Privada" },
    ...(isGm ? [{ value: "gm_only", label: "Somente GM" }] : []),
    { value: "public", label: "Pública" },
  ];
}

function ImageBox(props: {
  label: string;
  value: string;
  previewValue?: string;
  fallbackActive?: boolean;
  helperText?: string;
  onTextChange: (value: string) => void;
  onFileChange: (file?: File) => void;
}) {
  const inputId = useId();
  const previewValue = props.previewValue ?? props.value;

  return (
    <div className={styles.imageBox}>
      <strong>{props.label}</strong>

      <div
        className={styles.imagePreview}
        style={{
          backgroundImage: previewValue
            ? `url(${resolveAssetUrl(previewValue)})`
            : undefined,
        }}
      >
        {!previewValue && "Imagem"}
      </div>

      {props.helperText && (
        <p className={styles.imageHelp}>
          {props.fallbackActive && <strong>Fallback automático ativo.</strong>} {" "}
          {props.helperText}
        </p>
      )}

      <label className={styles.urlField}>
        <span>URL da imagem</span>
        <input
          title={props.value}
          value={props.value}
          onChange={(event) => props.onTextChange(event.target.value)}
          placeholder="Cole uma URL ou envie um arquivo"
        />
      </label>

      <div className={styles.imageActions}>
        <label htmlFor={inputId}>Escolher arquivo</label>

        {props.value && (
          <button type="button" onClick={() => props.onTextChange("")}>
            Remover
          </button>
        )}
      </div>

      <input
        id={inputId}
        className={styles.hiddenFileInput}
        type="file"
        accept="image/*"
        onChange={(event) => props.onFileChange(event.target.files?.[0])}
      />
    </div>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <select
        value={props.value}
        disabled={props.disabled}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
