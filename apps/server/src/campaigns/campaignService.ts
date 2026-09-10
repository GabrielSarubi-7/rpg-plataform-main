import { CampaignRole, Prisma } from "../generated/prisma";
import { prisma } from "../db/prisma";
import { mapDbMapToPlayerView } from "../maps/mapService";
import { DEFAULT_MAP_SETTINGS } from "@shared/rules/mapRules";
import {
  DEFAULT_CAMPAIGN_SETTINGS,
  createDefaultCampaignSettings,
  normalizeCampaignSettings,
} from "@shared/rules/campaignSettingsRules";
import { normalizeCampaignSystemId } from "@shared/rules/systemRegistry";
import type { CampaignSettings } from "@shared/types/campaignSettings";

const DEFAULT_MAP_WIDTH = DEFAULT_MAP_SETTINGS.widthCells;
const DEFAULT_MAP_HEIGHT = DEFAULT_MAP_SETTINGS.heightCells;
const DEFAULT_CELL_SIZE = DEFAULT_MAP_SETTINGS.cellSize;
let ensureCampaignSettingsColumnPromise: Promise<unknown> | null = null;

function createInviteCode() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function ensureCampaignSettingsColumn() {
  ensureCampaignSettingsColumnPromise ??= prisma.$executeRaw`
    ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS settings_json JSONB
  `;

  return ensureCampaignSettingsColumnPromise;
}

async function createUniqueInviteCode() {
  let code = "";

  do {
    code = createInviteCode();
  } while (
    await prisma.campaignInvite.findUnique({
      where: {
        code,
      },
    })
  );

  return code;
}

async function getCampaignInclude() {
  return {
    owner: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    members: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    },
    invites: {
      where: {
        revokedAt: null,
      },
    },
    sessions: {
      where: {
        status: "active" as const,
      },
      take: 1,
    },
    maps: {
      where: {
        isArchived: false,
        deletedAt: null,
      },
      orderBy: {
        sortOrder: "asc" as const,
      },
    },
  };
}

function filterCampaignMapsForUser<
  T extends {
    ownerUserId: string;
    members: {
      userId: string;
      role: CampaignRole;
    }[];
    maps: {
      id: string;
      name: string;
      width: number;
      height: number;
      cellSize: number;
      backgroundImage: string | null;
      layerConfigJson: unknown;
    }[];
  },
>(campaign: T, userId: string): T {
  const role =
    campaign.ownerUserId === userId
      ? CampaignRole.owner
      : campaign.members.find((member) => member.userId === userId)?.role;
  const isGm = role === CampaignRole.owner || role === CampaignRole.gm;

  if (isGm) {
    return campaign;
  }

  return {
    ...campaign,
    maps: campaign.maps.map(mapDbMapToPlayerView),
  };
}

export async function createCampaign(input: {
  userId: string;
  name: string;
  description?: string;
  systemPreset?: string;
}) {
  const name = input.name.trim();

  if (name.length < 2) {
    throw new Error("Nome da campanha precisa ter pelo menos 2 caracteres.");
  }

  const inviteCode = await createUniqueInviteCode();

  const settings = createDefaultCampaignSettings(input.systemPreset);

  await ensureCampaignSettingsColumn();

  const campaign = await prisma.$transaction(async (tx) => {
    const createdCampaign = await tx.campaign.create({
      data: {
        name,
        description: input.description?.trim() || null,
        ownerUserId: input.userId,
        members: {
          create: {
            userId: input.userId,
            role: CampaignRole.owner,
          },
        },
        invites: {
          create: {
            code: inviteCode,
            roleOnJoin: CampaignRole.player,
            createdByUserId: input.userId,
          },
        },
      },
    });

    const defaultMap = await tx.map.create({
      data: {
        campaignId: createdCampaign.id,
        name: "Mapa inicial",
        width: DEFAULT_MAP_WIDTH,
        height: DEFAULT_MAP_HEIGHT,
        cellSize: DEFAULT_CELL_SIZE,
        backgroundImage: null,
        sortOrder: 0,
      },
    });

    await tx.campaignSession.create({
      data: {
        campaignId: createdCampaign.id,
        activeMapId: defaultMap.id,
        createdByUserId: input.userId,
      },
    });

    await tx.$executeRaw`
      UPDATE campaigns
      SET settings_json = CAST(${JSON.stringify(settings)} AS JSONB)
      WHERE id = ${createdCampaign.id}
    `;

    return createdCampaign;
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: campaign.id,
  });
}

