import { useEffect, useMemo, useRef, useState } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useUiStore } from "@/features/ui/store/uiStore";

import {
  playNextAudioTrack,
  setAudioPlayback,
} from "../services/audioSocketService";
import {
  getPlayableAudioUrl,
  getProviderLabel,
} from "../utils/audioEmbeds";

import styles from "./GlobalAudioPlayer.module.css";

export default function GlobalAudioPlayer() {
  const authToken = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const playerId = useLobbyStore((state) => state.playerId);
  const players = useLobbyStore((state) => state.players);
  const audioState = useLobbyStore((state) => state.audioState);
  const audioVolume = useUiStore((state) => state.audioVolume);
  const audioPlayerHidden = useUiStore((state) => state.audioPlayerHidden);
  const setAudioPlayerHidden = useUiStore((state) => state.setAudioPlayerHidden);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const currentTrack = audioState.queue.find(
    (track) => track.id === audioState.currentTrackId,
  );
  const playableUrl = useMemo(
    () => (currentTrack ? getPlayableAudioUrl(currentTrack) : ""),
    [currentTrack],
  );
  const isGm =
    canManageCampaign(activeCampaign, user?.id) ||
    Boolean(players.find((player) => player.id === playerId)?.isGm);

  useEffect(() => {
    const element = audioRef.current;

    if (!element || currentTrack?.provider !== "mp3") {
      return;
    }

    element.volume = audioVolume;

    if (!audioState.isPlaying) {
      element.pause();
      return;
    }

    const play = element.play();

    if (play) {
      play
        .then(() => setNeedsGesture(false))
        .catch(() => setNeedsGesture(true));
    }
  }, [
    audioState.isPlaying,
    audioState.updatedAt,
    audioVolume,
    currentTrack?.provider,
    playableUrl,
  ]);

  useEffect(() => {
    if (currentTrack?.provider === "youtube") {
      sendYouTubeCommand(iframeRef.current, "setVolume", Math.round(audioVolume * 100));
    }
  }, [audioVolume, currentTrack?.provider, playableUrl]);

  useEffect(() => {
    if (currentTrack?.provider !== "youtube" || !playableUrl) {
      return;
    }

    const command = audioState.isPlaying ? "playVideo" : "pauseVideo";
    const timers = [
      window.setTimeout(() => sendYouTubeCommand(iframeRef.current, command), 0),
      window.setTimeout(() => sendYouTubeCommand(iframeRef.current, command), 400),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [
    audioState.isPlaying,
    currentTrack?.id,
    currentTrack?.provider,
    playableUrl,
  ]);

  if (!currentTrack || !lobbyCode) {
    return null;
  }

  const canUseYouTubePlayer = currentTrack.provider === "youtube";

  const handlePlayToggle = () => {
    if (!isGm) return;

    void setAudioPlayback(
      lobbyCode,
      {
        isPlaying: !audioState.isPlaying,
      },
      authToken,
    );
  };

  const handleNext = () => {
    if (!isGm) return;

    void playNextAudioTrack(lobbyCode, authToken);
  };

  const activateLocalAudio = () => {
    const element = audioRef.current;

    if (!element) return;

    void element.play().then(() => setNeedsGesture(false));
  };

  return (
    <div
      data-ui-layer="true"
      className={`${styles.player} ${expanded ? styles.expanded : ""}`}
    >
      {!audioPlayerHidden && (
      <div className={styles.summary}>
        <button
          type="button"
          className={styles.expandButton}
          onClick={() => setExpanded((value) => !value)}
          aria-label={expanded ? "Recolher audio" : "Expandir audio"}
        >
          {expanded ? "v" : "^"}
        </button>

        <button
          type="button"
          className={styles.hideButton}
          onClick={() => setAudioPlayerHidden(true)}
          aria-label="Ocultar player de audio"
          title="Ocultar player de audio"
        >
          x
        </button>

        <div className={styles.titleBlock}>
          <span>{getProviderLabel(currentTrack.provider)}</span>
          <strong>{currentTrack.title}</strong>
        </div>

        {needsGesture && (
          <button
            type="button"
            className={styles.enableButton}
            onClick={activateLocalAudio}
          >
            Ativar
          </button>
        )}

        {isGm && (
          <div className={styles.controls}>
            <button type="button" onClick={handlePlayToggle}>
              {audioState.isPlaying ? "Pausar" : "Tocar"}
            </button>
            <button type="button" onClick={handleNext}>
              Proxima
            </button>
          </div>
        )}
      </div>
      )}

      {currentTrack.provider === "mp3" && (
        <audio
          ref={audioRef}
          src={playableUrl}
          preload="auto"
          onEnded={() => {
            if (isGm) {
              void playNextAudioTrack(lobbyCode, authToken);
            }
          }}
        />
      )}

      {canUseYouTubePlayer && playableUrl && (
        <iframe
          ref={iframeRef}
          className={`${styles.embed} ${expanded ? "" : styles.hiddenEmbed}`}
          src={playableUrl}
          title={currentTrack.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="eager"
          onLoad={() => {
            if (currentTrack.provider === "youtube") {
              sendYouTubeCommand(
                iframeRef.current,
                audioState.isPlaying ? "playVideo" : "pauseVideo",
              );
            }
          }}
        />
      )}
    </div>
  );
}

function sendYouTubeCommand(
  iframe: HTMLIFrameElement | null,
  command: "playVideo" | "pauseVideo" | "setVolume",
  value?: number,
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func: command,
      args: value === undefined ? [] : [value],
    }),
    "https://www.youtube.com",
  );
}
