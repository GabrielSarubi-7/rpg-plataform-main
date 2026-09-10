import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import {
  getImageFileSize,
  uploadImageAsset,
} from "@/features/assets/assetApi";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useMapStore } from "../store/mapStore";
import { useCampaignMapStore } from "../store/campaignMapStore";
import { emitMapSettingsUpdate } from "../services/mapSocketService";

import {
  getGridSizeFromImage,
  getMapPixelSize,
  normalizeMapSettings,
} from "@shared/rules/mapRules";

export function usePageSettingsDraft(isOpen: boolean) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lobbyCode = useLobbyStore((s) => s.lobbyCode);
  const authToken = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const activeCampaign = useCampaignStore((s) => s.activeCampaign);
  const activeMapId = useCampaignMapStore((s) => s.activeMapId);
  const canManageLoadedMaps = useCampaignMapStore((s) => s.canManage);
  const updateMap = useCampaignMapStore((s) => s.updateMap);

  const pageName = useMapStore((s) => s.pageName);
  const mapId = useMapStore((s) => s.mapId);
  const widthCells = useMapStore((s) => s.widthCells);
  const heightCells = useMapStore((s) => s.heightCells);
  const cellSize = useMapStore((s) => s.cellSize);
  const backgroundImage = useMapStore((s) => s.backgroundImage);
  const layerConfig = useMapStore((s) => s.layerConfig);
  const backgroundImageWidth = useMapStore((s) => s.backgroundImageWidth);
  const backgroundImageHeight = useMapStore((s) => s.backgroundImageHeight);
  const setMapSettings = useMapStore((s) => s.setMapSettings);

  const [draftPageName, setDraftPageName] = useState(pageName);
  const [draftWidthCells, setDraftWidthCells] = useState(widthCells);
  const [draftHeightCells, setDraftHeightCells] = useState(heightCells);
  const [draftCellSize, setDraftCellSize] = useState(cellSize);
  const [draftBackgroundImage, setDraftBackgroundImage] = useState(
    backgroundImage ?? "",
  );

  const [draftImageSize, setDraftImageSize] = useState<{
    width: number;
    height: number;
  } | null>(
    backgroundImageWidth && backgroundImageHeight
      ? { width: backgroundImageWidth, height: backgroundImageHeight }
      : null,
  );
  const canManageMaps =
    canManageLoadedMaps || canManageCampaign(activeCampaign, user?.id);

  useEffect(() => {
    if (!isOpen) return;

    setDraftPageName(pageName);
    setDraftWidthCells(widthCells);
    setDraftHeightCells(heightCells);
    setDraftCellSize(cellSize);
    setDraftBackgroundImage(backgroundImage ?? "");

    setDraftImageSize(
      backgroundImageWidth && backgroundImageHeight
        ? { width: backgroundImageWidth, height: backgroundImageHeight }
        : null,
    );
  }, [
    isOpen,
    pageName,
    widthCells,
    heightCells,
    cellSize,
    backgroundImage,
    backgroundImageWidth,
    backgroundImageHeight,
  ]);

  const imageGridSuggestion = useMemo(() => {
    if (!draftImageSize) return null;

    return getGridSizeFromImage(
      draftImageSize.width,
      draftImageSize.height,
      draftCellSize,
    );
  }, [draftImageSize, draftCellSize]);

  const preview = useMemo(() => {
    const settings = normalizeMapSettings({
      pageName: draftPageName,
      mapId,
      widthCells: draftWidthCells,
      heightCells: draftHeightCells,
      cellSize: draftCellSize,
      backgroundImage: draftBackgroundImage,
      layerConfig,
      backgroundImageWidth: draftImageSize?.width,
      backgroundImageHeight: draftImageSize?.height,
    });

    return {
      settings,
      size: getMapPixelSize(settings),
    };
  }, [
    draftPageName,
    mapId,
    draftWidthCells,
    draftHeightCells,
    draftCellSize,
    draftBackgroundImage,
    layerConfig,
    draftImageSize,
  ]);

  const shouldShowFitImageOption =
    !!imageGridSuggestion &&
    (imageGridSuggestion.widthCells !== preview.settings.widthCells ||
      imageGridSuggestion.heightCells !== preview.settings.heightCells);

  const chooseBackgroundImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !authToken) return;

    const imageSize = await getImageFileSize(file);
    const imageUrl = await uploadImageAsset(authToken, file, {
      maxDimension: 1920,
      quality: 0.82,
    });

    setDraftBackgroundImage(imageUrl);
    setDraftImageSize(imageSize);
  };

  const removeBackgroundImage = () => {
    setDraftBackgroundImage("");
    setDraftImageSize(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const applyImageSizeToGrid = () => {
    if (!imageGridSuggestion) return;

    setDraftWidthCells(imageGridSuggestion.widthCells);
    setDraftHeightCells(imageGridSuggestion.heightCells);
  };

  const apply = async () => {
    if (!canManageMaps || !authToken) {
      return;
    }

    setMapSettings(preview.settings);

    const isPrivateGmMap =
      canManageMaps &&
      preview.settings.mapId &&
      preview.settings.mapId !== activeMapId;

    if (
      isPrivateGmMap &&
      authToken &&
      activeCampaign &&
      preview.settings.mapId
    ) {
      await updateMap(authToken, activeCampaign.id, preview.settings.mapId, {
        name: preview.settings.pageName,
        width: preview.settings.widthCells,
        height: preview.settings.heightCells,
        cellSize: preview.settings.cellSize,
        backgroundImage: preview.settings.backgroundImage ?? null,
        layerConfig: preview.settings.layerConfig ?? null,
      });
      return;
    }

    if (lobbyCode) {
      emitMapSettingsUpdate(lobbyCode, preview.settings, authToken);
    }
  };

  return {
    fileInputRef,

    draftPageName,
    draftWidthCells,
    draftHeightCells,
    draftCellSize,
    draftBackgroundImage,
    draftImageSize,

    setDraftPageName,
    setDraftWidthCells,
    setDraftHeightCells,
    setDraftCellSize,

    preview,
    imageGridSuggestion,
    shouldShowFitImageOption,
    canManageMaps,

    chooseBackgroundImage,
    removeBackgroundImage,
    applyImageSizeToGrid,
    apply,
  };
}
