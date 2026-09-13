// A deliberately bounded, self-contained glTF 2.0 subset. No remote resources or decoders.
export const MAX_GLB_BYTES = 24 * 1024 * 1024;
export function validateGlb(bytes: Uint8Array): void {
  const fail = (): never => { throw new Error("GLB inválido, externo ou acima dos limites suportados."); };
  if (bytes.byteLength < 20 || bytes.byteLength > MAX_GLB_BYTES) fail();
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== bytes.length) fail();
  let offset = 12, json: any, binLength = 0, binOffset = 0;
  while (offset < bytes.length) {
    if (offset + 8 > bytes.length) fail();
    const length = view.getUint32(offset, true), type = view.getUint32(offset + 4, true);
    if (length % 4 || offset + 8 + length > bytes.length) fail();
    if (offset === 12 && type === 0x4e4f534a && length <= 4 * 1024 * 1024) {
      try { json = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(offset + 8, offset + 8 + length))); } catch { fail(); }
    } else if (json && type === 0x004e4942 && offset + 8 + length === bytes.length) { binLength = length; binOffset = offset + 8; }
    else fail();
    offset += 8 + length;
  }
  if (!json || json.asset?.version !== "2.0" || (json.extensionsRequired?.length ?? 0) > 0) fail();
  const inspect = (value: any, depth = 0) => {
    if (depth > 64) fail();
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (key === "uri" || key === "extensions" || key === "sparse") fail();
      inspect(child, depth + 1);
    }
  };
  inspect(json);
  for (const field of ["nodes", "meshes", "materials", "textures", "images", "scenes", "accessors", "bufferViews", "buffers"]) {
    if (json[field] !== undefined && (!Array.isArray(json[field]) || json[field].length > (field === "accessors" || field === "bufferViews" ? 10000 : 2000))) fail();
  }
  const buffers = json.buffers ?? [];
  if (buffers.length > 1 || (buffers.length && (!Number.isInteger(buffers[0].byteLength) || buffers[0].byteLength < 0 || buffers[0].byteLength > binLength || binLength - buffers[0].byteLength > 3))) fail();
  for (const b of json.bufferViews ?? []) {
    if (b.buffer !== 0 || !Number.isInteger(b.byteLength) || b.byteLength < 0 || !Number.isInteger(b.byteOffset ?? 0) || (b.byteOffset ?? 0) < 0 || (b.byteOffset ?? 0) + b.byteLength > (buffers[0]?.byteLength ?? 0)) fail();
  }
  let total = 0;
  for (const a of json.accessors ?? []) {
    if (!Number.isInteger(a.count) || a.count < 0 || a.count > 1000000) fail();
    total += a.count;
    if (total > 4000000) fail();
    const componentBytes: Record<number, number> = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
    const components: Record<string, number> = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
    const elementSize = componentBytes[a.componentType] * components[a.type], b = json.bufferViews?.[a.bufferView];
    const stride = b?.byteStride ?? elementSize;
    if (!elementSize || !b || !Number.isInteger(stride) || stride < elementSize || stride > 252 || !Number.isInteger(a.byteOffset ?? 0) || (a.byteOffset ?? 0) < 0 || (a.byteOffset ?? 0) + Math.max(0, a.count - 1) * stride + elementSize > b.byteLength) fail();
  }
  let imagePixels = 0;
  for (const image of json.images ?? []) {
    if (!Number.isInteger(image.bufferView) || !json.bufferViews?.[image.bufferView] || !["image/png", "image/jpeg"].includes(image.mimeType)) fail();
    const b = json.bufferViews[image.bufferView], start = binOffset + (b.byteOffset ?? 0);
    const data = bytes.subarray(start, start + b.byteLength);
    let width = 0, height = 0;
    if (image.mimeType === "image/png") {
      if (data.length < 24 || data[0] !== 137 || data[1] !== 80 || data[2] !== 78 || data[3] !== 71) fail();
      const header = new DataView(data.buffer, data.byteOffset, data.byteLength); width = header.getUint32(16); height = header.getUint32(20);
    } else {
      if (data[0] !== 255 || data[1] !== 216) fail();
      let cursor = 2;
      while (cursor + 8 < data.length) {
        if (data[cursor] !== 255) fail();
        const marker = data[cursor + 1], length = data[cursor + 2] * 256 + data[cursor + 3];
        if ([192, 193, 194].includes(marker)) { height = data[cursor + 5] * 256 + data[cursor + 6]; width = data[cursor + 7] * 256 + data[cursor + 8]; break; }
        if (length < 2) fail(); cursor += length + 2;
      }
    }
    imagePixels += width * height;
    if (!width || !height || width > 4096 || height > 4096 || imagePixels > 32000000) fail();
  }
  const nodes = json.nodes ?? [], visited = new Set<number>(), active = new Set<number>();
  const parents = new Set<number>();
  for (const node of nodes) for (const child of node.children ?? []) { if (parents.has(child)) fail(); parents.add(child); }
  let roots = 0;
  if ((json.scenes?.length ?? 0) > 16) fail();
  for (const scene of json.scenes ?? []) for (const root of scene.nodes ?? []) { if (!Number.isInteger(root) || !nodes[root] || parents.has(root) || ++roots > 2000) fail(); }
  const walk = (index: number, depth: number) => {
    if (depth > 64 || !Number.isInteger(index) || !nodes[index] || active.has(index)) fail();
    if (visited.has(index)) return;
    active.add(index);
    if (nodes[index].children !== undefined && !Array.isArray(nodes[index].children)) fail();
    for (const child of nodes[index].children ?? []) walk(child, depth + 1);
    active.delete(index); visited.add(index);
  };
  nodes.forEach((_: unknown, index: number) => walk(index, 0));
  let primitives = 0, renderedVertices = 0;
  for (const node of nodes) {
    if (node.mesh === undefined) continue;
    const mesh = json.meshes?.[node.mesh];
    if (!mesh || !Array.isArray(mesh.primitives)) fail();
    for (const primitive of mesh.primitives) {
      const position = json.accessors?.[primitive.attributes?.POSITION];
      if (!position || position.type !== "VEC3" || position.componentType !== 5126 || ++primitives > 5000) fail();
      renderedVertices += position.count;
      if (renderedVertices > 2000000) fail();
    }
  }
}
