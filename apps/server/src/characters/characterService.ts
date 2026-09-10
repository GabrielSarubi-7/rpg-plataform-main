import { CharacterType, CharacterVisibility, Prisma } from "../generated/prisma";

import { prisma } from "../db/prisma";
import {
  ensureCampaignAccess,
  isGmRole,
} from "../campaigns/campaignAccess";
import {
  persistAssetReference,
  persistAssetReferences,
} from "../assets/assetService";
import { getCampaignSettings } from "../campaigns/campaignService";
import type { CampaignSheetTemplate } from "@shared/types/campaignSettings";
import { getCampaignSystemDefinition } from "@shared/rules/systemRegistry";

function normalizeJsonValue(value: unknown): Prisma.InputJsonValue {
  if (value === null || value === undefined) {
    return {};
  }

  return value as Prisma.InputJsonValue;
}
function createDefaultSheetData(input: {
  type: CharacterType;
  name: string;
  template?: CampaignSheetTemplate;
}) {
  const template = input.template;
  const system = getCampaignSystemDefinition(template?.preset);
  const dataKey = system.sheet.dataKey;
  const abilities = template?.abilities ?? system.sheetTemplate.abilities;
  const baseTemplate = template ?? system.sheetTemplate;
  const abilityScore = (key: string) =>
    abilities.find((ability) => ability.key === key)?.score ?? 10;
  const hpMax = Math.max(1, baseTemplate.hpMax ?? 1);

  return {
    name: input.name,
    type: input.type,
    system: system.id,
    actions: [],
    customSections: baseTemplate.customSections,
    resources: baseTemplate.resources,
    [dataKey]: {
      identity: {
        className: "",
        subclass: "",
        level: 1,
        race: "",
        background: "",
        alignment: "",
        experience: 0,
        playerName: "",
      },
      inspiration: false,
      proficiencyBonus: baseTemplate.proficiencyBonus,
      armorClass: baseTemplate.armorClass,
      speed: baseTemplate.speed,
      hitPoints: {
        current: hpMax,
        max: hpMax,
        temporary: 0,
      },
      combat: {
        initiative: 0,
        hitDiceTotal: baseTemplate.hitDiceTotal,
        hitDiceCurrent: 1,
        deathSaveSuccesses: 0,
        deathSaveFailures: 0,
      },
      abilities: {
        ...Object.fromEntries(
          abilities.map((ability) => [
            ability.key,
            { score: abilityScore(ability.key) },
          ]),
        ),
      },
      savingThrows: Object.fromEntries(
        abilities.map((ability) => [
          ability.key,
          { proficient: false, bonus: 0 },
        ]),
      ),
      skills: {},
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
      notes: baseTemplate.notes,
    },
  };
}

