import type { CharacterAction } from "@/features/actions/types/actionTypes";
import { normalizeCharacterActions } from "@/features/actions/types/actionTypes";
import {
  DEFAULT_CAMPAIGN_SYSTEM_ID,
  getCampaignSystemDefinition,
  getCampaignSystemSkills,
} from "@shared/rules/systemRegistry";
import type {
  CampaignAbilityKey,
  CampaignSheetTemplate,
} from "@shared/types/campaignSettings";
import {
  STANDARD_ACTION_RESOURCE_ID,
  STANDARD_BONUS_ACTION_RESOURCE_ID,
} from "@shared/types/action";
import type { CharacterVisibility } from "../services/characterApi";

export type AbilityKey = CampaignAbilityKey;

export interface AbilityBlock {
  score: number;
  savingThrowProficient: boolean;
  savingThrowBonus: number;
}

export interface SkillBlock {
  proficiencyLevel: SkillProficiencyLevel;
  bonus: number;
}

export type SkillProficiencyLevel =
  | "untrained"
  | "half"
  | "proficient"
  | "expertise";

export interface CustomField {
  id: string;
  label: string;
  type: "text" | "number" | "checkbox";
  value: string | number | boolean;
}

export interface CustomSection {
  id: string;
  title: string;
  fields: CustomField[];
}

export type CharacterResourceRecovery =
  | "manual"
  | "turn_end"
  | "short_rest"
  | "medium_rest"
  | "long_rest";

export interface CharacterResource {
  id: string;
  name: string;
  current: number;
  max: number;
  icon: string;
  iconImage: string;
  color: string;
  recovery: CharacterResourceRecovery;
}

export interface CharacterResourceSettings {
  playersCanEditCurrent: boolean;
}

export interface SheetForm {
  name: string;
  type: "pc" | "npc" | "monster";
  visibility: CharacterVisibility;
  portraitImage: string;
  defaultTokenImage: string;
  sprite25dImage: string;

  className: string;
  subclass: string;
  level: number;
  race: string;
  background: string;
  alignment: string;
  experience: number;
  playerName: string;
  inspiration: boolean;
  proficiencyBonus: number;

  armorClass: number;
  initiative: number;
  speed: number;
  hpCurrent: number;
  hpMax: number;
  hpTemp: number;
  hitDiceTotal: string;
  hitDiceCurrent: number;
  deathSaveSuccesses: number;
  deathSaveFailures: number;

  abilities: Record<AbilityKey, AbilityBlock>;
  skills: Record<string, SkillBlock>;

  senses: {
    passivePerception: number;
    passiveInvestigation: number;
    passiveInsight: number;
    darkvision: number;
  };

  defenses: {
    resistances: string;
    vulnerabilities: string;
    damageImmunities: string;
    conditionImmunities: string;
  };

  proficiencies: {
    weapons: string;
    armor: string;
    tools: string;
    languages: string;
  };

  biography: {
    appearance: string;
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    backstory: string;
    allies: string;
    organizations: string;
  };

  notes: string;
  resources: CharacterResource[];
  resourceSettings: CharacterResourceSettings;
  actions: CharacterAction[];
  customSections: CustomSection[];
}

export interface AbilityListItem {
  key: AbilityKey;
  label: string;
  name: string;
  enabled?: boolean;
}

export const ABILITY_LIST: AbilityListItem[] = [
  { key: "strength", label: "FOR", name: "Força" },
  { key: "dexterity", label: "DES", name: "Destreza" },
  { key: "constitution", label: "CON", name: "Constituição" },
  { key: "intelligence", label: "INT", name: "Inteligência" },
  { key: "wisdom", label: "SAB", name: "Sabedoria" },
  { key: "charisma", label: "CAR", name: "Carisma" },
];

export function getAbilityList(template?: CampaignSheetTemplate | null) {
  const abilities =
    template?.abilities ??
    getCampaignSystemDefinition(DEFAULT_CAMPAIGN_SYSTEM_ID).sheetTemplate.abilities;

  return abilities
    .map((ability) => ({
      key: ability.key,
      label: ability.label || ability.key,
      name: ability.name || ability.label || ability.key,
      enabled: ability.enabled ?? true,
    }))
    .filter((ability) => ability.enabled !== false);
}

