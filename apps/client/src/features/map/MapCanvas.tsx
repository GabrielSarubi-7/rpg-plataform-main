import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Grid from "./components/Grid";
import MapBackground from "./components/MapBackground";
import FogLayer from "./components/FogLayer";
import MapTerrainLayer from "./components/MapTerrainLayer";
import TokenDragPreview from "./components/TokenDragPreview";
import MapLocatorIndicator from "./components/MapLocatorIndicator";
import MapImageLayer from "./components/MapImageLayer";

import AnnotationLayer from "@/features/annotations/components/AnnotationLayer";
import TokenLayer from "../tokens/components/TokenLayer";
import TokenContextMenu from "@/features/tokens/components/TokenContextMenu";
import ActionPreviewLayer from "@/features/actions/components/ActionPreviewLayer";
import Scene3DGate from "@/features/scene3d/components/Scene3DGate";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import { useTokenStore } from "../tokens/store/tokenStore";
import { useMapStore } from "./store/mapStore";
import { useCampaignMapStore } from "./store/campaignMapStore";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useActionTargetingStore } from "@/features/actions/store/actionTargetingStore";
import { useUiStore } from "@/features/ui/store/uiStore";
import {
  getImageFileSize,
  uploadImageAsset,
} from "@/features/assets/assetApi";
import {
  getCameraPerspective,
  screenToWorld,
  worldToScreen,
} from "./utils/coords";

import type { Character } from "@/features/characters/services/characterApi";
import type { Campaign } from "@/features/campaigns/services/campaignApi";
import type { Token } from "../tokens/store/tokenStore";
import type { MapImage, MapLayerConfig } from "@shared/types/map";

import { useCamera } from "./hooks/useCamera";
import { useMapInput } from "./hooks/useMapInput";
import { useTokenDrag } from "./hooks/useTokenDrag";

import {
  clampTokenToMap,
  getTokenDimensions,
  getTokenPositionFromMouse,
  normalizeTokenSizeCells,
} from "@shared/rules/tokenRules";
import {
  normalizeMapLayerConfig,
  normalizeMapSettings,
} from "@shared/rules/mapRules";
import { normalizeCampaignSettings } from "@shared/rules/campaignSettingsRules";
import type { CampaignSheetTemplate } from "@shared/types/campaignSettings";

import { isEventFromUiLayer } from "@/shared/utils/domEvents";
import {
  getTokenCenter,
  resolveActionTargeting,
} from "@shared/rules/targetingRules";

import {
  emitTokenAdd,
  emitTokenDelete,
  emitTokenMove,
  emitTokenOverlayUpdate,
  emitTokenVisualUpdate,
} from "@/features/tokens/services/tokenSocketService";
import { emitActionUse } from "@/features/actions/services/actionSocketService";
import { prepareActionRolls } from "@/features/actions/utils/actionRolls";
import { emitCharacterUpdated } from "@/features/characters/services/characterSocketService";
import { emitMapSettingsUpdate } from "./services/mapSocketService";
import {
  mergeSheetFormIntoDataJson,
  normalizeSheetForm,
  spendActionResources,
} from "@/features/characters/types/characterSheet";

interface CharacterDragData {
  id: string;
  name: string;
  image?: string;
}

interface TokenMenuState {
  x: number;
  y: number;
  tokenId: string;
}

interface SelectionBoxState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export default function MapCanvas() {
  const user = useAuthStore((s) => s.user);
  const authToken = useAuthStore((s) => s.token);
  const activeCampaign = useCampaignStore((s) => s.activeCampaign);
  const sheetTemplate = useMemo(
    () => normalizeCampaignSettings(activeCampaign?.settingsJson).sheetTemplate,
    [activeCampaign?.settingsJson],
  );

  const characters = useCharacterStore((s) => s.characters);
  const loadCharacters = useCharacterStore((s) => s.loadCharacters);
  const updateCharacter = useCharacterStore((s) => s.updateCharacter);
  const openEditCharacterEditor = useCharacterStore(
    (s) => s.openEditCharacterEditor,
  );

  const tokens = useTokenStore((s) => s.tokens);
  const selectedTokenId = useTokenStore((s) => s.selectedTokenId);
  const selectedTokenIds = useTokenStore((s) => s.selectedTokenIds);
  const setSelectedToken = useTokenStore((s) => s.setSelectedToken);
  const setSelectedTokens = useTokenStore((s) => s.setSelectedTokens);
  const addToken = useTokenStore((s) => s.addToken);
  const moveToken = useTokenStore((s) => s.moveToken);
  const removeToken = useTokenStore((s) => s.removeToken);
  const setTokenHealthBarVisible = useTokenStore(
    (s) => s.setTokenHealthBarVisible,
  );
  const toggleTokenCondition = useTokenStore((s) => s.toggleTokenCondition);
  const clearTokenConditions = useTokenStore((s) => s.clearTokenConditions);
  const setTokenElevation = useTokenStore((s) => s.setTokenElevation);
  const setTokenStandMode = useTokenStore((s) => s.setTokenStandMode);
  const setTokenSize = useTokenStore((s) => s.setTokenSize);

