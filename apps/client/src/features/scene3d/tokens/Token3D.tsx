import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Billboard } from "@react-three/drei/core/Billboard";
import { Html } from "@react-three/drei/web/Html";
import { DoubleSide, SRGBColorSpace, TextureLoader } from "three";
import { normalizeSheetForm } from "@/features/characters/types/characterSheet";
import { resolveAssetUrl } from "@/features/assets/assetApi";
import { getTokenCondition } from "@/features/tokens/constants/tokenConditions";
import { getTokenDimensions } from "@shared/rules/tokenRules";
import type { Token } from "@shared/types/token";
import type { Scene3DProps } from "../types";
import { legacyTokenToWorldPosition } from "../utils/coordinates3d";
import styles from "../components/Scene3D.module.css";

export default function Token3D({ token, cellSize, character, sheetTemplate, selected }: {
  token: Token; cellSize: number; character?: Scene3DProps["characters"][number];
  sheetTemplate: Scene3DProps["sheetTemplate"]; selected: boolean;
}) {
  const sheet = useMemo(() => character ? normalizeSheetForm({
    characterName: character.name, characterType: character.type,
    portraitImage: character.portraitImage, defaultTokenImage: character.defaultTokenImage,
    dataJson: character.sheet?.dataJson, sheetTemplate,
  }) : null, [character, sheetTemplate]);
  const flat = token.standMode === "flat";
  const image = !flat && sheet?.sprite25dImage ? sheet.sprite25dImage : token.image || sheet?.defaultTokenImage || sheet?.portraitImage;
  const { widthCells, heightCells } = getTokenDimensions(token, cellSize);
  const point = legacyTokenToWorldPosition(token, cellSize);
  const figureHeight = heightCells * 1.42;
  return <group name={`token:${token.id}`} position={[point.x, point.y, point.z]} userData={{ entityType: "token", entityId: token.id }}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={[widthCells, heightCells, 1]}>
      <circleGeometry args={[0.46, 32]} />
      <meshBasicMaterial color="#27364a" />
    </mesh>
    {selected && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]} scale={[widthCells, heightCells, 1]}>
      <ringGeometry args={[0.47, 0.54, 48]} />
      <meshBasicMaterial color="#00ffd0" toneMapped={false} side={DoubleSide} />
    </mesh>}
    {flat ? <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <TokenArt image={image} width={widthCells} height={heightCells} />
    </group> : <Billboard follow lockX lockZ position={[0, figureHeight / 2 + 0.03, 0]}>
      <TokenArt image={image} width={widthCells} height={figureHeight} bottomAligned />
    </Billboard>}
    {selected && <Html center position={[0, flat ? 0.8 : figureHeight + 0.4, 0]} style={{ pointerEvents: "none" }}>
      <div className={styles.tokenLabel}>
        {token.name || character?.name || "Token"} · {token.elevation ?? 0} ft
        {token.conditions?.length ? <div>{token.conditions.map((condition) => getTokenCondition(condition)?.label ?? condition).join(", ")}</div> : null}
        {token.showHealthBar && sheet && <>
          <div>PV {sheet.hpCurrent}/{sheet.hpMax}{sheet.hpTemp ? ` (+${sheet.hpTemp})` : ""}</div>
          <div className={styles.health}><span style={{ width: `${Math.max(0, Math.min(100, sheet.hpCurrent / Math.max(1, sheet.hpMax) * 100))}%` }} /></div>
        </>}
      </div>
    </Html>}
  </group>;
}

function TokenArt({ image, width, height, bottomAligned = false }: { image?: string; width: number; height: number; bottomAligned?: boolean }) {
  if (image) return <TexturedArt image={image} width={width} height={height} bottomAligned={bottomAligned} />;
  return <mesh><planeGeometry args={[width * 0.8, height * 0.9]} /><meshBasicMaterial color="#b45348" side={DoubleSide} /></mesh>;
}
function TexturedArt({ image, width, height, bottomAligned }: { image: string; width: number; height: number; bottomAligned: boolean }) {
  const texture = useLoader(TextureLoader, resolveAssetUrl(image));
  texture.colorSpace = SRGBColorSpace;
  const ratio = Math.min(width / texture.image.width, height / texture.image.height);
  const drawnHeight = texture.image.height * ratio;
  return <mesh position={[0, bottomAligned ? (drawnHeight - height) / 2 : 0, 0]}>
    <planeGeometry args={[texture.image.width * ratio, drawnHeight]} />
    <meshBasicMaterial map={texture} transparent alphaTest={0.05} side={DoubleSide} toneMapped={false} />
  </mesh>;
}
