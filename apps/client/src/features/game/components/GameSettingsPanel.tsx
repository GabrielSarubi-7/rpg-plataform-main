import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAnnotationStore } from "@/features/annotations/store/annotationStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useCampaignStore } from "@/features/campaigns/store/campaignStore";
import CampaignSystemModal from "@/features/campaigns/components/CampaignSystemModal";
import {
  canManageCampaign,
  getCampaignRole,
  getCampaignRoleLabel,
} from "@/features/campaigns/utils/campaignPermissions";
import { useLobbyStore } from "@/features/lobby/store/lobbyStore";
import { useUiStore } from "@/features/ui/store/uiStore";
import { getCampaignSystemDefinition } from "@shared/rules/systemRegistry";
import type { CampaignSystemId } from "@shared/types/campaignSettings";

import styles from "./GameSettingsPanel.module.css";
import SheetTemplateModal from "./SheetTemplateModal";

type SettingsSectionId =
  | "rolls"
  | "visual"
  | "sheet"
  | "invite"
  | "info"
  | "permissions"
  | "game";

const DEFAULT_OPEN_SECTIONS: Record<SettingsSectionId, boolean> = {
  rolls: true,
  visual: true,
  sheet: true,
  invite: true,
  info: true,
  permissions: true,
  game: true,
};