  const activeAction = useActionTargetingStore((s) => s.activeAction);
  const casterTokenId = useActionTargetingStore((s) => s.casterTokenId);
  const isTargetingAction = useActionTargetingStore((s) => s.isTargeting);
  const updateActionMousePosition = useActionTargetingStore(
    (s) => s.updateMousePosition,
  );
  const cancelActionTargeting = useActionTargetingStore(
    (s) => s.cancelTargeting,
  );

  const width = useMapStore((s) => s.width);
  const height = useMapStore((s) => s.height);
  const cellSize = useMapStore((s) => s.cellSize);
  const backgroundImage = useMapStore((s) => s.backgroundImage);
  const layerConfig = useMapStore((s) => s.layerConfig);
  const currentMapId = useMapStore((s) => s.mapId);

  const lobbyCode = useLobbyStore((s) => s.lobbyCode);
  const turnState = useLobbyStore((s) => s.turnState);
  const activeMapId = useCampaignMapStore((state) => state.activeMapId);
  const canManageMaps = useCampaignMapStore((state) => state.canManage);
  const updateMap = useCampaignMapStore((state) => state.updateMap);
  const cameraMode = useUiStore((state) => state.cameraMode);
  const playerColor = useUiStore((state) => state.playerColor);
  const leftDockCollapsed = useUiStore((state) => state.leftDockCollapsed);
  const rightSidebarCollapsed = useUiStore(
    (state) => state.rightSidebarCollapsed,
  );
  const currentMapIsLive =
    !canManageMaps || !currentMapId || !activeMapId || currentMapId === activeMapId;
  const userRole = getUserRole(activeCampaign, user?.id);
  const isGm = userRole === "owner" || userRole === "gm";
  const canManageMapImages = isGm && Boolean(authToken);
  const currentTurnTokenId = turnState.active
    ? turnState.entries[turnState.currentIndex]?.tokenId
    : null;

  const { camera, zoomAt, move, rotateBy, setMode, centerOnMap } = useCamera(
    width,
    height,
    cameraMode === "3d" ? "2d" : cameraMode,
  );

  const [tokenMenu, setTokenMenu] = useState<TokenMenuState | null>(null);
  const [selectionBox, setSelectionBox] = useState<SelectionBoxState | null>(
    null,
  );
  const selectionBoxRef = useRef<SelectionBoxState | null>(null);
  const centeredMapIdRef = useRef<string | undefined>(undefined);
  const normalizedLayerConfig = useMemo(
    () => normalizeMapLayerConfig(layerConfig),
    [layerConfig],
  );

  const input = useMapInput(camera, move, () => {});
  const tokenDrag = useTokenDrag(camera, moveToken, width, height, cellSize);
  const tokenDragRef = useRef(tokenDrag);

  useEffect(() => {
    tokenDragRef.current = tokenDrag;
  }, [tokenDrag]);

  useEffect(() => {
    const addMovementPoint = (event: MouseEvent | PointerEvent) => {
      if (event.button !== 2 || isNativeEventFromUiLayer(event)) return;
      if (!tokenDragRef.current.preview) return;

      event.preventDefault();
      event.stopPropagation();
      tokenDragRef.current.addWaypoint();
    };

    const blockContextMenu = (event: MouseEvent) => {
      if (isNativeEventFromUiLayer(event)) return;
      if (!tokenDragRef.current.preview) return;

      event.preventDefault();
      event.stopPropagation();
      tokenDragRef.current.addWaypoint();
    };

    window.addEventListener("pointerdown", addMovementPoint, true);
    window.addEventListener("mousedown", addMovementPoint, true);
    window.addEventListener("contextmenu", blockContextMenu, true);

    return () => {
      window.removeEventListener("pointerdown", addMovementPoint, true);
      window.removeEventListener("mousedown", addMovementPoint, true);
      window.removeEventListener("contextmenu", blockContextMenu, true);
    };
  }, []);

  useEffect(() => {
    if (!authToken || !activeCampaign) return;

    loadCharacters(authToken, activeCampaign.id);
  }, [authToken, activeCampaign, loadCharacters]);

  useEffect(() => {
    if (cameraMode === "3d") return;
    setMode(cameraMode);
  }, [cameraMode, setMode]);

  useEffect(() => {
    if (!currentMapId || centeredMapIdRef.current === currentMapId) return;

    centeredMapIdRef.current = currentMapId;
    centerOnMap();
  }, [centerOnMap, currentMapId]);

  const getWorldPositionFromScreen = (clientX: number, clientY: number) =>
    screenToWorld(clientX, clientY, camera);

  const persistMapImages = useCallback(
    async (images: MapImage[]) => {
      if (!canManageMapImages || !authToken) return;

      const state = useMapStore.getState();
      const nextLayer: MapLayerConfig = {
        ...normalizeMapLayerConfig(state.layerConfig),
        images,
      };
      const settings = buildMapSettingsFromStore(nextLayer);

      state.setMapSettings(settings);

      const shouldSavePrivately =
        Boolean(settings.mapId) &&
        Boolean(activeMapId) &&
        settings.mapId !== activeMapId;

      if (
        settings.mapId &&
        activeCampaign &&
        (shouldSavePrivately || !lobbyCode)
      ) {
        await updateMap(authToken, activeCampaign.id, settings.mapId, {
          layerConfig: settings.layerConfig ?? null,
        });
        return;
      }

      if (lobbyCode) {
        emitMapSettingsUpdate(lobbyCode, settings, authToken);
      }
    },
    [
      activeCampaign,
      activeMapId,
      authToken,
      canManageMapImages,
      lobbyCode,
      updateMap,
    ],
  );

