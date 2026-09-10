import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import {
  resolveAssetUrl,
  uploadImageAsset,
} from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import {
  ABILITY_OPTIONS,
  ACTION_KIND_OPTIONS,
  ACTIVATION_OPTIONS,
  DAMAGE_TYPE_OPTIONS,
  ROLL_MODE_OPTIONS,
  TARGETING_SHAPE_OPTIONS,
  createDefaultCharacterAction,
  createDefaultTargetingForShape,
  type CharacterAction,
  type CharacterActionKind,
  type TargetingShape,
} from "../types/actionTypes";
import {
  createDefaultCharacterResource,
  formatActionResourceCost,
  type AbilityListItem,
  type CharacterResource,
  type CharacterResourceRecovery,
} from "@/features/characters/types/characterSheet";

import styles from "./ActionEditorSection.module.css";

interface ActionEditorSectionProps {
  actions: CharacterAction[];
  resources: CharacterResource[];
  abilityList?: AbilityListItem[];
  canEditResourceCurrent: boolean;
  onChange: (actions: CharacterAction[]) => void;
  onResourcesChange: (resources: CharacterResource[]) => void;
}

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

export default function ActionEditorSection({
  actions,
  resources,
  abilityList,
  canEditResourceCurrent,
  onChange,
  onResourcesChange,
}: ActionEditorSectionProps) {
  const authToken = useAuthStore((state) => state.token);
  const characters = useCharacterStore((state) => state.characters);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(
    actions[0]?.id ?? null,
  );
  const [resourcesOpen, setResourcesOpen] = useState(true);

  useEffect(() => {
    if (actions.length === 0) {
      setSelectedActionId(null);
      return;
    }

    if (!actions.some((action) => action.id === selectedActionId)) {
      setSelectedActionId(actions[0].id);
    }
  }, [actions, selectedActionId]);

  const selectedAction = useMemo(
    () => actions.find((action) => action.id === selectedActionId) ?? null,
    [actions, selectedActionId],
  );
  const abilityOptions = useMemo(
    () =>
      abilityList?.length
        ? abilityList.map((ability) => ({
            value: ability.key,
            label: ability.label,
          }))
        : ABILITY_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          })),
    [abilityList],
  );
  const primaryAbility = abilityOptions[0]?.value ?? "strength";
  const secondaryAbility = abilityOptions[1]?.value ?? primaryAbility;

  const addAction = () => {
    const defaultAction = createDefaultCharacterAction("custom", {
      primaryAbility,
      secondaryAbility,
    });
    const action = {
      ...defaultAction,
      resourceCosts: (defaultAction.resourceCosts ?? []).filter((cost) =>
        resources.some((resource) => resource.id === cost.resourceId),
      ),
    };

    onChange([...actions, action]);
    setSelectedActionId(action.id);
  };

  const updateAction = (
    actionId: string,
    updater: (action: CharacterAction) => CharacterAction,
  ) => {
    onChange(
      actions.map((action) =>
        action.id === actionId ? updater(action) : action,
      ),
    );
  };

  const duplicateAction = (action: CharacterAction) => {
    const duplicate: CharacterAction = {
      ...action,
      id: crypto.randomUUID(),
      name: `${action.name} (cópia)`,
      activation: {
        ...action.activation,
      },
      resourceCosts: (action.resourceCosts ?? []).map((cost) => ({ ...cost })),
      persistentEffect: action.persistentEffect
        ? { ...action.persistentEffect }
        : undefined,
      summon: action.summon ? { ...action.summon } : undefined,
      targeting: {
        ...action.targeting,
      },
      roll: {
        ...action.roll,
      },
      visual: {
        ...action.visual,
      },
    };

    onChange([...actions, duplicate]);
    setSelectedActionId(duplicate.id);
  };

  const deleteAction = (actionId: string) => {
    onChange(actions.filter((action) => action.id !== actionId));
  };

  const addResource = () => {
    onResourcesChange([...resources, createDefaultCharacterResource()]);
  };

  const updateResource = (
    resourceId: string,
    updater: (resource: CharacterResource) => CharacterResource,
  ) => {
    onResourcesChange(
      resources.map((resource) =>
        resource.id === resourceId ? updater(resource) : resource,
      ),
    );
  };

  const deleteResource = (resourceId: string) => {
    onResourcesChange(resources.filter((resource) => resource.id !== resourceId));
    onChange(
      actions.map((action) => ({
        ...action,
        resourceCosts: (action.resourceCosts ?? []).filter(
          (cost) => cost.resourceId !== resourceId,
        ),
      })),
    );
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.createPanel}>
          <button
            type="button"
            className={`${styles.createActionButton} game-button game-button-primary`}
            onClick={addAction}
          >
            <span>＋</span>
            Criar ação
          </button>
        </div>

        <section
          className={`${styles.resourcePanel} ${
            resourcesOpen ? "" : styles.resourcePanelCollapsed
          }`}
        >
          <div className={styles.resourcePanelHeader}>
            <strong>Recursos</strong>
            <button
              type="button"
              className={styles.resourceToggleButton}
              onClick={() => setResourcesOpen((open) => !open)}
            >
              {resourcesOpen ? "v" : ">"}
            </button>
            <button type="button" onClick={addResource}>
              + Recurso
            </button>
          </div>

          {resourcesOpen && (
            <div className={styles.resourceList}>
              {resources.map((resource) => (
                <div key={resource.id} className={styles.resourceEditorRow}>
                  <ResourceIcon resource={resource} />

                  <div className={styles.resourceInputs}>
                    <input
                      value={resource.name}
                      onChange={(event) =>
                        updateResource(resource.id, (current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                    />

                  <input
                    value={resource.icon}
                    onChange={(event) =>
                      updateResource(resource.id, (current) => ({
                        ...current,
                        icon: event.target.value,
                      }))
                    }
                    placeholder="Icone"
                  />

                  <div>
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

                  <select
                    value={resource.recovery}
                    onChange={(event) =>
                      updateResource(resource.id, (current) => ({
                        ...current,
                        recovery:
                          event.target.value as CharacterResourceRecovery,
                      }))
                    }
                    title="Recupera em"
                  >
                    {RESOURCE_RECOVERY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <ImageUploadButton
                  title="Imagem do recurso"
                  hasImage={Boolean(resource.iconImage)}
                  onFile={(file) => {
                    void readImageFile(authToken, file, (value) =>
                      updateResource(resource.id, (current) => ({
                        ...current,
                        iconImage: value,
                      })),
                    );
                  }}
                  onClear={() => {
                    updateResource(resource.id, (current) => ({
                      ...current,
                      iconImage: "",
                    }));
                  }}
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

                <button
                  type="button"
                  className={styles.tinyDangerButton}
                  onClick={() => deleteResource(resource.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          )}
        </section>

        {actions.length === 0 && (
          <div className={styles.emptyState}>
            Nenhuma ação criada ainda.
          </div>
        )}

        <div className={styles.actionList}>
          {actions.map((action) => {
            const costLabel = formatActionResourceCost({ resources }, action);

            return (
              <button
                key={action.id}
                type="button"
                className={`${styles.actionListItem} ${
                  action.id === selectedActionId
                    ? styles.actionListItemActive
                    : ""
                }`}
                onClick={() => setSelectedActionId(action.id)}
              >
                <ActionIcon
                  action={action}
                  className={styles.actionListIcon}
                />

                <div>
                  <strong>{action.name || "Ação sem nome"}</strong>
                  <small>
                    {formatActionKind(action.kind)}
                    {costLabel ? ` - ${costLabel}` : ""}
                  </small>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className={styles.editor}>
        {!selectedAction && (
          <div className={styles.placeholder}>Selecione uma acao.</div>
        )}

        {selectedAction && (
          <>
            <header className={styles.editorHeader}>
              <div>
                <strong>{selectedAction.name || "Ação sem nome"}</strong>
                <span>
                  {formatActionKind(selectedAction.kind)} •{" "}
                  {formatTargetingShape(selectedAction.targeting.shape)}
                  {formatActionResourceCost({ resources }, selectedAction)
                    ? ` - ${formatActionResourceCost({ resources }, selectedAction)}`
                    : ""}
                </span>
              </div>

              <div className={styles.headerActions}>
                <button
                  type="button"
                  className="game-button"
                  onClick={() => duplicateAction(selectedAction)}
                >
                  Duplicar
                </button>

                <button
                  type="button"
                  className={styles.dangerButton}
                  onClick={() => deleteAction(selectedAction.id)}
                >
                  Deletar
                </button>
              </div>
            </header>

            <section className={`${styles.card} ${styles.kindCard}`}>
              <div className={styles.cardTitle}>O que é esta ação?</div>

              <div className={styles.kindPicker}>
                {ACTION_KIND_CHOICES.map((choice) => (
                  <button
                    key={choice.value}
                    type="button"
                    className={
                      selectedAction.kind === choice.value
                        ? styles.kindOptionActive
                        : styles.kindOption
                    }
                    onClick={() =>
                      updateAction(selectedAction.id, (action) =>
                        applyKindChoice(action, choice.value, {
                          primaryAbility,
                          secondaryAbility,
                        }),
                      )
                    }
                  >
                    <span>{choice.icon}</span>
                    <strong>{choice.label}</strong>
                    <small>{choice.description}</small>
                  </button>
                ))}
              </div>
            </section>

            <div className={styles.formGrid}>
              <TextField
                label="Nome"
                value={selectedAction.name}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    name: value,
                  }))
                }
              />

              <TextField
                label="Ícone"
                value={selectedAction.icon}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    icon: value,
                  }))
                }
              />

              <IconImageField
                label="Imagem do icone"
                value={selectedAction.iconImage ?? ""}
                authToken={authToken}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    iconImage: value,
                  }))
                }
              />

              <SelectField
                label="Custo"
                value={selectedAction.activation.type}
                options={ACTIVATION_OPTIONS}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    activation: {
                      ...action.activation,
                      type: value as CharacterAction["activation"]["type"],
                    },
                  }))
                }
              />

              <SelectField
                label="Alvo / área"
                value={selectedAction.targeting.shape}
                options={TARGETING_SHAPE_OPTIONS}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    targeting: createDefaultTargetingForShape(
                      value as TargetingShape,
                    ),
                  }))
                }
              />

              <SelectField
                label="Rolagem"
                value={selectedAction.roll.mode}
                options={ROLL_MODE_OPTIONS}
                onChange={(value) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    roll: applyRollMode(
                      action.roll,
                      value as CharacterAction["roll"]["mode"],
                      {
                        primaryAbility,
                        secondaryAbility,
                      },
                    ),
                  }))
                }
              />
            </div>

            <label className={styles.field}>
              <span>Descrição</span>
              <textarea
                className={styles.textarea}
                value={selectedAction.description}
                onChange={(event) =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    description: event.target.value,
                  }))
                }
              />
            </label>

            <section className={styles.card}>
              <div className={styles.cardTitle}>Recursos gastos ao usar</div>

              <div className={styles.costList}>
                {(selectedAction.resourceCosts ?? []).map((cost, index) => (
                  <div key={`${cost.resourceId}:${index}`} className={styles.costRow}>
                    <SelectField
                      label="Recurso"
                      value={cost.resourceId}
                      options={resources.map((resource) => ({
                        value: resource.id,
                        label: resource.name,
                      }))}
                      onChange={(value) =>
                        updateAction(selectedAction.id, (action) => ({
                          ...action,
                          resourceCosts: (action.resourceCosts ?? []).map(
                            (currentCost, currentIndex) =>
                              currentIndex === index
                                ? {
                                    ...currentCost,
                                    resourceId: value,
                                  }
                                : currentCost,
                          ),
                        }))
                      }
                    />

                    <NumberField
                      label="Quantidade"
                      min={1}
                      value={cost.amount}
                      onChange={(value) =>
                        updateAction(selectedAction.id, (action) => ({
                          ...action,
                          resourceCosts: (action.resourceCosts ?? []).map(
                            (currentCost, currentIndex) =>
                              currentIndex === index
                                ? {
                                    ...currentCost,
                                    amount: Math.max(1, Math.floor(value)),
                                  }
                                : currentCost,
                          ),
                        }))
                      }
                    />

                    <button
                      type="button"
                      className={styles.dangerButton}
                      onClick={() =>
                        updateAction(selectedAction.id, (action) => ({
                          ...action,
                          resourceCosts: (action.resourceCosts ?? []).filter(
                            (_currentCost, currentIndex) =>
                              currentIndex !== index,
                          ),
                        }))
                      }
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="game-button"
                disabled={resources.length === 0}
                onClick={() =>
                  updateAction(selectedAction.id, (action) => ({
                    ...action,
                    resourceCosts: [
                      ...(action.resourceCosts ?? []),
                      {
                        resourceId: resources[0]?.id ?? "",
                        amount: 1,
                      },
                    ],
                  }))
                }
              >
                Adicionar gasto
              </button>
            </section>

            <section className={styles.card}>
              <div className={styles.cardTitle}>Configuração visual da área</div>

              <div className={styles.formGrid}>
                {usesRange(selectedAction.targeting.shape) && (
                  <NumberField
                    label="Alcance (ft)"
                    value={selectedAction.targeting.rangeFt ?? 0}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        rangeFt: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "ranged_projectile" && (
                  <>
                    <NumberField
                      label="Alcance normal (ft)"
                      value={selectedAction.targeting.normalRangeFt ?? 0}
                      onChange={(value) =>
                        updateTargeting(selectedAction.id, (targeting) => ({
                          ...targeting,
                          normalRangeFt: value,
                        }))
                      }
                    />

                    <NumberField
                      label="Alcance longo (ft)"
                      value={selectedAction.targeting.longRangeFt ?? 0}
                      onChange={(value) =>
                        updateTargeting(selectedAction.id, (targeting) => ({
                          ...targeting,
                          longRangeFt: value,
                        }))
                      }
                    />
                  </>
                )}

                {usesRadius(selectedAction.targeting.shape) && (
                  <NumberField
                    label="Raio (ft)"
                    value={selectedAction.targeting.radiusFt ?? 0}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        radiusFt: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "melee_reach" && (
                  <NumberField
                    label="Alcance corpo a corpo (ft)"
                    value={selectedAction.targeting.reachFt ?? 5}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        reachFt: value,
                      }))
                    }
                  />
                )}

                {usesLength(selectedAction.targeting.shape) && (
                  <NumberField
                    label="Comprimento (ft)"
                    value={selectedAction.targeting.lengthFt ?? 0}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        lengthFt: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "line" && (
                  <NumberField
                    label="Largura (ft)"
                    value={selectedAction.targeting.widthFt ?? 5}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        widthFt: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "cone" && (
                  <NumberField
                    label="Ângulo do cone (°)"
                    value={selectedAction.targeting.angleDeg ?? 53.13}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        angleDeg: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "cube" && (
                  <NumberField
                    label="Tamanho do cubo (ft)"
                    value={selectedAction.targeting.sizeFt ?? 0}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        sizeFt: value,
                      }))
                    }
                  />
                )}

                {selectedAction.targeting.shape === "cylinder" && (
                  <NumberField
                    label="Altura (ft)"
                    value={selectedAction.targeting.heightFt ?? 0}
                    onChange={(value) =>
                      updateTargeting(selectedAction.id, (targeting) => ({
                        ...targeting,
                        heightFt: value,
                      }))
                    }
                  />
                )}

                <ColorField
                  label="Cor"
                  value={selectedAction.visual.color}
                  onChange={(value) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      color: value,
                    }))
                  }
                />

                <ColorField
                  label="Borda"
                  value={selectedAction.visual.borderColor}
                  onChange={(value) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      borderColor: value,
                    }))
                  }
                />

                <ColorField
                  label="Linha"
                  value={
                    selectedAction.visual.projectileColor ??
                    selectedAction.visual.borderColor
                  }
                  onChange={(value) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      projectileColor: value,
                    }))
                  }
                />

                <SelectField
                  label="Estilo da linha"
                  value={selectedAction.visual.lineStyle ?? "dashed"}
                  options={[
                    { value: "dashed", label: "Tracejada" },
                    { value: "solid", label: "Contínua" },
                  ]}
                  onChange={(value) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      lineStyle: value as CharacterAction["visual"]["lineStyle"],
                    }))
                  }
                />

                <NumberField
                  label="Opacidade"
                  min={0}
                  max={1}
                  step={0.05}
                  value={selectedAction.visual.opacity}
                  onChange={(value) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      opacity: value,
                    }))
                  }
                />
              </div>

              <div className={styles.checkboxRow}>
                <CheckboxField
                  label="Mostrar alcance"
                  checked={selectedAction.targeting.showCasterRange ?? false}
                  onChange={(checked) =>
                    updateTargeting(selectedAction.id, (targeting) => ({
                      ...targeting,
                      showCasterRange: checked,
                    }))
                  }
                />

                <CheckboxField
                  label="Mostrar linha até o mouse"
                  checked={selectedAction.targeting.showPathLine ?? false}
                  onChange={(checked) =>
                    updateTargeting(selectedAction.id, (targeting) => ({
                      ...targeting,
                      showPathLine: checked,
                    }))
                  }
                />

                <CheckboxField
                  label="Mostrar área de impacto"
                  checked={selectedAction.targeting.showImpactArea ?? false}
                  onChange={(checked) =>
                    updateTargeting(selectedAction.id, (targeting) => ({
                      ...targeting,
                      showImpactArea: checked,
                    }))
                  }
                />

                <CheckboxField
                  label="Destacar afetados"
                  checked={selectedAction.visual.showAffectedTokens ?? true}
                  onChange={(checked) =>
                    updateVisual(selectedAction.id, (visual) => ({
                      ...visual,
                      showAffectedTokens: checked,
                    }))
                  }
                />

                <CheckboxField
                  label="Exigir alvo"
                  checked={selectedAction.targeting.requiresTarget ?? false}
                  onChange={(checked) =>
                    updateTargeting(selectedAction.id, (targeting) => ({
                      ...targeting,
                      requiresTarget: checked,
                    }))
                  }
                />

                <CheckboxField
                  label="Exigir ponto"
                  checked={selectedAction.targeting.requiresPoint ?? false}
                  onChange={(checked) =>
                    updateTargeting(selectedAction.id, (targeting) => ({
                      ...targeting,
                      requiresPoint: checked,
                    }))
                  }
                />
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardTitle}>Efeito por turnos e invocacao</div>

              <div className={styles.checkboxRow}>
                <CheckboxField
                  label="Manter area no mapa"
                  checked={selectedAction.persistentEffect?.enabled ?? false}
                  onChange={(checked) =>
                    updateAction(selectedAction.id, (action) => ({
                      ...action,
                      persistentEffect: {
                        enabled: checked,
                        durationTurns:
                          action.persistentEffect?.durationTurns ?? 10,
                      },
                    }))
                  }
                />

                <CheckboxField
                  label="Invocar token ao usar"
                  checked={selectedAction.summon?.enabled ?? false}
                  onChange={(checked) =>
                    updateAction(selectedAction.id, (action) => ({
                      ...action,
                      summon: {
                        enabled: checked,
                        characterId:
                          action.summon?.characterId ??
                          characters[0]?.id ??
                          "",
                      },
                    }))
                  }
                />
              </div>

              <div className={styles.formGrid}>
                <NumberField
                  label="Duracao (turnos)"
                  min={0}
                  max={100}
                  value={selectedAction.persistentEffect?.durationTurns ?? 0}
                  onChange={(value) =>
                    updateAction(selectedAction.id, (action) => ({
                      ...action,
                      persistentEffect: {
                        enabled: action.persistentEffect?.enabled ?? value > 0,
                        durationTurns: Math.max(0, Math.floor(value)),
                      },
                    }))
                  }
                />

                <SelectField
                  label="Ficha invocada"
                  value={selectedAction.summon?.characterId ?? ""}
                  options={[
                    { value: "", label: "Nenhuma" },
                    ...characters.map((character) => ({
                      value: character.id,
                      label: character.name,
                    })),
                  ]}
                  onChange={(value) =>
                    updateAction(selectedAction.id, (action) => ({
                      ...action,
                      summon: {
                        enabled: Boolean(value) || (action.summon?.enabled ?? false),
                        characterId: value,
                      },
                    }))
                  }
                />
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardTitle}>Rolagem</div>

              <div className={styles.formGrid}>
                {selectedAction.roll.mode === "attack_roll" && (
                  <>
                    <SelectField
                      label="Atributo do acerto"
                      value={selectedAction.roll.attackAbility ?? primaryAbility}
                      options={abilityOptions}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          attackAbility:
                            value as CharacterAction["roll"]["attackAbility"],
                        }))
                      }
                    />

                    <NumberField
                      label="Bônus manual de acerto"
                      value={selectedAction.roll.attackBonus ?? 0}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          attackBonus: value,
                        }))
                      }
                    />
                  </>
                )}

                {selectedAction.roll.mode === "saving_throw" && (
                  <>
                    <SelectField
                      label="Salvaguarda"
                      value={selectedAction.roll.saveAbility ?? secondaryAbility}
                      options={abilityOptions}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          saveAbility:
                            value as CharacterAction["roll"]["saveAbility"],
                        }))
                      }
                    />

                    <NumberField
                      label="CD"
                      value={selectedAction.roll.saveDc ?? 10}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          saveDc: value,
                        }))
                      }
                    />
                  </>
                )}

                {(selectedAction.roll.mode === "attack_roll" ||
                  selectedAction.roll.mode === "saving_throw" ||
                  selectedAction.roll.mode === "damage") && (
                  <>
                    <TextField
                      label="Dano"
                      value={selectedAction.roll.damage ?? ""}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          damage: value,
                        }))
                      }
                    />

                    {selectedAction.roll.mode === "attack_roll" && (
                      <TextField
                        label="Dano crítico (opcional)"
                        value={selectedAction.roll.criticalDamage ?? ""}
                        onChange={(value) =>
                          updateRoll(selectedAction.id, (roll) => ({
                            ...roll,
                            criticalDamage: value,
                          }))
                        }
                      />
                    )}

                    <SelectField
                      label="Tipo de dano"
                      value={selectedAction.roll.damageType ?? ""}
                      options={[
                        { value: "", label: "Nenhum" },
                        ...DAMAGE_TYPE_OPTIONS.map((value) => ({
                          value,
                          label: capitalize(value),
                        })),
                      ]}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          damageType: value,
                        }))
                      }
                    />

                    <SelectField
                      label="Atributo no dano"
                      value={
                        selectedAction.roll.damageAbility ??
                        selectedAction.roll.attackAbility ??
                        primaryAbility
                      }
                      options={abilityOptions}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          damageAbility:
                            value as CharacterAction["roll"]["damageAbility"],
                        }))
                      }
                    />

                    <NumberField
                      label="Bônus manual de dano"
                      value={selectedAction.roll.damageBonus ?? 0}
                      onChange={(value) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          damageBonus: value,
                        }))
                      }
                    />
                  </>
                )}

                {selectedAction.roll.mode === "healing" && (
                  <TextField
                    label="Cura"
                    value={selectedAction.roll.healing ?? ""}
                    onChange={(value) =>
                      updateRoll(selectedAction.id, (roll) => ({
                        ...roll,
                        healing: value,
                      }))
                    }
                  />
                )}
              </div>

              {(selectedAction.roll.mode === "attack_roll" ||
                selectedAction.roll.mode === "saving_throw" ||
                selectedAction.roll.mode === "damage") && (
                <div className={styles.checkboxRow}>
                  {selectedAction.roll.mode === "attack_roll" && (
                    <CheckboxField
                      label="Somar proficiência no acerto"
                      checked={
                        selectedAction.roll.addProficiencyToAttack ?? false
                      }
                      onChange={(checked) =>
                        updateRoll(selectedAction.id, (roll) => ({
                          ...roll,
                          addProficiencyToAttack: checked,
                        }))
                      }
                    />
                  )}

                  <CheckboxField
                    label="Somar atributo ao dano"
                    checked={selectedAction.roll.addAbilityToDamage ?? false}
                    onChange={(checked) =>
                      updateRoll(selectedAction.id, (roll) => ({
                        ...roll,
                        addAbilityToDamage: checked,
                      }))
                    }
                  />

                  {selectedAction.roll.mode === "saving_throw" && (
                  <CheckboxField
                    label="Metade do dano em sucesso"
                    checked={selectedAction.roll.halfOnSuccess ?? false}
                    onChange={(checked) =>
                      updateRoll(selectedAction.id, (roll) => ({
                        ...roll,
                        halfOnSuccess: checked,
                      }))
                    }
                  />
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </div>
  );

  function updateTargeting(
    actionId: string,
    updater: (
      targeting: CharacterAction["targeting"],
    ) => CharacterAction["targeting"],
  ) {
    updateAction(actionId, (action) => ({
      ...action,
      targeting: updater(action.targeting),
    }));
  }

  function updateRoll(
    actionId: string,
    updater: (roll: CharacterAction["roll"]) => CharacterAction["roll"],
  ) {
    updateAction(actionId, (action) => ({
      ...action,
      roll: updater(action.roll),
    }));
  }

  function updateVisual(
    actionId: string,
    updater: (visual: CharacterAction["visual"]) => CharacterAction["visual"],
  ) {
    updateAction(actionId, (action) => ({
      ...action,
      visual: updater(action.visual),
    }));
  }
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
        className="game-input"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

function IconImageField(props: {
  label: string;
  value: string;
  authToken: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <span>{props.label}</span>
      <div className={styles.iconImageField}>
        {props.value && (
          <img
            src={resolveAssetUrl(props.value)}
            alt=""
            className={styles.iconImagePreview}
          />
        )}

        <ImageUploadButton
          title="Enviar imagem"
          hasImage={Boolean(props.value)}
          onFile={(file) => void readImageFile(props.authToken, file, props.onChange)}
          onClear={() => props.onChange("")}
        />
      </div>
    </div>
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

function ActionIcon(props: {
  action: CharacterAction;
  className?: string;
}) {
  if (props.action.iconImage) {
    return (
      <img
        src={resolveAssetUrl(props.action.iconImage)}
        alt=""
        className={props.className}
      />
    );
  }

  return <span className={props.className}>{props.action.icon || "✦"}</span>;
}

function ResourceIcon(props: { resource: CharacterResource }) {
  if (props.resource.iconImage) {
    return (
      <img
        src={resolveAssetUrl(props.resource.iconImage)}
        alt=""
        className={styles.resourceIcon}
      />
    );
  }

  return (
    <span
      className={styles.resourceIcon}
      style={{ "--resource-color": props.resource.color } as CSSProperties}
    >
      {props.resource.icon || "✦"}
    </span>
  );
}

function NumberField(props: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <input
        className="game-input"
        type="number"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(event) => props.onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ColorField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <input
        className={`${styles.colorInput} game-input`}
        type="color"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  options: readonly {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{props.label}</span>
      <select
        className="game-input"
        value={props.value}
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

function CheckboxField(props: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      <span>{props.label}</span>
    </label>
  );
}

const ACTION_KIND_CHOICES: {
  value: CharacterActionKind;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    value: "spell",
    label: "Magia",
    icon: "✦",
    description: "Feitiços, áreas e rituais",
  },
  {
    value: "melee_attack",
    label: "Corpo a corpo",
    icon: "⚔",
    description: "Golpes e armas próximas",
  },
  {
    value: "ranged_attack",
    label: "À distância",
    icon: "➶",
    description: "Arcos, tiros e projéteis",
  },
  {
    value: "thrown_attack",
    label: "Arremesso",
    icon: "◈",
    description: "Adagas, frascos e bombas",
  },
  {
    value: "feature",
    label: "Habilidade",
    icon: "◆",
    description: "Talentos e recursos",
  },
  {
    value: "item",
    label: "Item",
    icon: "◉",
    description: "Poções, varinhas e cargas",
  },
  {
    value: "custom",
    label: "Customizada",
    icon: "✧",
    description: "Regra própria da mesa",
  },
];

function applyKindChoice(
  action: CharacterAction,
  kind: CharacterActionKind,
  options: {
    primaryAbility?: string;
    secondaryAbility?: string;
  } = {},
): CharacterAction {
  if (action.kind === kind) {
    return action;
  }

  const draftPreset = createDefaultCharacterAction("custom", options);
  const nextPreset = createDefaultCharacterAction(kind, options);
  const isFreshDraft =
    action.kind === "custom" &&
    action.name === draftPreset.name &&
    action.icon === draftPreset.icon &&
    action.description.trim().length === 0;

  return {
    ...action,
    kind,
    ...(isFreshDraft
      ? {
          name: nextPreset.name,
          icon: nextPreset.icon,
          targeting: nextPreset.targeting,
          roll: nextPreset.roll,
        }
      : {}),
  };
}

function applyRollMode(
  roll: CharacterAction["roll"],
  mode: CharacterAction["roll"]["mode"],
  options: {
    primaryAbility?: string;
    secondaryAbility?: string;
  } = {},
): CharacterAction["roll"] {
  const primaryAbility = options.primaryAbility ?? "strength";
  const secondaryAbility = options.secondaryAbility ?? primaryAbility;

  switch (mode) {
    case "attack_roll":
      return {
        ...roll,
        mode,
        attackAbility: roll.attackAbility ?? primaryAbility,
        addProficiencyToAttack: roll.addProficiencyToAttack ?? true,
        attackBonus: roll.attackBonus ?? 0,
        damage: roll.damage ?? "1d6",
        damageAbility: roll.damageAbility ?? roll.attackAbility ?? primaryAbility,
        addAbilityToDamage: roll.addAbilityToDamage ?? true,
        damageBonus: roll.damageBonus ?? 0,
      };

    case "saving_throw":
      return {
        ...roll,
        mode,
        saveAbility: roll.saveAbility ?? secondaryAbility,
        saveDc: roll.saveDc ?? 10,
        damage: roll.damage ?? "1d6",
        addAbilityToDamage: roll.addAbilityToDamage ?? false,
        damageBonus: roll.damageBonus ?? 0,
      };

    case "damage":
      return {
        ...roll,
        mode,
        damage: roll.damage ?? "1d6",
        addAbilityToDamage: roll.addAbilityToDamage ?? false,
        damageBonus: roll.damageBonus ?? 0,
      };

    case "healing":
      return {
        ...roll,
        mode,
        healing: roll.healing ?? "1d8",
      };

    case "none":
    default:
      return {
        ...roll,
        mode,
      };
  }
}

function usesRange(shape: TargetingShape) {
  return ["single_target", "point_sphere", "cube", "cylinder"].includes(
    shape,
  );
}

function usesRadius(shape: TargetingShape) {
  return ["self_emanation", "point_sphere", "cylinder"].includes(shape);
}

function usesLength(shape: TargetingShape) {
  return ["cone", "line"].includes(shape);
}

function formatActionKind(kind: CharacterActionKind) {
  return (
    ACTION_KIND_OPTIONS.find((option) => option.value === kind)?.label ??
    "Ação"
  );
}

function formatTargetingShape(shape: TargetingShape) {
  return (
    TARGETING_SHAPE_OPTIONS.find((option) => option.value === shape)?.label ??
    "Alvo"
  );
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
