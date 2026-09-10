import type { Campaign, CampaignRole } from "../services/campaignApi";

export function getCampaignRole(
  campaign: Campaign | null | undefined,
  userId: string | undefined,
): CampaignRole | null {
  if (!campaign || !userId) return null;

  if (campaign.ownerUserId === userId) {
    return "owner";
  }

  return (
    campaign.members?.find((member) => member.userId === userId)?.role ?? null
  );
}

export function canManageCampaign(
  campaign: Campaign | null | undefined,
  userId: string | undefined,
) {
  const role = getCampaignRole(campaign, userId);

  return role === "owner" || role === "gm";
}

export function getCampaignRoleLabel(role: CampaignRole | null | undefined) {
  if (role === "owner" || role === "gm") return "GM";
  if (role === "spectator") return "Espectador";

  return "Player";
}
