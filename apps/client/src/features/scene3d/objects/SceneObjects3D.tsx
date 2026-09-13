import { useEffect, useRef, useState } from "react";
import OwnedTransformControls from "../editor/OwnedTransformControls";
import { Group, MathUtils } from "three";
import type { Scene3DConfig, SceneObject3DConfig } from "@shared/types/scene3d";
import ModelAsset3D from "./ModelAsset3D";
export type TransformMode = "translate" | "rotate" | "scale";
export default function SceneObjects3D({ scene, editing, selectedId, onSelect, mode, onTransform }: {
  scene: Scene3DConfig; editing: boolean; selectedId: string | null; onSelect: (id: string | null) => void; mode: TransformMode;
  onTransform: (object: SceneObject3DConfig) => void;
}) {
  return <group name="scene-objects">{scene.objects.filter((o) => editing || o.visibility !== "hidden").map((object) => <EditableObject key={object.id} object={object} selected={editing && selectedId === object.id} editing={editing} mode={mode} scene={scene} onSelect={onSelect} onTransform={onTransform} />)}</group>;
}
function EditableObject({ object, selected, editing, mode, scene, onSelect, onTransform }: { object: SceneObject3DConfig; selected: boolean; editing: boolean; mode: TransformMode; scene: Scene3DConfig; onSelect: (id: string) => void; onTransform: (object: SceneObject3DConfig) => void }) {
  const ref = useRef<Group>(null);
  const [ready, setReady] = useState(false);
  const t = object.transform;
  useEffect(() => { setReady(true); }, []);
  const commit = () => {
    const group = ref.current;
    if (!group) return;
    onTransform({ ...object, transform: { position: { x: group.position.x, y: group.position.y, z: group.position.z }, rotation: { x: MathUtils.radToDeg(group.rotation.x), y: MathUtils.radToDeg(group.rotation.y), z: MathUtils.radToDeg(group.rotation.z) }, scale: { x: group.scale.x, y: group.scale.y, z: group.scale.z } } });
  };
  return <>
    <group ref={ref} name={`scene-object:${object.id}`} position={[t.position.x, t.position.y, t.position.z]} rotation={[t.rotation.x, t.rotation.y, t.rotation.z].map(MathUtils.degToRad) as [number, number, number]} scale={[t.scale.x, t.scale.y, t.scale.z]}
      onPointerDown={(e) => { if (editing) { e.stopPropagation(); onSelect(object.id); } }}>
      {object.kind === "model" ? <ModelAsset3D url={object.assetUrl} /> : <mesh position={[0, object.primitive === "plane" ? 0.015 : 0.5, 0]}>
        {object.primitive === "sphere" ? <sphereGeometry args={[0.5, 16, 12]} /> : object.primitive === "cylinder" ? <cylinderGeometry args={[0.5, 0.5, 1, 16]} /> : <boxGeometry args={[1, object.primitive === "plane" ? 0.03 : 1, 1]} />}
        <meshStandardMaterial color={object.color} emissive={selected ? "#15382c" : "#000000"} roughness={0.85} />
      </mesh>}
    </group>
    {selected && ready && ref.current && <OwnedTransformControls object={ref.current} mode={mode} snap={scene.settings.snapEnabled ? scene.settings.snapSize : null} onCommit={commit} />}
  </>;
}
