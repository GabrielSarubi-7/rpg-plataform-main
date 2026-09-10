export type AudioTrackProvider = "youtube" | "mp3";

export interface AudioTrack {
  id: string;
  provider: AudioTrackProvider;
  title: string;
  url: string;
  addedByPlayerId?: string;
  addedByName?: string;
  createdAt: number;
}

export interface AudioState {
  queue: AudioTrack[];
  currentTrackId: string | null;
  isPlaying: boolean;
  updatedAt: number;
}

export interface AudioTrackInput {
  url: string;
  title?: string;
}
