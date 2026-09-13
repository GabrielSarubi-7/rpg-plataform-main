import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { DataTexture, NearestFilter, RedFormat, SRGBColorSpace, TextureLoader, type WebGLProgramParametersWithUniforms } from "three";
import type { MapLayerConfig } from "@shared/types/map";
import { resolveAssetUrl } from "@/features/assets/assetApi";
import { fitContainedImage } from "../utils/coordinates3d";

export default function GroundPlane3D({ width, depth, image, layer }: { width: number; depth: number; image?: string; layer?: MapLayerConfig }) {
  const mask = useMemo(() => {
    const data = new Uint8Array(width * depth);
    for (const cell of Object.values(layer?.terrainCells ?? {})) if (cell.height < 0 && cell.x < width && cell.y < depth) data[cell.y * width + cell.x] = 255;
    const texture = new DataTexture(data, width, depth, RedFormat); texture.minFilter = texture.magFilter = NearestFilter; texture.needsUpdate = true;
    return texture;
  }, [width, depth, layer?.terrainCells]);
  useEffect(() => () => mask.dispose(), [mask]);
  const cutout = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.groundCutout = { value: mask };
    shader.vertexShader = "varying vec2 groundXZ;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\ngroundXZ = (modelMatrix * vec4(transformed, 1.0)).xz;");
    shader.fragmentShader = "uniform sampler2D groundCutout; varying vec2 groundXZ;\n" + shader.fragmentShader.replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>\nif(texture2D(groundCutout, groundXZ / vec2(${width.toFixed(1)}, ${depth.toFixed(1)})).r > 0.5) discard;`);
  };
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0, depth / 2]} userData={{ entityType: "ground" }}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial key={mask.uuid} color={image ? "#202020" : "#2c2c2c"} onBeforeCompile={cutout} />
    </mesh>
    {image && <BackgroundTexture key={mask.uuid} width={width} depth={depth} image={image} cutout={cutout} />}
  </group>;
}

function BackgroundTexture({ width, depth, image, cutout }: { width: number; depth: number; image: string; cutout: (shader: WebGLProgramParametersWithUniforms) => void }) {
  const texture = useLoader(TextureLoader, resolveAssetUrl(image));
  texture.colorSpace = SRGBColorSpace;
  const fit = fitContainedImage(width, depth, texture.image.width, texture.image.height);
  // Plane +Y maps to -Z after rotation: the image top remains at map y=0.
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0.005, depth / 2]}>
    <planeGeometry args={[fit.width, fit.height]} />
    <meshBasicMaterial map={texture} toneMapped={false} onBeforeCompile={cutout} />
  </mesh>;
}
