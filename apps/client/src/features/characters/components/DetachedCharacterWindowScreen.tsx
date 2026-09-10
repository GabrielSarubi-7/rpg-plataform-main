import { useEffect } from "react";

import AuthScreen from "@/features/auth/components/AuthScreen";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import { useCharacterStore } from "../store/characterStore";
import CharacterEditorModal from "./CharacterEditorModal";

import styles from "./DetachedCharacterWindowScreen.module.css";

interface DetachedCharacterWindowScreenProps {
  characterId: string;
}

export default function DetachedCharacterWindowScreen({
  characterId,
}: DetachedCharacterWindowScreenProps) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore((state) => state.initialized);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const loadCampaigns = useCampaignStore((state) => state.loadCampaigns);

  const characters = useCharacterStore((state) => state.characters);
  const loading = useCharacterStore((state) => state.loading);
  const loadCharacters = useCharacterStore((state) => state.loadCharacters);
  const openEditCharacterEditor = useCharacterStore(
    (state) => state.openEditCharacterEditor,
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!token || activeCampaign) return;

    loadCampaigns(token);
  }, [activeCampaign, loadCampaigns, token]);

  useEffect(() => {
    if (!token || !activeCampaign) return;

    loadCharacters(token, activeCampaign.id);
  }, [activeCampaign, loadCharacters, token]);

  useEffect(() => {
    if (!characters.some((character) => character.id === characterId)) {
      return;
    }

    openEditCharacterEditor(characterId);
  }, [characterId, characters, openEditCharacterEditor]);

  if (!initialized) {
    return null;
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!activeCampaign || loading) {
    return (
      <main className={styles.loadingScreen}>
        <strong>Carregando ficha...</strong>
      </main>
    );
  }

  if (!characters.some((character) => character.id === characterId)) {
    return (
      <main className={styles.loadingScreen}>
        <strong>Ficha não encontrada.</strong>
      </main>
    );
  }

  return (
    <main className={styles.screen}>
      <CharacterEditorModal presentation="detached" />
    </main>
  );
}
