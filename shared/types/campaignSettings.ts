export type CampaignAbilityKey = string;

export type CampaignSystemId = "dnd5e" | (string & {});

export interface CampaignAbilityTemplate {
  key: CampaignAbilityKey;
  label: string;
  name: string;
  score: number;
  enabled?: boolean;
}

export type CampaignCustomFieldType = "text" | "number" | "checkbox";

export interface CampaignCustomFieldTemplate {
  id: string;
  label: string;
  type: CampaignCustomFieldType;
  value: string | number | boolean;
}

export interface CampaignCustomSectionTemplate {
  id: string;
  title: string;
  fields: CampaignCustomFieldTemplate[];
}

export interface CampaignResourceTemplate {
  id: string;
  name: string;
  current: number;
  max: number;
  icon: string;
  iconImage: string;
  color: string;
  recovery: "manual" | "turn_end" | "short_rest" | "medium_rest" | "long_rest";
}

export interface CampaignSheetTemplate {
  preset: CampaignSystemId;
  systemName: string;
  abilities: CampaignAbilityTemplate[];
  proficiencyBonus: number;
  armorClass: number;
  speed: number;
  hpMax: number;
  hitDiceTotal: string;
  resources: CampaignResourceTemplate[];
  customSections: CampaignCustomSectionTemplate[];
  notes: string;
}

export interface CampaignCharacterCategory {
  id: string;
  name: string;
  parentId: string | null;
  expanded: boolean;
}

export type CampaignCharacterAssignments = Record<string, string | null>;

export interface CampaignCharacterLibrarySettings {
  categories: CampaignCharacterCategory[];
  assignments: CampaignCharacterAssignments;
}

export interface CampaignSettings {
  sheetTemplate: CampaignSheetTemplate;
  characterLibrary: CampaignCharacterLibrarySettings;
}
