import { useId, useState, type CSSProperties, type ReactNode } from "react";

import {
  resolveAssetUrl,
  uploadImageAsset,
} from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import {
  ABILITY_LIST,
  SKILL_LIST,
  createDefaultCustomField,
  createDefaultCustomSection,
  createDefaultCharacterResource,
  formatActionResourceCost,
  getAbilityModifier,
  getSavingThrowTotal,
  getSkillTotal,
  type AbilityKey,
  type AbilityListItem,
  type CharacterResource,
  type CharacterResourceRecovery,
  type CustomField,
  type SkillListItem,
  type SkillProficiencyLevel,
  type SheetForm,
} from "../types/characterSheet";
import {
  prepareActionRolls,
  type PreparedActionRolls,
} from "@/features/actions/utils/actionRolls";
import type { CampaignSheetTemplate } from "@shared/types/campaignSettings";

import styles from "./CharacterSheetTab.module.css";

const RESOURCE_RECOVERY_OPTIONS: {
  value: CharacterResourceRecovery;
  label: string;
}[] = [
  { value: "manual", label: "Manual" },
  { value: "turn_end", label: "Fim do turno" },
  { value: "short_rest", label: "Descanso rapido" },
  { value: "medium_rest", label: "Descanso medio" },
  { value: "long_rest", label: "Descanso longo" },
];

interface CharacterSheetTabProps {
  form: SheetForm;
  abilityList?: AbilityListItem[];
  skillList?: SkillListItem[];
  sheetTemplate?: CampaignSheetTemplate | null;
  isGm: boolean;
  isActiveCharacter: boolean;
  canSetActiveCharacter: boolean;
  identityCollapsed: boolean;
  onChange: (updater: (current: SheetForm) => SheetForm) => void;
  onSetActiveCharacter: (active: boolean) => void;
  onOpenSettings: () => void;
  onToggleIdentityCollapsed: () => void;
  onRoll: (input: {
    label: string;
    expression: string;
  }) => Promise<unknown>;
  onRollInitiative: () => Promise<void>;
  onRollDeathSave: () => Promise<void>;
  onSetDeathSaveSuccesses: (value: number) => void;
  onSetDeathSaveFailures: (value: number) => void;
  onStabilize: () => Promise<void>;
  onRevive: () => Promise<void>;
  onAnnounceAction: (actionId: string) => Promise<void>;
  onRollActionAttack: (actionId: string) => Promise<void>;
  onRollActionDamage: (actionId: string) => Promise<void>;
}