  const moveMapImage = useCallback(
    (movedImage: MapImage) => {
      const currentLayer = normalizeMapLayerConfig(
        useMapStore.getState().layerConfig,
      );
      const nextImages = currentLayer.images.map((image) =>
        image.id === movedImage.id ? movedImage : image,
      );

      void persistMapImages(nextImages);
    },
    [persistMapImages],
  );

  const deleteMapImage = useCallback(
    (imageId: string) => {
      const currentLayer = normalizeMapLayerConfig(
        useMapStore.getState().layerConfig,
      );

      void persistMapImages(
        currentLayer.images.filter((image) => image.id !== imageId),
      );
    },
    [persistMapImages],
  );

  const addMapImageFromFile = useCallback(
    async (file: File, clientX: number, clientY: number) => {
      if (!canManageMapImages || !authToken) return;

      try {
        const imageSize = await getImageFileSize(file);
        const imageUrl = await uploadImageAsset(authToken, file, {
          maxDimension: 1920,
          quality: 0.82,
        });
        const displaySize = fitMapImageSize(imageSize, cellSize);
        const world = screenToWorld(clientX, clientY, camera);
        const mapImage: MapImage = {
          id: crypto.randomUUID(),
          image: imageUrl,
          name: file.name,
          x: world.x - displaySize.width / 2,
          y: world.y - displaySize.height / 2,
          width: displaySize.width,
          height: displaySize.height,
        };
        const currentLayer = normalizeMapLayerConfig(
          useMapStore.getState().layerConfig,
        );

        await persistMapImages([...currentLayer.images, mapImage]);
      } catch (error) {
        console.error("Erro ao adicionar imagem ao mapa:", error);
      }
    },
    [authToken, camera, canManageMapImages, cellSize, persistMapImages],
  );

  const canControlToken = useCallback(
    (
      token: Token,
      options: {
        respectTurn?: boolean;
      } = {},
    ) => {
      if (isGm) return true;

      if (
        options.respectTurn !== false &&
        turnState.active &&
        (!currentTurnTokenId || currentTurnTokenId !== token.id)
      ) {
        return false;
      }

      if (!activeCampaign) {
        return true;
      }

      if (!user?.id || !token.characterId) {
        return false;
      }

      const character = characters.find(
        (currentCharacter) => currentCharacter.id === token.characterId,
      );

      return character
        ? canControlCharacter({
            character,
            campaign: activeCampaign,
            userId: user.id,
          })
        : false;
    },
    [
      activeCampaign,
      characters,
      currentTurnTokenId,
      isGm,
      turnState.active,
      user?.id,
    ],
  );

  const finishAreaSelection = useCallback(
    (box: SelectionBoxState) => {
      const left = Math.min(box.startX, box.currentX);
      const right = Math.max(box.startX, box.currentX);
      const top = Math.min(box.startY, box.currentY);
      const bottom = Math.max(box.startY, box.currentY);
      const dragDistance = Math.hypot(
        box.currentX - box.startX,
        box.currentY - box.startY,
      );

      if (dragDistance < 5) {
        setSelectedTokens([]);
        return;
      }

      const selectedIds = Object.values(tokens)
        .filter((token) => {
          if (!canControlToken(token)) return false;

          const tokenCenter = getTokenCenter(token, cellSize);
          const center = worldToScreen(tokenCenter.x, tokenCenter.y, camera);

          return (
            center.x >= left &&
            center.x <= right &&
            center.y >= top &&
            center.y <= bottom
          );
        })
        .map((token) => token.id);

      setSelectedTokens(selectedIds);
    },
    [camera, canControlToken, cellSize, setSelectedTokens, tokens],
  );

