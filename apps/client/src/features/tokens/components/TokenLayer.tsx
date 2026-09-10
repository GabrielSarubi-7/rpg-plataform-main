import type { PointerEvent } from "react";

import Token from "./Token";
import type { Token as TokenData } from "../store/tokenStore";
import type { Camera } from "@/features/map/hooks/useCamera";
import { worldToScreen } from "@/features/map/utils/coords";
import { useTokenStore } from "../store/tokenStore";
import { getTokenDimensions } from "@shared/rules/tokenRules";

interface TokenLayerProps {
  tokens: Record<string, TokenData>;
  cellSize: number;
  camera: Camera;
  renderMode?: "world" | "screen";
  canSelectToken?: (token: TokenData) => boolean;
  onTokenMouseDown: (
    token: TokenData,
    event: PointerEvent<HTMLDivElement>,
  ) => void;
  onTokenContextMenu: (
    token: TokenData,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

const WORLD_TOKEN_CAMERA: Camera = {
  centerX: 0,
  centerY: 0,
  zoom: 1,
  pitch: 0,
  yaw: 0,
};

export default function TokenLayer({
  tokens,
  cellSize,
  camera,
  renderMode = "world",
  canSelectToken,
  onTokenMouseDown,
  onTokenContextMenu,
}: TokenLayerProps) {
  const tokenList = Object.values(tokens);

  if (renderMode === "screen") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {tokenList
          .map((token) => ({
            token,
            projection: buildProjectedToken(token, cellSize, camera),
          }))
          .sort((left, right) => left.projection.depth - right.projection.depth)
          .map(({ token, projection }) => (
            <div key={token.id}>
              <ProjectedTokenFootprintForToken
                tokenId={token.id}
                projection={projection}
              />

              <Token
                token={token}
                size={cellSize}
                camera={camera}
                screenProjection={projection}
                selectable={canSelectToken ? canSelectToken(token) : true}
                onMouseDown={onTokenMouseDown}
                onContextMenu={onTokenContextMenu}
              />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 12,
        pointerEvents: "none",
        overflow: "visible",
        transformStyle: "preserve-3d",
      }}
    >
      {tokenList.map((token) => (
        <Token
          key={token.id}
          token={token}
          size={cellSize}
          camera={WORLD_TOKEN_CAMERA}
          selectable={canSelectToken ? canSelectToken(token) : true}
          onMouseDown={onTokenMouseDown}
          onContextMenu={onTokenContextMenu}
        />
      ))}
    </div>
  );
}

function ProjectedTokenFootprintForToken(props: {
  tokenId: string;
  projection: ReturnType<typeof buildProjectedToken>;
}) {
  const selected = useTokenStore(
    (state) =>
      state.selectedTokenId === props.tokenId ||
      state.selectedTokenIds.includes(props.tokenId),
  );

  return (
    <ProjectedTokenFootprint
      projection={props.projection}
      selected={selected}
    />
  );
}

function buildProjectedToken(
  token: TokenData,
  cellSize: number,
  camera: Camera,
) {
  const dimensions = getTokenDimensions(token, cellSize);
  const center = worldToScreen(
    token.x + dimensions.width / 2,
    token.y + dimensions.height / 2,
    camera,
  );
  const corners = [
    worldToScreen(token.x, token.y, camera),
    worldToScreen(token.x + dimensions.width, token.y, camera),
    worldToScreen(
      token.x + dimensions.width,
      token.y + dimensions.height,
      camera,
    ),
    worldToScreen(token.x, token.y + dimensions.height, camera),
  ];
  const topWidth = distance(corners[0], corners[1]);
  const bottomWidth = distance(corners[3], corners[2]);
  const leftHeight = distance(corners[0], corners[3]);
  const rightHeight = distance(corners[1], corners[2]);

  return {
    ...center,
    footprint: corners,
    footprintWidth: Math.max(topWidth, bottomWidth),
    footprintHeight: Math.max(leftHeight, rightHeight),
  };
}

function ProjectedTokenFootprint(props: {
  projection: ReturnType<typeof buildProjectedToken>;
  selected: boolean;
}) {
  const points = props.projection.footprint
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: Math.round(props.projection.y) - 1,
      }}
    >
      <polygon
        points={points}
        fill={props.selected ? "rgba(0,255,208,0.16)" : "rgba(0,0,0,0.2)"}
        stroke={props.selected ? "rgba(0,255,208,0.95)" : "rgba(0,0,0,0.28)"}
        strokeWidth={props.selected ? 3 : 1}
        style={{
          filter: props.selected
            ? "drop-shadow(0 0 10px rgba(0,255,208,0.62))"
            : "blur(0.3px)",
        }}
      />
    </svg>
  );
}

function distance(
  left: { x: number; y: number },
  right: { x: number; y: number },
) {
  return Math.hypot(right.x - left.x, right.y - left.y);
}
