import type {
  CampaignAbilityKey,
  CampaignSheetTemplate,
  CampaignSystemId,
} from "../../types/campaignSettings";

export type CampaignSystemAvailability = "available" | "planned";

export type CampaignSheetRendererKind = "dnd5e" | "schema";

export type CampaignAbilityScoreMode =
  | "dnd5e_modifier"
  | "flat_value"
  | "dice_pool"
  | "custom";

export type CampaignSkillMode = "dnd5e" | "ranked" | "flat" | "custom";

export type CampaignDeathSaveMode = "dnd5e" | "none" | "custom";

export interface CampaignSystemSkillDefinition {
  key: string;
  label: string;
  ability: CampaignAbilityKey;
}

export interface CampaignSystemDefinition {
  id: CampaignSystemId;
  dataKey: string;
  name: string;
  shortName: string;
  versionLabel: string;
  summary: string;
  description: string;
  availability: CampaignSystemAvailability;
  sheetTemplate: CampaignSheetTemplate;
  sheet: {
    renderer: CampaignSheetRendererKind;
    schemaVersion: number;
    dataKey: string;
  };
  sheetLayout: {
    sectionOrder: readonly string[];
    abilityOrder: readonly CampaignAbilityKey[];
    primaryResourceIds: readonly string[];
  };
  rules: {
    rollFormula: string;
    abilityScoreMode: CampaignAbilityScoreMode;
    initiativeAbility: CampaignAbilityKey;
    defenseLabel: string;
    hitPointMode: "current_max_temp" | "current_max" | "custom";
    skillMode: CampaignSkillMode;
    deathSaveMode: CampaignDeathSaveMode;
  };
  skills: readonly CampaignSystemSkillDefinition[];
}
