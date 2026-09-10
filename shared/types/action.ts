export type CharacterActionKind =
  | "spell"
  | "melee_attack"
  | "ranged_attack"
  | "thrown_attack"
  | "feature"
  | "item"
  | "custom";

export type ActionActivationType =
  | "action"
  | "bonus_action"
  | "reaction"
  | "free"
  | "passive"
  | "legendary";

export const STANDARD_ACTION_RESOURCE_ID = "action";
export const STANDARD_BONUS_ACTION_RESOURCE_ID = "bonus_action";

export type TargetingShape =
  | "self"
  | "self_emanation"
  | "single_target"
  | "melee_reach"
  | "ranged_projectile"
  | "point_sphere"
  | "cone"
  | "line"
  | "cube"
  | "cylinder";

export type ActionRollMode =
  | "none"
  | "attack_roll"
  | "saving_throw"
  | "damage"
  | "healing";

export type AbilityKey = string;

export interface CharacterActionTargeting {
  shape: TargetingShape;
  origin?: "caster" | "point";
  requiresTarget?: boolean;
  requiresPoint?: boolean;
  rangeFt?: number;
  normalRangeFt?: number;
  longRangeFt?: number;
  radiusFt?: number;
  reachFt?: number;
  lengthFt?: number;
  widthFt?: number;
  heightFt?: number;
  sizeFt?: number;
  angleDeg?: number | null;
  showCasterRange?: boolean;
  showPathLine?: boolean;
  showImpactArea?: boolean;
  followsMouseDirection?: boolean;
}

export interface CharacterActionRoll {
  mode: ActionRollMode;
  attackAbility?: AbilityKey;
  addProficiencyToAttack?: boolean;
  attackBonus?: number;
  saveAbility?: AbilityKey;
  saveDc?: number;
  damage?: string;
  criticalDamage?: string;
  damageType?: string;
  damageAbility?: AbilityKey;
  addAbilityToDamage?: boolean;
  damageBonus?: number;
  healing?: string;
  halfOnSuccess?: boolean;
}

export interface CharacterActionVisual {
  color: string;
  borderColor: string;
  opacity: number;
  lineStyle?: "solid" | "dashed";
  projectileColor?: string;
  showAffectedTokens?: boolean;
}

export interface CharacterActionResourceCost {
  resourceId: string;
  amount: number;
}

export interface CharacterActionPersistentEffect {
  enabled: boolean;
  durationTurns: number;
}

export interface CharacterActionSummon {
  enabled: boolean;
  characterId: string;
}

export interface CharacterAction {
  id: string;
  name: string;
  kind: CharacterActionKind;
  icon: string;
  iconImage?: string;
  description: string;
  activation: {
    type: ActionActivationType;
    cost: number;
  };
  resourceCosts?: CharacterActionResourceCost[];
  targeting: CharacterActionTargeting;
  roll: CharacterActionRoll;
  visual: CharacterActionVisual;
  persistentEffect?: CharacterActionPersistentEffect;
  summon?: CharacterActionSummon;
}
