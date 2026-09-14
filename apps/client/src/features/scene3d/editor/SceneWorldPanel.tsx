import { useEffect, useState } from "react";
import type { Scene3DConfig, Vec3 } from "@shared/types/scene3d";
import type { CameraBookmark, SceneFloorConfig, SceneLightConfig } from "@shared/types/sceneEnvironment";
import type { Token } from "@shared/types/token";
import { normalizeFloor, normalizeLight, normalizeTokenLight, normalizeVision } from "@shared/rules/sceneEnvironmentRules";
import type { Player, RoomState } from "@shared/types/multiplayer";
import styles from "../components/Scene3D.module.css";
export default function SceneWorldPanel({ scene, isGm, tokens, selectedToken, selectToken, mutate, request, players, preview, capture, activate, selectedFloor, setFloor, showAll, setShowAll }: {
  scene: Scene3DConfig; isGm: boolean; tokens: Record<string, Token>; selectedToken?: Token; selectToken: (id: string) => void;
  mutate: (event: string, data: any) => Promise<void>; request: (event: string, data: any) => Promise<any>; players: Player[]; preview: (room: RoomState | null) => void; capture: () => void; activate: (b: CameraBookmark) => void;
  selectedFloor: string; setFloor: (id: string) => void; showAll: boolean; setShowAll: (value: boolean) => void;
}) {
  const [environment, setEnvironment] = useState(scene.environment), [lightId, setLightId] = useState(""), [floorId, setFloorId] = useState("");
  const [light, setLight] = useState<SceneLightConfig | undefined>(scene.lights[0]), [floor, setFloorDraft] = useState<SceneFloorConfig | undefined>(scene.floors[0]);
  const [vision, setVision] = useState(normalizeVision(selectedToken?.vision)), [tokenLight, setTokenLight] = useState(normalizeTokenLight(selectedToken?.light));
  const [hidden, setHidden] = useState(Boolean(selectedToken?.isHidden));
  const [message, setMessage] = useState("");
  const run = (promise: Promise<unknown>) => { setMessage("Salvando…"); void promise.then(() => setMessage("Concluído.")).catch((error) => setMessage(error.message)); };
  useEffect(() => setEnvironment(scene.environment), [scene.environment]);
  useEffect(() => setLight(scene.lights.find((l) => l.id === lightId)), [scene.lights, lightId]);
  useEffect(() => setFloorDraft(scene.floors.find((f) => f.id === floorId)), [scene.floors, floorId]);
  useEffect(() => { setVision(normalizeVision(selectedToken?.vision)); setTokenLight(normalizeTokenLight(selectedToken?.light)); setHidden(Boolean(selectedToken?.isHidden)); }, [selectedToken]);
  return <aside className={styles.editor} data-ui-layer="true" aria-label="Ambiente 3D"><h3>Ambiente e visão</h3><p role="status">{message}</p>
    <label>Token <select aria-label="Token de visão" value={selectedToken?.id ?? ""} onChange={(e) => selectToken(e.target.value)}><option value="">Selecione…</option>{Object.values(tokens).map((t) => <option key={t.id} value={t.id}>{t.name ?? t.id}</option>)}</select></label>
    <label>Andar <select value={selectedFloor} onChange={(e) => setFloor(e.target.value)}><option value="">Automático (token/câmera)</option>{scene.floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
    {isGm && <label><input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> GM: mostrar todos os andares</label>}
    <details open><summary>Portas</summary>{scene.objects.filter((o) => o.door).map((o) => <div key={o.id}><strong>{o.name}: {o.door!.state}</strong>{(isGm ? ['closed', 'open', 'locked', 'destroyed', 'blocked'] : ['closed', 'open']).map((state) => <button key={state} disabled={!isGm && (!selectedToken || !o.door!.interaction.allowPlayers || !['open', 'closed'].includes(o.door!.state))} onClick={() => run(request('scene3d:door:interact', { objectId: o.id, tokenId: selectedToken?.id, state }))}>{state}</button>)}</div>)}</details>
    {isGm && <>
      <details><summary>Iluminação e qualidade</summary>
        <label>Qualidade <select value={environment.quality} onChange={(e) => setEnvironment({ ...environment, quality: e.target.value as typeof environment.quality })}>{['low', 'medium', 'high'].map((q) => <option key={q}>{q}</option>)}</select></label>
        <label><input type="checkbox" checked={environment.shadows} onChange={(e) => setEnvironment({ ...environment, shadows: e.target.checked })} /> Sombras</label>
        <label><input type="checkbox" aria-label="Visibilidade por jogador" checked={environment.visionEnabled} onChange={(e) => setEnvironment({ ...environment, visionEnabled: e.target.checked })} /> Visibilidade por jogador</label>
        <label><input type="checkbox" checked={environment.darkness} onChange={(e) => setEnvironment({ ...environment, darkness: e.target.checked })} /> Exigir luz em áreas escuras</label>
        <NumberField label="Luz ambiente" value={environment.ambientIntensity} set={(v) => setEnvironment({ ...environment, ambientIntensity: v })} />
        <label>Cor ambiente <input type="color" value={environment.ambientColor} onChange={(e) => setEnvironment({ ...environment, ambientColor: e.target.value })} /></label>
        <NumberField label="Luz direcional" value={environment.directionalIntensity} set={(v) => setEnvironment({ ...environment, directionalIntensity: v })} />
        <VectorField label="Direção da luz" value={environment.directionalPosition} set={(v) => setEnvironment({ ...environment, directionalPosition: v })} />
        <button onClick={() => run(mutate('scene3d:environment', { environment }))}>Salvar ambiente</button>
      </details>
      <details><summary>Luzes</summary>
        {(['point', 'spot'] as const).map((type) => <button key={type} onClick={() => { const created = normalizeLight({ id: crypto.randomUUID(), name: type === 'point' ? 'Luz pontual' : 'Holofote', type, position: { x: 5, y: 3, z: 5 }, visibility: 'public' })!; run(mutate('scene3d:light', { light: created }).then(() => setLightId(created.id))); }}>Adicionar {type}</button>)}
        <select aria-label="Luzes" value={lightId} onChange={(e) => setLightId(e.target.value)}><option value="">Selecione…</option>{scene.lights.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select>
        {light && <><label>Nome <input value={light.name} onChange={(e) => setLight({ ...light, name: e.target.value })} /></label><VectorField label="Posição da luz" value={light.position} set={(v) => setLight({ ...light, position: v })} /><VectorField label="Alvo da luz" value={light.target} set={(v) => setLight({ ...light, target: v })} />
          <label>Cor <input type="color" value={light.color} onChange={(e) => setLight({ ...light, color: e.target.value })} /></label>{(['intensity', 'range', 'angle'] as const).map((field) => <NumberField key={field} label={field} value={light[field]} set={(v) => setLight({ ...light, [field]: v })} />)}
          <label><input type="checkbox" checked={light.shadows} onChange={(e) => setLight({ ...light, shadows: e.target.checked })} /> Projetar sombra (spot, conforme qualidade)</label>
          <button onClick={() => run(mutate('scene3d:light', { light }))}>Salvar luz</button><button onClick={() => run(mutate('scene3d:light:remove', { entityId: light.id }))}>Excluir luz</button></>}
      </details>
      <details><summary>Andares</summary><button onClick={() => { const created = normalizeFloor({ id: crypto.randomUUID(), name: `Andar ${scene.floors.length}`, elevation: scene.floors.length * 3 })!; run(mutate('scene3d:floor', { floor: created }).then(() => setFloorId(created.id))); }}>Adicionar andar</button>
        <select aria-label="Andares" value={floorId} onChange={(e) => setFloorId(e.target.value)}><option value="">Selecione…</option>{scene.floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select>
        {floor && <><label>Nome <input value={floor.name} onChange={(e) => setFloorDraft({ ...floor, name: e.target.value })} /></label>{(['elevation', 'x', 'z', 'width', 'depth'] as const).map((field) => <NumberField key={field} label={field} value={floor[field]} set={(v) => setFloorDraft({ ...floor, [field]: v })} />)}<label><input type="checkbox" checked={floor.visible} onChange={(e) => setFloorDraft({ ...floor, visible: e.target.checked })} /> Andar visível</label><button onClick={() => run(mutate('scene3d:floor', { floor }))}>Salvar andar</button><button onClick={() => run(mutate('scene3d:floor:remove', { entityId: floor.id }))}>Excluir andar</button></>}
      </details>
      <details><summary>Visão e luz do token</summary>{selectedToken && <><label><input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> Token oculto aos players</label><label><input type="checkbox" checked={vision.enabled} onChange={(e) => setVision({ ...vision, enabled: e.target.checked })} /> Visão ativa</label>{(['rangeFt', 'angle', 'direction', 'eyeHeightFt', 'darkvisionFt'] as const).map((field) => <NumberField key={field} label={`Visão ${field}`} value={vision[field]} set={(v) => setVision({ ...vision, [field]: v })} />)}
        <label><input type="checkbox" checked={tokenLight.enabled} onChange={(e) => setTokenLight({ ...tokenLight, enabled: e.target.checked })} /> Luz do token</label><select value={tokenLight.type} onChange={(e) => setTokenLight({ ...tokenLight, type: e.target.value as 'point' | 'spot' })}><option>point</option><option>spot</option></select><input type="color" value={tokenLight.color} onChange={(e) => setTokenLight({ ...tokenLight, color: e.target.value })} />{(['intensity', 'rangeFt', 'angle'] as const).map((field) => <NumberField key={field} label={`Luz ${field}`} value={tokenLight[field]} set={(v) => setTokenLight({ ...tokenLight, [field]: v })} />)}<button onClick={() => run(request('token:perception:update', { tokenId: selectedToken.id, vision, light: tokenLight, isHidden: hidden, visibility: selectedToken.visibility ?? 'public' }))}>Salvar visão do token</button></>}</details>
      <details><summary>Inspecionar jogador</summary>{players.filter((p) => !p.isGm).map((p) => <button key={p.id} onClick={() => run(request('scene3d:vision:preview', { playerId: p.id }).then((result) => preview(result.room)))}>{p.name}</button>)}<button onClick={() => preview(null)}>Voltar à visão GM</button></details>
      <details><summary>Câmeras salvas</summary><button onClick={capture}>Salvar câmera atual</button>{scene.bookmarks.map((b) => <div key={b.id}><button onClick={() => activate(b)}>{b.name}</button><button onClick={() => run(mutate('scene3d:bookmark:remove', { entityId: b.id }))}>Excluir câmera</button></div>)}</details>
    </>}
  </aside>;
}
function NumberField({ label, value, set }: { label: string; value: number; set: (v: number) => void }) { return <label>{label}<input type="number" aria-label={label} step={0.25} value={value} onChange={(e) => set(Number(e.target.value))} /></label>; }
function VectorField({ label, value, set }: { label: string; value: Vec3; set: (v: Vec3) => void }) { return <div>{label}<div className={styles.axes}>{(['x', 'y', 'z'] as const).map((axis) => <NumberField key={axis} label={axis} value={value[axis]} set={(v) => set({ ...value, [axis]: v })} />)}</div></div>; }
