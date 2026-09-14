import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei/web/Html";
import { Line } from "@react-three/drei/core/Line";
import { Color, DoubleSide, InstancedMesh, Object3D, SRGBColorSpace, Texture, TextureLoader } from "three";
import type { MapLayerConfig } from "@shared/types/map";
import type { MapAnnotation } from "@shared/types/annotation";
import { isFogAreaVisible, isFogCellHidden } from "@shared/rules/fogVisibility";
import { resolveAssetUrl } from "@/features/assets/assetApi";

export type Instance = { position: [number, number, number]; scale: [number, number, number]; color: string };
const terrainColors: Record<string, string> = { stone: "#76777e", grass: "#547e3a", dirt: "#806046", wood: "#8f6842", water: "#377aab", lava: "#ed5528", snow: "#e5edf0", void: "#16141e" };
const wallColors: Record<string, string> = { stone: "#888891", wood: "#865f36", metal: "#9ba8b3", force: "#74a7ed" };

export function Instances({ items, shape = "box", name, opacity = 1 }: { items: Instance[]; shape?: "box" | "cone" | "sphere" | "cylinder" | "plane"; name: string; opacity?: number }) {
  const ref = useRef<InstancedMesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new Object3D(), color = new Color();
    items.forEach((item, i) => {
      dummy.position.fromArray(item.position); dummy.scale.fromArray(item.scale);
      if (shape === "plane") { dummy.rotation.x = -Math.PI / 2; dummy.scale.set(item.scale[0], item.scale[2], 1); }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, color.set(item.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere(); invalidate();
  }, [items, shape, invalidate]);
  if (!items.length) return null;
  return <instancedMesh key={items.length} ref={ref} args={[undefined, undefined, items.length]} name={name} castShadow={shape !== "plane"} receiveShadow={shape !== "plane"}>
    {shape === "box" ? <boxGeometry /> : shape === "cone" ? <coneGeometry args={[0.5, 1, 8]} /> : shape === "sphere" ? <icosahedronGeometry args={[0.5, 1]} /> : shape === "plane" ? <planeGeometry /> : <cylinderGeometry args={[0.5, 0.5, 1, 10]} />}
    {shape === "plane" ? <meshBasicMaterial transparent={opacity < 1} opacity={opacity} /> : <meshStandardMaterial roughness={0.95} transparent={opacity < 1} opacity={opacity} />}
  </instancedMesh>;
}

export class AssetBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback ?? <mesh position={[0, 0.5, 0]}><boxGeometry /><meshBasicMaterial color="#d48a40" wireframe /></mesh> : this.props.children; }
}

