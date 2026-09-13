// Serialize map JSON writers in this server process. Legacy saves and scene
// mutations must read the latest layer inside the same critical section.
const pending = new Map<string, Promise<unknown>>();
export async function withMapWriteLock<T>(mapId: string, operation: () => Promise<T>): Promise<T> {
  const previous = pending.get(mapId) ?? Promise.resolve();
  const next = previous.catch(() => {}).then(operation);
  pending.set(mapId, next);
  try { return await next; }
  finally { if (pending.get(mapId) === next) pending.delete(mapId); }
}
