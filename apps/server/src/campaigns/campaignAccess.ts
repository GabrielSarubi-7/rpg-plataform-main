import { CampaignRole } from "../generated/prisma";

import { prisma } from "../db/prisma";

export async function getCampaignMember(input: {
  campaignId: string;
  userId: string;
}) {
  return prisma.campaignMember.findUnique({
    where: {
      campaignId_userId: {
        campaignId: input.campaignId,
        userId: input.userId,
      },
    },
  });
}

export async function ensureCampaignAccess(input: {
  campaignId: string;
  userId: string;
}) {
  const member = await getCampaignMember(input);

  if (!member) {
    throw new Error("Voce nao tem acesso a esta campanha.");
  }

  return member;
}

export function isGmRole(role: CampaignRole | string | null | undefined) {
  return role === CampaignRole.owner || role === CampaignRole.gm;
}

export async function ensureCampaignGmAccess(
  input: {
    campaignId: string;
    userId: string;
  },
  errorMessage = "Apenas o GM pode gerenciar esta campanha.",
) {
  const member = await ensureCampaignAccess(input);

  if (!isGmRole(member.role)) {
    throw new Error(errorMessage);
  }

  return member;
}
