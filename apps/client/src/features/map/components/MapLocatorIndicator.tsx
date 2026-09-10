import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { clamp } from "@shared/utils/math";

import type { Camera } from "../hooks/useCamera";
import { worldToScreen } from "../utils/coords";

import styles from "./MapLocatorIndicator.module.css";

interface Props {
  width: number;
  height: number;
  camera: Camera;
  leftDockCollapsed: boolean;
  rightSidebarCollapsed: boolean;
  onCenterMap: (screenX: number, screenY: number) => void;
}

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Point {
  x: number;
  y: number;
}

type LocatorStyle = CSSProperties & {
  "--map-locator-angle": string;
};

const SCREEN_MARGIN = 18;
const BUTTON_RADIUS = 23;

export default function MapLocatorIndicator({
  width,
  height,
  camera,
  leftDockCollapsed,
  rightSidebarCollapsed,
  onCenterMap,
}: Props) {
  const viewport = useViewportSize();
  const locator = useMemo(
    () =>
      getLocatorPosition({
        width,
        height,
        camera,
        viewport,
        leftDockCollapsed,
        rightSidebarCollapsed,
      }),
    [
      camera,
      height,
      leftDockCollapsed,
      rightSidebarCollapsed,
      viewport,
      width,
    ],
  );

  if (!locator) return null;

  return (
    <button
      data-ui-layer="true"
      type="button"
      className={styles.locator}
      style={
        {
          left: locator.x,
          top: locator.y,
          "--map-locator-angle": `${locator.angle}deg`,
        } as LocatorStyle
      }
      onClick={() => onCenterMap(locator.centerX, locator.centerY)}
      title="Voltar ao centro do mapa"
      aria-label="Voltar ao centro do mapa"
    >
      <span className={styles.arrow} aria-hidden>
        ➜
      </span>
    </button>
  );
}

function getLocatorPosition(input: {
  width: number;
  height: number;
  camera: Camera;
  viewport: Point;
  leftDockCollapsed: boolean;
  rightSidebarCollapsed: boolean;
}) {
  const { width, height, camera, viewport } = input;

  if (width <= 0 || height <= 0 || viewport.x <= 0 || viewport.y <= 0) {
    return null;
  }

  const leftSpace = input.leftDockCollapsed ? 62 : 76;
  const rightSpace = input.rightSidebarCollapsed
    ? 62
    : Math.min(536, Math.max(96, viewport.x - 96));
  const visibleRect: Rect = {
    left: leftSpace,
    right: Math.max(leftSpace + 1, viewport.x - rightSpace),
    top: 0,
    bottom: viewport.y,
  };
  const mapBounds = getProjectedMapBounds(width, height, camera, viewport);

  if (!mapBounds || rectsIntersect(mapBounds, visibleRect)) {
    return null;
  }

  const visibleCenter = {
    x: (visibleRect.left + visibleRect.right) / 2,
    y: (visibleRect.top + visibleRect.bottom) / 2,
  };
  const target = {
    x: clamp(visibleCenter.x, mapBounds.left, mapBounds.right),
    y: clamp(visibleCenter.y, mapBounds.top, mapBounds.bottom),
  };
  const cornerLeft = visibleRect.left + SCREEN_MARGIN + BUTTON_RADIUS;
  const cornerRight = Math.max(
    cornerLeft,
    visibleRect.right - SCREEN_MARGIN - BUTTON_RADIUS,
  );
  const cornerTop = SCREEN_MARGIN + BUTTON_RADIUS;
  const cornerBottom = Math.max(
    cornerTop,
    viewport.y - SCREEN_MARGIN - BUTTON_RADIUS,
  );
  const corners = [
    { x: cornerLeft, y: cornerTop },
    { x: cornerRight, y: cornerTop },
    { x: cornerLeft, y: cornerBottom },
    { x: cornerRight, y: cornerBottom },
  ];
  const position = corners.reduce((closest, current) =>
    distanceSquared(current, target) < distanceSquared(closest, target)
      ? current
      : closest,
  );

  return {
    ...position,
    centerX: visibleCenter.x,
    centerY: visibleCenter.y,
    angle:
      (Math.atan2(target.y - position.y, target.x - position.x) * 180) /
      Math.PI,
  };
}

function getProjectedMapBounds(
  width: number,
  height: number,
  camera: Camera,
  viewport: Point,
): Rect | null {
  const corners = [
    worldToScreen(0, 0, camera, viewport.x, viewport.y),
    worldToScreen(width, 0, camera, viewport.x, viewport.y),
    worldToScreen(width, height, camera, viewport.x, viewport.y),
    worldToScreen(0, height, camera, viewport.x, viewport.y),
  ].filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));

  if (corners.length === 0) return null;

  return {
    left: Math.min(...corners.map((point) => point.x)),
    right: Math.max(...corners.map((point) => point.x)),
    top: Math.min(...corners.map((point) => point.y)),
    bottom: Math.max(...corners.map((point) => point.y)),
  };
}

function rectsIntersect(left: Rect, right: Rect) {
  return (
    left.right >= right.left &&
    left.left <= right.right &&
    left.bottom >= right.top &&
    left.top <= right.bottom
  );
}

function distanceSquared(left: Point, right: Point) {
  const dx = left.x - right.x;
  const dy = left.y - right.y;

  return dx * dx + dy * dy;
}

function useViewportSize() {
  const [viewport, setViewport] = useState(readViewportSize);

  useEffect(() => {
    const updateViewport = () => setViewport(readViewportSize());

    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
}

function readViewportSize(): Point {
  return {
    x: typeof window === "undefined" ? 1280 : window.innerWidth,
    y: typeof window === "undefined" ? 720 : window.innerHeight,
  };
}
