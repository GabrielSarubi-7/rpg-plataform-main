import type { Token, TokenStandMode } from "./token";
import type { MapSettings } from "./map";
import type { CharacterAction, TargetingShape } from "./action";
import type { AudioState, AudioTrackInput } from "./audio";
import type { MapAnnotation } from "./annotation";
import type { TokenConditionId } from "./tokenStatus";
import type { TurnEntryInput, TurnState } from "./turn";

export interface Player {
  id: string;
  name: string;
  isGm?: boolean;
}

export interface RoomState {
  code: string;
  players: Player[];
  tokens: Record<string, Token>;
  mapSettings: MapSettings;
  turnState: TurnState;
  audioState: AudioState;
  annotations: Record<string, MapAnnotation>;
  activeEffects: RoomActionEffect[];
}

export interface CreateRoomPayload {
  playerName: string;
}

export interface JoinRoomPayload {
  roomCode: string;
  playerName: string;
}

export interface JoinCampaignLivePayload {
  campaignId: string;
  playerName: string;
  authToken: string;
}

export interface CreateCharacterTokenPayload {
  campaignId: string;
  characterId: string;
  x?: number;
  y?: number;
}

export interface AddTokenPayload {
  roomCode: string;
  token: Token;
  authToken?: string;
}

export interface MoveTokenPayload {
  roomCode: string;
  tokenId: string;
  x: number;
  y: number;
  authToken?: string;
}

export interface DeleteTokenPayload {
  roomCode: string;
  tokenId: string;
  authToken?: string;
}

export type TokenAddedPayload = Token;

export interface TokenUpdatedPayload {
  tokenId: string;
  patch: Partial<Omit<Token, "id">>;
}

export interface TokenDeletedPayload {
  tokenId: string;
}

export interface UpdateTokenImagePayload {
  roomCode: string;
  tokenId: string;
  authToken?: string;
  image: string;
}

export interface UpdateTokenOverlayPayload {
  roomCode: string;
  tokenId: string;
  authToken?: string;
  showHealthBar?: boolean;
  conditions?: TokenConditionId[];
}

export interface UpdateTokenVisualPayload {
  roomCode: string;
  tokenId: string;
  authToken?: string;
  elevation?: number;
  standMode?: TokenStandMode;
  widthCells?: number;
  heightCells?: number;
}

export interface TurnStartPayload {
  roomCode: string;
  authToken?: string;
}

export interface TurnStopPayload {
  roomCode: string;
  authToken?: string;
}

export interface TurnEntryUpsertPayload {
  roomCode: string;
  authToken?: string;
  entry: TurnEntryInput;
}

export interface TurnEntryRemovePayload {
  roomCode: string;
  authToken?: string;
  tokenId: string;
}

export interface TurnEntryMovePayload {
  roomCode: string;
  authToken?: string;
  tokenId: string;
  direction: -1 | 1;
}

export interface TurnNextPayload {
  roomCode: string;
  authToken?: string;
}

export interface AudioTrackAddPayload {
  roomCode: string;
  authToken?: string;
  track: AudioTrackInput;
}

export interface AudioTrackRemovePayload {
  roomCode: string;
  authToken?: string;
  trackId: string;
}

export interface AudioTrackMovePayload {
  roomCode: string;
  authToken?: string;
  trackId: string;
  direction: -1 | 1;
}

export interface AudioQueueReplacePayload {
  roomCode: string;
  authToken?: string;
  tracks: AudioTrackInput[];
}

export interface AudioQueueClearPayload {
  roomCode: string;
  authToken?: string;
}

export interface AudioPlaybackSetPayload {
  roomCode: string;
  authToken?: string;
  currentTrackId?: string | null;
  isPlaying?: boolean;
}

export interface UpdateMapSettingsPayload {
  roomCode: string;
  settings: MapSettings;
  authToken?: string;
}

export interface AnnotationUpsertPayload {
  roomCode: string;
  authToken?: string;
  annotation: MapAnnotation;
}

export interface AnnotationRemovePayload {
  roomCode: string;
  authToken?: string;
  annotationId: string;
}

export interface AnnotationClearPayload {
  roomCode: string;
  authToken?: string;
}

export interface UpdateCharacterLivePayload {
  roomCode: string;
  authToken: string;
  character: {
    id: string;
    campaignId: string;
    [key: string]: unknown;
  };
}

export interface DeleteCharacterLivePayload {
  roomCode: string;
  authToken: string;
  characterId: string;
}

export interface SwitchCampaignMapPayload {
  campaignId: string;
  mapId: string;
  authToken: string;
}

export interface UseActionPayload {
  useId: string;
  roomCode: string;
  authToken?: string;
  action: CharacterAction;
  casterTokenId: string;
  characterId: string;
  targeting: {
    shape: TargetingShape;
    origin: {
      x: number;
      y: number;
    };
    targetPoint?: {
      x: number;
      y: number;
    };
    targetTokenIds?: string[];
    affectedTokenIds?: string[];
    direction?: {
      x: number;
      y: number;
    };
  };
  rolls?: {
    attackExpression?: string;
    damageExpression?: string;
    criticalDamageExpression?: string;
    healingExpression?: string;
    saveDc?: number;
  };
  color?: string;
}

export interface ActionUsedPayload extends UseActionPayload {
  usedAt: number;
  previewDurationMs?: number;
}

export interface RoomActionEffect {
  id: string;
  name: string;
  actionId: string;
  casterTokenId: string;
  characterId: string;
  action: CharacterAction;
  targeting: UseActionPayload["targeting"];
  remainingTurns: number;
  createdAt: number;
  sourceUseId: string;
}
