import MapCanvas from "@/features/map/MapCanvas";
import { useEffect } from "react";

import DicePanel from "@/features/dice/components/DicePanel";
import PageSettingsPanel from "@/features/map/components/PageSettingsPanel";
import FogPanel from "@/features/map/components/FogPanel";
import AnnotationPanel from "@/features/annotations/components/AnnotationPanel";
import CharacterEditorModal from "@/features/characters/components/CharacterEditorModal";
import { useCharacterWindowMessages } from "@/features/characters/hooks/useCharacterWindowMessages";
import ActionHotbar from "@/features/actions/components/ActionHotbar";
import GlobalAudioPlayer from "@/features/audio/components/GlobalAudioPlayer";
import TurnTrackerBar from "@/features/turns/components/TurnTrackerBar";
import RightSidebar from "./components/RightSidebar";
import ToolDock from "@/shared/components/ui/ToolDock";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useUiStore } from "@/features/ui/store/uiStore";
import { useCampaignMapStore } from "@/features/map/store/campaignMapStore";

export default function GameScreen() {
  useCharacterWindowMessages();

  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.token);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);

  const leftDockCollapsed = useUiStore((s) => s.leftDockCollapsed);
  const toggleDock = useUiStore((s) => s.toggleDock);
  const togglePanel = useUiStore((s) => s.togglePanel);
  const panels = useUiStore((s) => s.panels);
  const canManageLoadedMaps = useCampaignMapStore((s) => s.canManage);
  const loadMaps = useCampaignMapStore((s) => s.loadMaps);
  const canManageMaps =
    canManageLoadedMaps || canManageCampaign(activeCampaign, user?.id);

  useEffect(() => {
    if (!authToken || !activeCampaign) return;

    void loadMaps(authToken, activeCampaign.id);
  }, [authToken, activeCampaign, loadMaps]);

  const dockButtons = [
    {
      id: "dice",
      icon: "🎲",
      title: "Dados",
      active: panels.dice.open,
      onClick: () => togglePanel("dice"),
    },
    {
      id: "annotations",
      icon: "✏",
      title: "Anotações",
      active: panels.annotations.open,
      onClick: () => togglePanel("annotations"),
    },
    ...(canManageMaps
      ? [
          {
            id: "fog",
            icon: "🌫",
            title: "Fog of War",
            active: panels.fog.open,
            onClick: () => togglePanel("fog"),
          },
        ]
      : []),
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        background: "#1e1e1e",
      }}
    >
      <MapCanvas />

      <ToolDock
        side="left"
        collapsed={leftDockCollapsed}
        onToggleCollapsed={toggleDock}
        buttons={dockButtons}
      />

      <PageSettingsPanel />
      <FogPanel />
      <DicePanel />
      <AnnotationPanel />
      <TurnTrackerBar />
      <RightSidebar />
      <CharacterEditorModal />
      <ActionHotbar />
      <GlobalAudioPlayer />
    </div>
  );
}
