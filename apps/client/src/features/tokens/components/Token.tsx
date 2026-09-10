import { memo, useMemo } from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useCharacterStore } from "@/features/characters/store/characterStore";
import { normalizeSheetForm } from "@/features/characters/types/characterSheet";
import type { Camera } from "@/features/map/hooks/useCamera";
import { useUiStore } from "@/features/ui/store/uiStore";
import { normalizeCampaignSettings } from "@shared/rules/campaignSettingsRules";

import { getTokenCondition } from "../constants/tokenConditions";
import { useTokenStore } from "../store/tokenStore";
import type { Token as TokenData } from "../store/tokenStore";
import { getTokenDimensions } from "@shared/rules/tokenRules";

import styles from "./Token.module.css";

interface Props {
  token: TokenData;
  size: number;
  camera: Camera;
  screenProjection?: {
    x: number;
    y: number;
    scale: number;
    depth: number;
    footprintWidth?: number;
    footprintHeight?: number;
  };
  selectable?: boolean;
  onMouseDown: (
    token: TokenData,
    event: React.PointerEvent<HTMLDivElement>,
  ) => void;
  onContextMenu: (
    token: TokenData,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

const AUTO_STAND_PITCH_THRESHOLD = 8;

function Token({
  token,
  size,
  camera,
  screenProjection,
  selectable = true,
  onMouseDown,
  onContextMenu,
}: Props) {
  const isSelected = useTokenStore(
    (state) =>
      state.selectedTokenId === token.id ||
      state.selectedTokenIds.includes(token.id),
  );
  const setSelectedToken = useTokenStore((state) => state.setSelectedToken);
  const character = useCharacterStore((state) =>
    token.characterId
      ? state.characters.find((current) => current.id === token.characterId) ??
        null
      : null,
  );
  const campaignSettingsJson = useCampaignStore(
    (state) => state.activeCampaign?.settingsJson,
  );
  const sheetTemplate = useMemo(
    () => normalizeCampaignSettings(campaignSettingsJson).sheetTemplate,
    [campaignSettingsJson],
  );
  const cameraMode = useUiStore((state) => state.cameraMode);

  const sheet = character
    ? normalizeSheetForm({
        characterName: character.name,
        characterType: character.type,
        portraitImage: character.portraitImage,
        defaultTokenImage: character.defaultTokenImage,
        dataJson: character.sheet?.dataJson,
        sheetTemplate,
      })
    : null;
  const hpPercent =
    sheet && sheet.hpMax > 0
      ? Math.max(0, Math.min(100, (sheet.hpCurrent / sheet.hpMax) * 100))
      : 0;
  const tempHpPercent =
    sheet && sheet.hpMax > 0
      ? Math.max(0, Math.min(100, (sheet.hpTemp / sheet.hpMax) * 100))
      : 0;
  const conditions = token.conditions ?? [];
  const standMode = token.standMode ?? "auto";
  const shouldStand =
    cameraMode === "2.5d" &&
    (standMode === "billboard" ||
      (standMode === "auto" && camera.pitch >= AUTO_STAND_PITCH_THRESHOLD));
  const isScreenProjected = Boolean(screenProjection);
  const dimensions = getTokenDimensions(token, size);
  const renderWidth = isScreenProjected
    ? getStableProjectedTokenSize(dimensions.width, camera, screenProjection)
    : dimensions.width;
  const renderHeight = isScreenProjected
    ? getStableProjectedTokenSize(dimensions.height, camera, screenProjection)
    : dimensions.height;
  const renderedCellSize = isScreenProjected
    ? getStableProjectedTokenSize(size, camera, screenProjection)
    : size;
  const visualImage =
    shouldStand && sheet?.sprite25dImage
      ? sheet.sprite25dImage
      : token.image || sheet?.defaultTokenImage || sheet?.portraitImage || "";
  const elevationPx = ((token.elevation ?? 0) / 5) * renderedCellSize;
  const billboardHeight = shouldStand
    ? renderHeight * (visualImage ? 1.42 : 1.18)
    : renderHeight;
  const standingLiftPx = shouldStand ? elevationPx : 0;
  const shadowScale = Math.max(0.55, 1 - (token.elevation ?? 0) * 0.0018);
  const shadowOpacity = Math.min(0.42, 0.22 + (token.elevation ?? 0) * 0.0015);
  const pitchRadians = (camera.pitch * Math.PI) / 180;
  const groundCompression = Math.max(0.18, Math.cos(pitchRadians));
  const groundTransform = isScreenProjected
    ? `scaleY(${groundCompression})`
    : undefined;
  const shadowTransform = isScreenProjected
    ? `scaleY(${groundCompression}) scale(${shadowScale})`
    : `scale(${shadowScale})`;
  const anchorStyle = isScreenProjected
    ? {
        left: (screenProjection?.x ?? 0) - renderWidth / 2,
        top: (screenProjection?.y ?? 0) - renderHeight,
        width: renderWidth,
        height: renderHeight,
        zIndex: Math.round(screenProjection?.y ?? 0),
        pointerEvents: "auto" as const,
      }
    : {
        left: token.x,
        top: token.y,
        width: renderWidth,
        height: renderHeight,
        pointerEvents: "auto" as const,
      };
  const figureTransform = shouldStand
    ? isScreenProjected
      ? [
          `translate3d(0, ${-standingLiftPx}px, 0)`,
          `scaleY(${1 + Math.min(camera.pitch / 240, 0.18)})`,
        ].join(" ")
      : [
          `translate3d(0, ${-standingLiftPx}px, ${elevationPx}px)`,
          `rotateX(${-camera.pitch}deg)`,
          `rotateZ(${-camera.yaw}deg)`,
          `scaleY(${1 + Math.min(camera.pitch / 280, 0.16)})`,
        ].join(" ")
    : undefined;
  const imageFit = shouldStand ? "contain" : "cover";
  const imagePosition = shouldStand ? "center bottom" : "center";
  const shouldReserveRaster = shouldStand || isScreenProjected;
  const rasterScale = shouldReserveRaster
    ? getTokenRasterScale({
        camera,
        isScreenProjected,
      })
    : 1;
  const imageTransform = shouldStand
    ? `translateX(-50%) scale(${1 / rasterScale})`
    : shouldReserveRaster
      ? `translate(-50%, -50%) scale(${1 / rasterScale})`
      : "none";

  return (
    <div
      className={`${styles.anchor} ${
        isScreenProjected ? styles.screenAnchor : ""
      }`}
      draggable={false}
      title={token.name ?? "Token"}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (selectable) {
          setSelectedToken(token.id);
        }
        onContextMenu(token, event);
      }}
      onPointerDown={(event) => {
        if (event.button === 2) {
          event.stopPropagation();
          return;
        }

        if (event.button !== 0) return;

        event.stopPropagation();
        if (selectable) {
          setSelectedToken(token.id);
        }
        onMouseDown(token, event);
      }}
      style={anchorStyle}
    >
      {shouldStand && !isScreenProjected && (
        <span
          className={`${styles.baseDisc} ${
            isSelected ? styles.baseDiscSelected : ""
          }`}
          style={{
            transform: groundTransform,
          }}
        />
      )}

      {shouldStand && !isScreenProjected && (
        <span
          className={styles.shadow}
          style={{
            opacity: shadowOpacity,
            transform: shadowTransform,
          }}
        />
      )}

      <div
        className={`${styles.figure} ${
          shouldStand ? styles.billboard : styles.flat
        } ${isSelected ? styles.selected : styles.unselected} ${
          !visualImage ? styles.emptyFigure : ""
        }`}
        style={{
          width: renderWidth,
          height: billboardHeight,
          backgroundColor: visualImage ? "transparent" : "#b91c1c",
          transform: figureTransform,
        }}
      >
        {visualImage && (
          <img
            className={styles.figureImage}
            src={resolveAssetUrl(visualImage)}
            alt=""
            draggable={false}
            decoding="sync"
            loading="eager"
            style={
              shouldReserveRaster
                ? {
                    width: `${rasterScale * 100}%`,
                    height: `${rasterScale * 100}%`,
                    maxWidth: "none",
                    maxHeight: "none",
                    left: "50%",
                    top: shouldStand ? undefined : "50%",
                    bottom: shouldStand ? 0 : undefined,
                    transform: imageTransform,
                    transformOrigin: shouldStand
                      ? "center bottom"
                      : "center center",
                    objectFit: imageFit,
                    objectPosition: imagePosition,
                  }
                : {
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                    left: 0,
                    top: 0,
                    transform: imageTransform,
                    transformOrigin: "center center",
                    objectFit: imageFit,
                    objectPosition: imagePosition,
                  }
            }
          />
        )}

        {conditions.length > 0 && (
          <div className={styles.conditions}>
            {conditions.map((condition) => {
              const metadata = getTokenCondition(condition);

              if (!metadata) return null;

              return (
                <span
                  key={condition}
                  className={styles.conditionBadge}
                  title={metadata.label}
                >
                  {metadata.icon}
                </span>
              );
            })}
          </div>
        )}

        {token.showHealthBar && sheet && (
          <div className={styles.healthBars}>
            {sheet.hpTemp > 0 && (
              <div
                className={styles.healthTrack}
                title={`PV temporários: ${sheet.hpTemp}`}
              >
                <div
                  className={styles.temporaryFill}
                  style={{
                    width: `${tempHpPercent}%`,
                  }}
                />
              </div>
            )}

            <div
              className={styles.healthTrack}
              title={`PV: ${sheet.hpCurrent}/${sheet.hpMax}`}
            >
              <div
                className={styles.healthFill}
                style={{
                  width: `${hpPercent}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getTokenRasterScale(input: {
  camera: Camera;
  isScreenProjected: boolean;
}) {
  const deviceScale =
    typeof window === "undefined"
      ? 1
      : Math.max(1, Math.min(window.devicePixelRatio || 1, 2.5));
  const zoomScale = input.isScreenProjected
    ? Math.max(1, input.camera.zoom * 1.25)
    : Math.max(1, input.camera.zoom);
  const qualityReserve = input.isScreenProjected ? 1.75 : 2.5;

  return Math.max(1, Math.min(8, deviceScale * zoomScale * qualityReserve));
}

function getStableProjectedTokenSize(
  size: number,
  camera: Camera,
  projection?: Props["screenProjection"],
) {
  const pitchPresence = Math.min(camera.pitch / 72, 1);
  const cinematicBoost = 1 + pitchPresence * 0.06;
  const baseSize = size * camera.zoom * cinematicBoost;
  const rawPerspectiveScale =
    projection && camera.zoom > 0 ? projection.scale / camera.zoom : 1;
  const safePerspectiveScale = Math.max(
    0.82,
    Math.min(1.18, rawPerspectiveScale),
  );
  const depthInfluence = pitchPresence * 0.22;
  const subtleDepthScale =
    1 + (safePerspectiveScale - 1) * depthInfluence;
  const stabilizedSize = baseSize * subtleDepthScale;

  return Math.max(18, Math.min(420, stabilizedSize));
}

function areTokenPropsEqual(previous: Props, next: Props) {
  return (
    previous.token === next.token &&
    previous.size === next.size &&
    previous.selectable === next.selectable &&
    previous.onMouseDown === next.onMouseDown &&
    previous.onContextMenu === next.onContextMenu &&
    areScreenProjectionsEqual(previous.screenProjection, next.screenProjection) &&
    areCamerasEqualForToken(previous.camera, next.camera, next.screenProjection)
  );
}

function areScreenProjectionsEqual(
  previous?: Props["screenProjection"],
  next?: Props["screenProjection"],
) {
  if (previous === next) return true;
  if (!previous || !next) return false;

  return (
    previous.x === next.x &&
    previous.y === next.y &&
    previous.scale === next.scale &&
    previous.depth === next.depth &&
    previous.footprintWidth === next.footprintWidth &&
    previous.footprintHeight === next.footprintHeight
  );
}

function areCamerasEqualForToken(
  previous: Camera,
  next: Camera,
  screenProjection?: Props["screenProjection"],
) {
  if (!screenProjection) return true;

  return (
    previous.centerX === next.centerX &&
    previous.centerY === next.centerY &&
    previous.zoom === next.zoom &&
    previous.pitch === next.pitch &&
    previous.yaw === next.yaw
  );
}

export default memo(Token, areTokenPropsEqual);