export default function LegacyLayers3D({ layer, width, depth, cellSize, isGm, annotations }: { layer: MapLayerConfig; width: number; depth: number; cellSize: number; isGm: boolean; annotations: Record<string, MapAnnotation> }) {
  const batches = useMemo(() => {
    const terrain: Instance[] = [], walls: Instance[] = [], boxes: Instance[] = [], spheres: Instance[] = [], cones: Instance[] = [], cylinders: Instance[] = [], fog: Instance[] = [];
    const visible = (x: number, z: number, w = 1, d = 1) => isGm || isFogAreaVisible(layer.fogOfWar, x, z, w, d);
    for (const cell of Object.values(layer.terrainCells)) {
      if (!visible(cell.x, cell.y)) continue;
      const h = cell.height / 5;
      terrain.push({ position: [cell.x + 0.5, h >= 0 ? h / 2 + 0.015 : h, cell.y + 0.5], scale: [1, h >= 0 ? h + 0.03 : 0.03, 1], color: terrainColors[cell.type] });
    }
    for (const wall of layer.walls) {
      if (!visible(wall.x, wall.y)) continue;
      const horizontal = wall.orientation === "horizontal", h = Math.max(0.05, wall.height / 5);
      walls.push({ position: [wall.x + (horizontal ? 0.5 : 0), h / 2, wall.y + (horizontal ? 0 : 0.5)], scale: [horizontal ? 1 : 0.1, h, horizontal ? 0.1 : 1], color: wallColors[wall.material] });
    }
    for (const o of layer.objects) {
      if (!visible(o.x, o.y, o.widthCells, o.heightCells)) continue;
      const h = Math.max(0.1, o.height / 5), base = o.elevation / 5;
      const item: Instance = { position: [o.x + o.widthCells / 2, base + h / 2, o.y + o.heightCells / 2], scale: [o.widthCells, h, o.heightCells], color: "#926d45" };
      if (o.type === "tree") { cylinders.push({ ...item, scale: [0.2, h, 0.2] }); cones.push({ ...item, position: [item.position[0], base + h * 0.7, item.position[2]], scale: [o.widthCells, h * 0.8, o.heightCells], color: "#42623b" }); }
      else if (o.type === "rock") spheres.push({ ...item, color: "#80848a" });
      else if (o.type === "pillar") cylinders.push({ ...item, color: "#acaaa2" });
      else if (o.type === "campfire") cones.push({ ...item, color: "#f28025" });
      else if (o.type === "stairs") for (let n = 0; n < 5; n++) boxes.push({ ...item, position: [item.position[0], base + h * (n + 1) / 10, o.y + o.heightCells * (n + 0.5) / 5], scale: [o.widthCells, h * (n + 1) / 5, o.heightCells / 5] });
      else boxes.push(item);
    }
    if (layer.fogOfWar.enabled) for (let z = 0; z < depth; z++) for (let x = 0; x < width; x++) {
      if (isFogCellHidden(layer.fogOfWar, x, z)) fog.push({ position: [x + 0.5, Math.max(0, (layer.terrainCells[`${x}:${z}`]?.height ?? 0) / 5) + 0.065, z + 0.5], scale: [1.002, 0.01, 1.002], color: "#050506" });
    }
    return { terrain, walls, boxes, spheres, cones, cylinders, fog };
  }, [layer, width, depth, isGm]);
  return <group name="legacy-layers">
    <Instances name="terrain3d" items={batches.terrain} />
    <Instances name="walls3d" items={batches.walls} />
    <Instances name="legacy-boxes" items={batches.boxes} /><Instances name="legacy-rocks" shape="sphere" items={batches.spheres} />
    <Instances name="legacy-cones" shape="cone" items={batches.cones} /><Instances name="legacy-pillars" shape="cylinder" items={batches.cylinders} />
    {layer.images.map((image, index) => <group key={image.id} position={[(image.x + image.width / 2) / cellSize, 0.025 + index * 0.0001, (image.y + image.height / 2) / cellSize]}>
      <AssetBoundary key={image.image}><Suspense fallback={null}><ImagePlane image={image.image} width={image.width / cellSize} depth={image.height / cellSize} /></Suspense></AssetBoundary>
    </group>)}
    {Object.values(annotations).filter((a) => isGm || a.visibility !== "gm").map((a) => a.type === "pen" ?
      (a.points.length > 1 && (isGm || a.points.every((p) => isFogAreaVisible(layer.fogOfWar, p.x / cellSize, p.y / cellSize))) && <Line key={a.id} points={a.points.map((p) => [p.x / cellSize, 0.08, p.y / cellSize])} color={a.color} lineWidth={a.size} />) :
      ((isGm || isFogAreaVisible(layer.fogOfWar, a.x / cellSize, a.y / cellSize)) && <Html key={a.id} position={[a.x / cellSize, 0.09, a.y / cellSize]} style={{ pointerEvents: "none", color: a.color, fontSize: a.fontSize, whiteSpace: "pre-wrap", width: 240 }}>{a.text}</Html>))}
    <Instances name="fog3d" shape="plane" items={batches.fog} opacity={isGm ? layer.fogOfWar.opacity : 1} />
  </group>;
}
function ImagePlane({ image, width, depth }: { image: string; width: number; depth: number }) {
  const [texture, setTexture] = useState<Texture | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true; setTexture(null); setFailed(false);
    const loaded = new TextureLoader().load(resolveAssetUrl(image), (value) => { if (active) { value.colorSpace = SRGBColorSpace; setTexture(value); } else value.dispose(); }, undefined, () => { if (active) setFailed(true); });
    return () => { active = false; loaded.dispose(); };
  }, [image]);
  return <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width, depth]} /><meshBasicMaterial map={texture} color={texture ? "white" : failed ? "#d48a40" : "#777777"} transparent side={DoubleSide} /></mesh>;
}
