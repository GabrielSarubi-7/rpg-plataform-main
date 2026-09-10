import "dotenv/config";

import { prisma } from "../db/prisma";
import {
  persistAssetReference,
  persistAssetReferences,
} from "./assetService";

async function main() {
  let changedCharacters = 0;
  let changedMaps = 0;
  let changedTokens = 0;
  let changedSheets = 0;

  const characters = await prisma.character.findMany({
    select: {
      id: true,
      portraitImage: true,
      defaultTokenImage: true,
    },
  });

  for (const character of characters) {
    const portraitImage = await persistAssetReference(character.portraitImage);
    const defaultTokenImage = await persistAssetReference(
      character.defaultTokenImage,
    );

    if (
      portraitImage !== character.portraitImage ||
      defaultTokenImage !== character.defaultTokenImage
    ) {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          portraitImage,
          defaultTokenImage,
        },
      });
      changedCharacters += 1;
    }
  }

  const maps = await prisma.map.findMany({
    select: {
      id: true,
      backgroundImage: true,
    },
  });

  for (const map of maps) {
    const backgroundImage = await persistAssetReference(map.backgroundImage);

    if (backgroundImage !== map.backgroundImage) {
      await prisma.map.update({
        where: { id: map.id },
        data: { backgroundImage },
      });
      changedMaps += 1;
    }
  }

  const tokens = await prisma.mapToken.findMany({
    select: {
      id: true,
      image: true,
    },
  });

  for (const token of tokens) {
    const image = await persistAssetReference(token.image);

    if (image !== token.image) {
      await prisma.mapToken.update({
        where: { id: token.id },
        data: { image },
      });
      changedTokens += 1;
    }
  }

  const sheets = await prisma.characterSheet.findMany({
    select: {
      id: true,
      dataJson: true,
    },
  });

  for (const sheet of sheets) {
    const dataJson = await persistAssetReferences(sheet.dataJson);

    if (JSON.stringify(dataJson) !== JSON.stringify(sheet.dataJson)) {
      await prisma.characterSheet.update({
        where: { id: sheet.id },
        data: { dataJson: dataJson as object },
      });
      changedSheets += 1;
    }
  }

  console.log(
    [
      "Migracao de assets concluida.",
      `characters=${changedCharacters}`,
      `maps=${changedMaps}`,
      `tokens=${changedTokens}`,
      `sheets=${changedSheets}`,
    ].join(" "),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