export const SKILL_LIST: {
  key: string;
  label: string;
  ability: AbilityKey;
}[] = [
  { key: "acrobatics", label: "Acrobacia", ability: "dexterity" },
  { key: "animalHandling", label: "Adestrar Animais", ability: "wisdom" },
  { key: "arcana", label: "Arcanismo", ability: "intelligence" },
  { key: "athletics", label: "Atletismo", ability: "strength" },
  { key: "deception", label: "Enganação", ability: "charisma" },
  { key: "history", label: "História", ability: "intelligence" },
  { key: "insight", label: "Intuição", ability: "wisdom" },
  { key: "intimidation", label: "Intimidação", ability: "charisma" },
  { key: "investigation", label: "Investigação", ability: "intelligence" },
  { key: "medicine", label: "Medicina", ability: "wisdom" },
  { key: "nature", label: "Natureza", ability: "intelligence" },
  { key: "perception", label: "Percepção", ability: "wisdom" },
  { key: "performance", label: "Atuação", ability: "charisma" },
  { key: "persuasion", label: "Persuasão", ability: "charisma" },
  { key: "religion", label: "Religião", ability: "intelligence" },
  { key: "sleightOfHand", label: "Prestidigitação", ability: "dexterity" },
  { key: "stealth", label: "Furtividade", ability: "dexterity" },
  { key: "survival", label: "Sobrevivência", ability: "wisdom" },
];

export type SkillListItem = (typeof SKILL_LIST)[number];

export function getSkillList(
  template?: CampaignSheetTemplate | null,
): SkillListItem[] {
  return getCampaignSystemSkills(template?.preset ?? DEFAULT_CAMPAIGN_SYSTEM_ID).map(
    (skill) => ({
      key: skill.key,
      label: skill.label,
      ability: skill.ability,
    }),
  );
}

export const DEFAULT_SHEET_FORM: SheetForm = {
  name: "Novo personagem",
  type: "pc",
  visibility: "private",
  portraitImage: "",
  defaultTokenImage: "",
  sprite25dImage: "",

  className: "",
  subclass: "",
  level: 1,
  race: "",
  background: "",
  alignment: "",
  experience: 0,
  playerName: "",
  inspiration: false,
  proficiencyBonus: 2,

  armorClass: 10,
  initiative: 0,
  speed: 30,
  hpCurrent: 1,
  hpMax: 1,
  hpTemp: 0,
  hitDiceTotal: "1d8",
  hitDiceCurrent: 1,
  deathSaveSuccesses: 0,
  deathSaveFailures: 0,

  abilities: createDefaultAbilities(),
  skills: createDefaultSkills(),

  senses: {
    passivePerception: 10,
    passiveInvestigation: 10,
    passiveInsight: 10,
    darkvision: 0,
  },

  defenses: {
    resistances: "",
    vulnerabilities: "",
    damageImmunities: "",
    conditionImmunities: "",
  },

  proficiencies: {
    weapons: "",
    armor: "",
    tools: "",
    languages: "",
  },

  biography: {
    appearance: "",
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",
    backstory: "",
    allies: "",
    organizations: "",
  },

  notes: "",
  resources: createDefaultCharacterResources(),
  resourceSettings: {
    playersCanEditCurrent: true,
  },
  actions: [],
  customSections: [],
};

export function createDefaultCharacterResource(): CharacterResource {
  return {
    id: crypto.randomUUID(),
    name: "Novo recurso",
    current: 1,
    max: 1,
    icon: "✦",
    iconImage: "",
    color: "#8b5cf6",
    recovery: "long_rest",
  };
}

export function createDefaultCustomField(
  type: CustomField["type"] = "text",
): CustomField {
  return {
    id: crypto.randomUUID(),
    label: "Novo campo",
    type,
    value: type === "checkbox" ? false : type === "number" ? 0 : "",
  };
}

export function createDefaultCustomSection(): CustomSection {
  return {
    id: crypto.randomUUID(),
    title: "Nova seção",
    fields: [createDefaultCustomField()],
  };
}

export function getAbilityModifier(
  score: number,
  template?: CampaignSheetTemplate | null,
) {
  const system = getCampaignSystemDefinition(template?.preset);

  if (system.rules.abilityScoreMode === "flat_value") {
    return score;
  }

  if (system.rules.abilityScoreMode === "dice_pool") {
    return score;
  }

  return Math.floor((score - 10) / 2);
}

export function getSavingThrowTotal(input: {
  ability: AbilityBlock;
  proficiencyBonus: number;
  template?: CampaignSheetTemplate | null;
}) {
  return (
    getAbilityModifier(input.ability.score, input.template) +
    (input.ability.savingThrowProficient ? input.proficiencyBonus : 0) +
    input.ability.savingThrowBonus
  );
}

