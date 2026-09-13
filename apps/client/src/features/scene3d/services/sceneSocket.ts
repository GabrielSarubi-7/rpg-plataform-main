import { socket } from "@/core/socket/socket";
import { useMapStore } from "@/features/map/store/mapStore";
import { useCampaignMapStore } from "@/features/map/store/campaignMapStore";
import { normalizeMapLayerConfig } from "@shared/rules/mapRules";
import type { SceneMutationAck, SceneMutationPayload, SceneUpdatedPayload } from "@shared/types/scene3d";

export function applySceneUpdate({ mapId, scene }: SceneUpdatedPayload) {
  const map = useMapStore.getState();
  if (map.mapId === mapId && (map.layerConfig?.scene3d?.revision ?? -1) <= scene.revision) {
    map.setMapSettings({ ...map, layerConfig: { ...normalizeMapLayerConfig(map.layerConfig), scene3d: scene } });
  }
  useCampaignMapStore.setState((state) => ({ maps: state.maps.map((m) => m.id === mapId ? { ...m, layerConfigJson: { ...normalizeMapLayerConfig(m.layerConfigJson), scene3d: scene } } : m) }));
}
export function mutateScene(event: string, payload: SceneMutationPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!socket.connected) { reject(new Error("Sem conexão. Reconecte antes de salvar.")); return; }
    socket.timeout(10000).emit(event, payload, (error: Error | null, ack: SceneMutationAck) => {
      if (error) { reject(new Error("Sem confirmação. Use Salvar para conferir o estado no servidor.")); return; }
      if (!ack?.ok) { reject(new Error(ack?.error ?? "Falha ao salvar.")); return; }
      applySceneUpdate(ack); resolve();
    });
  });
}
