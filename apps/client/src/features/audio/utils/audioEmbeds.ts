import { resolveAssetUrl } from "@/features/assets/assetApi";
import type { AudioTrack } from "@shared/types/audio";

export function getPlayableAudioUrl(track: AudioTrack) {
  if (track.provider === "mp3") {
    return resolveAssetUrl(track.url);
  }

  if (track.provider === "youtube") {
    const id = getYouTubeVideoId(track.url);

    return id
      ? `https://www.youtube.com/embed/${id}?enablejsapi=1&playsinline=1&rel=0&origin=${encodeURIComponent(getWindowOrigin())}`
      : "";
  }

  return "";
}

export function getProviderLabel(provider: AudioTrack["provider"]) {
  if (provider === "youtube") return "YouTube";

  return "MP3";
}

function getYouTubeVideoId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (host.endsWith("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      return url.searchParams.get("v") ?? "";
    }
  } catch {
    return "";
  }

  return "";
}

function getWindowOrigin() {
  return typeof window === "undefined" ? "http://localhost" : window.location.origin;
}
