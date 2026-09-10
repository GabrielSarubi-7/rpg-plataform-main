import type {
  CampaignAbilityKey,
  CampaignAbilityTemplate,
  CampaignCharacterAssignments,
  CampaignCharacterCategory,
  CampaignCharacterLibrarySettings,
  CampaignCustomSectionTemplate,
  CampaignResourceTemplate,
  CampaignSettings,
  CampaignSheetTemplate,
} from "../types/campaignSettings";
import {
  DEFAULT_CAMPAIGN_SYSTEM_ID,
  createCampaignSheetTemplate,
  normalizeCampaignSystemId,
} from "./systemRegistry";

export const DEFAULT_CAMPAIGN_SHEET_TEMPLATE = createCampaignSheetTemplate(
  DEFAULT_CAMPAIGN_SYSTEM_ID,
);

export const DEFAULT_CAMPAIGN_SETTINGS = createDefaultCampaignSettings();

export function createDefaultCampaignSettings(
  systemId: unknown = DEFAULT_CAMPAIGN_SYSTEM_ID,
): CampaignSettings {
  return {
    sheetTemplate: createCampaignSheetTemplate(systemId),
    characterLibrary: {
      categories: [],
      assignments: {},
    },
  };
}

export function normalizeCampaignSettings(value: unknown): CampaignSettings {
  const settings = isRecord(value) ? value : {};

  return {
    sheetTemplate: normalizeSheetTemplate(settings.sheetTemplate),
    characterLibrary: normalizeCharacterLibrary(settings.characterLibrary),
  };
}

export function normalizeSheetTemplate(value: unknown): CampaignSheetTemplate {
  const template = isRecord(value) ? value : {};
  const legacyCustomTemplate =
    template.preset === "custom" ||
    getString(template.systemName).toLowerCase() === "transpassavel";
  const systemId = normalizeCampaignSystemId(template.preset);
  const baseTemplate = createCampaignSheetTemplate(systemId);

  return {
    preset: systemId,
    systemName: baseTemplate.systemName,
    abilities: normalizeAbilities(
      legacyCustomTemplate ? undefined : template.abilities,
      baseTemplate,
    ),
    proficiencyBonus: clampNumber(
      template.proficiencyBonus,
      baseTemplate.proficiencyBonus,
      0,
      20,
    ),
    armorClass: clampNumber(template.armorClass, baseTemplate.armorClass, 0, 999),
    speed: clampNumber(template.speed, baseTemplate.speed, 0, 999),
    hpMax: Math.max(1, clampNumber(template.hpMax, baseTemplate.hpMax, 1, 9999)),
    hitDiceTotal: getString(template.hitDiceTotal, baseTemplate.hitDiceTotal).slice(
      0,
      24,
    ),
    resources: normalizeResources(template.resources, baseTemplate),
    customSections: normalizeCustomSections(template.customSections),
    notes: getString(template.notes, baseTemplate.notes).slice(0, 2000),
  };
}

function normalizeAbilities(
  value: unknown,
  baseTemplate: CampaignSheetTemplate,
): CampaignAbilityTemplate[] {
  const baseAbilities = baseTemplate.abilities.map((ability) => ({ ...ability }));
  const byKey = new Map(baseAbilities.map((ability) => [ability.key, ability]));

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!isRecord(item)) continue;
      const key = getString(item.key) as CampaignAbilityKey;

      if (!byKey.has(key)) continue;

      const fallback = byKey.get(key);

      if (!fallback) continue;

      byKey.set(key, {
        key,
        label: getString(item.label, fallback.label).slice(0, 8),
        name: getString(item.name, fallback.name).slice(0, 32),
        score: clampNumber(item.score, fallback.score, 0, 999),
        enabled: getBoolean(item.enabled, fallback.enabled ?? true),
      });
    }
  }

  return baseAbilities.map((ability) => byKey.get(ability.key)!).filter(Boolean);
}