export async function listCampaignCharacters(input: {
  campaignId: string;
  userId: string;
}) {
  const member = await ensureCampaignAccess(input);

  const isGm = isGmRole(member.role);

  return prisma.character.findMany({
    where: {
      campaignId: input.campaignId,
      archivedAt: null,
      OR: isGm
        ? undefined
        : [
            {
              visibility: CharacterVisibility.public,
            },
            {
              ownerUserId: input.userId,
            },
            {
              permissions: {
                some: {
                  userId: input.userId,
                  canView: true,
                },
              },
            },
          ],
    },
    include: {
      sheet: true,
      permissions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCharacter(input: {
  campaignId: string;
  userId: string;
  name: string;
  type?: CharacterType;
  visibility?: CharacterVisibility;
  portraitImage?: string;
  defaultTokenImage?: string;
}) {
  const member = await ensureCampaignAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const name = input.name.trim();

  if (name.length < 2) {
    throw new Error("Nome da ficha precisa ter pelo menos 2 caracteres.");
  }

  const type = input.type ?? CharacterType.pc;
  const isGm = isGmRole(member.role);

  if ((type === CharacterType.npc || type === CharacterType.monster) && !isGm) {
    throw new Error("Apenas o GM pode criar NPCs e monstros.");
  }

  const visibility =
    input.visibility ??
    (type === CharacterType.pc
      ? CharacterVisibility.private
      : CharacterVisibility.gm_only);

  const ownerUserId = type === CharacterType.pc ? input.userId : null;

  const portraitImage = await persistAssetReference(input.portraitImage?.trim());
  const defaultTokenImage = await persistAssetReference(
    input.defaultTokenImage?.trim(),
  );
  const settings = await getCampaignSettings(input.campaignId);
  const sheetTemplate = settings.sheetTemplate;

  const character = await prisma.character.create({
    data: {
      campaignId: input.campaignId,
      ownerUserId,
      createdByUserId: input.userId,
      name,
      type,
      visibility,
      portraitImage: portraitImage || null,
      defaultTokenImage: defaultTokenImage || null,
      system: sheetTemplate.preset || "dnd5e",
      sheet: {
        create: {
          system: sheetTemplate.preset || "dnd5e",
          schemaVersion: 1,
          dataJson: normalizeJsonValue(
            createDefaultSheetData({
              type,
              name,
              template: sheetTemplate,
            }),
          ),
          lastEditedByUserId: input.userId,
        },
      },
      permissions:
        ownerUserId === input.userId
          ? {
              create: {
                userId: input.userId,
                canView: true,
                canEdit: true,
                canControl: true,
              },
            }
          : undefined,
    },
    include: {
      sheet: true,
      permissions: true,
    },
  });

  return character;
}

export async function updateCharacter(input: {
  campaignId: string;
  characterId: string;
  userId: string;
  name?: string;
  type?: CharacterType;
  visibility?: CharacterVisibility;
  portraitImage?: string | null;
  defaultTokenImage?: string | null;
  sheetData?: unknown;
}) {
  const member = await ensureCampaignAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const character = await prisma.character.findFirst({
    where: {
      id: input.characterId,
      campaignId: input.campaignId,
      archivedAt: null,
    },
    include: {
      permissions: true,
      sheet: true,
    },
  });

  if (!character) {
    throw new Error("Ficha não encontrada.");
  }

  const isGm = isGmRole(member.role);
  const isOwner = character.ownerUserId === input.userId;
  const permission = character.permissions.find(
    (item: { userId: string; canEdit: boolean }) => item.userId === input.userId,
  );

  const canEdit = isGm || isOwner || permission?.canEdit;

  if (!canEdit) {
    throw new Error("Você não pode editar esta ficha.");
  }

  const sheetData =
    input.sheetData === undefined
      ? undefined
      : normalizeJsonValue(
          await persistAssetReferences(input.sheetData),
        );
  const portraitImage =
    input.portraitImage === undefined
      ? undefined
      : await persistAssetReference(input.portraitImage);
  const defaultTokenImage =
    input.defaultTokenImage === undefined
      ? undefined
      : await persistAssetReference(input.defaultTokenImage);

  const updatedCharacter = await prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      name: input.name === undefined ? undefined : input.name.trim(),
      type: input.type,
      visibility: input.visibility,
      portraitImage,
      defaultTokenImage,
      sheet:
        sheetData === undefined
          ? undefined
          : {
              upsert: {
                create: {
                  system: character.system,
                  schemaVersion: 1,
                  dataJson: sheetData,
                  lastEditedByUserId: input.userId,
                },
                update: {
                  dataJson: sheetData,
                  version: {
                    increment: 1,
                  },
                  lastEditedByUserId: input.userId,
                },
              },
            },
    },
    include: {
      sheet: true,
      permissions: true,
    },
  });

  return updatedCharacter;
}
export async function deleteCharacter(input: {
  campaignId: string;
  characterId: string;
  userId: string;
}) {
  const member = await ensureCampaignAccess({
    campaignId: input.campaignId,
    userId: input.userId,
  });

  const character = await prisma.character.findFirst({
    where: {
      id: input.characterId,
      campaignId: input.campaignId,
      archivedAt: null,
    },
    include: {
      permissions: true,
      sheet: true,
    },
  });

  if (!character) {
    throw new Error("Ficha não encontrada.");
  }

  const isGm = isGmRole(member.role);
  const isOwner = character.ownerUserId === input.userId;
  const permission = character.permissions.find(
    (item: { userId: string; canEdit: boolean }) =>
      item.userId === input.userId,
  );

  const canDelete = isGm || isOwner || permission?.canEdit;

  if (!canDelete) {
    throw new Error("Você não pode deletar esta ficha.");
  }

  const deletedCharacter = await prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      archivedAt: new Date(),
    },
    include: {
      sheet: true,
      permissions: true,
    },
  });

  return deletedCharacter;
}
