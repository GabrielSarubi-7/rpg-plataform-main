import type { TokenConditionId } from "@shared/types/tokenStatus";

export const TOKEN_CONDITIONS: {
  id: TokenConditionId;
  label: string;
  icon: string;
}[] = [
  { id: "blinded", label: "Cego", icon: "◉" },
  { id: "charmed", label: "Enfeitiçado", icon: "♥" },
  { id: "deafened", label: "Surdo", icon: "◖" },
  { id: "exhaustion", label: "Exaustão", icon: "☾" },
  { id: "frightened", label: "Amedrontado", icon: "!" },
  { id: "grappled", label: "Agarrado", icon: "⌘" },
  { id: "incapacitated", label: "Incapacitado", icon: "×" },
  { id: "invisible", label: "Invisível", icon: "◌" },
  { id: "paralyzed", label: "Paralisado", icon: "Ⅱ" },
  { id: "petrified", label: "Petrificado", icon: "◆" },
  { id: "poisoned", label: "Envenenado", icon: "☠" },
  { id: "prone", label: "Caído", icon: "↘" },
  { id: "restrained", label: "Contido", icon: "▣" },
  { id: "stunned", label: "Atordoado", icon: "✦" },
  { id: "unconscious", label: "Inconsciente", icon: "◐" },
];

export function getTokenCondition(conditionId: TokenConditionId) {
  return TOKEN_CONDITIONS.find((condition) => condition.id === conditionId);
}