export async function createCampaignInvite(input: {
  userId: string;
  campaignId: string;
  roleOnJoin?: CampaignRole;
}) {
  const member = await prisma.campaignMember.findUnique({
    where: {
      campaignId_userId: {
        campaignId: input.campaignId,
        userId: input.userId,
      },
    },
  });

  if (!member) {
    throw new Error("Campanha não encontrada ou sem permissão.");
  }

  if (member.role !== CampaignRole.owner && member.role !== CampaignRole.gm) {
    throw new Error("Apenas GM ou dono da campanha pode criar convites.");
  }

  const code = await createUniqueInviteCode();

  await prisma.campaignInvite.create({
    data: {
      campaignId: input.campaignId,
      code,
      roleOnJoin: input.roleOnJoin ?? CampaignRole.player,
      createdByUserId: input.userId,
    },
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: input.campaignId,
  });
}

export async function listUserCampaigns(userId: string) {
  const campaigns = await prisma.campaign.findMany({
    where: {
      archivedAt: null,
      members: {
        some: {
          userId,
        },
      },
    },
    include: await getCampaignInclude(),
    orderBy: {
      updatedAt: "desc",
    },
  });

  return Promise.all(
    campaigns.map(async (campaign) =>
      attachCampaignSettings(filterCampaignMapsForUser(campaign, userId)),
    ),
  );
}

