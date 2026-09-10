import {
  STANDARD_ACTION_RESOURCE_ID,
  STANDARD_BONUS_ACTION_RESOURCE_ID,
} from "@shared/types/action";
import type {
  ActionActivationType,
  ActionRollMode,
  CharacterAction,
  CharacterActionKind,
  CharacterActionResourceCost,
  CharacterActionTargeting,
  TargetingShape,
} from "@shared/types/action";

export type {
  ActionActivationType,
  ActionRollMode,
  CharacterAction,
  CharacterActionKind,
  CharacterActionTargeting,
  CharacterActionResourceCost,
  TargetingShape,
} from "@shared/types/action";

export const ACTION_KIND_OPTIONS: {
  value: CharacterActionKind;
  label: string;
}[] = [
  { value: "spell", label: "Magia" },
  { value: "melee_attack", label: "Ataque corpo a corpo" },
  { value: "ranged_attack", label: "Ataque à distância" },
  { value: "thrown_attack", label: "Ataque arremessado" },
  { value: "feature", label: "Habilidade" },
  { value: "item", label: "Item" },
  { value: "custom", label: "Customizada" },
];

export const ACTIVATION_OPTIONS: {
  value: ActionActivationType;
  label: string;
}[] = [
  { value: "action", label: "Ação" },
  { value: "bonus_action", label: "Ação bônus" },
  { value: "reaction", label: "Reação" },
  { value: "free", label: "Livre" },
  { value: "passive", label: "Passiva" },
  { value: "legendary", label: "Lendária" },
];

export const TARGETING_SHAPE_OPTIONS: {
  value: TargetingShape;
  label: string;
}[] = [
  { value: "self", label: "Em si próprio" },
  { value: "self_emanation", label: "Aura / emanação" },
  { value: "single_target", label: "Um alvo" },
  { value: "melee_reach", label: "Corpo a corpo" },
  { value: "ranged_projectile", label: "Projétil" },
  { value: "point_sphere", label: "Explosão circular" },
  { value: "cone", label: "Cone" },
  { value: "line", label: "Linha" },
  { value: "cube", label: "Cubo / quadrado" },
  { value: "cylinder", label: "Cilindro" },
];

export const ROLL_MODE_OPTIONS: {
  value: ActionRollMode;
  label: string;
}[] = [
  { value: "none", label: "Sem rolagem" },
  { value: "attack_roll", label: "Ataque contra CA" },
  { value: "saving_throw", label: "Salvaguarda" },
  { value: "damage", label: "Dano direto" },
  { value: "healing", label: "Cura" },
];

export const ABILITY_OPTIONS = [
  { value: "strength", label: "FOR" },
  { value: "dexterity", label: "DES" },
  { value: "constitution", label: "CON" },
  { value: "intelligence", label: "INT" },
  { value: "wisdom", label: "SAB" },
  { value: "charisma", label: "CAR" },
] as const;

export const DAMAGE_TYPE_OPTIONS = [
  "ácido",
  "concussão",
  "cortante",
  "perfurante",
  "frio",
  "fogo",
  "elétrico",
  "veneno",
  "psíquico",
  "radiante",
  "necrótico",
  "trovejante",
  "energia",
] as const;

const DEFAULT_VISUAL = {
  color: "#ff5a1f",
  borderColor: "#ffcc66",
  opacity: 0.28,
  lineStyle: "dashed" as const,
  projectileColor: "#ffb347",
  showAffectedTokens: true,
};

