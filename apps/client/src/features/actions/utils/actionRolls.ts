import {
  getAbilityList,
  getAbilityModifier,
  type SheetForm,
} from "@/features/characters/types/characterSheet";
import { buildCriticalDamageExpression } from "@shared/rules/diceRules";
import type { CampaignSheetTemplate } from "@shared/types/campaignSettings";

import type { CharacterAction } from "../types/actionTypes";

export interface PreparedActionRolls {
  attackExpression?: string;
  damageExpression?: string;
  criticalDamageExpression?: string;
  healingExpression?: string;
  saveDc?: number;
}

export function prepareActionRolls(
  action: CharacterAction,
  sheet: SheetForm,
  template?: CampaignSheetTemplate | null,
): PreparedActionRolls {
  const defaultAbility = getAbilityList(template)[0]?.key ?? "strength";
  const attackAbility = action.roll.attackAbility ?? defaultAbility;
  const damageAbility = action.roll.damageAbility ?? attackAbility;
  const attackAbilityScore = sheet.abilities[attackAbility]?.score ?? 10;
  const damageAbilityScore = sheet.abilities[damageAbility]?.score ?? 10;
  const attackModifier =
    getAbilityModifier(attackAbilityScore, template) +
    (action.roll.addProficiencyToAttack ? sheet.proficiencyBonus : 0) +
    (action.roll.attackBonus ?? 0);
  const damageModifier =
    (action.roll.addAbilityToDamage
      ? getAbilityModifier(damageAbilityScore, template)
      : 0) + (action.roll.damageBonus ?? 0);

  const damageExpression = action.roll.damage
    ? appendModifier(action.roll.damage, damageModifier)
    : undefined;
  const criticalDamageExpression = action.roll.criticalDamage?.trim()
    ? appendModifier(action.roll.criticalDamage, damageModifier)
    : damageExpression
      ? buildCriticalDamageExpression(damageExpression)
      : undefined;

  return {
    attackExpression:
      action.roll.mode === "attack_roll"
        ? appendModifier("1d20", attackModifier)
        : undefined,
    damageExpression,
    criticalDamageExpression,
    healingExpression: action.roll.healing?.trim() || undefined,
    saveDc: action.roll.saveDc,
  };
}

export function appendModifier(expression: string, modifier: number) {
  const normalized = expression.trim().replace(/\s+/g, "");
  const match = normalized.match(/^(\d*d\d+)([+-]\d+)?$/i);

  if (!match) {
    return normalized;
  }

  const currentModifier = Number(match[2] ?? 0);
  const totalModifier = currentModifier + modifier;

  if (totalModifier > 0) {
    return `${match[1]}+${totalModifier}`;
  }

  if (totalModifier < 0) {
    return `${match[1]}${totalModifier}`;
  }

  return match[1];
}

export function buildActionAnnouncement(input: {
  actorName: string;
  action: CharacterAction;
  rolls?: PreparedActionRolls;
  affectedNames?: string[];
  template?: CampaignSheetTemplate | null;
}) {
  const { action, rolls, affectedNames = [], template } = input;
  const parts = [`${input.actorName} usou ${action.name}.`];

  if (action.description.trim()) {
    parts.push(action.description.trim());
  }

  if (affectedNames.length > 0) {
    parts.push(`Alvos afetados: ${affectedNames.join(", ")}.`);
  }

  if (action.roll.mode === "attack_roll" && rolls?.attackExpression) {
    parts.push(`Acerto: ${rolls.attackExpression}.`);
  }

  if (action.roll.mode === "saving_throw" && action.roll.saveAbility) {
    parts.push(
      `Salvaguarda: ${formatAbility(action.roll.saveAbility, template)}${
        rolls?.saveDc ? ` CD ${rolls.saveDc}` : ""
      }.`,
    );
  }

  if (rolls?.damageExpression) {
    parts.push(
      `Dano: ${rolls.damageExpression}${
        action.roll.damageType ? ` ${action.roll.damageType}` : ""
      }.`,
    );
  }

  if (rolls?.healingExpression) {
    parts.push(`Cura: ${rolls.healingExpression}.`);
  }

  return parts.join(" ");
}

function formatAbility(
  ability: string,
  template?: CampaignSheetTemplate | null,
) {
  return (
    getAbilityList(template).find((item) => item.key === ability)?.name ??
    ability
  );
}
