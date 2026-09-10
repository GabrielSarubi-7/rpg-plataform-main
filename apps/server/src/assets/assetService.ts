import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";

const DATA_URL_PATTERN = /^data:((?:image|audio)\/[a-zA-Z0-9.+-]+);base64,(.*)$/s;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/ogg": "ogg",
  "audio/webm": "webm",
};

export interface PersistedAsset {
  url: string;
  hash: string;
  bytes: number;
  mimeType: string;
}

export function getAssetRoot() {
  return path.resolve(
    process.env.ASSET_STORAGE_DIR ??
      path.join(process.cwd(), "uploads", "assets"),
  );
}

export function isSupportedImageMimeType(mimeType: string) {
  return Boolean(MIME_EXTENSIONS[normalizeMimeType(mimeType)]);
}

export function isSupportedAssetMimeType(mimeType: string) {
  return Boolean(MIME_EXTENSIONS[normalizeMimeType(mimeType)]);
}

export async function saveImageAsset(input: {
  buffer: Buffer;
  mimeType: string;
  originalName?: string;
}): Promise<PersistedAsset> {
  const mimeType = normalizeMimeType(input.mimeType);

  if (!isSupportedAssetMimeType(mimeType)) {
    throw new Error("Tipo de arquivo nao suportado.");
  }

  const hash = createHash("sha256").update(input.buffer).digest("hex");
  const extension = getExtension(mimeType, input.originalName);
  const fileName = `${hash}.${extension}`;
  const assetRoot = getAssetRoot();
  const filePath = path.join(assetRoot, fileName);

  await fs.mkdir(assetRoot, { recursive: true });

  try {
    await fs.writeFile(filePath, input.buffer, { flag: "wx" });
  } catch (error) {
    if (!isFileAlreadyExistsError(error)) {
      throw error;
    }
  }

  return {
    url: `/assets/${fileName}`,
    hash,
    bytes: input.buffer.byteLength,
    mimeType,
  };
}

export async function persistAssetReference(
  value: string | null | undefined,
) {
  if (!value) {
    return value;
  }

  const parsed = parseDataUrl(value);

  if (!parsed) {
    return value;
  }

  const asset = await saveImageAsset({
    buffer: parsed.buffer,
    mimeType: parsed.mimeType,
  });

  return asset.url;
}

export async function persistAssetReferences<T>(value: T): Promise<T> {
  if (typeof value === "string") {
    return (await persistAssetReference(value)) as T;
  }

  if (Array.isArray(value)) {
    return (await Promise.all(
      value.map((item) => persistAssetReferences(item)),
    )) as T;
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const entries = await Promise.all(
    Object.entries(value as Record<string, unknown>).map(async ([key, item]) => [
      key,
      await persistAssetReferences(item),
    ]),
  );

  return Object.fromEntries(entries) as T;
}

function parseDataUrl(value: string) {
  const match = DATA_URL_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const mimeType = normalizeMimeType(match[1]);

  if (!isSupportedAssetMimeType(mimeType)) {
    return null;
  }

  return {
    mimeType,
    buffer: Buffer.from(match[2], "base64"),
  };
}

function normalizeMimeType(mimeType: string) {
  return mimeType.split(";")[0]?.trim().toLowerCase() ?? "";
}

function getExtension(mimeType: string, originalName?: string) {
  const knownExtension = MIME_EXTENSIONS[mimeType];

  if (knownExtension) {
    return knownExtension;
  }

  const fileExtension = originalName
    ? path.extname(originalName).replace(/^\./, "").toLowerCase()
    : "";

  return fileExtension || "bin";
}

function isFileAlreadyExistsError(error: unknown) {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "EEXIST"
  );
}