export function getSkillTotal(input: {
  skill: SkillBlock;
  ability: AbilityBlock;
  proficiencyBonus: number;
  template?: CampaignSheetTemplate | null;
}) {
  const proficiencyMultiplier =
    input.skill.proficiencyLevel === "expertise"
      ? 2
      : input.skill.proficiencyLevel === "proficient"
        ? 1
        : input.skill.proficiencyLevel === "half"
          ? 0.5
          : 0;

  return (
    getAbilityModifier(input.ability.score, input.template) +
    Math.floor(input.proficiencyBonus * proficiencyMultiplier) +
    input.skill.bonus
  );
}

export function normalizeSheetForm(input: {
  characterName: string;
  characterType: SheetForm["type"];
  characterVisibility?: CharacterVisibility;
  portraitImage?: string | null;
  defaultTokenImage?: string | null;
  dataJson?: unknown;
  sheetTemplate?: CampaignSheetTemplate | null;
}): SheetForm {
  const data = isRecord(input.dataJson) ? input.dataJson : {};
  const system = getCampaignSystemDefinition(input.sheetTemplate?.preset);
  const namespacedData = data[system.sheet.dataKey];
  const systemData: Record<string, unknown> = isRecord(namespacedData)
    ? namespacedData
    : isRecord(data.dnd5e)
      ? data.dnd5e
      : {};
  const abilityList = getAbilityList(input.sheetTemplate);
  const skillList = getSkillList(input.sheetTemplate);
  const identity = isRecord(systemData.identity) ? systemData.identity : {};
  const hitPoints = isRecord(systemData.hitPoints) ? systemData.hitPoints : {};
  const abilities = isRecord(systemData.abilities) ? systemData.abilities : {};
  const savingThrows = isRecord(systemData.savingThrows)
    ? systemData.savingThrows
    : {};
  const skills = isRecord(systemData.skills) ? systemData.skills : {};
  const combat = isRecord(systemData.combat) ? systemData.combat : {};
  const senses = isRecord(systemData.senses) ? systemData.senses : {};
  const defenses = isRecord(systemData.defenses) ? systemData.defenses : {};
  const proficiencies = isRecord(systemData.proficiencies)
    ? systemData.proficiencies
    : {};
  const biography = isRecord(systemData.biography) ? systemData.biography : {};
  const visual = isRecord(systemData.visual) ? systemData.visual : {};

  return {
    ...DEFAULT_SHEET_FORM,
    name: input.characterName,
    type: input.characterType,
    visibility: input.characterVisibility ?? "private",
    portraitImage: input.portraitImage ?? "",
    defaultTokenImage: input.defaultTokenImage ?? "",
    sprite25dImage: getString(visual.sprite25dImage),

    className: getString(identity.className),
    subclass: getString(identity.subclass),
    level: getNumber(identity.level, 1),
    race: getString(identity.race),
    background: getString(identity.background),
    alignment: getString(identity.alignment),
    experience: getNumber(identity.experience, 0),
    playerName: getString(identity.playerName),
    inspiration: getBoolean(systemData.inspiration, false),
    proficiencyBonus: getNumber(
      systemData.proficiencyBonus,
      input.sheetTemplate?.proficiencyBonus ?? 2,
    ),

    armorClass: getNumber(
      systemData.armorClass,
      input.sheetTemplate?.armorClass ?? 10,
    ),
    initiative: getNumber(combat.initiative, 0),
    speed: getNumber(systemData.speed, input.sheetTemplate?.speed ?? 30),
    hpCurrent: getNumber(hitPoints.current, 1),
    hpMax: getNumber(hitPoints.max, 1),
    hpTemp: getNumber(hitPoints.temporary, 0),
    hitDiceTotal: getString(
      combat.hitDiceTotal,
      input.sheetTemplate?.hitDiceTotal ?? "1d8",
    ),
    hitDiceCurrent: getNumber(combat.hitDiceCurrent, 1),
    deathSaveSuccesses: getNumber(combat.deathSaveSuccesses, 0),
    deathSaveFailures: getNumber(combat.deathSaveFailures, 0),

    abilities: Object.fromEntries(
      abilityList.map((ability) => {
        const rawAbility = abilities[ability.key];
        const rawSaveValue = savingThrows[ability.key];
        const rawSave: Record<string, unknown> = isRecord(rawSaveValue)
          ? rawSaveValue
          : {};

        return [
          ability.key,
          {
            score: isRecord(rawAbility)
              ? getNumber(rawAbility.score, getAbilityTemplateScore(input.sheetTemplate, ability.key))
              : getNumber(rawAbility, getAbilityTemplateScore(input.sheetTemplate, ability.key)),
            savingThrowProficient: getBoolean(rawSave.proficient, false),
            savingThrowBonus: getNumber(rawSave.bonus, 0),
          },
        ];
      }),
    ) as Record<AbilityKey, AbilityBlock>,

    skills: Object.fromEntries(
      skillList.map(({ key }) => {
        const rawSkill = isRecord(skills[key]) ? skills[key] : {};

        return [
          key,
          {
            proficiencyLevel: getSkillProficiencyLevel(rawSkill),
            bonus: getNumber(rawSkill.bonus, 0),
          },
        ];
      }),
    ),

    senses: {
      passivePerception: getNumber(senses.passivePerception, 10),
      passiveInvestigation: getNumber(senses.passiveInvestigation, 10),
      passiveInsight: getNumber(senses.passiveInsight, 10),
      darkvision: getNumber(senses.darkvision, 0),
    },

    defenses: {
      resistances: getString(defenses.resistances),
      vulnerabilities: getString(defenses.vulnerabilities),
      damageImmunities: getString(defenses.damageImmunities),
      conditionImmunities: getString(defenses.conditionImmunities),
    },

    proficiencies: {
      weapons: getString(proficiencies.weapons),
      armor: getString(proficiencies.armor),
      tools: getString(proficiencies.tools),
      languages: getString(proficiencies.languages),
    },

    biography: {
      appearance: getString(biography.appearance),
      personalityTraits: getString(biography.personalityTraits),
      ideals: getString(biography.ideals),
      bonds: getString(biography.bonds),
      flaws: getString(biography.flaws),
      backstory: getString(biography.backstory),
      allies: getString(biography.allies),
      organizations: getString(biography.organizations),
    },

    notes: getString(systemData.notes),
    resources: normalizeCharacterResources(data.resources),
    resourceSettings: normalizeResourceSettings(data.resourceSettings),
    actions: normalizeCharacterActions(data.actions),
    customSections: normalizeCustomSections(data.customSections),
  };
}

