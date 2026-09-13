import { useEffect, useState } from "react";
import { Box3, Group, LoadingManager, Mesh, SkinnedMesh, Texture, Vector3, type Material, type Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { MAX_GLB_BYTES, validateGlb } from "@shared/rules/glbRules";
import { MODEL_ASSET_PATH } from "@shared/rules/scene3dRules";
import { resolveAssetUrl } from "@/features/assets/assetApi";

type Entry = { refs: number; promise: Promise<Group>; root?: Group; timer?: ReturnType<typeof setTimeout>; controller: AbortController };
const cache = new Map<string, Entry>();
function dispose(root: Group) {
  const resources = new Set<{ dispose(): void }>();
  root.traverse((o) => { if (o instanceof Mesh) {
    if (o instanceof SkinnedMesh) resources.add(o.skeleton);
    resources.add(o.geometry);
    for (const material of (Array.isArray(o.material) ? o.material : [o.material]) as Material[]) {
      resources.add(material);
      for (const value of Object.values(material)) if (value instanceof Texture) resources.add(value);
    }
  } });
  const images = new Set<{ close(): void }>();
  resources.forEach((resource) => { resource.dispose(); if (resource instanceof Texture && typeof resource.image?.close === "function") images.add(resource.image); });
  images.forEach((image) => image.close());
}
function acquire(path: string) {
  let entry = cache.get(path);
  if (!entry) {
    const controller = new AbortController();
    const pending: Entry = { refs: 0, controller, promise: Promise.resolve(new Group()) };
    pending.promise = (async () => {
      if (!MODEL_ASSET_PATH.test(path)) throw new Error("Modelo não autorizado.");
      const response = await fetch(resolveAssetUrl(path), { signal: controller.signal });
      if (!response.ok) throw new Error("Modelo indisponível.");
      if (Number(response.headers.get("content-length")) > MAX_GLB_BYTES) throw new Error("Modelo muito grande.");
      const bytes = await response.arrayBuffer(); validateGlb(new Uint8Array(bytes));
      const manager = new LoadingManager();
      manager.setURLModifier((url) => { if (!url.startsWith("blob:")) throw new Error("Recurso externo bloqueado."); return url; });
      const gltf = await new GLTFLoader(manager).parseAsync(bytes, "");
      pending.root = new Group();
      pending.root.add(...gltf.scenes);
      if (!pending.refs) { dispose(pending.root); pending.root = undefined; throw new Error("Carregamento cancelado."); }
      return gltf.scene;
    })();
    entry = pending; cache.set(path, entry);
  }
  clearTimeout(entry.timer); entry.refs++;
  return entry;
}
function release(path: string, entry: Entry) {
  entry.refs--;
  if (!entry.refs) entry.timer = setTimeout(() => {
    if (entry.refs) return;
    entry.controller.abort(); if (entry.root) dispose(entry.root);
    if (cache.get(path) === entry) cache.delete(path);
  }, 0);
}
export default function ModelAsset3D({ url }: { url?: string }) {
  const [model, setModel] = useState<Object3D | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setModel(null); setFailed(false);
    if (!url) { setFailed(true); return; }
    let active = true;
    let instance: Object3D | undefined;
    const entry = acquire(url);
    entry.promise.then((root) => {
      if (!active) return;
      instance = clone(root);
      const box = new Box3().setFromObject(instance), size = box.getSize(new Vector3()), center = box.getCenter(new Vector3());
      if (![...size.toArray(), ...center.toArray()].every(Number.isFinite)) throw new Error("Geometria inválida.");
      const scale = 1 / Math.max(size.x, size.y, size.z, 0.001);
      instance.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale); instance.scale.setScalar(scale);
      setModel(instance);
    }).catch(() => { if (active) setFailed(true); });
    return () => {
      active = false;
      instance?.traverse((object) => { if (object instanceof SkinnedMesh) object.skeleton.dispose(); });
      release(url, entry);
    };
  }, [url]);
  return model ? <primitive object={model} dispose={null} /> : <mesh name={failed ? "model-error-placeholder" : "model-loading-placeholder"} position={[0, 0.5, 0]}><boxGeometry /><meshBasicMaterial color={failed ? "#d48a40" : "#858585"} wireframe /></mesh>;
}