export function createDefaultTargetingForShape(
  shape: TargetingShape,
): CharacterActionTargeting {
  switch (shape) {
    case "self":
      return {
        shape,
        origin: "caster",
      };

    case "self_emanation":
      return {
        shape,
        origin: "caster",
        radiusFt: 10,
      };

    case "single_target":
      return {
        shape,
        origin: "caster",
        requiresTarget: true,
        rangeFt: 60,
        showCasterRange: true,
        showPathLine: true,
      };

    case "melee_reach":
      return {
        shape,
        origin: "caster",
        requiresTarget: true,
        reachFt: 5,
      };

    case "ranged_projectile":
      return {
        shape,
        origin: "caster",
        requiresTarget: true,
        normalRangeFt: 60,
        longRangeFt: 120,
        showCasterRange: true,
        showPathLine: true,
      };

    case "point_sphere":
      return {
        shape,
        origin: "caster",
        requiresPoint: true,
        rangeFt: 150,
        radiusFt: 20,
        showCasterRange: true,
        showPathLine: true,
        showImpactArea: true,
      };

    case "cone":
      return {
        shape,
        origin: "caster",
        lengthFt: 15,
        followsMouseDirection: true,
        angleDeg: 53.13,
      };

    case "line":
      return {
        shape,
        origin: "caster",
        lengthFt: 30,
        widthFt: 5,
        followsMouseDirection: true,
      };

    case "cube":
      return {
        shape,
        origin: "point",
        requiresPoint: true,
        rangeFt: 60,
        sizeFt: 15,
        showCasterRange: true,
        showImpactArea: true,
      };

    case "cylinder":
      return {
        shape,
        origin: "point",
        requiresPoint: true,
        rangeFt: 60,
        radiusFt: 10,
        heightFt: 40,
        showCasterRange: true,
        showImpactArea: true,
      };
  }
}

export function createDefaultCharacterAction(
  kind: CharacterActionKind = "spell",
  options: {
    primaryAbility?: string;
    secondaryAbility?: string;
  } = {},
): CharacterAction {
  const primaryAbility = options.primaryAbility ?? "strength";
  const secondaryAbility = options.secondaryAbility ?? "dexterity";
  const baseByKind: Record<
    CharacterActionKind,
    Pick<CharacterAction, "name" | "icon" | "targeting">
  > = {
    spell: {
      name: "Nova magia",
      icon: "✨",
      targeting: createDefaultTargetingForShape("point_sphere"),
    },
    melee_attack: {
      name: "Novo ataque corpo a corpo",
      icon: "🗡️",
      targeting: createDefaultTargetingForShape("melee_reach"),
    },
    ranged_attack: {
      name: "Novo ataque à distância",
      icon: "🏹",
      targeting: createDefaultTargetingForShape("ranged_projectile"),
    },
    thrown_attack: {
      name: "Novo ataque arremessado",
      icon: "🪓",
      targeting: createDefaultTargetingForShape("ranged_projectile"),
    },
    feature: {
      name: "Nova habilidade",
      icon: "🛡️",
      targeting: createDefaultTargetingForShape("self_emanation"),
    },
    item: {
      name: "Novo item",
      icon: "🧪",
      targeting: createDefaultTargetingForShape("single_target"),
    },
    custom: {
      name: "Nova ação",
      icon: "✦",
      targeting: createDefaultTargetingForShape("single_target"),
    },
  };

  const base = baseByKind[kind];
  const defaultRollByKind: Record<CharacterActionKind, CharacterAction["roll"]> =
    {
      spell: {
        mode: "none",
      },
      melee_attack: {
        mode: "attack_roll",
        attackAbility: primaryAbility,
        addProficiencyToAttack: true,
        attackBonus: 0,
        damage: "1d6",
        damageAbility: primaryAbility,
        addAbilityToDamage: true,
        damageBonus: 0,
      },
      ranged_attack: {
        mode: "attack_roll",
        attackAbility: secondaryAbility,
        addProficiencyToAttack: true,
        attackBonus: 0,
        damage: "1d6",
        damageAbility: secondaryAbility,
        addAbilityToDamage: true,
        damageBonus: 0,
      },
      thrown_attack: {
        mode: "attack_roll",
        attackAbility: primaryAbility,
        addProficiencyToAttack: true,
        attackBonus: 0,
        damage: "1d6",
        damageAbility: primaryAbility,
        addAbilityToDamage: true,
        damageBonus: 0,
      },
      feature: {
        mode: "none",
      },
      item: {
        mode: "none",
      },
      custom: {
        mode: "none",
      },
    };

  return {
    id: crypto.randomUUID(),
    name: base.name,
    kind,
    icon: base.icon,
    iconImage: "",
    description: "",
    activation: {
      type: "action",
      cost: 1,
    },
    resourceCosts: [
      {
        resourceId: STANDARD_ACTION_RESOURCE_ID,
        amount: 1,
      },
    ],
    targeting: base.targeting,
    roll: defaultRollByKind[kind],
    visual: {
      ...DEFAULT_VISUAL,
    },
    persistentEffect: {
      enabled: false,
      durationTurns: 0,
    },
    summon: {
      enabled: false,
      characterId: "",
    },
  };
}

