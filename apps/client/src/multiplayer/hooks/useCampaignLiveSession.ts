import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";

export function useCampaignLiveSession() {
  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);

  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const isLoading = useLobbyStore((state) => state.isLoading);
  const error = useLobbyStore((state) => state.error);
  const joinCampaignLive = useLobbyStore((state) => state.joinCampaignLive);

  useEffect(() => {
    if (!user || !authToken || !activeCampaign) return;
    if (lobbyCode === activeCampaign.id) return;

    joinCampaignLive(activeCampaign.id, user.name, authToken);
  }, [user, authToken, activeCampaign, lobbyCode, joinCampaignLive]);

  return {
    isJoiningCampaign: Boolean(activeCampaign && !lobbyCode && isLoading),
    joinCampaignError: error,
  };
}
