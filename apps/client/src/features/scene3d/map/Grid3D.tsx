import { useMemo } from "react";

export default function Grid3D({ width, depth, visible }: { width: number; depth: number; visible: boolean }) {
  const positions = useMemo(() => {
    const lines: number[] = [];
    for (let x = 0; x <= width; x++) lines.push(x, 0.01, 0, x, 0.01, depth);
    for (let z = 0; z <= depth; z++) lines.push(0, 0.01, z, width, 0.01, z);
    return new Float32Array(lines);
  }, [width, depth]);
  // One draw call; at most 1002 segments for a 500x500 map.
  return <lineSegments visible={visible} raycast={() => {}}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <lineBasicMaterial color="#b9d9ec" transparent opacity={0.24} depthWrite={false} />
  </lineSegments>;
}