export function normalizeCharacterActions(value: unknown): CharacterAction[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => normalizeCharacterAction(item, index))
    .filter((item): item is CharacterAction => item !== null);
}

function normalizeCharacterAction(
  value: unknown,
  index: number,
): CharacterAction | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const action = value as Partial<CharacterAction>;
  const shape =
    typeof action.targeting?.shape === "string" &&
    TARGETING_SHAPE_OPTIONS.some(
      (option) => option.value === action.targeting?.shape,
    )
      ? action.targeting.shape
      : "single_target";

  const fallback = createDefaultCharacterAction(
    isActionKind(action.kind) ? action.kind : "custom",
  );

  return {
    ...fallback,
    ...action,
    id: typeof action.id === "string" ? action.id : `legacy-action-${index}`,
    name: typeof action.name === "string" ? action.name : fallback.name,
    kind: isActionKind(action.kind) ? action.kind : fallback.kind,
    icon: typeof action.icon === "string" ? action.icon : fallback.icon,
    iconImage: typeof action.iconImage === "string" ? action.iconImage : "",
    description:
      typeof action.description === "string" ? action.description : "",
    activation: {
      ...fallback.activation,
      ...(action.activation ?? {}),
    },
    resourceCosts: normalizeActionResourceCosts(
      action.resourceCosts,
      action.activation?.type ?? fallback.activation.type,
      action.activation?.cost ?? fallback.activation.cost,
    ),
    targeting: {
      ...createDefaultTargetingForShape(shape),
      ...(action.targeting ?? {}),
      shape,
    },
    roll: {
      ...fallback.roll,
      ...(action.roll ?? {}),
    },
    visual: {
      ...DEFAULT_VISUAL,
      ...(action.visual ?? {}),
    },
    persistentEffect: normalizePersistentEffect(action.persistentEffect),
    summon: normalizeSummon(action.summon),
  };
}

function isActionKind(value: unknown): value is CharacterActionKind {
  return ACTION_KIND_OPTIONS.some((option) => option.value === value);
}

function normalizeActionResourceCosts(
  value: unknown,
  activationType: CharacterAction["activation"]["type"],
  activationCost: number,
): CharacterActionResourceCost[] {
  if (!Array.isArray(value)) {
    return getDefaultResourceCostsForActivation(activationType, activationCost);
  }

  return value
    .map((cost) => {
      if (!cost || typeof cost !== "object") return null;

      const rawCost = cost as Partial<CharacterActionResourceCost>;
      const resourceId =
        typeof rawCost.resourceId === "string" ? rawCost.resourceId.trim() : "";
      const amount = Math.max(0, Math.floor(Number(rawCost.amount) || 0));

      if (!resourceId || amount <= 0) return null;

      return {
        resourceId,
        amount,
      };
    })
    .filter((cost): cost is CharacterActionResourceCost => cost !== null);
}

function getDefaultResourceCostsForActivation(
  activationType: CharacterAction["activation"]["type"],
  activationCost: number,
): CharacterActionResourceCost[] {
  const amount = Math.max(0, Math.floor(Number(activationCost) || 0));

  if (amount <= 0) {
    return [];
  }

  if (activationType === "action") {
    return [
      {
        resourceId: STANDARD_ACTION_RESOURCE_ID,
        amount,
      },
    ];
  }

  if (activationType === "bonus_action") {
    return [
      {
        resourceId: STANDARD_BONUS_ACTION_RESOURCE_ID,
        amount,
      },
    ];
  }

  return [];
}

function normalizePersistentEffect(
  value: unknown,
): NonNullable<CharacterAction["persistentEffect"]> {
  const effect = value && typeof value === "object" ? value as {
    enabled?: unknown;
    durationTurns?: unknown;
  } : {};

  return {
    enabled: typeof effect.enabled === "boolean" ? effect.enabled : false,
    durationTurns: Math.max(
      0,
      Math.min(100, Math.floor(Number(effect.durationTurns) || 0)),
    ),
  };
}

function normalizeSummon(value: unknown): NonNullable<CharacterAction["summon"]> {
  const summon = value && typeof value === "object" ? value as {
    enabled?: unknown;
    characterId?: unknown;
  } : {};

  return {
    enabled: typeof summon.enabled === "boolean" ? summon.enabled : false,
    characterId:
      typeof summon.characterId === "string"
        ? summon.characterId.trim().slice(0, 80)
        : "",
  };
}