export function applySheetTemplate(
  form: SheetForm,
  template?: CampaignSheetTemplate | null,
): SheetForm {
  if (!template) return form;

  const abilityScores = Object.fromEntries(
    getAbilityList(template).map(({ key }) => {
      const ability = template.abilities.find((item) => item.key === key);
      const currentAbility = form.abilities[key] ?? createAbilityBlock();

      return [
        key,
        {
          ...currentAbility,
          score: ability?.score ?? currentAbility.score,
        },
      ];
    }),
  ) as Record<AbilityKey, AbilityBlock>;
  const skills = Object.fromEntries(
    getSkillList(template).map(({ key }) => [
      key,
      form.skills[key] ?? {
        proficiencyLevel: "untrained" as SkillProficiencyLevel,
        bonus: 0,
      },
    ]),
  );
  const hpMax = Math.max(1, template.hpMax || form.hpMax);

  return {
    ...form,
    proficiencyBonus: template.proficiencyBonus,
    armorClass: template.armorClass,
    speed: template.speed,
    hpCurrent: hpMax,
    hpMax,
    hitDiceTotal: template.hitDiceTotal || form.hitDiceTotal,
    abilities: abilityScores,
    skills,
    resources: template.resources.map((resource) => ({ ...resource })),
    customSections: template.customSections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({ ...field })),
    })),
    notes: template.notes,
  };
}

