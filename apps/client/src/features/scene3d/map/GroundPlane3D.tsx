import { useLoader } from "@react-three/fiber";
import { SRGBColorSpace, TextureLoader } from "three";
import { resolveAssetUrl } from "@/features/assets/assetApi";
import { fitContainedImage } from "../utils/coordinates3d";

export default function GroundPlane3D({ width, depth, image }: { width: number; depth: number; image?: string }) {
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0, depth / 2]} userData={{ entityType: "ground" }}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial color={image ? "#202020" : "#2c2c2c"} />
    </mesh>
    {image && <BackgroundTexture width={width} depth={depth} image={image} />}
  </group>;
}

function BackgroundTexture({ width, depth, image }: { width: number; depth: number; image: string }) {
  const texture = useLoader(TextureLoader, resolveAssetUrl(image));
  texture.colorSpace = SRGBColorSpace;
  const fit = fitContainedImage(width, depth, texture.image.width, texture.image.height);
  // Plane +Y maps to -Z after rotation: the image top remains at map y=0.
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0.005, depth / 2]}>
    <planeGeometry args={[fit.width, fit.height]} />
    <meshBasicMaterial map={texture} toneMapped={false} />
  </mesh>;
}