  const handleDeleteToken = useCallback(
    (tokenId: string) => {
      const token = tokens[tokenId];

      if (!token) return;
      if (!canControlToken(token)) return;

      removeToken(tokenId);
      setTokenMenu(null);

      if (lobbyCode && currentMapIsLive) {
        emitTokenDelete(lobbyCode, tokenId, authToken);
      }
    },
    [tokens, canControlToken, removeToken, lobbyCode, currentMapIsLive, authToken],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isTargetingAction) {
        event.preventDefault();
        cancelActionTargeting();
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingTarget = Boolean(
        target?.closest('input, textarea, select, [contenteditable="true"]'),
      );

      if (
        cameraMode === "2.5d" &&
        !isTypingTarget &&
        event.key.toLowerCase() === "q"
      ) {
        event.preventDefault();
        rotateBy(-5);
        return;
      }

      if (
        cameraMode === "2.5d" &&
        !isTypingTarget &&
        event.key.toLowerCase() === "e"
      ) {
        event.preventDefault();
        rotateBy(5);
        return;
      }

      if (
        target?.closest(
          'input, textarea, select, button, [contenteditable="true"]',
        )
      ) {
        return;
      }

      if (event.key !== "Delete" && event.key !== "Backspace") return;

      const tokensToDelete =
        selectedTokenIds.length > 0
          ? selectedTokenIds
          : selectedTokenId
            ? [selectedTokenId]
            : [];
      const controllableTokensToDelete = tokensToDelete.filter((tokenId) => {
        const token = tokens[tokenId];

        return token ? canControlToken(token) : false;
      });

      if (controllableTokensToDelete.length === 0) return;

      event.preventDefault();
      controllableTokensToDelete.forEach((tokenId) => handleDeleteToken(tokenId));
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedTokenId,
    selectedTokenIds,
    handleDeleteToken,
    canControlToken,
    tokens,
    isTargetingAction,
    cancelActionTargeting,
    rotateBy,
    cameraMode,
  ]);

  const handleDropCharacter = (event: React.DragEvent<HTMLDivElement>) => {
    const rawData = event.dataTransfer.getData("application/rpg-character");

    if (!rawData) return false;

    event.preventDefault();
    event.stopPropagation();

    let character: CharacterDragData | null = null;

    try {
      character = JSON.parse(rawData) as CharacterDragData;
    } catch {
      character = null;
    }

    if (!character) return true;

    const draggedCharacter =
      characters.find((currentCharacter) => currentCharacter.id === character.id) ??
      null;

    if (
      draggedCharacter &&
      !canControlCharacter({
        character: draggedCharacter,
        campaign: activeCampaign,
        userId: user?.id,
      })
    ) {
      return true;
    }

    const world = getWorldPositionFromScreen(event.clientX, event.clientY);

    const snapped = getTokenPositionFromMouse(world.x, world.y, cellSize);

    const position = clampTokenToMap(
      snapped.x,
      snapped.y,
      width,
      height,
      cellSize,
      cellSize,
    );

    const token = {
      id: crypto.randomUUID(),
      characterId: character.id,
      name: character.name,
      image: character.image,
      x: position.x,
      y: position.y,
      widthCells: 1,
      heightCells: 1,
      elevation: 0,
      standMode: "auto" as const,
    };

    addToken(token);

    if (lobbyCode && currentMapIsLive) {
      emitTokenAdd(lobbyCode, token, authToken);
    }

    return true;
  };

  const handleCanvasDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (handleDropCharacter(event)) return;

    const imageFile = getDraggedImageFile(event.dataTransfer);

    if (!imageFile || !canManageMapImages) return;

    event.preventDefault();
    event.stopPropagation();

    void addMapImageFromFile(imageFile, event.clientX, event.clientY);
  };

  const menuToken = tokenMenu ? tokens[tokenMenu.tokenId] : null;

  const menuCharacter = useMemo(() => {
    if (!menuToken?.characterId) return null;

    return (
      characters.find((character) => character.id === menuToken.characterId) ??
      null
    );
  }, [characters, menuToken?.characterId]);

  const canOpenMenuCharacter =
    !!menuCharacter &&
    canOpenCharacter({
      character: menuCharacter,
      campaign: activeCampaign,
      userId: user?.id,
    });

  const handleOpenMenuCharacter = () => {
    if (!menuCharacter) return;

    openEditCharacterEditor(menuCharacter.id);
    setTokenMenu(null);
  };

  const handleToggleMenuHealthBar = () => {
    if (!menuToken) return;
    if (!canControlToken(menuToken)) return;

    const nextValue = !menuToken.showHealthBar;

    setTokenHealthBarVisible(menuToken.id, nextValue);

    if (lobbyCode && currentMapIsLive) {
      emitTokenOverlayUpdate(
        lobbyCode,
        menuToken.id,
        {
          showHealthBar: nextValue,
          conditions: menuToken.conditions ?? [],
        },
        authToken,
      );
    }
  };

  const handleToggleMenuCondition = (
    condition: NonNullable<Token["conditions"]>[number],
  ) => {
    if (!menuToken) return;
    if (!canControlToken(menuToken)) return;

    const conditions = menuToken.conditions ?? [];
    const nextConditions = conditions.includes(condition)
      ? conditions.filter((current) => current !== condition)
      : [...conditions, condition];

    toggleTokenCondition(menuToken.id, condition);

    if (lobbyCode && currentMapIsLive) {
      emitTokenOverlayUpdate(
        lobbyCode,
        menuToken.id,
        {
          showHealthBar: menuToken.showHealthBar ?? false,
          conditions: nextConditions,
        },
        authToken,
      );
    }
  };

  const handleClearMenuConditions = () => {
    if (!menuToken) return;
    if (!canControlToken(menuToken)) return;

    clearTokenConditions(menuToken.id);

    if (lobbyCode && currentMapIsLive) {
      emitTokenOverlayUpdate(
        lobbyCode,
        menuToken.id,
        {
          showHealthBar: menuToken.showHealthBar ?? false,
          conditions: [],
        },
        authToken,
      );
    }
  };

  const handleChangeMenuElevation = (delta: number) => {
    if (!menuToken) return;
    if (!canControlToken(menuToken)) return;

    const nextElevation = Math.max(
      0,
      Math.min(300, (menuToken.elevation ?? 0) + delta),
    );

    setTokenElevation(menuToken.id, nextElevation);

    if (lobbyCode && currentMapIsLive) {
      emitTokenVisualUpdate(
        lobbyCode,
        menuToken.id,
        {
          elevation: nextElevation,
          standMode: menuToken.standMode ?? "auto",
        },
        authToken,
      );
    }
  };

  const handleSetMenuStandMode = (
    standMode: NonNullable<Token["standMode"]>,
  ) => {
    if (!menuToken) return;
    if (!canControlToken(menuToken)) return;

    setTokenStandMode(menuToken.id, standMode);

    if (lobbyCode && currentMapIsLive) {
      emitTokenVisualUpdate(
        lobbyCode,
        menuToken.id,
        {
          elevation: menuToken.elevation ?? 0,
          standMode,
        },
        authToken,
      );
    }
  };

  const handleSetMenuTokenSize = (requestedSize: number) => {
    if (!menuToken || !isGm) return;

    const sizeCells = normalizeTokenSizeCells(requestedSize);
    const nextDimensions = {
      width: sizeCells * cellSize,
      height: sizeCells * cellSize,
    };
    const nextPosition = clampTokenToMap(
      menuToken.x,
      menuToken.y,
      width,
      height,
      nextDimensions.width,
      nextDimensions.height,
    );

    setTokenSize(menuToken.id, sizeCells);

    if (nextPosition.x !== menuToken.x || nextPosition.y !== menuToken.y) {
      moveToken(menuToken.id, nextPosition.x, nextPosition.y);
    }

    if (lobbyCode && currentMapIsLive) {
      emitTokenVisualUpdate(
        lobbyCode,
        menuToken.id,
        {
          elevation: menuToken.elevation ?? 0,
          standMode: menuToken.standMode ?? "auto",
          widthCells: sizeCells,
          heightCells: sizeCells,
        },
        authToken,
      );
    }
  };

  const confirmActionAtPoint = useCallback(
    async (requestedPoint: { x: number; y: number }) => {
      if (!activeAction || !casterTokenId || !lobbyCode || !currentMapIsLive) {
        return;
      }

      const casterToken = tokens[casterTokenId];

      if (!casterToken?.characterId) {
        return;
      }

      if (!canControlToken(casterToken)) {
        return;
      }

      const casterCharacter = characters.find(
        (character) => character.id === casterToken.characterId,
      );

      if (!casterCharacter) {
        return;
      }

      const origin = getTokenCenter(casterToken, cellSize);
      const pixelsPerFoot = cellSize / 5;
      const resolved = resolveActionTargeting({
        action: activeAction,
        tokens,
        casterTokenId,
        origin,
        requestedPoint,
        tokenSize: cellSize,
        pixelsPerFoot,
      });

      if (!resolved.isWithinRange) {
        return;
      }

      if (
        activeAction.targeting.requiresTarget &&
        resolved.targetTokenIds.length === 0
      ) {
        return;
      }

      const casterForm = normalizeSheetForm({
        characterName: casterCharacter.name,
        characterType: casterCharacter.type,
        characterVisibility: casterCharacter.visibility,
        portraitImage: casterCharacter.portraitImage,
        defaultTokenImage: casterCharacter.defaultTokenImage,
        dataJson: casterCharacter.sheet?.dataJson,
        sheetTemplate,
      });
      const spentForm = spendActionResources(casterForm, activeAction);

      if (!spentForm) {
        return;
      }

      if ((activeAction.resourceCosts?.length ?? 0) > 0) {
        if (!authToken || !activeCampaign) {
          return;
        }

        try {
          const updatedCharacter = await updateCharacter(
            authToken,
            activeCampaign.id,
            casterCharacter.id,
            {
              sheetData: mergeSheetFormIntoDataJson(
                spentForm,
                casterCharacter.sheet?.dataJson,
                sheetTemplate,
              ),
            },
          );

          emitCharacterUpdated(lobbyCode, authToken, updatedCharacter);
        } catch (error) {
          console.error("Erro ao gastar recurso da habilidade:", error);
          return;
        }
      }

      emitActionUse({
        useId: crypto.randomUUID(),
        roomCode: lobbyCode,
        authToken: authToken ?? undefined,
        action: activeAction,
        casterTokenId,
        characterId: casterToken.characterId,
        targeting: {
          shape: activeAction.targeting.shape,
          origin,
          targetPoint: resolved.targetPoint,
          targetTokenIds: resolved.targetTokenIds,
          affectedTokenIds: resolved.affectedTokenIds,
          direction: resolved.direction,
        },
        rolls: prepareActionRolls(activeAction, spentForm, sheetTemplate),
        color: playerColor,
      });

    },
    [
      activeAction,
      casterTokenId,
      lobbyCode,
      tokens,
      characters,
      cellSize,
      authToken,
      activeCampaign,
      updateCharacter,
      currentMapIsLive,
      canControlToken,
      playerColor,
      sheetTemplate,
    ],
  );

  const handleTokenPointerDown = useCallback(
    (token: Token, event: React.PointerEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (isTargetingAction) {
        event.preventDefault();
        void confirmActionAtPoint(getTokenCenter(token, cellSize));
        return;
      }

      if (!canControlToken(token)) {
        event.preventDefault();
        return;
      }

      tokenDrag.startDrag(token, event);
    },
    [isTargetingAction, confirmActionAtPoint, canControlToken, tokenDrag, cellSize],
  );

  const handleTokenContextMenu = useCallback(
    (token: Token, event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (tokenDrag.preview) {
        tokenDrag.addWaypoint();
        return;
      }

      if (isTargetingAction) {
        cancelActionTargeting();
        return;
      }

      if (!canControlToken(token)) {
        return;
      }

      setSelectedToken(token.id);

      setTokenMenu({
        x: event.clientX,
        y: event.clientY,
        tokenId: token.id,
      });
    },
    [
      isTargetingAction,
      cancelActionTargeting,
      canControlToken,
      setSelectedToken,
      tokenDrag,
    ],
  );

  const tokenContextMenu = (
    <>
      {tokenMenu && menuToken && (
        <TokenContextMenu
          x={tokenMenu.x}
          y={tokenMenu.y}
          canResizeToken={isGm}
          canOpenCharacter={canOpenMenuCharacter}
          canShowHealthBar={Boolean(menuCharacter)}
          sizeCells={normalizeTokenSizeCells(menuToken.widthCells)}
          healthBarVisible={menuToken.showHealthBar ?? false}
          activeConditions={menuToken.conditions ?? []}
          elevation={menuToken.elevation ?? 0}
          standMode={menuToken.standMode ?? "auto"}
          onOpenCharacter={handleOpenMenuCharacter}
          onToggleHealthBar={handleToggleMenuHealthBar}
          onToggleCondition={handleToggleMenuCondition}
          onClearConditions={handleClearMenuConditions}
          onChangeElevation={handleChangeMenuElevation}
          onSetStandMode={handleSetMenuStandMode}
          onSetSize={handleSetMenuTokenSize}
          onDeleteToken={() => handleDeleteToken(tokenMenu.tokenId)}
          onClose={() => setTokenMenu(null)}
        />
      )}
    </>
  );

  if (cameraMode === "3d") {
    return <>
      <Scene3DGate
        isGm={isGm}
        campaignId={activeCampaign?.id}
        authToken={authToken}
        key={currentMapId ?? "temporary-map"}
        mapWidth={width}
        mapHeight={height}
        cellSize={cellSize}
        backgroundImage={backgroundImage}
        tokens={tokens}
        characters={characters}
        sheetTemplate={sheetTemplate}
        selectedTokenIds={selectedTokenIds}
        isTargeting={isTargetingAction}
        canControlToken={canControlToken}
        onSelectToken={setSelectedToken}
        onMoveToken={(tokenId, position) => {
          const token = useTokenStore.getState().tokens[tokenId];
          if (!token || !canControlToken(token)) return;
          moveToken(tokenId, position.x, position.y);
          if (lobbyCode && currentMapIsLive) emitTokenMove(lobbyCode, tokenId, position.x, position.y, authToken);
        }}
        onTokenContextMenu={(token, point) => {
          if (!canControlToken(token)) return;
          setSelectedToken(token.id);
          setTokenMenu({ ...point, tokenId: token.id });
        }}
        onCloseMenu={() => setTokenMenu(null)}
        onTargetPoint={updateActionMousePosition}
        onConfirmAction={(point) => { void confirmActionAtPoint(point); }}
        onCancelAction={cancelActionTargeting}
        onReturnTo2D={() => { setTokenMenu(null); useUiStore.getState().setCameraMode("2d"); }}
      />
      {tokenContextMenu}
    </>;
  }
  return (
    <div
      onDragOver={(event) => {
        if (event.dataTransfer.types.includes("application/rpg-character")) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
          return;
        }

        if (canManageMapImages && hasDraggedFiles(event.dataTransfer)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }
      }}
      onDrop={handleCanvasDrop}
      onContextMenu={(event) => {
        if (isEventFromUiLayer(event)) return;
        event.preventDefault();

        if (tokenDrag.preview) {
          return;
        }

        if (isTargetingAction) {
          cancelActionTargeting();
          return;
        }

        setTokenMenu(null);
      }}
      onPointerDown={(event) => {
        if (isEventFromUiLayer(event)) return;

        if (event.button === 2) {
          setTokenMenu(null);

          event.preventDefault();

          if (tokenDrag.preview) {
            tokenDrag.addWaypoint();
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);

          input.onMouseDown(event as any);
          return;
        }

        if (event.button !== 0) return;

        if (isTargetingAction) {
          event.preventDefault();
          void confirmActionAtPoint(
            getWorldPositionFromScreen(event.clientX, event.clientY),
          );
          return;
        }

        setTokenMenu(null);

        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);

        const nextSelectionBox = {
          startX: event.clientX,
          startY: event.clientY,
          currentX: event.clientX,
          currentY: event.clientY,
        };

        selectionBoxRef.current = nextSelectionBox;
        setSelectionBox(nextSelectionBox);
      }}
      onPointerMove={(event) => {
        if (isEventFromUiLayer(event)) return;

        if (isTargetingAction) {
          updateActionMousePosition(
            getWorldPositionFromScreen(event.clientX, event.clientY),
          );
        }

        if (selectionBoxRef.current) {
          const nextSelectionBox = {
            ...selectionBoxRef.current,
            currentX: event.clientX,
            currentY: event.clientY,
          };

          selectionBoxRef.current = nextSelectionBox;
          setSelectionBox(nextSelectionBox);
        }

        input.onMouseMove(event as any);
        tokenDrag.onMove(event as any);
      }}
      onPointerUp={(event) => {
        if (isEventFromUiLayer(event)) return;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        input.onMouseUp();

        if (selectionBoxRef.current) {
          finishAreaSelection(selectionBoxRef.current);
          selectionBoxRef.current = null;
          setSelectionBox(null);
          tokenDrag.stopDrag();
          return;
        }

        const dropped = tokenDrag.drop();

        if (dropped && lobbyCode && currentMapIsLive) {
          emitTokenMove(
            lobbyCode,
            dropped.tokenId,
            dropped.x,
            dropped.y,
            authToken,
          );
        }

        tokenDrag.stopDrag();
      }}
      onWheel={(event) => {
        if (isEventFromUiLayer(event)) return;

        zoomAt(event.clientX, event.clientY, event.deltaY);
      }}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: isGm ? "#11131a" : "#050506",
        userSelect: "none",
        touchAction: "none",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          transform: buildWorldTransform(camera),
          transformOrigin: "0 0",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "relative",
            width,
            height,
            background: "#2c2c2c",
            transformStyle: "preserve-3d",
            outline: `${Math.max(1, 2 / Math.max(camera.zoom, 0.1))}px solid rgba(218, 171, 86, 0.56)`,
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.58)",
          }}
        >
          <MapBackground image={backgroundImage} zoom={camera.zoom} />

          <MapImageLayer
            images={normalizedLayerConfig.images}
            mapWidth={width}
            mapHeight={height}
            camera={camera}
            canManage={canManageMapImages}
            onMove={moveMapImage}
            onDelete={deleteMapImage}
          />

          <MapTerrainLayer cellSize={cellSize} mode={cameraMode} />

          <Grid
            width={width}
            height={height}
            zoom={camera.zoom}
            cellSize={cellSize}
            mode={cameraMode}
          />

          <AnnotationLayer width={width} height={height} camera={camera} />

          <ActionPreviewLayer
            width={width}
            height={height}
            cellSize={cellSize}
            mode={cameraMode}
          />

          {cameraMode !== "2.5d" && (
            <TokenLayer
              tokens={tokens}
              cellSize={cellSize}
              camera={camera}
              canSelectToken={(token) =>
                !isTargetingAction && canControlToken(token)
              }
              onTokenMouseDown={handleTokenPointerDown}
              onTokenContextMenu={handleTokenContextMenu}
            />
          )}

          {tokenDrag.preview && tokens[tokenDrag.preview.tokenId] && (
            <TokenDragPreview
              preview={tokenDrag.preview}
              cellSize={cellSize}
              width={
                getTokenDimensions(
                  tokens[tokenDrag.preview.tokenId],
                  cellSize,
                ).width
              }
              height={
                getTokenDimensions(
                  tokens[tokenDrag.preview.tokenId],
                  cellSize,
                ).height
              }
              mapWidth={width}
              mapHeight={height}
              image={getTokenPreviewImage(
                tokens[tokenDrag.preview.tokenId],
                characters,
                sheetTemplate,
              )}
              name={
                tokens[tokenDrag.preview.tokenId].name ??
                getTokenCharacterName(
                  tokens[tokenDrag.preview.tokenId],
                  characters,
                )
              }
            />
          )}

          <FogLayer
            width={width}
            height={height}
            cellSize={cellSize}
            camera={camera}
          />
        </div>
      </div>

      {cameraMode === "2.5d" && (
        <TokenLayer
          tokens={tokens}
          cellSize={cellSize}
          camera={camera}
          renderMode="screen"
          canSelectToken={(token) =>
            !isTargetingAction && canControlToken(token)
          }
          onTokenMouseDown={handleTokenPointerDown}
          onTokenContextMenu={handleTokenContextMenu}
        />
      )}

      <MapLocatorIndicator
        width={width}
        height={height}
        camera={camera}
        leftDockCollapsed={leftDockCollapsed}
        rightSidebarCollapsed={rightSidebarCollapsed}
        onCenterMap={centerOnMap}
      />

      {selectionBox && <AreaSelectionBox box={selectionBox} />}

      {tokenContextMenu}
    </div>
  );
}

