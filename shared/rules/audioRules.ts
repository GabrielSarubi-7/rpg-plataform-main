import type {
  AudioState,
  AudioTrack,
  AudioTrackInput,
  AudioTrackProvider,
} from "../types/audio";

const MAX_QUEUE_LENGTH = 80;
const MAX_TITLE_LENGTH = 90;

export function createDefaultAudioState(): AudioState {
  return {
    queue: [],
    currentTrackId: null,
    isPlaying: false,
    updatedAt: Date.now(),
  };
}

export function createAudioTrack(
  input: AudioTrackInput,
  addedBy?: {
    playerId?: string;
    name?: string;
  },
): AudioTrack {
  const parsed = parseAudioUrl(input.url);

  if (!parsed) {
    throw new Error("Use um link do YouTube ou um MP3 valido.");
  }

  return {
    id: cryptoRandomId(),
    provider: parsed.provider,
    title: normalizeTitle(input.title, parsed.title),
    url: parsed.url,
    addedByPlayerId: addedBy?.playerId,
    addedByName: addedBy?.name,
    createdAt: Date.now(),
  };
}

export function normalizeAudioState(value?: Partial<AudioState> | null) {
  const queue = Array.isArray(value?.queue)
    ? value.queue
        .map(normalizeAudioTrack)
        .filter((track): track is AudioTrack => Boolean(track))
        .slice(0, MAX_QUEUE_LENGTH)
    : [];
  const currentTrackId =
    typeof value?.currentTrackId === "string" &&
    queue.some((track) => track.id === value.currentTrackId)
      ? value.currentTrackId
      : queue[0]?.id ?? null;

  return {
    queue,
    currentTrackId,
    isPlaying: Boolean(value?.isPlaying && currentTrackId),
    updatedAt: normalizeNumber(value?.updatedAt, Date.now()),
  };
}

export function getNextAudioTrackId(audioState: AudioState) {
  if (audioState.queue.length === 0) return null;

  const currentIndex = audioState.queue.findIndex(
    (track) => track.id === audioState.currentTrackId,
  );

  if (currentIndex < 0) {
    return audioState.queue[0]?.id ?? null;
  }

  return audioState.queue[(currentIndex + 1) % audioState.queue.length]?.id ?? null;
}

export function parseAudioUrl(value: string):
  | {
      provider: AudioTrackProvider;
      url: string;
      title: string;
    }
  | null {
  const trimmed = value.trim();

  if (!trimmed) return null;

  if (trimmed.startsWith("/assets/")) {
    return {
      provider: "mp3",
      url: trimmed,
      title: getFileTitle(trimmed),
    };
  }

  let url: URL;

  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  if (host === "youtu.be" || host.endsWith("youtube.com")) {
    return {
      provider: "youtube",
      url: url.toString(),
      title: "Video do YouTube",
    };
  }

  if (url.pathname.toLowerCase().endsWith(".mp3")) {
    return {
      provider: "mp3",
      url: url.toString(),
      title: getFileTitle(url.pathname),
    };
  }

  return null;
}

function normalizeAudioTrack(value: unknown): AudioTrack | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const track = value as Partial<AudioTrack>;
  const parsed = typeof track.url === "string" ? parseAudioUrl(track.url) : null;

  if (!parsed) return null;

  return {
    id: typeof track.id === "string" && track.id ? track.id : cryptoRandomId(),
    provider: parsed.provider,
    title: normalizeTitle(track.title, parsed.title),
    url: parsed.url,
    addedByPlayerId:
      typeof track.addedByPlayerId === "string"
        ? track.addedByPlayerId
        : undefined,
    addedByName:
      typeof track.addedByName === "string" ? track.addedByName : undefined,
    createdAt: normalizeNumber(track.createdAt, Date.now()),
  };
}

function normalizeTitle(value: unknown, fallback: string) {
  const title = typeof value === "string" ? value.trim() : "";

  return (title || fallback).slice(0, MAX_TITLE_LENGTH);
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function getFileTitle(pathname: string) {
  const fileName = pathname.split("/").filter(Boolean).pop() ?? "MP3";
  const decoded = safeDecode(fileName).replace(/\.[a-z0-9]+$/i, "");

  return decoded || "MP3";
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 12);
}
