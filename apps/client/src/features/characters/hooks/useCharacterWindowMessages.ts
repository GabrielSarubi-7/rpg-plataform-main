import { useEffect } from "react";

import { useCharacterStore } from "../store/characterStore";
import type { Character } from "../services/characterApi";

interface CharacterWindowMessage {
  source: "rpg-platform";
  type: "character:updated" | "character:deleted";
  character?: Character;
  characterId?: string;
}

export function useCharacterWindowMessages() {
  const upsertCharacterLocal = useCharacterStore(
    (state) => state.upsertCharacterLocal,
  );
  const removeCharacterLocal = useCharacterStore(
    (state) => state.removeCharacterLocal,
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent<CharacterWindowMessage>) => {
      if (event.origin !== window.location.origin) return;

      const message = event.data;

      if (!message || message.source !== "rpg-platform") {
        return;
      }

      if (message.type === "character:updated" && message.character) {
        upsertCharacterLocal(message.character);
      }

      if (message.type === "character:deleted" && message.characterId) {
        removeCharacterLocal(message.characterId);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [removeCharacterLocal, upsertCharacterLocal]);
}