function AreaSelectionBox({ box }: { box: SelectionBoxState }) {
  const left = Math.min(box.startX, box.currentX);
  const top = Math.min(box.startY, box.currentY);
  const width = Math.abs(box.currentX - box.startX);
  const height = Math.abs(box.currentY - box.startY);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left,
        top,
        width,
        height,
        zIndex: 35,
        pointerEvents: "none",
        border: "1px solid rgba(96, 165, 250, 0.95)",
        background:
          "linear-gradient(135deg, rgba(96, 165, 250, 0.22), rgba(14, 165, 233, 0.1))",
        boxShadow:
          "0 0 0 1px rgba(15, 23, 42, 0.65), 0 0 18px rgba(96, 165, 250, 0.35) inset",
        borderRadius: 3,
      }}
    />
  );
}

function isNativeEventFromUiLayer(event: Event) {
  return (
    event.target instanceof Element &&
    Boolean(event.target.closest('[data-ui-layer="true"]'))
  );
}

function buildMapSettingsFromStore(layerConfig: MapLayerConfig) {
  const state = useMapStore.getState();

  return normalizeMapSettings({
    mapId: state.mapId,
    pageName: state.pageName,
    widthCells: state.widthCells,
    heightCells: state.heightCells,
    cellSize: state.cellSize,
    backgroundImage: state.backgroundImage,
    backgroundImageWidth: state.backgroundImageWidth,
    backgroundImageHeight: state.backgroundImageHeight,
    layerConfig,
  });
}

