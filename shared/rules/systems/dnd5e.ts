import {
  STANDARD_ACTION_RESOURCE_ID,
  STANDARD_BONUS_ACTION_RESOURCE_ID,
} from "../../types/action";
import type { CampaignSheetTemplate } from "../../types/campaignSettings";
import type {
  CampaignSystemDefinition,
  CampaignSystemSkillDefinition,
} from "./types";

export const DND5E_SYSTEM_ID = "dnd5e";
export const DND5E_DATA_KEY = "dnd5e";

export const DND5E_CAMPAIGN_SHEET_TEMPLATE: CampaignSheetTemplate = {
  preset: DND5E_SYSTEM_ID,
  systemName: "D&D 5e",
  abilities: [
    { key: "strength", label: "FOR", name: "Forca", score: 10, enabled: true },
    { key: "dexterity", label: "DES", name: "Destreza", score: 10, enabled: true },
    { key: "constitution", label: "CON", name: "Constituicao", score: 10, enabled: true },
    { key: "intelligence", label: "INT", name: "Inteligencia", score: 10, enabled: true },
    { key: "wisdom", label: "SAB", name: "Sabedoria", score: 10, enabled: true },
    { key: "charisma", label: "CAR", name: "Carisma", score: 10, enabled: true },
  ],
  proficiencyBonus: 2,
  armorClass: 10,
  speed: 30,
  hpMax: 1,
  hitDiceTotal: "1d8",
  resources: [
    {
      id: STANDARD_ACTION_RESOURCE_ID,
      name: "Acao",
      current: 1,
      max: 1,
      icon: "A",
      iconImage: "",
      color: "#3b82f6",
      recovery: "turn_end",
    },
    {
      id: STANDARD_BONUS_ACTION_RESOURCE_ID,
      name: "Acao bonus",
      current: 1,
      max: 1,
      icon: "B",
      iconImage: "",
      color: "#f59e0b",
      recovery: "turn_end",
    },
  ],
  customSections: [],
  notes: "",
};

export const DND5E_SKILLS: readonly CampaignSystemSkillDefinition[] = [
  { key: "acrobatics", label: "Acrobacia", ability: "dexterity" },
  { key: "animalHandling", label: "Adestrar Animais", ability: "wisdom" },
  { key: "arcana", label: "Arcanismo", ability: "intelligence" },
  { key: "athletics", label: "Atletismo", ability: "strength" },
  { key: "deception", label: "Enganacao", ability: "charisma" },
  { key: "history", label: "Historia", ability: "intelligence" },
  { key: "insight", label: "Intuicao", ability: "wisdom" },
  { key: "intimidation", label: "Intimidacao", ability: "charisma" },
  { key: "investigation", label: "Investigacao", ability: "intelligence" },
  { key: "medicine", label: "Medicina", ability: "wisdom" },
  { key: "nature", label: "Natureza", ability: "intelligence" },
  { key: "perception", label: "Percepcao", ability: "wisdom" },
  { key: "performance", label: "Atuacao", ability: "charisma" },
  { key: "persuasion", label: "Persuasao", ability: "charisma" },
  { key: "religion", label: "Religiao", ability: "intelligence" },
  { key: "sleightOfHand", label: "Prestidigitacao", ability: "dexterity" },
  { key: "stealth", label: "Furtividade", ability: "dexterity" },
  { key: "survival", label: "Sobrevivencia", ability: "wisdom" },
];

export const DND5E_SYSTEM: CampaignSystemDefinition = {
  id: DND5E_SYSTEM_ID,
  dataKey: DND5E_DATA_KEY,
  name: "Dungeons & Dragons 5e",
  shortName: "D&D 5e",
  versionLabel: "5e",
  summary: "Seis atributos, pericias classicas, CA, vida e recursos de turno.",
  description:
    "Base atual da aplicacao. Carrega a ficha no formato 5e, com atributos, pericias, defesa, pontos de vida, recursos e acoes.",
  availability: "available",
  sheetTemplate: DND5E_CAMPAIGN_SHEET_TEMPLATE,
  sheet: {
    renderer: "dnd5e",
    schemaVersion: 1,
    dataKey: DND5E_DATA_KEY,
  },
  sheetLayout: {
    sectionOrder: [
      "identity",
      "combat",
      "abilities",
      "savingThrows",
      "skills",
      "resources",
      "customSections",
      "biography",
      "notes",
    ],
    abilityOrder: [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ],
    primaryResourceIds: [
      STANDARD_ACTION_RESOURCE_ID,
      STANDARD_BONUS_ACTION_RESOURCE_ID,
    ],
  },
  rules: {
    rollFormula: "1d20 + atributo + proficiencia + bonus",
    abilityScoreMode: "dnd5e_modifier",
    initiativeAbility: "dexterity",
    defenseLabel: "CA",
    hitPointMode: "current_max_temp",
    skillMode: "dnd5e",
    deathSaveMode: "dnd5e",
  },
  skills: DND5E_SKILLS,
};
