import { useEffect } from "react";

import { socket } from "@/core/socket/socket";

import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useTokenStore } from "@/features/tokens/store/tokenStore";
import { useChatStore } from "@/features/chat/store/chatStore";
import { useMapStore } from "@/features/map/store/mapStore";
import { useCampaignMapStore } from "@/features/map/store/campaignMapStore";
import { useActionTargetingStore } from "@/features/actions/store/actionTargetingStore";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import { useAnnotationStore } from "@/features/annotations/store/annotationStore";

import type {
  ActionUsedPayload,
  RoomState,
  TokenAddedPayload,
  TokenDeletedPayload,
  TokenUpdatedPayload,
} from "@shared/types/multiplayer";
import type { ChatMessage } from "@shared/types/chat";
import type { Character } from "@/features/characters/services/characterApi";

export function useRoomSocketEvents() {
  const setRoomState = useLobbyStore((s) => s.setRoomState);

  const setTokens = useTokenStore((s) => s.setTokens);
  const addTokenLocal = useTokenStore((s) => s.addToken);
  const moveTokenLocal = useTokenStore((s) => s.moveToken);
  const removeTokenLocal = useTokenStore((s) => s.removeToken);
  const updateTokenLocal = useTokenStore((s) => s.updateToken);

  const setMessages = useChatStore((s) => s.setMessages);
  const addMessage = useChatStore((s) => s.addMessage);

  const setMapSettings = useMapStore((s) => s.setMapSettings);
  const setActiveMapId = useCampaignMapStore((s) => s.setActiveMapId);
  const addResolvedAction = useActionTargetingStore(
    (s) => s.addResolvedAction,
  );
  const removeResolvedAction = useActionTargetingStore(
    (s) => s.removeResolvedAction,
  );
  const upsertCharacterLocal = useCharacterStore((s) => s.upsertCharacterLocal);
  const removeCharacterLocal = useCharacterStore((s) => s.removeCharacterLocal);
  const setAnnotations = useAnnotationStore((s) => s.setAnnotations);

  useEffect(() => {
    const handleRoomState = (room: RoomState) => {
      setRoomState(room);
      setTokens(room.tokens);
      setMapSettings(room.mapSettings);
      setActiveMapId(room.mapSettings.mapId ?? null);
      setAnnotations(room.annotations ?? {});
    };

    const handleTokenMoved = (data: {
      tokenId: string;
      x: number;
      y: number;
    }) => {
      moveTokenLocal(data.tokenId, data.x, data.y);
    };

    const handleTokenAdded = (token: TokenAddedPayload) => {
      addTokenLocal(token);
    };

    const handleTokenUpdated = (data: TokenUpdatedPayload) => {
      updateTokenLocal(data.tokenId, data.patch);
    };

    const handleTokenDeleted = (data: TokenDeletedPayload) => {
      if (data.tokenId) {
        removeTokenLocal(data.tokenId);
      }
    };

    const handleChatHistory = (messages: ChatMessage[]) => {
      setMessages(messages);
    };

    const handleChatMessage = (message: ChatMessage) => {
      addMessage(message);
    };

    const handleActionUsed = (payload: ActionUsedPayload) => {
      addResolvedAction(payload);

      window.setTimeout(() => {
        removeResolvedAction(payload.useId);
      }, payload.previewDurationMs ?? 3200);
    };

    const handleCharacterUpdated = (character: Character) => {
      upsertCharacterLocal(character);
    };

    const handleCharacterDeleted = (payload: { characterId?: string }) => {
      if (payload.characterId) {
        removeCharacterLocal(payload.characterId);
      }
    };

    socket.on("room:state", handleRoomState);
    socket.on("token:added", handleTokenAdded);
    socket.on("token:moved", handleTokenMoved);
    socket.on("token:updated", handleTokenUpdated);
    socket.on("token:deleted", handleTokenDeleted);
    socket.on("chat:history", handleChatHistory);
    socket.on("chat:message", handleChatMessage);
    socket.on("action:used", handleActionUsed);
    socket.on("character:updated", handleCharacterUpdated);
    socket.on("character:deleted", handleCharacterDeleted);

    return () => {
      socket.off("room:state", handleRoomState);
      socket.off("token:added", handleTokenAdded);
      socket.off("token:moved", handleTokenMoved);
      socket.off("token:updated", handleTokenUpdated);
      socket.off("token:deleted", handleTokenDeleted);
      socket.off("chat:history", handleChatHistory);
      socket.off("chat:message", handleChatMessage);
      socket.off("action:used", handleActionUsed);
      socket.off("character:updated", handleCharacterUpdated);
      socket.off("character:deleted", handleCharacterDeleted);
    };
  }, [
    setRoomState,
    setTokens,
    addTokenLocal,
    moveTokenLocal,
    removeTokenLocal,
    updateTokenLocal,
    setMessages,
    addMessage,
    setMapSettings,
    setActiveMapId,
    addResolvedAction,
    removeResolvedAction,
    upsertCharacterLocal,
    removeCharacterLocal,
    setAnnotations,
  ]);
}
