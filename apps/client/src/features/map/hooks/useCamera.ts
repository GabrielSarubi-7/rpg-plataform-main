import { useCallback, useState } from "react";
import {
  screenDeltaToWorldDelta as screenDeltaToWorldDeltaProjected,
  screenToWorld,
} from "../utils/coords";

export interface Camera {
  centerX: number;
  centerY: number;
  zoom: number;
  pitch: number;
  yaw: number;
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 10;
const MAX_PITCH = 72;
const PITCH_ZOOM_RANGE = 4.5;

function clampZoom(value: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
}

function getPitchForZoom(zoom: number) {
  const normalized = Math.max(0, Math.min(1, (zoom - 1) / PITCH_ZOOM_RANGE));

  return normalized * MAX_PITCH;
}

function getViewportSize() {
  return {
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: typeof window === "undefined" ? 720 : window.innerHeight,
  };
}

export function useCamera(
  mapWidth = 0,
  mapHeight = 0,
  mode: "2d" | "2.5d" = "2d",
) {
  const [camera, setCamera] = useState<Camera>(() => ({
    centerX: mapWidth / 2,
    centerY: mapHeight / 2,
    zoom: 1,
    pitch: 0,
    yaw: 0,
  }));

  const move = (dx: number, dy: number) => {
    setCamera((prev) => {
      const worldDelta = screenDeltaToWorldDelta(dx, dy, prev);

      return {
        ...prev,
        centerX: prev.centerX - worldDelta.x,
        centerY: prev.centerY - worldDelta.y,
      };
    });
  };

  const zoomAt = (mouseX: number, mouseY: number, delta: number) => {
    setCamera((prev) => {
      const zoomFactor = 1 - delta * 0.001;
      const nextZoom = clampZoom(prev.zoom * zoomFactor);
      const before = screenToWorldPoint(mouseX, mouseY, prev);
      const nextCamera = {
        ...prev,
        zoom: nextZoom,
        pitch: mode === "2.5d" ? getPitchForZoom(nextZoom) : 0,
        yaw: mode === "2.5d" ? prev.yaw : 0,
      };
      const after = screenToWorldPoint(mouseX, mouseY, nextCamera);

      return {
        ...nextCamera,
        centerX: nextCamera.centerX + (before.x - after.x),
        centerY: nextCamera.centerY + (before.y - after.y),
      };
    });
  };

  const rotateBy = (degrees: number) => {
    if (mode !== "2.5d") return;

    setCamera((prev) => ({
      ...prev,
      yaw: normalizeDegrees(prev.yaw + degrees),
    }));
  };

  const setZoom = (zoom: number) => {
    const nextZoom = clampZoom(zoom);

    setCamera((prev) => ({
      ...prev,
      zoom: nextZoom,
      pitch: mode === "2.5d" ? getPitchForZoom(nextZoom) : 0,
      yaw: mode === "2.5d" ? prev.yaw : 0,
    }));
  };

  const setMode = useCallback((nextMode: "2d" | "2.5d") => {
    setCamera((prev) => {
      const pitch = nextMode === "2.5d" ? getPitchForZoom(prev.zoom) : 0;
      const yaw = nextMode === "2.5d" ? prev.yaw : 0;

      if (prev.pitch === pitch && prev.yaw === yaw) return prev;

      return { ...prev, pitch, yaw };
    });
  }, []);

  const resetCamera = () => {
    setCamera({
      centerX: mapWidth / 2,
      centerY: mapHeight / 2,
      zoom: 1,
      pitch: 0,
      yaw: 0,
    });
  };

  const centerOnMap = (screenX?: number, screenY?: number) => {
    setCamera((prev) => {
      const viewport = getViewportSize();
      const targetX = screenX ?? viewport.width / 2;
      const targetY = screenY ?? viewport.height / 2;
      const worldAtTarget = screenToWorld(
        targetX,
        targetY,
        prev,
        viewport.width,
        viewport.height,
      );

      return {
        ...prev,
        centerX: prev.centerX + (mapWidth / 2 - worldAtTarget.x),
        centerY: prev.centerY + (mapHeight / 2 - worldAtTarget.y),
      };
    });
  };

  return {
    camera,
    move,
    zoomAt,
    rotateBy,
    setMode,
    setZoom,
    resetCamera,
    centerOnMap,
  };
}

function screenDeltaToWorldDelta(dx: number, dy: number, camera: Camera) {
  const viewport = getViewportSize();

  return screenDeltaToWorldDeltaProjected(
    dx,
    dy,
    camera,
    viewport.width,
    viewport.height,
  );
}

function screenToWorldPoint(screenX: number, screenY: number, camera: Camera) {
  const viewport = getViewportSize();

  return screenToWorld(
    screenX,
    screenY,
    camera,
    viewport.width,
    viewport.height,
  );
}

function normalizeDegrees(value: number) {
  const normalized = value % 360;

  return normalized < 0 ? normalized + 360 : normalized;
}