function normalizeResources(
  value: unknown,
  baseTemplate: CampaignSheetTemplate,
): CampaignResourceTemplate[] {
  if (!Array.isArray(value)) {
    return baseTemplate.resources.map((resource) => ({ ...resource }));
  }

  const resources = value
    .map((resource) => {
      if (!isRecord(resource)) return null;

      const id = getString(resource.id, randomId()).trim();
      const max = clampNumber(resource.max, 1, 0, 9999);
      const current = clampNumber(resource.current, max, 0, max);

      if (!id) return null;

      return {
        id,
        name: getString(resource.name, "Recurso").slice(0, 36),
        current,
        max,
        icon: getString(resource.icon, "*").slice(0, 4),
        iconImage: getString(resource.iconImage),
        color: getString(resource.color, "#8b5cf6").slice(0, 32),
        recovery: normalizeRecovery(resource.recovery),
      } satisfies CampaignResourceTemplate;
    })
    .filter((resource): resource is CampaignResourceTemplate => Boolean(resource))
    .slice(0, 24);

  return resources.length > 0
    ? resources
    : baseTemplate.resources.map((resource) => ({ ...resource }));
}

function normalizeCustomSections(value: unknown): CampaignCustomSectionTemplate[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((section) => {
      if (!isRecord(section)) return null;

      return {
        id: getString(section.id, randomId()),
        title: getString(section.title, "Secao").slice(0, 48),
        fields: normalizeCustomFields(section.fields),
      };
    })
    .filter((section): section is CampaignCustomSectionTemplate => Boolean(section))
    .slice(0, 24);
}

function normalizeCustomFields(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((field) => {
      if (!isRecord(field)) return null;

      const type =
        field.type === "number" || field.type === "checkbox" ? field.type : "text";

      return {
        id: getString(field.id, randomId()),
        label: getString(field.label, "Campo").slice(0, 48),
        type,
        value:
          type === "checkbox"
            ? getBoolean(field.value, false)
            : type === "number"
              ? clampNumber(field.value, 0, -999999, 999999)
              : getString(field.value).slice(0, 500),
      };
    })
    .filter(Boolean)
    .slice(0, 48);
}

function normalizeRecovery(value: unknown) {
  return value === "manual" ||
    value === "turn_end" ||
    value === "short_rest" ||
    value === "medium_rest" ||
    value === "long_rest"
    ? value
    : "long_rest";
}

function normalizeCharacterLibrary(value: unknown): CampaignCharacterLibrarySettings {
  const library = isRecord(value) ? value : {};
  const categories = normalizeCharacterCategories(library.categories);
  const categoryIds = new Set(categories.map((category) => category.id));

  return {
    categories,
    assignments: normalizeCharacterAssignments(library.assignments, categoryIds),
  };
}

function normalizeCharacterCategories(value: unknown): CampaignCharacterCategory[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const categories: CampaignCharacterCategory[] = [];
  const ids = new Set<string>();

  for (const item of value) {
    if (!isRecord(item)) continue;

    const id = getString(item.id).trim().slice(0, 80);
    const name = getString(item.name, "Categoria").trim().slice(0, 48);
    const parentId = getString(item.parentId).trim().slice(0, 80);

    if (!id || !name || ids.has(id)) continue;

    categories.push({
      id,
      name,
      parentId: parentId || null,
      expanded: getBoolean(item.expanded, true),
    });
    ids.add(id);

    if (categories.length >= 80) {
      break;
    }
  }

  return categories.map((category) => ({
    ...category,
    parentId:
      category.parentId && ids.has(category.parentId)
        ? category.parentId
        : null,
  }));
}

function normalizeCharacterAssignments(
  value: unknown,
  categoryIds: Set<string>,
): CampaignCharacterAssignments {
  if (!isRecord(value)) {
    return {};
  }

  const assignments: CampaignCharacterAssignments = {};

  for (const [characterId, categoryId] of Object.entries(value)) {
    const id = characterId.trim().slice(0, 80);

    if (!id) continue;

    if (categoryId === null) {
      assignments[id] = null;
      continue;
    }

    const normalizedCategoryId = getString(categoryId).trim().slice(0, 80);

    if (normalizedCategoryId && categoryIds.has(normalizedCategoryId)) {
      assignments[id] = normalizedCategoryId;
    }

    if (Object.keys(assignments).length >= 800) {
      break;
    }
  }

  return assignments;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function clampNumber(value: unknown, fallback: number, min: number, max: number) {
  const number = typeof value === "number" && Number.isFinite(value) ? value : fallback;

  return Math.max(min, Math.min(max, Math.floor(number)));
}

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 12);
}
