import { useEffect, useState } from "react";
import type { Scene3DConfig, SceneObject3DConfig, ScenePrimitive } from "@shared/types/scene3d";
import { normalizeSceneObject3D } from "@shared/rules/scene3dRules";
import { validateGlb } from "@shared/rules/glbRules";
import { uploadMediaAsset } from "@/features/assets/assetApi";
import type { TransformMode } from "../objects/SceneObjects3D";
import styles from "../components/Scene3D.module.css";

export default function SceneEditor3D({ scene, selectedId, onSelect, mode, setMode, width, depth, authToken, busy, status, saveObject, removeObject, saveSettings, sync }: {
  scene: Scene3DConfig; selectedId: string | null; onSelect: (id: string | null) => void; mode: TransformMode; setMode: (mode: TransformMode) => void;
  width: number; depth: number; authToken: string; busy: boolean; status: string;
  saveObject: (object: SceneObject3DConfig) => Promise<void>; removeObject: (id: string) => Promise<void>; saveSettings: (settings: Scene3DConfig["settings"]) => Promise<void>; sync: () => Promise<void>;
}) {
  const selected = scene.objects.find((o) => o.id === selectedId);
  const [draft, setDraft] = useState(selected);
  const [uploadStatus, setUploadStatus] = useState("");
  useEffect(() => setDraft(selected), [selected]);
  const add = async (primitive: ScenePrimitive, name: string, assetUrl?: string, door = false) => {
    const object = normalizeSceneObject3D({ id: crypto.randomUUID(), name, kind: door ? "door" : assetUrl ? "model" : "primitive", primitive, assetUrl, visibility: "public", transform: { position: { x: Math.floor(width / 2), y: 0, z: Math.floor(depth / 2) }, scale: { x: 1, y: door ? 2 : 1, z: 1 } } }, width, depth)!;
    await saveObject(object); onSelect(object.id);
  };
  const run = (operation: Promise<void>) => { void operation.catch(() => undefined); };
  return <aside className={styles.editor} data-ui-layer="true" aria-label="Editor 3D">
    <h3>Editor 3D</h3>
    <p role="status">{status || "Alterações são salvas ao concluir cada operação."}</p>
    <fieldset disabled={busy}>
      <legend>Biblioteca</legend>
      <button onClick={() => run(add("box", "Porta", undefined, true))}>Porta</button>
      {([['box', 'Caixa'], ['sphere', 'Rocha'], ['cylinder', 'Pilar'], ['plane', 'Plataforma']] as [ScenePrimitive, string][]).map(([primitive, name]) => <button key={primitive} onClick={() => run(add(primitive, name))}>{name}</button>)}
      <label>Adicionar GLB <input aria-label="Adicionar GLB" type="file" accept=".glb,model/gltf-binary" onChange={(e) => {
        const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
        setUploadStatus("Validando e enviando modelo…");
        void (async () => { if (!file.name.toLowerCase().endsWith(".glb")) throw new Error("Escolha um arquivo .glb."); validateGlb(new Uint8Array(await file.arrayBuffer())); const url = await uploadMediaAsset(authToken, file); await add("box", file.name, url); setUploadStatus("Modelo adicionado."); })().catch((error) => setUploadStatus(error.message));
      }} /></label>
      {uploadStatus && <p role="status">{uploadStatus}</p>}
    </fieldset>
    <label>Objetos <select aria-label="Objetos 3D" value={selectedId ?? ""} onChange={(e) => onSelect(e.target.value || null)}><option value="">Selecione…</option>{scene.objects.map((o) => <option key={o.id} value={o.id}>{o.name} · {o.visibility}</option>)}</select></label>
    <fieldset disabled={busy}><legend>Transformação</legend>
      {([['translate', 'Mover'], ['rotate', 'Rotacionar'], ['scale', 'Escalar']] as [TransformMode, string][]).map(([m, name]) => <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>{name}</button>)}
      <label><input type="checkbox" checked={scene.settings.snapEnabled} onChange={(e) => run(saveSettings({ ...scene.settings, snapEnabled: e.target.checked }))} /> Snap</label>
      <label><input type="checkbox" checked={scene.settings.gridVisible} onChange={(e) => run(saveSettings({ ...scene.settings, gridVisible: e.target.checked }))} /> Grid da cena</label>
      <label>Passo <select value={scene.settings.snapSize} onChange={(e) => run(saveSettings({ ...scene.settings, snapSize: Number(e.target.value) }))}>{[0.25, 0.5, 1].map((n) => <option key={n}>{n}</option>)}</select></label>
    </fieldset>
    {draft && <fieldset disabled={busy}><legend>Inspector</legend>
      <label>Nome <input aria-label="Nome do objeto" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
      <label>Visibilidade <select aria-label="Visibilidade" value={draft.visibility} onChange={(e) => setDraft({ ...draft, visibility: e.target.value as SceneObject3DConfig['visibility'] })}><option value="public">Público</option><option value="gm">Somente GM</option><option value="hidden">Oculto</option></select></label>
      <label>Cor <input type="color" value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} /></label>
      <label>Andar <select value={draft.floorId ?? ""} onChange={(e) => { const floor = scene.floors.find((f) => f.id === e.target.value); setDraft({ ...draft, floorId: floor?.id, transform: { ...draft.transform, position: { ...draft.transform.position, y: floor?.elevation ?? draft.transform.position.y } } }); }}><option value="">Sem andar</option>{scene.floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
      {(['blocksMovement', 'blocksVision', 'blocksLight'] as const).map((flag) => <label key={flag}><input type="checkbox" checked={draft[flag]} onChange={(e) => setDraft({ ...draft, [flag]: e.target.checked })} />{flag === 'blocksMovement' ? 'Bloqueia movimento' : flag === 'blocksVision' ? 'Bloqueia visão' : 'Bloqueia luz'}</label>)}
      {draft.door && <><label>Dobradiça <select value={draft.door.hinge} onChange={(e) => setDraft({ ...draft, door: { ...draft.door!, hinge: e.target.value as 'left' | 'right' } })}><option value="left">Esquerda</option><option value="right">Direita</option></select></label><label>Ângulo de abertura <input type="number" value={draft.door.openAngle} onChange={(e) => setDraft({ ...draft, door: { ...draft.door!, openAngle: Number(e.target.value) } })} /></label><label><input type="checkbox" checked={draft.door.interaction.allowPlayers} onChange={(e) => setDraft({ ...draft, door: { ...draft.door!, interaction: { ...draft.door!.interaction, allowPlayers: e.target.checked } } })} /> Players podem interagir</label><label>Alcance de interação (ft)<input type="number" value={draft.door.interaction.rangeFt} onChange={(e) => setDraft({ ...draft, door: { ...draft.door!, interaction: { ...draft.door!.interaction, rangeFt: Number(e.target.value) } } })} /></label></>}
      {([['position', 'Posição'], ['rotation', 'Rotação (graus)'], ['scale', 'Escala']] as const).map(([field, label]) => <div key={field}>{label}<div className={styles.axes}>{(['x', 'y', 'z'] as const).map((axis) => <label key={axis}>{axis.toUpperCase()}<input type="number" step={field === "rotation" ? 15 : 0.25} aria-label={`${field}-${axis}`} value={draft.transform[field][axis]} onChange={(e) => setDraft({ ...draft, transform: { ...draft.transform, [field]: { ...draft.transform[field], [axis]: Number(e.target.value) } } })} /></label>)}</div></div>)}
      <button onClick={() => run(saveObject(draft))}>Aplicar inspector</button>
      <button onClick={() => { const copy = normalizeSceneObject3D({ ...draft, id: crypto.randomUUID(), name: `${draft.name} (cópia)`, transform: { ...draft.transform, position: { ...draft.transform.position, x: draft.transform.position.x + scene.settings.snapSize } } }, width, depth)!; run(saveObject(copy).then(() => onSelect(copy.id))); }}>Duplicar</button>
      <button onClick={() => run(removeObject(draft.id).then(() => onSelect(null)))}>Deletar</button>
    </fieldset>}
    <button disabled={busy} onClick={() => run((draft ? saveObject(draft) : Promise.resolve()).then(sync))}>Salvar</button>
    <small>Y = altura em células (1 célula = 5 ft). Modelos com falha mostram uma caixa laranja.</small>
  </aside>;
}
