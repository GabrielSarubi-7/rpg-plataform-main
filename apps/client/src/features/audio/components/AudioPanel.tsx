import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { uploadMediaAsset } from "@/features/assets/assetApi";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { canManageCampaign } from "@/features/campaigns/utils/campaignPermissions";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useUiStore } from "@/features/ui/store/uiStore";

import {
  addAudioTrack,
  clearAudioQueue,
  moveAudioTrack,
  playNextAudioTrack,
  removeAudioTrack,
  replaceAudioQueue,
  setAudioPlayback,
} from "../services/audioSocketService";
import { getProviderLabel } from "../utils/audioEmbeds";

import styles from "./AudioPanel.module.css";

export default function AudioPanel() {
  const authToken = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const playerId = useLobbyStore((state) => state.playerId);
  const players = useLobbyStore((state) => state.players);
  const audioState = useLobbyStore((state) => state.audioState);
  const audioVolume = useUiStore((state) => state.audioVolume);
  const audioPlayerHidden = useUiStore((state) => state.audioPlayerHidden);
  const setAudioVolume = useUiStore((state) => state.setAudioVolume);
  const setAudioPlayerHidden = useUiStore((state) => state.setAudioPlayerHidden);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const currentTrack = audioState.queue.find(
    (track) => track.id === audioState.currentTrackId,
  );
  const isGm =
    canManageCampaign(activeCampaign, user?.id) ||
    Boolean(players.find((player) => player.id === playerId)?.isGm);

  const addTrack = async (inputUrl: string, inputTitle?: string) => {
    if (!lobbyCode) return;

    setIsBusy(true);
    setError(null);

    try {
      await addAudioTrack(
        lobbyCode,
        {
          url: inputUrl,
          title: inputTitle,
        },
        authToken,
      );
      setUrl("");
      setTitle("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nao foi possivel adicionar a faixa.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    void addTrack(url, title);
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0] ?? null;

    event.currentTarget.value = "";

    if (!file) return;

    if (!authToken) {
      setError("Faca login para enviar MP3 para o projeto.");
      return;
    }

    setIsBusy(true);
    setError(null);

    try {
      const uploadedUrl = await uploadMediaAsset(authToken, file);
      await addTrack(uploadedUrl, title || file.name.replace(/\.[^.]+$/, ""));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nao foi possivel enviar o MP3.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  const runGmAction = async (action: () => Promise<void>) => {
    if (!lobbyCode || !isGm) return;

    setIsBusy(true);
    setError(null);

    try {
      await action();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nao foi possivel controlar a fila.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <span className={styles.kicker}>Mesa sonora</span>
        <h2>Audio</h2>
        <p>
          Todos podem adicionar faixas. O GM organiza a ordem e controla a
          reproducao da sala.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Link da faixa
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="YouTube ou MP3..."
            disabled={isBusy}
          />
        </label>

        <label>
          Nome na fila
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Opcional"
            disabled={isBusy}
          />
        </label>

        <div className={styles.formActions}>
          <button type="submit" disabled={isBusy || !url.trim()}>
            + Adicionar
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
          >
            MP3
          </button>
          {isGm && (
            <button
              type="button"
              className={styles.warnButton}
              onClick={() =>
                void runGmAction(() =>
                  replaceAudioQueue(
                    lobbyCode ?? "",
                    url.trim()
                      ? [
                          {
                            url,
                            title,
                          },
                        ]
                      : [],
                    authToken,
                  ),
                )
              }
              disabled={isBusy || !url.trim()}
            >
              Substituir
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          className={styles.hiddenInput}
          type="file"
          accept="audio/mpeg,audio/mp3,.mp3"
          onChange={handleFileChange}
        />
      </form>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.nowPlaying}>
        <span>Agora</span>
        <strong>{currentTrack?.title ?? "Nenhuma faixa"}</strong>
      </div>

      <label className={styles.volumeControl}>
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(audioVolume * 100)}
          onChange={(event) => setAudioVolume(Number(event.target.value) / 100)}
        />
        <strong>{Math.round(audioVolume * 100)}%</strong>
      </label>

      <button
        type="button"
        className={styles.playerVisibilityButton}
        onClick={() => setAudioPlayerHidden(!audioPlayerHidden)}
      >
        {audioPlayerHidden ? "Mostrar player na tela" : "Ocultar player da tela"}
      </button>

      {isGm && (
        <div className={styles.gmControls}>
          <button
            type="button"
            onClick={() =>
              void runGmAction(() =>
                setAudioPlayback(
                  lobbyCode ?? "",
                  { isPlaying: !audioState.isPlaying },
                  authToken,
                ),
              )
            }
            disabled={isBusy || audioState.queue.length === 0}
          >
            {audioState.isPlaying ? "Pausar" : "Tocar"}
          </button>
          <button
            type="button"
            onClick={() =>
              void runGmAction(() =>
                playNextAudioTrack(lobbyCode ?? "", authToken),
              )
            }
            disabled={isBusy || audioState.queue.length === 0}
          >
            Proxima
          </button>
          <button
            type="button"
            className={styles.warnButton}
            onClick={() =>
              void runGmAction(() => clearAudioQueue(lobbyCode ?? "", authToken))
            }
            disabled={isBusy || audioState.queue.length === 0}
          >
            Limpar
          </button>
        </div>
      )}

      <div className={styles.queue}>
        {audioState.queue.length === 0 && (
          <div className={styles.empty}>A fila de audio esta vazia.</div>
        )}

        {audioState.queue.map((track, index) => {
          const isCurrent = track.id === audioState.currentTrackId;

          return (
            <article
              key={track.id}
              className={`${styles.track} ${isCurrent ? styles.current : ""}`}
            >
              <button
                type="button"
                className={styles.trackMain}
                onClick={() =>
                  isGm &&
                  void runGmAction(() =>
                    setAudioPlayback(
                      lobbyCode ?? "",
                      {
                        currentTrackId: track.id,
                        isPlaying: true,
                      },
                      authToken,
                    ),
                  )
                }
                disabled={!isGm}
              >
                <span className={styles.trackIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{track.title}</strong>
                  <small>
                    {getProviderLabel(track.provider)}
                    {track.addedByName ? ` por ${track.addedByName}` : ""}
                  </small>
                </span>
              </button>

              {isGm && (
                <div className={styles.trackActions}>
                  <button
                    type="button"
                    onClick={() =>
                      void runGmAction(() =>
                        moveAudioTrack(lobbyCode ?? "", track.id, -1, authToken),
                      )
                    }
                    disabled={isBusy}
                  >
                    ^
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void runGmAction(() =>
                        moveAudioTrack(lobbyCode ?? "", track.id, 1, authToken),
                      )
                    }
                    disabled={isBusy}
                  >
                    v
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void runGmAction(() =>
                        removeAudioTrack(lobbyCode ?? "", track.id, authToken),
                      )
                    }
                    disabled={isBusy}
                  >
                    x
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
