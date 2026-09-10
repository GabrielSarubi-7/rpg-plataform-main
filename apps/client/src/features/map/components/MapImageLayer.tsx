import { useEffect, useMemo, useState, type PointerEvent } from "react";

import { resolveAssetUrl } from "@/features/assets/assetApi";
import type { MapImage } from "@shared/types/map";
import { isMapImageVisibleToPlayers } from "@shared/rules/mapRules";

import type { Camera } from "../hooks/useCamera";
import { screenToWorld } from "../utils/coords";

import styles from "./MapImageLayer.module.css";

interface Props {
  images: MapImage[];
  mapWidth: number;
  mapHeight: number;
  camera: Camera;
  canManage: boolean;
  onMove: (image: MapImage) => void;
  onDelete: (imageId: string) => void;
}

type ResizeCorner = "nw" | "ne" | "se" | "sw";

interface MoveDragState {
  kind: "move";
  pointerId: number;
  imageId: string;
  offsetX: number;
  offsetY: number;
  preview: MapImage;
}

interface ResizeDragState {
  kind: "resize";
  pointerId: number;
  imageId: string;
  corner: ResizeCorner;
  anchorX: number;
  anchorY: number;
  aspectRatio: number;
  preview: MapImage;
}

type DragState = MoveDragState | ResizeDragState;

const MIN_IMAGE_SIZE = 20;
const RESIZE_CORNERS: ResizeCorner[] = ["nw", "ne", "se", "sw"];

export default function MapImageLayer({
  images,
  mapWidth,
  mapHeight,
  camera,
  canManage,
  onMove,
  onDelete,
}: Props) {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const visibleImages = useMemo(
    () =>
      images.filter(
        (image) =>
          canManage ||
          isMapImageVisibleToPlayers(image, mapWidth, mapHeight),
      ),
    [canManage, images, mapHeight, mapWidth],
  );

  useEffect(() => {
    if (
      selectedImageId &&
      !images.some((image) => image.id === selectedImageId)
    ) {
      setSelectedImageId(null);
    }
  }, [images, selectedImageId]);

  const startDrag = (
    image: MapImage,
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!canManage || event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();

    const world = screenToWorld(event.clientX, event.clientY, camera);

    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedImageId(image.id);
    setDrag({
      kind: "move",
      pointerId: event.pointerId,
      imageId: image.id,
      offsetX: world.x - image.x,
      offsetY: world.y - image.y,
      preview: image,
    });
  };

  const startResize = (
    image: MapImage,
    corner: ResizeCorner,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    if (!canManage || event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedImageId(image.id);
    setDrag({
      kind: "resize",
      pointerId: event.pointerId,
      imageId: image.id,
      corner,
      anchorX: corner.includes("w") ? image.x + image.width : image.x,
      anchorY: corner.includes("n") ? image.y + image.height : image.y,
      aspectRatio: image.width / Math.max(image.height, 1),
      preview: image,
    });
  };

  const moveDrag = (event: PointerEvent<HTMLElement>) => {
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    const world = screenToWorld(event.clientX, event.clientY, camera);

    setDrag((current) =>
      current
        ? {
            ...current,
            preview:
              current.kind === "move"
                ? {
                    ...current.preview,
                    x: world.x - current.offsetX,
                    y: world.y - current.offsetY,
                  }
                : resizeImageFromCorner(current, world),
          }
        : null,
    );
  };

  const finishDrag = (event: PointerEvent<HTMLElement>) => {
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const movedImage = drag.preview;

    setDrag(null);
    onMove(movedImage);
  };

  return (
    <div
      className={`${styles.layer} ${canManage ? styles.gmLayer : styles.playerLayer}`}
    >
      {visibleImages.map((image) => {
        const displayImage =
          drag?.imageId === image.id ? drag.preview : image;
        const isStaged = !isMapImageVisibleToPlayers(
          displayImage,
          mapWidth,
          mapHeight,
        );
        const isSelected = selectedImageId === image.id;

        return (
          <div
            key={image.id}
            className={`${styles.imageFrame} ${
              canManage ? styles.manageable : ""
            } ${isStaged ? styles.staged : ""} ${
              isSelected ? styles.selected : ""
            }`}
            style={{
              left: displayImage.x,
              top: displayImage.y,
              width: displayImage.width,
              height: displayImage.height,
            }}
            title={canManage ? displayImage.name ?? "Imagem do mapa" : undefined}
            onPointerDown={(event) => startDrag(displayImage, event)}
            onPointerMove={moveDrag}
            onPointerUp={finishDrag}
            onPointerCancel={() => setDrag(null)}
            onContextMenu={(event) => {
              if (!canManage) return;

              event.preventDefault();
              event.stopPropagation();
              setSelectedImageId(image.id);
            }}
          >
            <img
              src={resolveAssetUrl(displayImage.image)}
              alt=""
              draggable={false}
              decoding="async"
            />

            {canManage && isSelected && (
              <>
                {RESIZE_CORNERS.map((corner) => (
                  <button
                    key={corner}
                    type="button"
                    className={`${styles.resizeHandle} ${styles[corner]}`}
                    onPointerDown={(event) =>
                      startResize(displayImage, corner, event)
                    }
                    onPointerMove={moveDrag}
                    onPointerUp={finishDrag}
                    onPointerCancel={() => setDrag(null)}
                    title="Redimensionar imagem"
                    aria-label="Redimensionar imagem"
                  />
                ))}

                <button
                  type="button"
                  className={styles.deleteButton}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(image.id);
                  }}
                  title="Remover imagem"
                  aria-label="Remover imagem"
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function resizeImageFromCorner(
  drag: ResizeDragState,
  world: {
    x: number;
    y: number;
  },
): MapImage {
  const horizontalDirection = drag.corner.includes("w") ? -1 : 1;
  const verticalDirection = drag.corner.includes("n") ? -1 : 1;
  const requestedWidth = Math.max(
    MIN_IMAGE_SIZE,
    (world.x - drag.anchorX) * horizontalDirection,
  );
  const requestedHeight = Math.max(
    MIN_IMAGE_SIZE,
    (world.y - drag.anchorY) * verticalDirection,
  );
  const widthFromHeight = requestedHeight * drag.aspectRatio;
  const useWidth = requestedWidth >= widthFromHeight;
  const width = useWidth ? requestedWidth : widthFromHeight;
  const height = useWidth ? requestedWidth / drag.aspectRatio : requestedHeight;

  return {
    ...drag.preview,
    x: horizontalDirection < 0 ? drag.anchorX - width : drag.anchorX,
    y: verticalDirection < 0 ? drag.anchorY - height : drag.anchorY,
    width,
    height,
  };
}
