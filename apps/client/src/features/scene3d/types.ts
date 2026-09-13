import type { Token } from "@shared/types/token";
import type { Character } from "@/features/characters/services/characterApi";
import type { CampaignSheetTemplate } from "@shared/types/campaignSettings";
import type { PixelPoint } from "./utils/coordinates3d";

export interface Scene3DProps {
  isGm?: boolean;
  campaignId?: string;
  authToken?: string | null;
  mapWidth: number;
  mapHeight: number;
  cellSize: number;
  backgroundImage?: string;
  tokens: Record<string, Token>;
  characters: Character[];
  sheetTemplate: CampaignSheetTemplate;
  selectedTokenIds: string[];
  isTargeting: boolean;
  canControlToken: (token: Token) => boolean;
  onSelectToken: (id: string | null) => void;
  onMoveToken: (tokenId: string, point: PixelPoint) => void;
  onTokenContextMenu: (token: Token, point: PixelPoint) => void;
  onCloseMenu: () => void;
  onTargetPoint: (point: PixelPoint) => void;
  onConfirmAction: (point: PixelPoint) => void;
  onCancelAction: () => void;
  onReturnTo2D: () => void;
}