export function mergeSheetFormIntoDataJson(
  form: SheetForm,
  currentSheetData?: unknown,
  template?: CampaignSheetTemplate | null,
) {
  const currentData = isRecord(currentSheetData) ? currentSheetData : {};
  const system = getCampaignSystemDefinition(template?.preset);
  const dataKey = system.sheet.dataKey;
  const currentNamespacedData = currentData[dataKey];
  const currentSystemData: Record<string, unknown> = isRecord(currentNamespacedData)
    ? currentNamespacedData
    : isRecord(currentData.dnd5e)
      ? currentData.dnd5e
      : {};
  const abilityList = getAbilityList(template);

  return {
    ...currentData,
    name: form.name,
    type: form.type,
    system: system.id,
    [dataKey]: {
      ...currentSystemData,
      identity: {
        className: form.className,
        subclass: form.subclass,
        level: form.level,
        race: form.race,
        background: form.background,
        alignment: form.alignment,
        experience: form.experience,
        playerName: form.playerName,
      },
      inspiration: form.inspiration,
      proficiencyBonus: form.proficiencyBonus,
      armorClass: form.armorClass,
      speed: form.speed,
      hitPoints: {
        current: form.hpCurrent,
        max: form.hpMax,
        temporary: form.hpTemp,
      },
      combat: {
        initiative: form.initiative,
        hitDiceTotal: form.hitDiceTotal,
        hitDiceCurrent: form.hitDiceCurrent,
        deathSaveSuccesses: form.deathSaveSuccesses,
        deathSaveFailures: form.deathSaveFailures,
      },
      abilities: Object.fromEntries(
        abilityList.map(({ key }) => [
          key,
          {
            score: (form.abilities[key] ?? createAbilityBlock()).score,
          },
        ]),
      ),
      savingThrows: Object.fromEntries(
        abilityList.map(({ key }) => [
          key,
          {
            proficient:
              (form.abilities[key] ?? createAbilityBlock())
                .savingThrowProficient,
            bonus: (form.abilities[key] ?? createAbilityBlock()).savingThrowBonus,
          },
        ]),
      ),
      skills: form.skills,
      senses: form.senses,
      defenses: form.defenses,
      proficiencies: form.proficiencies,
      biography: form.biography,
      visual: {
        ...(isRecord(currentSystemData.visual) ? currentSystemData.visual : {}),
        sprite25dImage: form.sprite25dImage,
      },
      notes: form.notes,
    },
    resources: form.resources,
    resourceSettings: form.resourceSettings,
    actions: form.actions,
    customSections: form.customSections,
  };
}

export function canUseActionResources(
  form: SheetForm,
  action: CharacterAction,
) {
  const costs = action.resourceCosts ?? [];

  for (const cost of costs) {
    const resource = form.resources.find((item) => item.id === cost.resourceId);

    if (!resource || resource.current < cost.amount) {
      return false;
    }
  }

  return true;
}

export function spendActionResources(
  form: SheetForm,
  action: CharacterAction,
) {
  if (!canUseActionResources(form, action)) {
    return null;
  }

  const costs = action.resourceCosts ?? [];

  if (costs.length === 0) {
    return form;
  }

  return {
    ...form,
    resources: form.resources.map((resource) => {
      const totalCost = costs
        .filter((cost) => cost.resourceId === resource.id)
        .reduce((sum, cost) => sum + cost.amount, 0);

      if (totalCost <= 0) {
        return resource;
      }

      return {
        ...resource,
        current: Math.max(0, resource.current - totalCost),
      };
    }),
  };
}

export function recoverCharacterResources(
  form: SheetForm,
  recovery: CharacterResourceRecovery,
) {
  return {
    ...form,
    resources: form.resources.map((resource) =>
      shouldRecoverResource(resource.recovery, recovery)
        ? {
            ...resource,
            current: resource.max,
          }
        : resource,
    ),
  };
}

export function formatActionResourceCost(
  form: Pick<SheetForm, "resources">,
  action: CharacterAction,
) {
  const costs = action.resourceCosts ?? [];

  if (costs.length === 0) {
    return "";
  }

  return costs
    .map((cost) => {
      const resource = form.resources.find((item) => item.id === cost.resourceId);

      return `${cost.amount} ${resource?.name ?? "recurso"}`;
    })
    .join(", ");
}

function shouldRecoverResource(
  resourceRecovery: CharacterResourceRecovery,
  trigger: CharacterResourceRecovery,
) {
  if (trigger === "manual") {
    return false;
  }

  if (resourceRecovery === trigger) {
    return true;
  }

  if (trigger === "medium_rest") {
    return resourceRecovery === "short_rest";
  }

  if (trigger === "long_rest") {
    return resourceRecovery === "short_rest" || resourceRecovery === "medium_rest";
  }

  return false;
}

function createAbilityBlock(): AbilityBlock {
  return {
    score: 10,
    savingThrowProficient: false,
    savingThrowBonus: 0,
  };
}

function getAbilityTemplateScore(
  template: CampaignSheetTemplate | null | undefined,
  key: AbilityKey,
) {
  return template?.abilities.find((ability) => ability.key === key)?.score ?? 10;
}