export default function GameSettingsPanel() {
  const [copiedInvite, setCopiedInvite] = useState<"code" | "link" | null>(
    null,
  );
  const [openSections, setOpenSections] = useState(DEFAULT_OPEN_SECTIONS);
  const [sheetTemplateOpen, setSheetTemplateOpen] = useState(false);
  const [systemModalOpen, setSystemModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const activeCampaign = useCampaignStore((state) => state.activeCampaign);
  const closeCampaign = useCampaignStore((state) => state.closeCampaign);
  const createInvite = useCampaignStore((state) => state.createInvite);
  const updateSystemPreset = useCampaignStore(
    (state) => state.updateSystemPreset,
  );
  const loadingCampaign = useCampaignStore((state) => state.loading);

  const leaveLobby = useLobbyStore((state) => state.leaveLobby);
  const lobbyCode = useLobbyStore((state) => state.lobbyCode);
  const players = useLobbyStore((state) => state.players);

  const confirmSheetRolls = useUiStore((state) => state.confirmSheetRolls);
  const setConfirmSheetRolls = useUiStore(
    (state) => state.setConfirmSheetRolls,
  );
  const cameraMode = useUiStore((state) => state.cameraMode);
  const setCameraMode = useUiStore((state) => state.setCameraMode);
  const playerColor = useUiStore((state) => state.playerColor);
  const setPlayerColor = useUiStore((state) => state.setPlayerColor);
  const setAnnotationColor = useAnnotationStore((state) => state.setColor);

  const primaryInvite = useMemo(
    () => activeCampaign?.invites?.find((invite) => !invite.revokedAt) ?? null,
    [activeCampaign?.invites],
  );
  const inviteLink = primaryInvite?.code
    ? buildInviteLink(primaryInvite.code)
    : "";
  const canManageInvites = canManageCampaign(activeCampaign, user?.id);
  const canManageSheetTemplate = canManageCampaign(activeCampaign, user?.id);
  const currentSystem = getCampaignSystemDefinition(
    activeCampaign?.settingsJson?.sheetTemplate.preset,
  );
  const currentRole = getCampaignRole(activeCampaign, user?.id);
  const permissionMembers = useMemo(
    () => buildPermissionMembers(activeCampaign, user?.id),
    [activeCampaign, user?.id],
  );

  const leaveGame = () => {
    leaveLobby();
    closeCampaign();
  };

  const leaveAccount = () => {
    leaveLobby();
    closeCampaign();
    logout();
  };

  const copyText = async (text: string, kind: "code" | "link") => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedInvite(kind);
      window.setTimeout(() => setCopiedInvite(null), 1600);
    } catch {
      setCopiedInvite(null);
    }
  };

  const handleCreateInvite = async () => {
    if (!token || !activeCampaign) return;

    await createInvite(token, activeCampaign.id);
  };

  const toggleSection = (sectionId: SettingsSectionId) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const changePlayerColor = (color: string) => {
    setPlayerColor(color);
    setAnnotationColor(color);
  };

  const selectCampaignSystem = async (systemId: CampaignSystemId) => {
    if (!token || !activeCampaign) return;

    await updateSystemPreset(token, activeCampaign.id, systemId);
    setSystemModalOpen(false);
  };

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <strong className={styles.title}>Configuracoes</strong>

        <p className={styles.description}>
          Opcoes da mesa atual, preferencias do jogador e atalhos para convidar
          outros participantes.
        </p>
      </header>

      <div className={styles.body}>
        <div className={styles.content}>
          <SettingsGroup
            id="rolls"
            title="Rolagens"
            open={openSections.rolls}
            onToggle={toggleSection}
          >
            <label className={styles.toggleRow}>
              <div>
                <strong>Confirmar rolagens da ficha</strong>
                <span>
                  Mostra um aviso antes de rolar atributo, pericia, salvaguarda,
                  iniciativa ou death save.
                </span>
              </div>

              <input
                type="checkbox"
                checked={confirmSheetRolls}
                onChange={(event) => setConfirmSheetRolls(event.target.checked)}
              />
            </label>
          </SettingsGroup>

          <SettingsGroup
            id="visual"
            title="Visual"
            open={openSections.visual}
            onToggle={toggleSection}
          >
            <div className={styles.modePicker}>
              <div>
                <strong>Camera da mesa</strong>
                <span>
                  2D: VTT clássico de cima. 2.5D: perspectiva simulada.
                  3D: cena real com câmera em perspectiva. Preferência local.
                </span>
              </div>

              <div className={styles.modeButtons}>
                <button
                  type="button"
                  className={cameraMode === "2d" ? styles.modeButtonActive : ""}
                  onClick={() => setCameraMode("2d")}
                >
                  2D
                </button>

                <button
                  type="button"
                  className={
                    cameraMode === "2.5d" ? styles.modeButtonActive : ""
                  }
                  onClick={() => setCameraMode("2.5d")}
                >
                  2.5D
                </button>
                <button
                  type="button"
                  className={cameraMode === "3d" ? styles.modeButtonActive : ""}
                  onClick={() => setCameraMode("3d")}
                >
                  3D
                </button>
              </div>
            </div>
          </SettingsGroup>

          {canManageSheetTemplate && (
            <SettingsGroup
              id="sheet"
              title="Modelo de ficha"
              open={openSections.sheet}
              onToggle={toggleSection}
            >
              <div className={styles.templateCard}>
                <div>
                  <strong>{currentSystem.name}</strong>
                  <span>{currentSystem.summary}</span>
                </div>

                <div className={styles.templateActions}>
                  <button
                    type="button"
                    className="game-button"
                    onClick={() => setSystemModalOpen(true)}
                    disabled={loadingCampaign}
                  >
                    Selecionar sistema
                  </button>

                  <button
                    type="button"
                    className="game-button game-button-primary"
                    onClick={() => setSheetTemplateOpen(true)}
                  >
                    Editar modelo 5e
                  </button>
                </div>
              </div>
            </SettingsGroup>
          )}

          <SettingsGroup
            id="invite"
            title="Convite da mesa"
            open={openSections.invite}
            onToggle={toggleSection}
          >
            <p className={styles.muted}>
              Compartilhe este codigo com outro jogador. Depois de logar, ele
              pode entrar pela tela de campanhas ou abrir o link direto.
            </p>

            {primaryInvite ? (
              <>
                <div className={styles.inviteCard}>
                  <span>Codigo de convite</span>
                  <strong>{primaryInvite.code}</strong>
                </div>

                <div className={styles.copyGrid}>
                  <button
                    type="button"
                    className="game-button"
                    onClick={() => copyText(primaryInvite.code, "code")}
                  >
                    {copiedInvite === "code" ? "Copiado!" : "Copiar codigo"}
                  </button>

                  <button
                    type="button"
                    className="game-button game-button-primary"
                    onClick={() => copyText(inviteLink, "link")}
                  >
                    {copiedInvite === "link" ? "Link copiado!" : "Copiar link"}
                  </button>
                </div>
              </>
            ) : canManageInvites ? (
              <button
                type="button"
                className="game-button game-button-primary"
                onClick={handleCreateInvite}
                disabled={loadingCampaign}
              >
                Gerar convite
              </button>
            ) : (
              <p className={styles.muted}>
                Esta campanha ainda nao tem convite ativo. Peca para o GM gerar
                um codigo.
              </p>
            )}
          </SettingsGroup>

          <SettingsGroup
            id="info"
            title="Informacoes da mesa"
            open={openSections.info}
            onToggle={toggleSection}
          >
            <div className={styles.infoRow}>
              <span>Campanha</span>
              <strong>{activeCampaign?.name ?? "-"}</strong>
            </div>

            <div className={styles.infoRow}>
              <span>Usuario</span>
              <strong>{user?.name ?? "-"}</strong>
            </div>

            <div className={styles.infoRow}>
              <span>Jogadores online</span>
              <strong>{players.length}</strong>
            </div>

            <div className={styles.codeBox}>
              <span>ID tecnico da sessao ao vivo</span>
              <code>{lobbyCode ?? "-"}</code>
            </div>
          </SettingsGroup>

          <SettingsGroup
            id="permissions"
            title="Permissoes"
            open={openSections.permissions}
            onToggle={toggleSection}
          >
            <label className={styles.colorPreference}>
              <div>
                <strong>Cor do jogador</strong>
                <span>Usada como fundo das rolagens e cor padrao do pincel.</span>
              </div>

              <input
                type="color"
                value={playerColor}
                onChange={(event) => changePlayerColor(event.target.value)}
                aria-label="Cor do jogador"
              />
            </label>

            <div className={styles.permissionSummary}>
              <span>Seu status nesta mesa</span>
              <strong>{getCampaignRoleLabel(currentRole)}</strong>
            </div>

            <div className={styles.permissionList}>
              {permissionMembers.map((member) => (
                <div key={member.userId} className={styles.permissionRow}>
                  <div>
                    <strong>
                      {member.name}
                      {member.isCurrentUser ? " (voce)" : ""}
                    </strong>
                    {member.email && <span>{member.email}</span>}
                  </div>

                  <span
                    className={`${styles.roleBadge} ${
                      member.roleLabel === "GM"
                        ? styles.roleBadgeGm
                        : styles.roleBadgePlayer
                    }`}
                  >
                    {member.roleLabel}
                  </span>
                </div>
              ))}
            </div>
          </SettingsGroup>

          <SettingsGroup
            id="game"
            title="Jogo"
            open={openSections.game}
            onToggle={toggleSection}
          >
            <button
              type="button"
              className="game-button game-button-primary"
              onClick={leaveGame}
            >
              Sair do jogo
            </button>

            <button type="button" className="game-button" onClick={leaveAccount}>
              Sair da conta
            </button>
          </SettingsGroup>
        </div>
      </div>

      <SheetTemplateModal
        open={sheetTemplateOpen}
        onClose={() => setSheetTemplateOpen(false)}
      />

      <CampaignSystemModal
        open={systemModalOpen}
        selectedSystemId={currentSystem.id}
        loading={loadingCampaign}
        title="Sistema da campanha"
        subtitle="Sistemas cadastrados definem ficha, recursos, pericias e calculos. Hoje apenas D&D 5e esta liberado."
        onSelect={(systemId) => void selectCampaignSystem(systemId)}
        onClose={() => setSystemModalOpen(false)}
      />
    </section>
  );
}