export async function getCampaignForUser(input: {
  userId: string;
  campaignId: string;
}) {
  const campaign = await prisma.campaign.findFirst({
    where: {
      id: input.campaignId,
      archivedAt: null,
      members: {
        some: {
          userId: input.userId,
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      invites: {
        where: {
          revokedAt: null,
        },
      },
      sessions: {
        where: {
          status: "active",
        },
        take: 1,
      },
      maps: {
        where: {
          isArchived: false,
          deletedAt: null,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!campaign) {
    throw new Error("Campanha não encontrada ou sem permissão.");
  }

  return attachCampaignSettings(filterCampaignMapsForUser(campaign, input.userId));
}

export async function getCampaignSettings(campaignId: string) {
  await ensureCampaignSettingsColumn();

  const rows = await prisma.$queryRaw<{ settings_json: unknown }[]>`
    SELECT settings_json
    FROM campaigns
    WHERE id = ${campaignId}
    LIMIT 1
  `;

  return normalizeCampaignSettings(rows[0]?.settings_json ?? null);
}

export async function updateCampaignSettings(input: {
  userId: string;
  campaignId: string;
  settings: unknown;
}) {
  const member = await prisma.campaignMember.findUnique({
    where: {
      campaignId_userId: {
        campaignId: input.campaignId,
        userId: input.userId,
      },
    },
  });

  if (!member) {
    throw new Error("Campanha nao encontrada ou sem permissao.");
  }

  if (member.role !== CampaignRole.owner && member.role !== CampaignRole.gm) {
    throw new Error("Apenas o GM pode alterar o modelo de ficha.");
  }

  const settings = normalizeCampaignSettings(input.settings);

  await ensureCampaignSettingsColumn();

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`
      UPDATE campaigns
      SET settings_json = CAST(${JSON.stringify(settings)} AS JSONB)
      WHERE id = ${input.campaignId}
    `;

    await migrateCampaignCharactersToSystem(
      tx,
      input.campaignId,
      settings.sheetTemplate.preset,
    );
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: input.campaignId,
  });
}

export async function updateCampaignSystemPreset(input: {
  userId: string;
  campaignId: string;
  systemPreset: unknown;
}) {
  await ensureCanManageCampaign({
    userId: input.userId,
    campaignId: input.campaignId,
  });

  const systemId = normalizeCampaignSystemId(input.systemPreset);
  const settings = createDefaultCampaignSettings(systemId);

  await ensureCampaignSettingsColumn();

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`
      UPDATE campaigns
      SET settings_json = CAST(${JSON.stringify(settings)} AS JSONB)
      WHERE id = ${input.campaignId}
    `;

    await migrateCampaignCharactersToSystem(tx, input.campaignId, systemId);
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: input.campaignId,
  });
}

export async function updateCampaignMemberRole(input: {
  userId: string;
  campaignId: string;
  memberId: string;
  role: unknown;
}) {
  const campaign = await ensureCanManageCampaign({
    userId: input.userId,
    campaignId: input.campaignId,
  });
  const targetMember = campaign.members.find(
    (member) => member.id === input.memberId,
  );

  if (!targetMember) {
    throw new Error("Player nao encontrado nesta campanha.");
  }

  if (
    targetMember.role === CampaignRole.owner ||
    targetMember.userId === campaign.ownerUserId
  ) {
    throw new Error("O dono da campanha nao pode ter o cargo alterado.");
  }

  const role = normalizeManageableCampaignRole(input.role);

  await prisma.campaignMember.update({
    where: {
      id: input.memberId,
    },
    data: {
      role,
    },
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: input.campaignId,
  });
}

export async function removeCampaignMember(input: {
  userId: string;
  campaignId: string;
  memberId: string;
}) {
  const campaign = await ensureCanManageCampaign({
    userId: input.userId,
    campaignId: input.campaignId,
  });
  const targetMember = campaign.members.find(
    (member) => member.id === input.memberId,
  );

  if (!targetMember) {
    throw new Error("Player nao encontrado nesta campanha.");
  }

  if (
    targetMember.role === CampaignRole.owner ||
    targetMember.userId === campaign.ownerUserId
  ) {
    throw new Error("O dono da campanha nao pode ser removido.");
  }

  if (targetMember.userId === input.userId) {
    throw new Error("Voce nao pode remover a si mesmo por este menu.");
  }

  await prisma.campaignMember.delete({
    where: {
      id: input.memberId,
    },
  });

  return getCampaignForUser({
    userId: input.userId,
    campaignId: input.campaignId,
  });
}

export async function archiveCampaign(input: {
  userId: string;
  campaignId: string;
}) {
  const campaign = await prisma.campaign.findFirst({
    where: {
      id: input.campaignId,
      archivedAt: null,
      members: {
        some: {
          userId: input.userId,
        },
      },
    },
    select: {
      ownerUserId: true,
    },
  });

  if (!campaign) {
    throw new Error("Campanha nao encontrada ou sem permissao.");
  }

  if (campaign.ownerUserId !== input.userId) {
    throw new Error("Apenas o dono pode excluir a campanha.");
  }

  await prisma.campaign.update({
    where: {
      id: input.campaignId,
    },
    data: {
      archivedAt: new Date(),
    },
  });

  return {
    id: input.campaignId,
  };
}

async function attachCampaignSettings<T extends { id: string }>(
  campaign: T,
): Promise<T & { settingsJson: CampaignSettings }> {
  try {
    return {
      ...campaign,
      settingsJson: await getCampaignSettings(campaign.id),
    };
  } catch {
    return {
      ...campaign,
      settingsJson: DEFAULT_CAMPAIGN_SETTINGS,
    };
  }
}

export async function joinCampaignByInvite(input: {
  userId: string;
  code: string;
}) {
  const code = input.code.trim().toUpperCase();

  if (!code) {
    throw new Error("Código inválido.");
  }

  const invite = await prisma.campaignInvite.findUnique({
    where: {
      code,
    },
    include: {
      campaign: true,
    },
  });

  if (!invite || invite.revokedAt) {
    throw new Error("Convite inválido.");
  }

  if (invite.expiresAt && invite.expiresAt.getTime() < Date.now()) {
    throw new Error("Convite expirado.");
  }

  if (invite.maxUses !== null && invite.usesCount >= invite.maxUses) {
    throw new Error("Convite esgotado.");
  }

  const existingMember = await prisma.campaignMember.findUnique({
    where: {
      campaignId_userId: {
        campaignId: invite.campaignId,
        userId: input.userId,
      },
    },
  });

  if (!existingMember) {
    await prisma.campaignMember.create({
      data: {
        campaignId: invite.campaignId,
        userId: input.userId,
        role: invite.roleOnJoin,
      },
    });

    await prisma.campaignInvite.update({
      where: {
        id: invite.id,
      },
      data: {
        usesCount: {
          increment: 1,
        },
      },
    });
  }

  return getCampaignForUser({
    userId: input.userId,
    campaignId: invite.campaignId,
  });
}

async function ensureCanManageCampaign(input: {
  userId: string;
  campaignId: string;
}) {
  const campaign = await prisma.campaign.findFirst({
    where: {
      id: input.campaignId,
      archivedAt: null,
      members: {
        some: {
          userId: input.userId,
        },
      },
    },
    select: {
      ownerUserId: true,
      members: {
        select: {
          id: true,
          userId: true,
          role: true,
        },
      },
    },
  });

  if (!campaign) {
    throw new Error("Campanha nao encontrada ou sem permissao.");
  }

  const requesterRole =
    campaign.ownerUserId === input.userId
      ? CampaignRole.owner
      : campaign.members.find((member) => member.userId === input.userId)?.role;

  if (
    requesterRole !== CampaignRole.owner &&
    requesterRole !== CampaignRole.gm
  ) {
    throw new Error("Apenas GM pode gerenciar esta campanha.");
  }

  return campaign;
}

function normalizeManageableCampaignRole(value: unknown) {
  if (value === CampaignRole.gm) return CampaignRole.gm;
  if (value === CampaignRole.spectator) return CampaignRole.spectator;

  return CampaignRole.player;
}

async function migrateCampaignCharactersToSystem(
  tx: Prisma.TransactionClient,
  campaignId: string,
  systemId: string,
) {
  await tx.$executeRaw`
    UPDATE characters
    SET system = ${systemId}
    WHERE campaign_id = ${campaignId}
  `;

  await tx.$executeRaw`
    UPDATE character_sheets
    SET system = ${systemId}
    WHERE character_id IN (
      SELECT id
      FROM characters
      WHERE campaign_id = ${campaignId}
    )
  `;
}
