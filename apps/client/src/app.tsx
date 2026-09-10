import { useEffect } from "react";

import AuthScreen from "@/features/auth/components/AuthScreen";
import CampaignsScreen from "@/features/campaigns/components/CampaignsScreen";
import DetachedCharacterWindowScreen from "@/features/characters/components/DetachedCharacterWindowScreen";
import GameScreen from "@/features/game/GameScreen";

import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useRoomSocketEvents } from "@/multiplayer/hooks/useRoomSocketEvents";
import { useCampaignLiveSession } from "@/multiplayer/hooks/useCampaignLiveSession";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";

export default function App() {
  const detachedCharacterId = getDetachedCharacterId();

  if (detachedCharacterId) {
    return <DetachedCharacterWindowScreen characterId={detachedCharacterId} />;
  }

  return <MainApp />;
}

function MainApp() {
  useRoomSocketEvents();

  const {
    isJoiningCampaign,
    joinCampaignError,
  } = useCampaignLiveSession();

  const lobbyCode = useLobbyStore((state) => state.lobbyCode);

  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const activeCampaign = useCampaignStore((state) => state.activeCampaign);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!initialized) {
    return null;
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!activeCampaign) {
    return <CampaignsScreen />;
  }

  if (!lobbyCode || isJoiningCampaign) {
    return (
      <main
        style={{
          width: "100vw",
          height: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#111318",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <section
          style={{
            width: 420,
            maxWidth: "calc(100vw - 32px)",
            border: "1px solid #2a303d",
            borderRadius: 18,
            background: "#12161d",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <strong>Entrando na mesa...</strong>

          <span style={{ color: "#aaa", fontSize: 14 }}>
            Campanha: {activeCampaign.name}
          </span>

          {joinCampaignError && (
            <span style={{ color: "#ffb4b4", fontSize: 14 }}>
              {joinCampaignError}
            </span>
          )}
        </section>
      </main>
    );
  }

  return <GameScreen />;
}

function getDetachedCharacterId() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("characterWindow");
}