function SettingsGroup(props: {
  id: SettingsSectionId;
  title: string;
  open: boolean;
  onToggle: (sectionId: SettingsSectionId) => void;
  children: ReactNode;
}) {
  const contentId = `settings-${props.id}`;

  return (
    <section
      className={`${styles.group} ${!props.open ? styles.groupCollapsed : ""}`}
    >
      <button
        type="button"
        className={styles.groupHeader}
        aria-expanded={props.open}
        aria-controls={contentId}
        onClick={() => props.onToggle(props.id)}
      >
        <span>{props.title}</span>
        <span className={styles.groupChevron}>{props.open ? "v" : ">"}</span>
      </button>

      {props.open && (
        <div id={contentId} className={styles.groupContent}>
          {props.children}
        </div>
      )}
    </section>
  );
}

function buildInviteLink(code: string) {
  if (typeof window === "undefined") {
    return `?invite=${encodeURIComponent(code)}`;
  }

  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("invite", code);

  return url.toString();
}

function buildPermissionMembers(
  campaign: ReturnType<typeof useCampaignStore.getState>["activeCampaign"],
  currentUserId?: string,
) {
  const members = campaign?.members ?? [];

  return members
    .map((member) => {
      const role = getCampaignRole(campaign, member.userId);

      return {
        userId: member.userId,
        name:
          member.user?.name ??
          member.displayName ??
          member.user?.email ??
          "Participante",
        email: member.user?.email ?? null,
        roleLabel: getCampaignRoleLabel(role),
        isCurrentUser: member.userId === currentUserId,
      };
    })
    .sort((left, right) => {
      if (left.isCurrentUser !== right.isCurrentUser) {
        return left.isCurrentUser ? -1 : 1;
      }

      if (left.roleLabel !== right.roleLabel) {
        return left.roleLabel === "GM" ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });
}
