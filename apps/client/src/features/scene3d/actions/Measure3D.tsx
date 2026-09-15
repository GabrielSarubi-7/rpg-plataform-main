import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei/core/Line';
import { Html } from '@react-three/drei/web/Html';
import { Plane, Raycaster, Vector2, Vector3 } from 'three';
import type { Token } from '@shared/types/token';
import { legacyTokenToWorldPosition, type WorldPoint } from '../utils/coordinates3d';
import { measureWorld } from './combatVisuals';

export default function Measure3D({ tokens, cellSize, spatial }: { tokens: Record<string, Token>; cellSize: number; spatial: boolean }) {
  const { gl, get } = useThree(), latest = useRef(tokens); latest.current = tokens;
  const [segment, setSegment] = useState<{ a: WorldPoint; b: WorldPoint } | null>(null);
  useEffect(() => {
    const canvas = gl.domElement, ray = new Raycaster(), pointer = new Vector2(), intersection = new Vector3(), plane = new Plane(new Vector3(0, 1, 0), 0);
    let origin: WorldPoint | null = null, last = 0;
    const point = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); ray.setFromCamera(pointer, get().camera);
      const objects = Object.keys(latest.current).flatMap((id) => { const object = get().scene.getObjectByName(`token:${id}`); return object ? [object] : []; });
      for (const hit of ray.intersectObjects(objects, true)) { let node = hit.object; while (node.parent && !node.userData.entityId) node = node.parent; const token = latest.current[node.userData.entityId]; if (token) return legacyTokenToWorldPosition(token, cellSize); }
      return ray.ray.intersectPlane(plane, intersection) ? { x: intersection.x, y: 0, z: intersection.z } : null;
    };
    const down = (event: PointerEvent) => { if (event.button !== 0) return; event.stopImmediatePropagation(); event.preventDefault(); const p = point(event); if (!p) return; if (!origin) { origin = p; setSegment({ a: p, b: p }); } else { setSegment({ a: origin, b: p }); origin = null; } };
    const move = (event: PointerEvent) => { if (!origin || performance.now() - last < 32) return; last = performance.now(); const p = point(event); if (p) setSegment({ a: origin, b: p }); };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { origin = null; setSegment(null); } };
    canvas.addEventListener('pointerdown', down, true); canvas.addEventListener('pointermove', move, true); window.addEventListener('keydown', key);
    return () => { canvas.removeEventListener('pointerdown', down, true); canvas.removeEventListener('pointermove', move, true); window.removeEventListener('keydown', key); };
  }, [gl, get, cellSize]);
  if (!segment) return null;
  const { a, b } = segment, distance = measureWorld(a, b, cellSize);
  return <group name="measurement3d"><Line points={[[a.x, a.y + .12, a.z], [b.x, b.y + .12, b.z]]} color="#70e7ff" lineWidth={2} raycast={() => {}} />
    <Html center position={[(a.x + b.x) / 2, Math.max(a.y, b.y) + .4, (a.z + b.z) / 2]} style={{ pointerEvents: 'none', background: '#111827ee', color: 'white', padding: 8, whiteSpace: 'nowrap' }}><div role="status">Horizontal (regra): {distance.horizontalFt.toFixed(1)} ft · Δ elevação: {distance.elevationFt.toFixed(1)} ft{spatial && <div>Espacial (informativo): {distance.spatialFt.toFixed(1)} ft</div>}</div></Html>
  </group>;
}
