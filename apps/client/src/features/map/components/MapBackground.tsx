import { memo } from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";

interface Props {
  image?: string;
  zoom?: number;
}

function MapBackground({ image, zoom = 1 }: Props) {
  if (!image) return null;

  const shouldSharpen = shouldSharpenZoom(zoom);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#202020",
      }}
    >
      <img
        src={resolveAssetUrl(image)}
        draggable={false}
        decoding="sync"
        loading="eager"
        fetchPriority="high"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          imageRendering: shouldSharpen
            ? ("-webkit-optimize-contrast" as CanvasImageRendering)
            : "auto",
          filter: shouldSharpen ? "contrast(1.015) saturate(1.015)" : undefined,
        }}
      />
    </div>
  );
}

type CanvasImageRendering =
  | "auto"
  | "crisp-edges"
  | "pixelated"
  | "-webkit-optimize-contrast";

function areMapBackgroundPropsEqual(previous: Props, next: Props) {
  return (
    previous.image === next.image &&
    shouldSharpenZoom(previous.zoom ?? 1) === shouldSharpenZoom(next.zoom ?? 1)
  );
}

function shouldSharpenZoom(zoom: number) {
  return zoom >= 1.35;
}

export default memo(MapBackground, areMapBackgroundPropsEqual);
