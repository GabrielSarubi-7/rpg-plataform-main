import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import type { Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import type { TransformMode } from "../objects/SceneObjects3D";

// Construct in an effect and dispose explicitly: native listeners must not survive
// StrictMode, selection changes, map switches or leaving the editor.
export default function OwnedTransformControls({ object, mode, snap, onCommit }: { object: Object3D; mode: TransformMode; snap: number | null; onCommit: () => void }) {
  const { camera, gl, invalidate, get } = useThree();
  const [control, setControl] = useState<TransformControls | null>(null);
  const latest = useRef(onCommit); latest.current = onCommit;
  useEffect(() => {
    const next = new TransformControls(camera, gl.domElement);
    next.attach(object);
    next.getHelper().userData.editorControls = next;
    const orbit = get().controls as unknown as { enabled: boolean } | null;
    const enabled = orbit?.enabled ?? true;
    const dragging = (event: { value?: unknown }) => { if (orbit) orbit.enabled = event.value ? false : enabled; };
    const commit = () => latest.current();
    const cancel = () => { if (next.dragging) { next.reset(); next.dragging = false; next.axis = null; } if (orbit) orbit.enabled = enabled; };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") cancel(); };
    const change = () => invalidate();
    next.addEventListener("change", change);
    next.addEventListener("dragging-changed", dragging);
    next.addEventListener("mouseUp", commit);
    window.addEventListener("keydown", key); window.addEventListener("blur", cancel); gl.domElement.addEventListener("pointercancel", cancel);
    setControl(next); invalidate();
    return () => {
      next.removeEventListener("change", change); next.removeEventListener("dragging-changed", dragging); next.removeEventListener("mouseUp", commit);
      window.removeEventListener("keydown", key); window.removeEventListener("blur", cancel); gl.domElement.removeEventListener("pointercancel", cancel);
      cancel(); next.detach(); next.dispose();
    };
  }, [object, camera, gl, get, invalidate]);
  useEffect(() => { if (control) { control.setMode(mode); control.setTranslationSnap(snap); control.setRotationSnap(snap === null ? null : Math.PI / 12); control.setScaleSnap(snap === null ? null : 0.25); invalidate(); } }, [control, mode, snap, invalidate]);
  return control ? <primitive object={control.getHelper()} /> : null;
}