function createDefaultAbilities(
  template?: CampaignSheetTemplate | null,
): Record<AbilityKey, AbilityBlock> {
  return Object.fromEntries(
    getAbilityList(template).map((ability) => [
      ability.key,
      {
        ...createAbilityBlock(),
        score: getAbilityTemplateScore(template, ability.key),
      },
    ]),
  ) as Record<AbilityKey, AbilityBlock>;
}

function createDefaultSkills(
  template?: CampaignSheetTemplate | null,
): Record<string, SkillBlock> {
  return Object.fromEntries(
    getSkillList(template).map(({ key }) => [
      key,
      {
        proficiencyLevel: "untrained" as SkillProficiencyLevel,
        bonus: 0,
      },
    ]),
  );
}

function createDefaultCharacterResources(): CharacterResource[] {
  return [
    {
      id: STANDARD_ACTION_RESOURCE_ID,
      name: "Ação",
      current: 1,
      max: 1,
      icon: "A",
      iconImage: "",
      color: "#3b82f6",
      recovery: "turn_end",
    },
    {
      id: STANDARD_BONUS_ACTION_RESOURCE_ID,
      name: "Ação bônus",
      current: 1,
      max: 1,
      icon: "B",
      iconImage: "",
      color: "#f59e0b",
      recovery: "turn_end",
    },
  ];
}

function normalizeCharacterResources(value: unknown): CharacterResource[] {
  const defaults = createDefaultCharacterResources();

  if (!Array.isArray(value)) {
    return defaults;
  }

  const normalized = value
    .map((resource) => {
      if (!isRecord(resource)) return null;

      const id = getString(resource.id, crypto.randomUUID()).trim();
      const max = Math.max(0, Math.floor(getNumber(resource.max, 1)));
      const current = Math.max(
        0,
        Math.min(max, Math.floor(getNumber(resource.current, max))),
      );

      if (!id) return null;

      return {
        id,
        name: getString(resource.name, "Recurso"),
        current,
        max,
        icon: getString(resource.icon, "✦"),
        iconImage: getString(resource.iconImage),
        color: getString(resource.color, "#8b5cf6"),
        recovery: normalizeResourceRecovery(resource.recovery, id),
      } satisfies CharacterResource;
    })
    .filter((resource): resource is CharacterResource => resource !== null);

  return normalized;
}

function normalizeResourceSettings(value: unknown): CharacterResourceSettings {
  const settings = isRecord(value) ? value : {};

  return {
    playersCanEditCurrent: getBoolean(settings.playersCanEditCurrent, true),
  };
}

function normalizeResourceRecovery(
  value: unknown,
  resourceId?: string,
): CharacterResourceRecovery {
  if (
    value === "manual" ||
    value === "turn_end" ||
    value === "short_rest" ||
    value === "medium_rest" ||
    value === "long_rest"
  ) {
    return value;
  }

  return resourceId === STANDARD_ACTION_RESOURCE_ID ||
    resourceId === STANDARD_BONUS_ACTION_RESOURCE_ID
    ? "turn_end"
    : "long_rest";
}

function normalizeCustomSections(value: unknown): CustomSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((section) => {
      if (!isRecord(section)) return null;

      return {
        id: getString(section.id, crypto.randomUUID()),
        title: getString(section.title, "Seção"),
        fields: Array.isArray(section.fields)
          ? section.fields
              .map((field) => {
                if (!isRecord(field)) return null;

                const type =
                  field.type === "number" || field.type === "checkbox"
                    ? field.type
                    : "text";

                return {
                  id: getString(field.id, crypto.randomUUID()),
                  label: getString(field.label, "Campo"),
                  type,
                  value:
                    type === "checkbox"
                      ? getBoolean(field.value, false)
                      : type === "number"
                        ? getNumber(field.value, 0)
                        : getString(field.value),
                } satisfies CustomField;
              })
              .filter((field): field is CustomField => field !== null)
          : [],
      } satisfies CustomSection;
    })
    .filter((section): section is CustomSection => section !== null);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function getSkillProficiencyLevel(
  value: Record<string, unknown>,
): SkillProficiencyLevel {
  if (
    value.proficiencyLevel === "untrained" ||
    value.proficiencyLevel === "half" ||
    value.proficiencyLevel === "proficient" ||
    value.proficiencyLevel === "expertise"
  ) {
    return value.proficiencyLevel;
  }

  if (getBoolean(value.expertise, false)) {
    return "expertise";
  }

  if (getBoolean(value.proficient, false)) {
    return "proficient";
  }

  return "untrained";
}
