export interface TurnEntry {
  id: string;
  tokenId: string;
  characterId?: string;
  name: string;
  image?: string;
  initiative: number;
  order: number;
}

export interface TurnState {
  active: boolean;
  entries: TurnEntry[];
  currentIndex: number;
  round: number;
}

export interface TurnEntryInput {
  tokenId: string;
  initiative: number;
}
