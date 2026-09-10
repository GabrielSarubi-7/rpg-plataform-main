// Dev-only fixture: real MapCanvas/stores with fake session data and no server.
// This HTML is not an entry point of the production build.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MapCanvas from "../src/features/map/MapCanvas";
import { socket } from "../src/core/socket/socket";
import { useMapStore } from "../src/features/map/store/mapStore";
import { useTokenStore } from "../src/features/tokens/store/tokenStore";
import { useUiStore } from "../src/features/ui/store/uiStore";
import { useAuthStore } from "../src/features/auth/store/authStore";
import { useCampaignStore } from "../src/features/campaigns/store/campaignStore";
import { useCampaignMapStore } from "../src/features/map/store/campaignMapStore";
import { useCharacterStore } from "../src/features/characters/store/characterStore";
import { useLobbyStore } from "../src/features/lobby/store/lobbyStore";
import { useActionTargetingStore } from "../src/features/actions/store/actionTargetingStore";
import { normalizeMapLayerConfig } from "../../../shared/rules/mapRules";

socket.disconnect();
const emissions: { event: string; payload: unknown }[] = [];
socket.emit = ((event: string, payload: unknown) => { emissions.push({ event, payload }); return socket; }) as typeof socket.emit;
const background = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><path fill="#8b3030" d="M0 0H400V200H0z"/><path fill="#306b30" d="M400 0H800V200H400z"/><path fill="#30308b" d="M0 200H400V400H0z"/><path fill="#8b8b30" d="M400 200H800V400H400z"/></svg>');
const sprite = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="120"><circle cx="40" cy="25" r="20" fill="#ffe5bc"/><path d="M20 50H60L70 120H10Z" fill="#26bcdc"/></svg>');
const campaign = { id: "fixture-campaign", name: "Fixture", ownerUserId: "gm", members: [{ userId: "player", role: "player" }] };
const character = { id: "hero-sheet", campaignId: campaign.id, name: "Hero", type: "pc", visibility: "public", ownerUserId: "player", createdByUserId: "gm", permissions: [], defaultTokenImage: sprite, sheet: { dataJson: { dnd5e: { sprite25dImage: sprite, hpCurrent: 12, hpMax: 20 } } } };
useAuthStore.setState({ user: { id: "gm", name: "GM" } as never, token: null });
useCampaignStore.setState({ activeCampaign: campaign as never });
useCharacterStore.setState({ characters: [character as never] });
useLobbyStore.setState({ lobbyCode: campaign.id });
useCampaignMapStore.setState({ activeMapId: "map-a", canManage: true });
useMapStore.getState().setMapSettings({ mapId: "map-a", pageName: "Fixture", widthCells: 16, heightCells: 12, cellSize: 40, backgroundImage: background, layerConfig: normalizeMapLayerConfig(undefined) });
useTokenStore.getState().setTokens({
  hero: { id: "hero", characterId: character.id, name: "Hero", x: 160, y: 200, image: sprite, showHealthBar: true },
  large: { id: "large", name: "Large", x: 400, y: 240, widthCells: 2, heightCells: 2, elevation: 10 },
});
useUiStore.getState().setCameraMode("2d");
const action = { id: "fire", name: "Fire", kind: "spell", icon: "", description: "", activation: { type: "action", cost: 1 }, targeting: { shape: "point_sphere", rangeFt: 60, radiusFt: 10, showImpactArea: true, showCasterRange: true, showPathLine: true }, visual: { color: "#ff6600", borderColor: "#ffaa00", opacity: 0.3 }, roll: { mode: "none" } };
Object.assign(window, { fixture: {
  emissions,
  scene: async () => {
    const { _roots } = await import("@react-three/fiber");
    return _roots.get(document.querySelector("canvas")!)?.store.getState();
  },
  snapshot: () => ({ tokens: useTokenStore.getState().tokens, selected: useTokenStore.getState().selectedTokenId, mode: useUiStore.getState().cameraMode, mouse: useActionTargetingStore.getState().mouseWorldPosition }),
  select: (id: string) => useTokenStore.getState().setSelectedToken(id),
  mode: (mode: "2d" | "2.5d" | "3d") => useUiStore.getState().setCameraMode(mode),
  role: (role: "gm" | "player") => useAuthStore.setState({ user: { id: role, name: role } as never }),
  turn: (id: string | null) => useLobbyStore.setState({ turnState: { active: !!id, currentIndex: 0, round: 1, entries: id ? [{ tokenId: id, id, initiative: 10, order: 0, name: id }] : [] } }),
  privateMap: (privateView: boolean) => useMapStore.getState().setMapSettings({ ...useMapStore.getState(), mapId: privateView ? "map-private" : "map-a" }),
  fog: (enabled: boolean) => useMapStore.getState().setMapSettings({ ...useMapStore.getState(), layerConfig: { ...normalizeMapLayerConfig(undefined), fogOfWar: { ...normalizeMapLayerConfig(undefined).fogOfWar, enabled } } }),
  background: (image: string) => useMapStore.getState().setMapSettings({ ...useMapStore.getState(), backgroundImage: image }),
  targeting: () => useActionTargetingStore.getState().startTargeting(action as never, "hero"),
} });
createRoot(document.getElementById("root")!).render(<StrictMode><MapCanvas /><div data-ui-layer="true" style={{ position: "fixed", top: 8, left: 8, zIndex: 100 }}>
  {(["2d", "2.5d", "3d"] as const).map((mode) => <button key={mode} onClick={() => useUiStore.getState().setCameraMode(mode)}>{mode}</button>)}
</div></StrictMode>);
