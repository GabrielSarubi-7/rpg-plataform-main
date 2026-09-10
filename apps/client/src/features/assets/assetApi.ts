import { SERVER_URL } from "@/core/api/serverUrl";

interface UploadOptions {
  maxDimension?: number;
  quality?: number;
}

interface UploadResponse {
  asset?: {
    url?: string;
  };
  error?: string;
}

export function resolveAssetUrl(value?: string | null) {
  if (!value) return "";

  if (
    value.startsWith("data:") ||
    value.startsWith("blob:") ||
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  if (value.startsWith("/assets/")) {
    return `${SERVER_URL}${value}`;
  }

  return value;
}

export async function uploadImageAsset(
  authToken: string,
  file: File,
  options: UploadOptions = {},
) {
  const image = await compressImageFile(file, options);
  return uploadRawAsset(authToken, image, file.name, file.type, {
    missingPathMessage: "O servidor nao retornou o caminho da imagem.",
    uploadErrorMessage: "Nao foi possivel enviar a imagem.",
  });
}

export async function uploadMediaAsset(authToken: string, file: File) {
  return uploadRawAsset(authToken, file, file.name, file.type, {
    missingPathMessage: "O servidor nao retornou o caminho do arquivo.",
    uploadErrorMessage: "Nao foi possivel enviar o arquivo.",
  });
}

async function uploadRawAsset(
  authToken: string,
  body: Blob,
  fileName: string,
  fallbackType: string,
  messages: {
    missingPathMessage: string;
    uploadErrorMessage: string;
  },
) {
  const response = await fetch(`${SERVER_URL}/assets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": body.type || fallbackType || "application/octet-stream",
      "X-File-Name": encodeURIComponent(fileName),
    },
    body,
  });

  const data = (await response.json().catch(() => ({}))) as UploadResponse;

  if (!response.ok) {
    throw new Error(data.error ?? messages.uploadErrorMessage);
  }

  if (!data.asset?.url) {
    throw new Error(messages.missingPathMessage);
  }

  return data.asset.url;
}

export async function getImageFileSize(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    return await getImageSizeFromUrl(objectUrl);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function compressImageFile(
  file: File,
  options: UploadOptions,
): Promise<Blob> {
  const type = file.type.toLowerCase();

  if (!type.startsWith("image/") || type === "image/gif" || type === "image/svg+xml") {
    return file;
  }

  const maxDimension = options.maxDimension ?? 1600;
  const quality = options.quality ?? 0.82;
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(
      1,
      maxDimension / Math.max(image.naturalWidth, image.naturalHeight, 1),
    );

    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) {
      return file;
    }

    context.drawImage(image, 0, 0, width, height);

    const blob =
      (await canvasToBlob(canvas, "image/webp", quality)) ??
      (await canvasToBlob(canvas, "image/jpeg", quality));

    if (!blob || blob.size >= file.size) {
      return file;
    }

    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    image.src = url;
  });
}

function getImageSizeFromUrl(url: string) {
  return loadImage(url).then((image) => ({
    width: image.naturalWidth,
    height: image.naturalHeight,
  }));
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}
