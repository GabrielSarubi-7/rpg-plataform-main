import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Plane, Raycaster, Vector2, Vector3, type Object3D } from "three";
import { getTokenCenter } from "@shared/rules/targetingRules";
import type { Token } from "@shared/types/token";
import type { Scene3DProps } from "../types";
import { constrainTokenPosition, legacyTokenToWorldPosition, worldPointToPixels } from "../utils/coordinates3d";

export default function SceneInputController(props: Scene3DProps) {
  const { gl, get } = useThree();
  const latest = useRef(props);
  latest.current = props;
  useEffect(() => {
    const canvas = gl.domElement;
    const raycaster = new Raycaster();
    const ground = new Plane(new Vector3(0, 1, 0), 0);
    const pointer = new Vector2();
    const intersection = new Vector3();
    let drag: { token: Token; object: Object3D; offsetX: number; offsetY: number; x: number; y: number; pointerId: number; startX: number; startY: number; moved: boolean } | null = null;
    let controlsEnabled = true;
    const controls = () => get().controls as unknown as { enabled: boolean } | null;
    const setRay = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, get().camera);
    };
    const groundPixels = () => raycaster.ray.intersectPlane(ground, intersection)
      ? worldPointToPixels(intersection, latest.current.cellSize) : null;
    const pick = () => {
      const objects = Object.keys(latest.current.tokens).flatMap((id) => {
        const object = get().scene.getObjectByName(`token:${id}`);
        return object ? [object] : [];
      });
      for (const hit of raycaster.intersectObjects(objects, true)) {
        let object: Object3D | null = hit.object;
        while (object && object.userData.entityType !== "token") object = object.parent;
        const token = object && latest.current.tokens[object.userData.entityId];
        if (object && token) return { object, token };
      }
      return null;
    };
    const stop = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation(); };
    const finish = (commit: boolean) => {
      const current = drag;
      if (!current) return;
      drag = null;
      if (canvas.hasPointerCapture(current.pointerId)) canvas.releasePointerCapture(current.pointerId);
      const control = controls();
      if (control) control.enabled = controlsEnabled;
      const p = latest.current;
      const token = p.tokens[current.token.id];
      // A remote update, permission/turn change, or action activation cancels
      // an obsolete drag instead of overwriting newer authoritative state.
      const unchanged = token && token.x === current.token.x && token.y === current.token.y && token.elevation === current.token.elevation && token.widthCells === current.token.widthCells && token.heightCells === current.token.heightCells;
      const canCommit = commit && current.moved && unchanged && !p.isTargeting && p.canControlToken(token);
      const position = legacyTokenToWorldPosition(canCommit ? { ...token, x: current.x, y: current.y } : token ?? current.token, p.cellSize);
      current.object.position.set(position.x, position.y, position.z);
      get().invalidate();
      if (canCommit && (current.x !== token.x || current.y !== token.y)) p.onMoveToken(token.id, { x: current.x, y: current.y });
    };
    const down = (event: PointerEvent) => {
      if (drag) { stop(event); return; }
      if (event.button !== 0 && event.button !== 2) return;
      setRay(event);
      const p = latest.current;
      const hit = pick();
      if (event.button === 2) {
        if (p.isTargeting) { stop(event); p.onCancelAction(); return; }
        if (hit) {
          stop(event);
          if (p.canControlToken(hit.token)) p.onTokenContextMenu(hit.token, { x: event.clientX, y: event.clientY });
        } else p.onCloseMenu();
        return;
      }
      stop(event);
      p.onCloseMenu();
      if (p.isTargeting) {
        const point = hit ? getTokenCenter(hit.token, p.cellSize) : groundPixels();
        if (point) { p.onTargetPoint(point); p.onConfirmAction(point); }
        return;
      }
      if (!hit) { p.onSelectToken(null); return; }
      if (!p.canControlToken(hit.token)) return;
      p.onSelectToken(hit.token.id);
      const point = groundPixels();
      if (!point) return;
      const control = controls();
      controlsEnabled = control?.enabled ?? true;
      if (control) control.enabled = false;
      drag = { ...hit, offsetX: point.x - hit.token.x, offsetY: point.y - hit.token.y, x: hit.token.x, y: hit.token.y, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, moved: false };
      canvas.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      setRay(event);
      const p = latest.current;
      if (drag) {
        stop(event);
        if (event.pointerId !== drag.pointerId) return;
        if (!p.tokens[drag.token.id] || !p.canControlToken(p.tokens[drag.token.id]) || p.isTargeting) { finish(false); return; }
        const point = groundPixels();
        if (!point) return;
        drag.moved ||= Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) >= 4;
        if (!drag.moved) return;
        const next = constrainTokenPosition({ x: point.x - drag.offsetX, y: point.y - drag.offsetY }, drag.token, p.cellSize, p.mapWidth, p.mapHeight);
        drag.x = next.x; drag.y = next.y;
        const position = legacyTokenToWorldPosition({ ...drag.token, ...next }, p.cellSize);
        drag.object.position.set(position.x, position.y, position.z);
        get().invalidate();
      } else if (p.isTargeting) {
        const hit = pick();
        const point = hit ? getTokenCenter(hit.token, p.cellSize) : groundPixels();
        if (point) p.onTargetPoint(point);
      }
    };
    const up = (event: PointerEvent) => { if (drag && event.button === 0 && event.pointerId === drag.pointerId) { move(event); finish(true); stop(event); } };
    const cancel = () => finish(false);
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") cancel(); };
    const context = (event: MouseEvent) => event.preventDefault();
    canvas.addEventListener("pointerdown", down, true);
    canvas.addEventListener("pointermove", move, true);
    canvas.addEventListener("pointerup", up, true);
    canvas.addEventListener("pointercancel", cancel);
    canvas.addEventListener("lostpointercapture", cancel);
    canvas.addEventListener("contextmenu", context);
    window.addEventListener("blur", cancel);
    window.addEventListener("keydown", key);
    return () => {
      cancel();
      canvas.removeEventListener("pointerdown", down, true);
      canvas.removeEventListener("pointermove", move, true);
      canvas.removeEventListener("pointerup", up, true);
      canvas.removeEventListener("pointercancel", cancel);
      canvas.removeEventListener("lostpointercapture", cancel);
      canvas.removeEventListener("contextmenu", context);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("keydown", key);
    };
  }, [gl, get, props.cellSize, props.mapWidth, props.mapHeight]);
  return null;
}