function getDraggedImageFile(dataTransfer: DataTransfer) {
  return (
    Array.from(dataTransfer.files).find((file) =>
      file.type.toLowerCase().startsWith("image/"),
    ) ?? null
  );
}

function hasDraggedFiles(dataTransfer: DataTransfer) {
  return dataTransfer.types.includes("Files");
}

function fitMapImageSize(
  imageSize: {
    width: number;
    height: number;
  },
  cellSize: number,
) {
  const longestSide = Math.max(imageSize.width, imageSize.height, 1);
  const targetLongestSide = Math.max(
    cellSize,
    Math.min(longestSide, cellSize * 8),
  );
  const scale = targetLongestSide / longestSide;

  return {
    width: Math.max(8, imageSize.width * scale),
    height: Math.max(8, imageSize.height * scale),
  };
}

function getTokenPreviewImage(
  token: Token,
  characters: Character[],
  sheetTemplate?: CampaignSheetTemplate | null,
) {
  const character = token.characterId
    ? characters.find((current) => current.id === token.characterId) ?? null
    : null;

  if (!character) {
    return token.image ?? "";
  }

  const sheet = normalizeSheetForm({
    characterName: character.name,
    characterType: character.type,
    characterVisibility: character.visibility,
    portraitImage: character.portraitImage,
    defaultTokenImage: character.defaultTokenImage,
    dataJson: character.sheet?.dataJson,
    sheetTemplate,
  });

  return token.image || sheet.defaultTokenImage || sheet.portraitImage || "";
}