export default function CharacterSheetTab({
  form,
  abilityList = ABILITY_LIST,
  skillList = SKILL_LIST,
  sheetTemplate,
  isGm,
  isActiveCharacter,
  canSetActiveCharacter,
  identityCollapsed,
  onChange,
  onSetActiveCharacter,
  onOpenSettings,
  onToggleIdentityCollapsed,
  onRoll,
  onRollInitiative,
  onRollDeathSave,
  onSetDeathSaveSuccesses,
  onSetDeathSaveFailures,
  onStabilize,
  onRevive,
  onAnnounceAction,
  onRollActionAttack,
  onRollActionDamage,
}: CharacterSheetTabProps) {
  const authToken = useAuthStore((state) => state.token);
  const [openSkillMenu, setOpenSkillMenu] = useState<string | null>(null);
  const emptyAbility = {
    score: 10,
    savingThrowProficient: false,
    savingThrowBonus: 0,
  };
  const emptySkill = {
    proficiencyLevel: "untrained" as SkillProficiencyLevel,
    bonus: 0,
  };

  const updateField = <K extends keyof SheetForm>(
    key: K,
    value: SheetForm[K],
  ) => {
    onChange((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateHitPoints = (value: number) => {
    onChange((current) => ({
      ...current,
      hpCurrent: value,
      ...(value > 0
        ? {
            deathSaveSuccesses: 0,
            deathSaveFailures: 0,
          }
        : {}),
    }));
  };

  const updateAbility = (
    ability: AbilityKey,
    input: Partial<SheetForm["abilities"][AbilityKey]>,
  ) => {
    onChange((current) => ({
      ...current,
      abilities: {
        ...current.abilities,
        [ability]: {
          ...(current.abilities[ability] ?? emptyAbility),
          ...input,
        },
      },
    }));
  };

  const updateSkill = (
    skillKey: string,
    input: Partial<SheetForm["skills"][string]>,
  ) => {
    onChange((current) => ({
      ...current,
      skills: {
        ...current.skills,
        [skillKey]: {
          ...(current.skills[skillKey] ?? emptySkill),
          ...input,
        },
      },
    }));
  };

  const updateResource = (
    resourceId: string,
    updater: (resource: CharacterResource) => CharacterResource,
  ) => {
    onChange((current) => ({
      ...current,
      resources: current.resources.map((resource) =>
        resource.id === resourceId ? updater(resource) : resource,
      ),
    }));
  };

  const addResource = () => {
    onChange((current) => ({
      ...current,
      resources: [...current.resources, createDefaultCharacterResource()],
    }));
  };

  const removeResource = (resourceId: string) => {
    onChange((current) => ({
      ...current,
      resources: current.resources.filter((resource) => resource.id !== resourceId),
      actions: current.actions.map((action) => ({
        ...action,
        resourceCosts: (action.resourceCosts ?? []).filter(
          (cost) => cost.resourceId !== resourceId,
        ),
      })),
    }));
  };

  const addCustomSection = () => {
    onChange((current) => ({
      ...current,
      customSections: [...current.customSections, createDefaultCustomSection()],
    }));
  };

  const updateCustomSection = (
    sectionId: string,
    updater: (
      section: SheetForm["customSections"][number],
    ) => SheetForm["customSections"][number],
  ) => {
    onChange((current) => ({
      ...current,
      customSections: current.customSections.map((section) =>
        section.id === sectionId ? updater(section) : section,
      ),
    }));
  };

  const removeCustomSection = (sectionId: string) => {
    onChange((current) => ({
      ...current,
      customSections: current.customSections.filter(
        (section) => section.id !== sectionId,
      ),
    }));
  };

  const hpRatio =
    form.hpMax > 0 ? Math.max(0, Math.min(1, form.hpCurrent / form.hpMax)) : 0;
  const isAtZeroHitPoints = form.hpCurrent <= 0;
  const canEditResourceCurrent =
    isGm || form.resourceSettings.playersCanEditCurrent;

  return (
    <div className={styles.sheet}>
      <section className={styles.hero}>
        <div className={styles.characterPanel}>
          <div
            className={styles.portraitPreview}
            style={{
              backgroundImage: form.portraitImage
                ? `url(${resolveAssetUrl(form.portraitImage)})`
                : undefined,
            }}
          >
            {!form.portraitImage && <span>Retrato</span>}
          </div>

          <div className={styles.characterMeta}>
            <strong>{form.name || "Novo personagem"}</strong>
            <span>
              {form.className || "Classe"}
              {form.level ? ` • nível ${form.level}` : ""}
            </span>

            <div className={styles.characterTags}>
              <small>{formatCharacterType(form.type)}</small>
              {form.race && <small>{form.race}</small>}
              {form.background && <small>{form.background}</small>}
            </div>

            <label
              className={`${styles.activeCharacterToggle} ${
                isActiveCharacter ? styles.activeCharacterToggleOn : ""
              }`}
              title={
                canSetActiveCharacter
                  ? "Usar esta ficha na barra de acoes"
                  : "Apenas o dono da ficha ou o GM pode ativar esta ficha"
              }
            >
              <input
                type="checkbox"
                checked={isActiveCharacter}
                disabled={!canSetActiveCharacter}
                onChange={(event) =>
                  onSetActiveCharacter(event.target.checked)
                }
              />
              <span>Personagem ativo</span>
            </label>
          </div>

          <div className={styles.characterActions}>
            <button type="button" onClick={onOpenSettings}>
              Editar imagem
            </button>
            <button type="button" onClick={onToggleIdentityCollapsed}>
              {identityCollapsed ? "Editar identidade" : "Fechar identidade"}
            </button>
          </div>
        </div>

        <aside className={styles.vitalsPanel}>
          <div className={styles.hpBlock}>
            <span>Pontos de Vida</span>

            <div className={styles.hpHeadline}>
              <NumberField
                label="Atuais"
                value={form.hpCurrent}
                onChange={updateHitPoints}
              />
              <strong>/</strong>
              <NumberField
                label="Máximos"
                value={form.hpMax}
                onChange={(value) => updateField("hpMax", value)}
              />
              <NumberField
                label="Temporários"
                value={form.hpTemp}
                onChange={(value) => updateField("hpTemp", value)}
              />
            </div>

            <div className={styles.hpTrack}>
              <span style={{ width: `${hpRatio * 100}%` }} />
            </div>

            {isAtZeroHitPoints && (
              <DeathSavePanel
                successes={form.deathSaveSuccesses}
                failures={form.deathSaveFailures}
                onRoll={onRollDeathSave}
                onSetSuccesses={onSetDeathSaveSuccesses}
                onSetFailures={onSetDeathSaveFailures}
                onStabilize={onStabilize}
                onRevive={onRevive}
              />
            )}
          </div>
        </aside>

        <aside className={styles.quickStats}>
          <StatBox
            label="Inspiração"
            value={form.inspiration ? "Sim" : "Não"}
            onClick={() => updateField("inspiration", !form.inspiration)}
          />

          <NumberStatBox
            label="Proficiência"
            value={form.proficiencyBonus}
            onChange={(value) => updateField("proficiencyBonus", value)}
          />

          <NumberStatBox
            label="CA"
            value={form.armorClass}
            onChange={(value) => updateField("armorClass", value)}
          />

          <RollableNumberStatBox
            label="Iniciativa"
            value={form.initiative}
            onChange={(value) => updateField("initiative", value)}
            onRoll={onRollInitiative}
          />

          <NumberStatBox
            label="Deslocamento"
            value={form.speed}
            onChange={(value) => updateField("speed", value)}
          />
        </aside>

        <section className={styles.abilities}>
          {abilityList.map((ability) => {
            const block = form.abilities[ability.key] ?? emptyAbility;
            const modifier = getAbilityModifier(block.score, sheetTemplate);

            return (
              <div key={ability.key} className={styles.abilityCard}>
                <strong>{ability.label}</strong>

                <input
                  className={styles.abilityScore}
                  type="number"
                  value={block.score}
                  onChange={(event) =>
                    updateAbility(ability.key, {
                      score: Number(event.target.value),
                    })
                  }
                />

                <button
                  type="button"
                  className={styles.rollPill}
                  onClick={() =>
                    onRoll({
                      label: ability.name,
                      expression: formatModifierExpression(modifier),
                    })
                  }
                >
                  {formatSigned(modifier)}
                </button>
              </div>
            );
          })}
        </section>
      </section>

      {!identityCollapsed && (
        <section className={styles.identityPanel}>
          <header>
            <div>
              <span>Identidade</span>
              <strong>{form.name || "Ficha sem nome"}</strong>
            </div>

            <button type="button" onClick={onToggleIdentityCollapsed}>
              Fechar
            </button>
          </header>

          <div className={styles.identityGrid}>
            <TextField
              label="Nome"
              value={form.name}
              onChange={(value) => updateField("name", value)}
            />

            <TextField
              label="Classe"
              value={form.className}
              onChange={(value) => updateField("className", value)}
            />

            <TextField
              label="Subclasse"
              value={form.subclass}
              onChange={(value) => updateField("subclass", value)}
            />

            <NumberField
              label="Nível"
              value={form.level}
              onChange={(value) => updateField("level", value)}
            />

            <TextField
              label="Raça / espécie"
              value={form.race}
              onChange={(value) => updateField("race", value)}
            />

            <TextField
              label="Antecedente"
              value={form.background}
              onChange={(value) => updateField("background", value)}
            />

            <TextField
              label="Alinhamento"
              value={form.alignment}
              onChange={(value) => updateField("alignment", value)}
            />

            <NumberField
              label="Experiência"
              value={form.experience}
              onChange={(value) => updateField("experience", value)}
            />

            <TextField
              label="Jogador"
              value={form.playerName}
              onChange={(value) => updateField("playerName", value)}
            />

            <SelectField
              label="Tipo"
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
          </div>
        </section>
      )}
      <div className={styles.columns}>
        <aside className={styles.sideColumn}>
          <Card title="Salvaguardas">
            <div className={styles.saveList}>
              {abilityList.map((ability) => {
                const block = form.abilities[ability.key];
                const total = getSavingThrowTotal({
                  ability: block ?? emptyAbility,
                  proficiencyBonus: form.proficiencyBonus,
                  template: sheetTemplate,
                });

                return (
                  <div key={ability.key} className={styles.saveRow}>
                    <button
                      type="button"
                      className={
                        (block ?? emptyAbility).savingThrowProficient
                          ? styles.proficiencyActive
                          : ""
                      }
                      onClick={() =>
                        updateAbility(ability.key, {
                          savingThrowProficient:
                            !(block ?? emptyAbility).savingThrowProficient,
                        })
                      }
                      title={
                        (block ?? emptyAbility).savingThrowProficient
                          ? "Remover proficiência"
                          : "Marcar proficiência"
                      }
                    >
                      P
                    </button>
                    <span>{ability.name}</span>
                    <button
                      type="button"
                      className={styles.saveRollButton}
                      onClick={() =>
                        onRoll({
                          label: `Salvaguarda de ${ability.name}`,
                          expression: formatModifierExpression(total),
                        })
                      }
                    >
                      {formatSigned(total)}
                    </button>
                    <input
                      type="number"
                      value={(block ?? emptyAbility).savingThrowBonus}
                      onChange={(event) =>
                        updateAbility(ability.key, {
                          savingThrowBonus: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Perícias">
            <div className={styles.skillList}>
              {skillList.map((skill) => {
                const block = form.skills[skill.key] ?? emptySkill;
                const ability = form.abilities[skill.ability] ?? emptyAbility;
                const total = getSkillTotal({
                  skill: block,
                  ability,
                  proficiencyBonus: form.proficiencyBonus,
                  template: sheetTemplate,
                });

                return (
                  <div key={skill.key} className={styles.skillRow}>
                    <button
                      type="button"
                      className={`${styles.skillProficiencyButton} ${
                        styles[getSkillProficiencyClass(block.proficiencyLevel)]
                      }`}
                      onClick={() =>
                        setOpenSkillMenu((current) =>
                          current === skill.key ? null : skill.key,
                        )
                      }
                      title={getSkillProficiencyLabel(block.proficiencyLevel)}
                      aria-label={`${skill.label}: ${getSkillProficiencyLabel(
                        block.proficiencyLevel,
                      )}`}
                      aria-expanded={openSkillMenu === skill.key}
                    />

                    <div className={styles.skillNameGroup}>
                      <strong>{skill.label}</strong>
                      <small>{skill.ability.slice(0, 3).toUpperCase()}</small>
                    </div>

                    <button
                      type="button"
                      className={styles.skillRollButton}
                      onClick={() =>
                        onRoll({
                          label: skill.label,
                          expression: formatModifierExpression(total),
                        })
                      }
                    >
                      {formatSigned(total)}
                    </button>

                    <input
                      type="number"
                      value={block.bonus}
                      onChange={(event) =>
                        updateSkill(skill.key, {
                          bonus: Number(event.target.value),
                        })
                      }
                    />

                    {openSkillMenu === skill.key && (
                      <div className={styles.skillProficiencyMenu}>
                        {(
                          [
                            "untrained",
                            "half",
                            "proficient",
                            "expertise",
                          ] as SkillProficiencyLevel[]
                        ).map((level) => (
                          <button
                            key={level}
                            type="button"
                            className={
                              level === block.proficiencyLevel
                                ? styles.skillProficiencyMenuActive
                                : ""
                            }
                            onClick={() => {
                              updateSkill(skill.key, {
                                proficiencyLevel: level,
                              });
                              setOpenSkillMenu(null);
                            }}
                          >
                            <span
                              className={`${styles.skillMenuDot} ${
                                styles[getSkillProficiencyClass(level)]
                              }`}
                            />
                            <strong>{getSkillProficiencyLabel(level)}</strong>
                            <em>
                              {formatSigned(
                                getSkillPreviewTotal({
                                  level,
                                  abilityScore: ability.score,
                                  proficiencyBonus: form.proficiencyBonus,
                                  bonus: block.bonus,
                                  template: sheetTemplate,
                                }),
                              )}
                            </em>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </aside>

        <main className={styles.mainColumn}>
          <Card title="Recursos">
            <div className={styles.resourceToolbar}>
              <button type="button" onClick={addResource}>
                + Recurso
              </button>
            </div>

            <div className={styles.resourceGrid}>
              {form.resources.map((resource) => (
                <div key={resource.id} className={styles.resourceCard}>
                  <ResourceIcon resource={resource} />

                  <div className={styles.resourceBody}>
                    <input
                      value={resource.name}
                      onChange={(event) =>
                        updateResource(resource.id, (current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                    />

                    <div className={styles.resourceCustomize}>
                      <input
                        value={resource.icon}
                        placeholder="Icone"
                        onChange={(event) =>
                          updateResource(resource.id, (current) => ({
                            ...current,
                            icon: event.target.value,
                          }))
                        }
                      />

                      <input
                        type="color"
                        value={resource.color}
                        onChange={(event) =>
                          updateResource(resource.id, (current) => ({
                            ...current,
                            color: event.target.value,
                          }))
                        }
                      />

                      <ImageUploadButton
                        title="Imagem do recurso"
                        hasImage={Boolean(resource.iconImage)}
                        onFile={(file) =>
                          readImageFile(authToken, file, (value) =>
                            updateResource(resource.id, (current) => ({
                              ...current,
                              iconImage: value,
                            })),
                          )
                        }
                        onClear={() =>
                          updateResource(resource.id, (current) => ({
                            ...current,
                            iconImage: "",
                          }))
                        }
                      />
                    </div>

                    <select
                      className={styles.resourceRecoverySelect}
                      value={resource.recovery}
                      onChange={(event) =>
                        updateResource(resource.id, (current) => ({
                          ...current,
                          recovery:
                            event.target.value as CharacterResourceRecovery,
                        }))
                      }
                    >
                      {RESOURCE_RECOVERY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <div className={styles.resourceCounters}>
                      <input
                        type="number"
                        min={0}
                        disabled={!canEditResourceCurrent}
                        value={resource.current}
                        onChange={(event) =>
                          updateResource(resource.id, (current) => ({
                            ...current,
                            current: Math.max(0, Number(event.target.value)),
                          }))
                        }
                      />
                      <span>/</span>
                      <input
                        type="number"
                        min={0}
                        disabled={!canEditResourceCurrent}
                        value={resource.max}
                        onChange={(event) =>
                          updateResource(resource.id, (current) => {
                            const max = Math.max(0, Number(event.target.value));

                            return {
                              ...current,
                              max,
                              current: Math.min(current.current, max),
                            };
                          })
                        }
                      />
                    </div>

                    <div className={styles.resourcePips}>
                      {Array.from({ length: Math.max(0, resource.max) }).map(
                        (_, index) => (
                          <span
                            key={index}
                            className={
                              index < resource.current
                                ? styles.resourcePipFilled
                                : ""
                            }
                            style={
                              {
                                "--resource-color": resource.color,
                              } as CSSProperties
                            }
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.removeResourceButton}
                    onClick={() => removeResource(resource.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Ataques e ações">
            <div className={styles.actionPreviewList}>
              {form.actions.length === 0 && (
                <span className={styles.muted}>
                  Nenhuma ação criada ainda. Use a aba Ações para montar ataques,
                  magias e habilidades.
                </span>
              )}

              {form.actions.slice(0, 8).map((action) => {
                const rolls = prepareActionRolls(action, form, sheetTemplate);

                return (
                  <div key={action.id} className={styles.actionPreviewRow}>
                    <button
                      type="button"
                      className={styles.actionPreviewMain}
                      onClick={() => void onAnnounceAction(action.id)}
                      title="Enviar detalhes ao chat"
                    >
                      <ActionPreviewIcon action={action} />
                      <strong>{action.name}</strong>
                      <small>{formatActionSummary(action, rolls, form)}</small>
                    </button>

                    <div className={styles.actionPreviewButtons}>
                      {rolls.attackExpression && (
                        <button
                          type="button"
                          onClick={() => void onRollActionAttack(action.id)}
                        >
                          Acerto
                        </button>
                      )}

                      {rolls.damageExpression &&
                        action.roll.mode !== "attack_roll" && (
                        <button
                          type="button"
                          onClick={() => void onRollActionDamage(action.id)}
                        >
                          Dano
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Descanso e recuperação">
            <div className={styles.recoveryGrid}>
              <TextField
                label="Dado de Vida"
                value={form.hitDiceTotal}
                onChange={(value) => updateField("hitDiceTotal", value)}
              />

              <NumberField
                label="Usos restantes"
                value={form.hitDiceCurrent}
                onChange={(value) => updateField("hitDiceCurrent", value)}
              />

              <button
                type="button"
                className={styles.recoveryRollButton}
                onClick={() =>
                  onRoll({
                    label: "Dado de Vida",
                    expression: form.hitDiceTotal || "1d8",
                  })
                }
              >
                Rolar Dado de Vida
              </button>
            </div>

            <p className={styles.muted}>
              Dados de Vida são usados em descanso curto para recuperar PV.
            </p>
          </Card>

          <Card title="Campos customizados">
            <div className={styles.customSectionToolbar}>
              <button type="button" onClick={addCustomSection}>
                + Criar seção
              </button>
            </div>

            {form.customSections.length === 0 && (
              <span className={styles.muted}>
                Crie seções livres para regras da mesa, recursos extras ou
                qualquer campo homebrew.
              </span>
            )}

            <div className={styles.customSections}>
              {form.customSections.map((section) => (
                <div key={section.id} className={styles.customSection}>
                  <header>
                    <input
                      value={section.title}
                      onChange={(event) =>
                        updateCustomSection(section.id, (current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        updateCustomSection(section.id, (current) => ({
                          ...current,
                          fields: [
                            ...current.fields,
                            createDefaultCustomField(),
                          ],
                        }))
                      }
                    >
                      + Campo
                    </button>

                    <button
                      type="button"
                      onClick={() => removeCustomSection(section.id)}
                    >
                      Remover
                    </button>
                  </header>

                  <div className={styles.customFields}>
                    {section.fields.map((field) => (
                      <CustomFieldEditor
                        key={field.id}
                        field={field}
                        onChange={(nextField) =>
                          updateCustomSection(section.id, (current) => ({
                            ...current,
                            fields: current.fields.map((currentField) =>
                              currentField.id === field.id
                                ? nextField
                                : currentField,
                            ),
                          }))
                        }
                        onRemove={() =>
                          updateCustomSection(section.id, (current) => ({
                            ...current,
                            fields: current.fields.filter(
                              (currentField) => currentField.id !== field.id,
                            ),
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>

        <aside className={styles.sideColumn}>
          <Card title="Sentidos">
            <div className={styles.stackFields}>
              <NumberField
                label="Percepção passiva"
                value={form.senses.passivePerception}
                onChange={(value) =>
                  updateField("senses", {
                    ...form.senses,
                    passivePerception: value,
                  })
                }
              />
              <NumberField
                label="Investigação passiva"
                value={form.senses.passiveInvestigation}
                onChange={(value) =>
                  updateField("senses", {
                    ...form.senses,
                    passiveInvestigation: value,
                  })
                }
              />
              <NumberField
                label="Intuição passiva"
                value={form.senses.passiveInsight}
                onChange={(value) =>
                  updateField("senses", {
                    ...form.senses,
                    passiveInsight: value,
                  })
                }
              />
              <NumberField
                label="Visão no escuro"
                value={form.senses.darkvision}
                onChange={(value) =>
                  updateField("senses", {
                    ...form.senses,
                    darkvision: value,
                  })
                }
              />
            </div>
          </Card>

          <Card title="Defesas">
            <div className={styles.stackFields}>
              <TextareaField
                label="Resistências"
                value={form.defenses.resistances}
                onChange={(value) =>
                  updateField("defenses", {
                    ...form.defenses,
                    resistances: value,
                  })
                }
              />
              <TextareaField
                label="Vulnerabilidades"
                value={form.defenses.vulnerabilities}
                onChange={(value) =>
                  updateField("defenses", {
                    ...form.defenses,
                    vulnerabilities: value,
                  })
                }
              />
              <TextareaField
                label="Imunidades a dano"
                value={form.defenses.damageImmunities}
                onChange={(value) =>
                  updateField("defenses", {
                    ...form.defenses,
                    damageImmunities: value,
                  })
                }
              />
              <TextareaField
                label="Imunidades a condição"
                value={form.defenses.conditionImmunities}
                onChange={(value) =>
                  updateField("defenses", {
                    ...form.defenses,
                    conditionImmunities: value,
                  })
                }
              />
            </div>
          </Card>

          <Card title="Proficiências e idiomas">
            <div className={styles.stackFields}>
              <TextareaField
                label="Armas"
                value={form.proficiencies.weapons}
                onChange={(value) =>
                  updateField("proficiencies", {
                    ...form.proficiencies,
                    weapons: value,
                  })
                }
              />
              <TextareaField
                label="Armaduras"
                value={form.proficiencies.armor}
                onChange={(value) =>
                  updateField("proficiencies", {
                    ...form.proficiencies,
                    armor: value,
                  })
                }
              />
              <TextareaField
                label="Ferramentas"
                value={form.proficiencies.tools}
                onChange={(value) =>
                  updateField("proficiencies", {
                    ...form.proficiencies,
                    tools: value,
                  })
                }
              />
              <TextareaField
                label="Idiomas"
                value={form.proficiencies.languages}
                onChange={(value) =>
                  updateField("proficiencies", {
                    ...form.proficiencies,
                    languages: value,
                  })
                }
              />
            </div>
          </Card>

          <Card title="Notas">
            <textarea
              className={styles.notes}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Card(props: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.card}>
      <h3>{props.title}</h3>
      {props.children}
    </section>
  );
}

function DeathSavePanel(props: {
  successes: number;
  failures: number;
  onRoll: () => Promise<void>;
  onSetSuccesses: (value: number) => void;
  onSetFailures: (value: number) => void;
  onStabilize: () => Promise<void>;
  onRevive: () => Promise<void>;
}) {
  const stateLabel =
    props.failures >= 3
      ? "Morto"
      : props.successes >= 3
        ? "Estabilizado"
        : "Inconsciente";

  return (
    <div className={styles.deathSavePanel}>
      <strong>{stateLabel}</strong>

      <DeathSaveTrack
        label="Sucessos"
        count={props.successes}
        onChange={props.onSetSuccesses}
      />

      <DeathSaveTrack
        label="Falhas"
        count={props.failures}
        onChange={props.onSetFailures}
      />

      <div className={styles.deathSaveDivider} />

      <button
        type="button"
        className={styles.stabilizeButton}
        onClick={() => void props.onStabilize()}
        disabled={props.failures >= 3 || props.successes >= 3}
      >
        Estabilizar
      </button>

      <button
        type="button"
        className={styles.rollDeathSaveButton}
        onClick={() => void props.onRoll()}
        disabled={props.successes >= 3 || props.failures >= 3}
      >
        Rolar
      </button>

      <button
        type="button"
        className={styles.reviveButton}
        onClick={() => void props.onRevive()}
      >
        Recuperar 1 PV
      </button>
    </div>
  );
}

function DeathSaveTrack(props: {
  label: string;
  count: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.deathSaveTrack}>
      <span>{props.label}</span>

      <div>
        {[0, 1, 2].map((index) => {
          const checked = index < props.count;

          return (
            <button
              key={index}
              type="button"
              className={checked ? styles.deathSaveChecked : ""}
              onClick={() => props.onChange(checked ? index : index + 1)}
            />
          );
        })}
      </div>
    </div>
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
      <input
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
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

function TextareaField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <textarea
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
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

function StatBox(props: {
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={styles.statBox} onClick={props.onClick}>
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </button>
  );
}

function NumberStatBox(props: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.statBox}>
      <span>{props.label}</span>
      <input
        type="number"
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
    </label>
  );
}

function RollableNumberStatBox(props: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onRoll: () => Promise<unknown>;
}) {
  return (
    <label className={`${styles.statBox} ${styles.rollableStatBox}`}>
      <span>{props.label}</span>
      <input
        type="number"
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
      <button type="button" onClick={() => void props.onRoll()}>
        Rolar
      </button>
    </label>
  );
}

function CustomFieldEditor(props: {
  field: CustomField;
  onChange: (field: CustomField) => void;
  onRemove: () => void;
}) {
  return (
    <div className={styles.customField}>
      <input
        value={props.field.label}
        onChange={(event) =>
          props.onChange({
            ...props.field,
            label: event.target.value,
          })
        }
      />

      <select
        value={props.field.type}
        onChange={(event) => {
          const type = event.target.value as CustomField["type"];

          props.onChange({
            ...props.field,
            type,
            value: type === "checkbox" ? false : type === "number" ? 0 : "",
          });
        }}
      >
        <option value="text">Texto</option>
        <option value="number">Número</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {props.field.type === "checkbox" ? (
        <input
          type="checkbox"
          checked={Boolean(props.field.value)}
          onChange={(event) =>
            props.onChange({
              ...props.field,
              value: event.target.checked,
            })
          }
        />
      ) : (
        <input
          type={props.field.type === "number" ? "number" : "text"}
          value={String(props.field.value)}
          onChange={(event) =>
            props.onChange({
              ...props.field,
              value:
                props.field.type === "number"
                  ? Number(event.target.value)
                  : event.target.value,
            })
          }
        />
      )}

      <button type="button" onClick={props.onRemove}>
        Remover
      </button>
    </div>
  );
}

function formatSigned(value: number) {
  return value >= 0 ? `+${value}` : String(value);
}

function ResourceIcon({ resource }: { resource: CharacterResource }) {
  if (resource.iconImage) {
    return (
      <img
        src={resolveAssetUrl(resource.iconImage)}
        alt=""
        className={styles.resourceIcon}
      />
    );
  }

  return (
    <span
      className={styles.resourceIcon}
      style={{ "--resource-color": resource.color } as CSSProperties}
    >
      {resource.icon || "✦"}
    </span>
  );
}

function ImageUploadButton(props: {
  title: string;
  hasImage?: boolean;
  onFile: (file?: File) => void;
  onClear?: () => void;
}) {
  const inputId = useId();

  return (
    <div className={styles.imageUploadControls}>
      <label
        htmlFor={inputId}
        className={styles.imageUploadButton}
        title={props.title}
        aria-label={props.title}
      >
        <UploadIcon />
      </label>

      {props.hasImage && props.onClear && (
        <button
          type="button"
          className={styles.clearImageButton}
          onClick={props.onClear}
          title="Remover imagem"
          aria-label="Remover imagem"
        >
          x
        </button>
      )}

      <input
        id={inputId}
        className={styles.hiddenFileInput}
        type="file"
        accept="image/*"
        onChange={(event) => props.onFile(event.target.files?.[0])}
      />
    </div>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v11" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 19h14" />
    </svg>
  );
}

async function readImageFile(
  authToken: string | null,
  file: File | undefined,
  onRead: (value: string) => void,
) {
  if (!file || !authToken) return;

  const imageUrl = await uploadImageAsset(authToken, file, {
    maxDimension: 512,
    quality: 0.82,
  });

  onRead(imageUrl);
}

function ActionPreviewIcon({ action }: { action: SheetForm["actions"][number] }) {
  if (action.iconImage) {
    return (
      <img
        src={resolveAssetUrl(action.iconImage)}
        alt=""
        className={styles.actionPreviewIcon}
      />
    );
  }

  return <span className={styles.actionPreviewIcon}>{action.icon || "✦"}</span>;
}

function formatModifierExpression(value: number) {
  if (value > 0) return `1d20+${value}`;
  if (value < 0) return `1d20${value}`;
  return "1d20";
}

function formatActionSummary(
  action: SheetForm["actions"][number],
  rolls: PreparedActionRolls,
  form: SheetForm,
) {
  const range =
    action.targeting.rangeFt ??
    action.targeting.normalRangeFt ??
    action.targeting.reachFt ??
    action.targeting.lengthFt;
  const parts = [range ? `${range} ft` : "-"];
  const cost = formatActionResourceCost(form, action);

  if (rolls.damageExpression) {
    parts.push(rolls.damageExpression);
  }

  if (cost) {
    parts.push(`Custo: ${cost}`);
  }

  return parts.join(" - ");
}

function formatCharacterType(type: SheetForm["type"]) {
  if (type === "npc") return "NPC";
  if (type === "monster") return "Monstro";
  return "Personagem";
}

function getSkillPreviewTotal(input: {
  level: SkillProficiencyLevel;
  abilityScore: number;
  proficiencyBonus: number;
  bonus: number;
  template?: CampaignSheetTemplate | null;
}) {
  const multiplier =
    input.level === "expertise"
      ? 2
      : input.level === "proficient"
        ? 1
        : input.level === "half"
          ? 0.5
          : 0;

  return (
    getAbilityModifier(input.abilityScore, input.template) +
    Math.floor(input.proficiencyBonus * multiplier) +
    input.bonus
  );
}

function getSkillProficiencyLabel(level: SkillProficiencyLevel) {
  switch (level) {
    case "half":
      return "Meia proficiência";
    case "proficient":
      return "Proficiente";
    case "expertise":
      return "Expertise";
    case "untrained":
    default:
      return "Sem treino";
  }
}

function getSkillProficiencyClass(level: SkillProficiencyLevel) {
  switch (level) {
    case "half":
      return "skillHalf";
    case "proficient":
      return "skillProficient";
    case "expertise":
      return "skillExpertise";
    case "untrained":
    default:
      return "skillUntrained";
  }
}

