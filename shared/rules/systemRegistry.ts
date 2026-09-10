import type {
  CampaignSheetTemplate,
  CampaignSystemId,
} from "../types/campaignSettings";
import { DND5E_SYSTEM, DND5E_SYSTEM_ID } from "./systems/dnd5e";
import type {
  CampaignSystemDefinition,
  CampaignSystemSkillDefinition,
} from "./systems/types";

export type {
  CampaignAbilityScoreMode,
  CampaignDeathSaveMode,
  CampaignSheetRendererKind,
  CampaignSkillMode,
  CampaignSystemAvailability,
  CampaignSystemDefinition,
  CampaignSystemSkillDefinition,
} from "./systems/types";

export { DND5E_CAMPAIGN_SHEET_TEMPLATE, DND5E_SKILLS } from "./systems/dnd5e";

export const DEFAULT_CAMPAIGN_SYSTEM_ID: CampaignSystemId = DND5E_SYSTEM_ID;

export const CAMPAIGN_SYSTEM_REGISTRY: readonly CampaignSystemDefinition[] = [
  DND5E_SYSTEM,
];

export const AVAILABLE_CAMPAIGN_SYSTEMS = CAMPAIGN_SYSTEM_REGISTRY.filter(
  (system) => system.availability === "available",
);

export function normalizeCampaignSystemId(value: unknown): CampaignSystemId {
  if (typeof value !== "string") {
    return DEFAULT_CAMPAIGN_SYSTEM_ID;
  }

  const normalized = value.trim();

  if (!normalized || normalized === "custom") {
    return DEFAULT_CAMPAIGN_SYSTEM_ID;
  }

  return isRegisteredCampaignSystemId(normalized)
    ? normalized
    : DEFAULT_CAMPAIGN_SYSTEM_ID;
}

export function isRegisteredCampaignSystemId(
  value: unknown,
): value is CampaignSystemId {
  return (
    typeof value === "string" &&
    CAMPAIGN_SYSTEM_REGISTRY.some((system) => system.id === value)
  );
}

export function getCampaignSystemDefinition(value: unknown) {
  const systemId = normalizeCampaignSystemId(value);

  return (
    CAMPAIGN_SYSTEM_REGISTRY.find((system) => system.id === systemId) ??
    CAMPAIGN_SYSTEM_REGISTRY[0]
  );
}

export function getCampaignSystemDataKey(value: unknown) {
  return getCampaignSystemDefinition(value).sheet.dataKey;
}

export function getCampaignSystemSkills(
  value: unknown,
): readonly CampaignSystemSkillDefinition[] {
  return getCampaignSystemDefinition(value).skills;
}

export function createCampaignSheetTemplate(
  systemId: unknown = DEFAULT_CAMPAIGN_SYSTEM_ID,
): CampaignSheetTemplate {
  return cloneSheetTemplate(getCampaignSystemDefinition(systemId).sheetTemplate);
}

function cloneSheetTemplate(template: CampaignSheetTemplate): CampaignSheetTemplate {
  return JSON.parse(JSON.stringify(template)) as CampaignSheetTemplate;
}
