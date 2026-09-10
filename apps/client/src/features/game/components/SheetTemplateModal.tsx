import { useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import {
  DEFAULT_CAMPAIGN_SETTINGS,
  normalizeCampaignSettings,
} from "@shared/rules/campaignSettingsRules";
import { getCampaignSystemDefinition } from "@shared/rules/systemRegistry";
import type {
  CampaignCustomFieldTemplate,
  CampaignCustomSectionTemplate,
  CampaignResourceTemplate,
  CampaignSettings,
  CampaignSheetTemplate,
} from "@shared/types/campaignSettings";

import styles from "./SheetTemplateModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SheetTemplateModal({ open, onClose }: Props) {
  const token = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const updateSettings = useCampaignStore((state) => state.updateSettings);
  const loading = useCampaignStore((state) => state.loading);
  const [template, setTemplate] = useState<CampaignSheetTemplate>(
    DEFAULT_CAMPAIGN_SETTINGS.sheetTemplate,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setTemplate(
      normalizeCampaignSettings(activeCampaign?.settingsJson).sheetTemplate,
    );
    setError(null);
  }, [activeCampaign?.settingsJson, open]);

  if (!open) return null;

  const updateTemplate = (
    updater: (current: CampaignSheetTemplate) => CampaignSheetTemplate,
  ) => {
    setTemplate((current) => updater(current));
  };
  const systemDefinition = getCampaignSystemDefinition(template.preset);

  const save = async () => {
    if (!token || !activeCampaign) return;

    const settings: CampaignSettings = {
      ...normalizeCampaignSettings(activeCampaign.settingsJson),
      sheetTemplate: template,
    };

    const result = await updateSettings(token, activeCampaign.id, settings);

    if (!result) {
      setError("Nao foi possivel salvar o modelo.");
      return;
    }

    onClose();
  };

  return (
    <div
      data-ui-layer="true"
      className={styles.backdrop}
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
            <span>Configuracao do GM</span>
            <h2>Modelo de ficha</h2>
            <p>
              Defina a base usada quando players criarem fichas novas nesta
              campanha.
            </p>
          </div>

          <button type="button" onClick={onClose} aria-label="Fechar">
            x
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.card}>
            <h3>Sistema</h3>
            <div className={styles.grid}>
              <div className={styles.systemOverview}>
                <span>Sistema ativo</span>
                <strong>{systemDefinition.name}</strong>
                <small>{systemDefinition.summary}</small>
              </div>
              <NumberField
                label="Prof / bonus base"
                value={template.proficiencyBonus}
                onChange={(value) =>
                  updateTemplate((current) => ({
                    ...current,
                    proficiencyBonus: value,
                  }))
                }
              />
              <NumberField
                label="Defesa / CA"
                value={template.armorClass}
                onChange={(value) =>
                  updateTemplate((current) => ({
                    ...current,
                    armorClass: value,
                  }))
                }
              />
              <NumberField
                label="Movimento"
                value={template.speed}
                onChange={(value) =>
                  updateTemplate((current) => ({
                    ...current,
                    speed: value,
                  }))
                }
              />
              <NumberField
                label="Vida maxima inicial"
                value={template.hpMax}
                onChange={(value) =>
                  updateTemplate((current) => ({
                    ...current,
                    hpMax: Math.max(1, value),
                  }))
                }
              />
              <TextField
                label="Dado de vida"
                value={template.hitDiceTotal}
                onChange={(value) =>
                  updateTemplate((current) => ({
                    ...current,
                    hitDiceTotal: value,
                  }))
                }
              />
            </div>
          </section>

          <section className={styles.card}>
            <h3>Atributos principais</h3>
            <div className={styles.abilityList}>
              {template.abilities.map((ability) => (
                <div key={ability.key} className={styles.abilityRow}>
                  <label className={styles.checkboxField}>
                    <span>Ativo</span>
                    <input
                      type="checkbox"
                      checked={ability.enabled !== false}
                      onChange={(event) =>
                        updateTemplate((current) => ({
                          ...current,
                          abilities: current.abilities.map((item) =>
                            item.key === ability.key
                              ? { ...item, enabled: event.target.checked }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                  <TextField
                    label="Sigla"
                    value={ability.label}
                    onChange={(value) =>
                      updateTemplate((current) => ({
                        ...current,
                        abilities: current.abilities.map((item) =>
                          item.key === ability.key
                            ? { ...item, label: value }
                            : item,
                        ),
                      }))
                    }
                  />
                  <TextField
                    label="Nome"
                    value={ability.name}
                    onChange={(value) =>
                      updateTemplate((current) => ({
                        ...current,
                        abilities: current.abilities.map((item) =>
                          item.key === ability.key ? { ...item, name: value } : item,
                        ),
                      }))
                    }
                  />
                  <NumberField
                    label="Valor"
                    value={ability.score}
                    onChange={(value) =>
                      updateTemplate((current) => ({
                        ...current,
                        abilities: current.abilities.map((item) =>
                          item.key === ability.key
                            ? { ...item, score: value }
                            : item,
                        ),
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <h3>Recursos iniciais</h3>
              <button
                type="button"
                onClick={() =>
                  updateTemplate((current) => ({
                    ...current,
                    resources: [...current.resources, createResource()],
                  }))
                }
              >
                + Recurso
              </button>
            </header>
            <div className={styles.resourceList}>
              {template.resources.map((resource) => (
                <ResourceEditor
                  key={resource.id}
                  resource={resource}
                  onChange={(next) =>
                    updateTemplate((current) => ({
                      ...current,
                      resources: current.resources.map((item) =>
                        item.id === resource.id ? next : item,
                      ),
                    }))
                  }
                  onRemove={() =>
                    updateTemplate((current) => ({
                      ...current,
                      resources: current.resources.filter(
                        (item) => item.id !== resource.id,
                      ),
                    }))
                  }
                />
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <h3>Secoes customizadas</h3>
              <button
                type="button"
                onClick={() =>
                  updateTemplate((current) => ({
                    ...current,
                    customSections: [...current.customSections, createSection()],
                  }))
                }
              >
                + Secao
              </button>
            </header>
            <div className={styles.sectionList}>
              {template.customSections.map((section) => (
                <CustomSectionEditor
                  key={section.id}
                  section={section}
                  onChange={(next) =>
                    updateTemplate((current) => ({
                      ...current,
                      customSections: current.customSections.map((item) =>
                        item.id === section.id ? next : item,
                      ),
                    }))
                  }
                  onRemove={() =>
                    updateTemplate((current) => ({
                      ...current,
                      customSections: current.customSections.filter(
                        (item) => item.id !== section.id,
                      ),
                    }))
                  }
                />
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <h3>Notas padrao</h3>
            <textarea
              value={template.notes}
              onChange={(event) =>
                updateTemplate((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
            />
          </section>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <footer className={styles.footer}>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={save} disabled={loading}>
            {loading ? "Salvando..." : "Salvar modelo"}
          </button>
        </footer>
      </section>
    </div>
  );
}

function ResourceEditor(props: {
  resource: CampaignResourceTemplate;
  onChange: (resource: CampaignResourceTemplate) => void;
  onRemove: () => void;
}) {
  return (
    <div className={styles.resourceRow}>
      <TextField
        label="Nome"
        value={props.resource.name}
        onChange={(value) => props.onChange({ ...props.resource, name: value })}
      />
      <TextField
        label="Icone"
        value={props.resource.icon}
        onChange={(value) => props.onChange({ ...props.resource, icon: value })}
      />
      <TextField
        label="Imagem do icone"
        value={props.resource.iconImage}
        onChange={(value) =>
          props.onChange({ ...props.resource, iconImage: value })
        }
      />
      <TextField
        label="Cor"
        value={props.resource.color}
        onChange={(value) => props.onChange({ ...props.resource, color: value })}
      />
      <NumberField
        label="Atual"
        value={props.resource.current}
        onChange={(value) =>
          props.onChange({
            ...props.resource,
            current: Math.max(0, Math.min(props.resource.max, value)),
          })
        }
      />
      <NumberField
        label="Max"
        value={props.resource.max}
        onChange={(value) =>
          props.onChange({
            ...props.resource,
            max: Math.max(0, value),
            current: Math.min(Math.max(0, value), props.resource.current),
          })
        }
      />
      <select
        value={props.resource.recovery}
        onChange={(event) =>
          props.onChange({
            ...props.resource,
            recovery: event.target.value as CampaignResourceTemplate["recovery"],
          })
        }
      >
        <option value="manual">Manual</option>
        <option value="turn_end">Fim do turno</option>
        <option value="short_rest">Descanso rapido</option>
        <option value="medium_rest">Descanso medio</option>
        <option value="long_rest">Descanso longo</option>
      </select>
      <button type="button" onClick={props.onRemove}>
        Remover
      </button>
    </div>
  );
}

function CustomSectionEditor(props: {
  section: CampaignCustomSectionTemplate;
  onChange: (section: CampaignCustomSectionTemplate) => void;
  onRemove: () => void;
}) {
  return (
    <div className={styles.customSection}>
      <div className={styles.customSectionHeader}>
        <TextField
          label="Nome da secao"
          value={props.section.title}
          onChange={(value) =>
            props.onChange({
              ...props.section,
              title: value,
            })
          }
        />
        <button
          type="button"
          onClick={() =>
            props.onChange({
              ...props.section,
              fields: [...props.section.fields, createField()],
            })
          }
        >
          + Campo
        </button>
        <button type="button" onClick={props.onRemove}>
          Remover
        </button>
      </div>
      {props.section.fields.map((field) => (
        <div key={field.id} className={styles.fieldRow}>
          <TextField
            label="Campo"
            value={field.label}
            onChange={(value) =>
              props.onChange({
                ...props.section,
                fields: props.section.fields.map((item) =>
                  item.id === field.id ? { ...item, label: value } : item,
                ),
              })
            }
          />
          <DefaultValueField
            field={field}
            onChange={(value) =>
              props.onChange({
                ...props.section,
                fields: props.section.fields.map((item) =>
                  item.id === field.id ? { ...item, value } : item,
                ),
              })
            }
          />
          <select
            value={field.type}
            onChange={(event) => {
              const type = event.target
                .value as CampaignCustomFieldTemplate["type"];

              props.onChange({
                ...props.section,
                fields: props.section.fields.map((item) =>
                  item.id === field.id
                    ? {
                        ...item,
                        type,
                        value:
                          type === "checkbox"
                            ? false
                            : type === "number"
                              ? 0
                              : "",
                      }
                    : item,
                ),
              });
            }}
          >
            <option value="text">Texto</option>
            <option value="number">Numero</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <button
            type="button"
            onClick={() =>
              props.onChange({
                ...props.section,
                fields: props.section.fields.filter((item) => item.id !== field.id),
              })
            }
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

function DefaultValueField(props: {
  field: CampaignCustomFieldTemplate;
  onChange: (value: string | number | boolean) => void;
}) {
  if (props.field.type === "checkbox") {
    return (
      <label className={styles.checkboxField}>
        <span>Padrao</span>
        <input
          type="checkbox"
          checked={Boolean(props.field.value)}
          onChange={(event) => props.onChange(event.target.checked)}
        />
      </label>
    );
  }

  return (
    <label className={styles.field}>
      <span>Valor padrao</span>
      <input
        type={props.field.type === "number" ? "number" : "text"}
        value={
          typeof props.field.value === "boolean" ? "" : String(props.field.value)
        }
        onChange={(event) =>
          props.onChange(
            props.field.type === "number"
              ? Number(event.target.value)
              : event.target.value,
          )
        }
      />
    </label>
  );
}

function TextField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <input value={props.value} onChange={(event) => props.onChange(event.target.value)} />
    </label>
  );
}

function NumberField(props: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <input
        type="number"
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
    </label>
  );
}

function createResource(): CampaignResourceTemplate {
  return {
    id: crypto.randomUUID(),
    name: "Novo recurso",
    current: 1,
    max: 1,
    icon: "*",
    iconImage: "",
    color: "#8b5cf6",
    recovery: "long_rest",
  };
}

function createSection(): CampaignCustomSectionTemplate {
  return {
    id: crypto.randomUUID(),
    title: "Nova secao",
    fields: [createField()],
  };
}

function createField(): CampaignCustomFieldTemplate {
  return {
    id: crypto.randomUUID(),
    label: "Novo campo",
    type: "text",
    value: "",
  };
}