function getTokenCharacterName(token: Token, characters: Character[]) {
  if (!token.characterId) return undefined;

  return characters.find((character) => character.id === token.characterId)?.name;
}

function getUserRole(
  campaign:
    | {
        ownerUserId: string;
        members?: {
          userId: string;
          role: string;
        }[];
      }
    | null,
  userId?: string,
) {
  if (!campaign || !userId) return "player";

  if (campaign.ownerUserId === userId) return "owner";

  return (
    campaign.members?.find((member) => member.userId === userId)?.role ??
    "player"
  );
}

function canOpenCharacter(input: {
  character: Character;
  campaign: Campaign | null;
  userId?: string;
}) {
  if (!input.userId) return false;

  const role = getUserRole(input.campaign, input.userId);
  const isGm = role === "owner" || role === "gm";

  if (isGm) return true;

  if (input.character.ownerUserId === input.userId) return true;
  if (input.character.createdByUserId === input.userId) return true;

  return Boolean(
    input.character.permissions?.some(
      (permission) =>
        permission.userId === input.userId && permission.canView,
    ),
  );
}

function canControlCharacter(input: {
  character: Character;
  campaign: Campaign | null;
  userId?: string;
}) {
  if (!input.campaign) return true;
  if (!input.userId) return false;

  const role = getUserRole(input.campaign, input.userId);
  const isGm = role === "owner" || role === "gm";

  if (isGm) return true;

  if (input.character.ownerUserId === input.userId) return true;
  if (input.character.createdByUserId === input.userId) return true;

  return Boolean(
    input.character.permissions?.some(
      (permission) =>
        permission.userId === input.userId && permission.canControl,
    ),
  );
}

function buildWorldTransform(camera: {
  centerX: number;
  centerY: number;
  zoom: number;
  pitch: number;
  yaw: number;
}) {
  const viewportWidth =
    typeof window === "undefined" ? 1280 : window.innerWidth;
  const viewportHeight =
    typeof window === "undefined" ? 720 : window.innerHeight;

  return [
    `translate3d(${viewportWidth / 2}px, ${viewportHeight / 2}px, 0)`,
    camera.pitch > 0 ? `perspective(${getCameraPerspective(camera)}px)` : "",
    `rotateX(${camera.pitch}deg)`,
    `rotateZ(${camera.yaw}deg)`,
    `scale(${camera.zoom})`,
    `translate3d(${-camera.centerX}px, ${-camera.centerY}px, 0)`,
  ]
    .filter(Boolean)
    .join(" ");
}
