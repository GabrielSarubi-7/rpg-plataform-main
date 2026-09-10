import type { Camera } from "../hooks/useCamera";

export function getCameraPerspective(camera: Camera) {
  if (camera.pitch <= 0) {
    return 0;
  }

  const viewportHeight =
    typeof window === "undefined" ? 720 : window.innerHeight;
  const horizonSafeDistance =
    (viewportHeight / 2 + 160) * Math.tan(toRadians(camera.pitch));
  const cinematicDistance = 3200 - camera.zoom * 115;

  return Math.max(
    1400,
    horizonSafeDistance,
    Math.min(3200, cinematicDistance),
  );
}

export function screenToWorld(
  screenX: number,
  screenY: number,
  camera: Camera,
  viewportWidth = typeof window === "undefined" ? 1280 : window.innerWidth,
  viewportHeight = typeof window === "undefined" ? 720 : window.innerHeight,
) {
  const pitchRadians = toRadians(camera.pitch);
  const yawRadians = toRadians(camera.yaw);
  const cosPitch = Math.cos(pitchRadians);
  const sinPitch = Math.sin(pitchRadians);
  const cosYaw = Math.cos(yawRadians);
  const sinYaw = Math.sin(yawRadians);
  const screenRelativeX = screenX - viewportWidth / 2;
  const screenRelativeY = screenY - viewportHeight / 2;
  const perspective = getCameraPerspective(camera);

  let rotatedX = screenRelativeX;
  let rotatedY = screenRelativeY;

  if (perspective > 0 && Math.abs(sinPitch) > 0.0001) {
    const denominator = cosPitch * perspective + screenRelativeY * sinPitch;
    const safeDenominator =
      Math.abs(denominator) < 0.001
        ? denominator < 0
          ? -0.001
          : 0.001
        : denominator;

    rotatedY = (screenRelativeY * perspective) / safeDenominator;
    rotatedX =
      screenRelativeX *
      ((perspective - sinPitch * rotatedY) / perspective);
  } else if (Math.abs(cosPitch) > 0.0001) {
    rotatedY = screenRelativeY / cosPitch;
  }

  const projectedX = rotatedX / camera.zoom;
  const projectedY = rotatedY / camera.zoom;

  return {
    x: camera.centerX + cosYaw * projectedX + sinYaw * projectedY,
    y: camera.centerY - sinYaw * projectedX + cosYaw * projectedY,
  };
}

export function worldToScreen(
  worldX: number,
  worldY: number,
  camera: Camera,
  viewportWidth = typeof window === "undefined" ? 1280 : window.innerWidth,
  viewportHeight = typeof window === "undefined" ? 720 : window.innerHeight,
) {
  const pitchRadians = toRadians(camera.pitch);
  const yawRadians = toRadians(camera.yaw);
  const cosPitch = Math.cos(pitchRadians);
  const sinPitch = Math.sin(pitchRadians);
  const cosYaw = Math.cos(yawRadians);
  const sinYaw = Math.sin(yawRadians);
  const perspective = getCameraPerspective(camera);
  const relativeX = worldX - camera.centerX;
  const relativeY = worldY - camera.centerY;
  const projectedX =
    (cosYaw * relativeX - sinYaw * relativeY) * camera.zoom;
  const projectedY =
    (sinYaw * relativeX + cosYaw * relativeY) * camera.zoom;

  if (perspective <= 0) {
    return {
      x: viewportWidth / 2 + projectedX,
      y: viewportHeight / 2 + projectedY,
      scale: camera.zoom,
      depth: projectedY,
    };
  }

  const distanceToCamera = perspective - projectedY * sinPitch;
  const safeDistance =
    Math.abs(distanceToCamera) < 0.001
      ? distanceToCamera < 0
        ? -0.001
        : 0.001
      : distanceToCamera;
  const perspectiveScale = perspective / safeDistance;

  return {
    x: viewportWidth / 2 + projectedX * perspectiveScale,
    y: viewportHeight / 2 + projectedY * cosPitch * perspectiveScale,
    scale: Math.max(0.05, Math.min(12, camera.zoom * perspectiveScale)),
    depth: projectedY,
  };
}

export function screenDeltaToWorldDelta(
  dx: number,
  dy: number,
  camera: Camera,
  viewportWidth = typeof window === "undefined" ? 1280 : window.innerWidth,
  viewportHeight = typeof window === "undefined" ? 720 : window.innerHeight,
) {
  const before = screenToWorld(
    viewportWidth / 2,
    viewportHeight / 2,
    camera,
    viewportWidth,
    viewportHeight,
  );
  const after = screenToWorld(
    viewportWidth / 2 + dx,
    viewportHeight / 2 + dy,
    camera,
    viewportWidth,
    viewportHeight,
  );

  return {
    x: after.x - before.x,
    y: after.y - before.y,
  };
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
