import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/features/auth/store/authStore";
import {
  canManageCampaign,
  getCampaignRoleLabel,
} from "@/features/campaigns/utils/campaignPermissions";
import type {
  Campaign,
  CampaignMember,
  CampaignRole,
} from "../services/campaignApi";
import { useCampaignStore } from "../store/campaignStore";
import {
  getCampaignSystemDefinition,
  normalizeCampaignSystemId,
} from "@shared/rules/systemRegistry";
import type { CampaignSystemId } from "@shared/types/campaignSettings";

import CampaignSystemModal from "./CampaignSystemModal";
import styles from "./CampaignsScreen.module.css";

type IconProps = {
  className?: string;
};

export default function CampaignsScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPreset, setSystemPreset] =
    useState<CampaignSystemId>("dnd5e");
  const [createSystemModalOpen, setCreateSystemModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [managedCampaignId, setManagedCampaignId] = useState<string | null>(null);
  const [managedSystemPreset, setManagedSystemPreset] =
    useState<CampaignSystemId>("dnd5e");
  const [managedSystemModalOpen, setManagedSystemModalOpen] = useState(false);
  const [deleteConfirmationCampaignId, setDeleteConfirmationCampaignId] =
    useState<string | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const inviteFromUrlHandledRef = useRef(false);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const campaigns = useCampaignStore((state) => state.campaigns);
  const loading = useCampaignStore((state) => state.loading);
  const error = useCampaignStore((state) => state.error);
  const loadCampaigns = useCampaignStore((state) => state.loadCampaigns);
  const createCampaign = useCampaignStore((state) => state.createCampaign);
  const joinCampaign = useCampaignStore((state) => state.joinCampaign);
  const openCampaign = useCampaignStore((state) => state.openCampaign);
  const updateSystemPreset = useCampaignStore(
    (state) => state.updateSystemPreset,
  );
  const updateMemberRole = useCampaignStore((state) => state.updateMemberRole);
  const removeMember = useCampaignStore((state) => state.removeMember);
  const deleteCampaign = useCampaignStore((state) => state.deleteCampaign);
  const managedCampaign =
    campaigns.find((campaign) => campaign.id === managedCampaignId) ?? null;

  useEffect(() => {
    if (!token) return;

    loadCampaigns(token);
  }, [token, loadCampaigns]);

  useEffect(() => {
    if (!token || inviteFromUrlHandledRef.current) return;

    const url = new URL(window.location.href);
    const urlInviteCode =
      url.searchParams.get("invite") ?? url.searchParams.get("join");

    if (!urlInviteCode) return;

    const normalizedCode = urlInviteCode.trim().toUpperCase();

    if (!normalizedCode) return;

    inviteFromUrlHandledRef.current = true;
    setInviteCode(normalizedCode);

    void joinCampaign(token, normalizedCode).then(() => {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("invite");
      cleanUrl.searchParams.delete("join");
      window.history.replaceState({}, "", cleanUrl.toString());
    });
  }, [token, joinCampaign]);

  useEffect(() => {
    if (!managedCampaign) return;

    setManagedSystemPreset(getCampaignSystemPreset(managedCampaign));
  }, [managedCampaign]);

  const submitCreateCampaign = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) return;

    await createCampaign(token, {
      name,
      description,
      systemPreset,
    });
  };

  const submitJoinCampaign = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) return;

    await joinCampaign(token, inviteCode);
  };

  const copyInviteCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => setCopiedCode(null), 1600);
    } catch {
      setCopiedCode(null);
    }
  };

  const saveManagedSystem = async () => {
    if (!token || !managedCampaign) return;

    await updateSystemPreset(token, managedCampaign.id, managedSystemPreset);
  };

  const changeMemberRole = async (
    member: CampaignMember,
    role: Exclude<CampaignRole, "owner">,
  ) => {
    if (!token || !managedCampaign) return;

    await updateMemberRole(token, managedCampaign.id, member.id, role);
  };

  const removeManagedMember = async (member: CampaignMember) => {
    if (!token || !managedCampaign) return;

    const confirmed = window.confirm(
      `Remover ${getMemberDisplayName(member)} desta campanha?`,
    );

    if (!confirmed) return;

    await removeMember(token, managedCampaign.id, member.id);
  };

  const requestDeleteManagedCampaign = () => {
    if (!managedCampaign) return;

    setDeleteConfirmationCampaignId(managedCampaign.id);
    setDeleteConfirmationText("");
  };

  const confirmDeleteCampaign = async () => {
    const campaignToDelete =
      campaigns.find(
        (campaign) => campaign.id === deleteConfirmationCampaignId,
      ) ?? null;

    if (!token || !campaignToDelete) return;

    if (deleteConfirmationText.trim() !== campaignToDelete.name) return;

    const deleted = await deleteCampaign(token, campaignToDelete.id);

    if (deleted) {
      setManagedCampaignId(null);
      setDeleteConfirmationCampaignId(null);
      setDeleteConfirmationText("");
    }
  };

  const campaignPendingDeletion =
    campaigns.find(
      (campaign) => campaign.id === deleteConfirmationCampaignId,
    ) ?? null;
  const selectedSystem = getCampaignSystemDefinition(systemPreset);

  return (
    <main className={styles.screen}>
      <section className={styles.shell} aria-label="Arquivo de campanhas">
        <header className={`${styles.panel} ${styles.hero}`}>
          <div className={styles.heroMark} aria-hidden="true">
            <CrystalIcon className={styles.heroMarkIcon} />
          </div>

          <div className={styles.heroCopy}>
            <strong>Plataforma RPG</strong>
            <h1>Arquivo de Campanhas</h1>
            <p>Escolha uma aventura, crie uma nova mesa ou entre por convite.</p>
          </div>

          <button type="button" className={styles.logoutButton} onClick={logout}>
            <LogoutIcon className={styles.buttonIcon} />
            <span>Sair</span>
          </button>
        </header>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.grid}>
          <section className={`${styles.panel} ${styles.actionCard}`}>
            <h2>
              <LeafIcon className={styles.titleIcon} />
              <span>Forjar nova campanha</span>
            </h2>

            <form className={styles.form} onSubmit={submitCreateCampaign}>
              <label className={styles.field}>
                <span>Nome da aventura</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="De um nome epico a sua aventura..."
                  autoComplete="off"
                />
              </label>

              <label className={styles.field}>
                <span>Descricao</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Conte um pouco sobre a historia, o mundo e os desafios que esperam os herois..."
                />
              </label>

              <div className={styles.systemField}>
                <span>Sistema</span>

                <button
                  type="button"
                  className={styles.systemSelectButton}
                  onClick={() => setCreateSystemModalOpen(true)}
                >
                  <strong>{selectedSystem.name}</strong>
                  <span>{selectedSystem.summary}</span>
                  <small>Escolher sistema</small>
                </button>
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loading}
              >
                <PortalIcon className={styles.primaryIcon} />
                <span>{loading ? "Forjando..." : "Criar e abrir portal"}</span>
              </button>
            </form>
          </section>

          <section className={`${styles.panel} ${styles.actionCard}`}>
            <h2>
              <LanternIcon className={styles.titleIcon} />
              <span>Entrar por selo de convite</span>
            </h2>

            <form className={styles.form} onSubmit={submitJoinCampaign}>
              <label className={styles.field}>
                <span>Codigo</span>
                <input
                  className={styles.input}
                  value={inviteCode}
                  onChange={(event) =>
                    setInviteCode(event.target.value.toUpperCase())
                  }
                  placeholder="Ex: ABC123"
                  autoComplete="off"
                />
              </label>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loading}
              >
                <PortalIcon className={styles.primaryIcon} />
                <span>{loading ? "Abrindo..." : "Abrir portal"}</span>
              </button>
            </form>
          </section>
        </div>

        <section className={`${styles.panel} ${styles.campaignPanel}`}>
          <div className={styles.sectionHeader}>
            <h2>
              <TomeIcon className={styles.titleIcon} />
              <span>Minhas campanhas</span>
            </h2>

            <button
              type="button"
              className={styles.refreshButton}
              onClick={() => token && loadCampaigns(token)}
              disabled={loading}
            >
              <RefreshIcon className={styles.buttonIcon} />
              <span>Atualizar</span>
            </button>
          </div>

          {loading && campaigns.length === 0 ? (
            <p className={styles.muted}>Carregando campanhas...</p>
          ) : campaigns.length === 0 ? (
            <p className={styles.muted}>Nenhuma campanha criada ainda.</p>
          ) : (
            <div className={styles.list}>
              {campaigns.map((campaign, index) => {
                const campaignInviteCode = campaign.invites?.[0]?.code;

                return (
                  <article key={campaign.id} className={styles.campaignItem}>
                    <div
                      className={styles.campaignPortrait}
                      data-variant={index % 3}
                      aria-hidden="true"
                    >
                      <span />
                    </div>

                    <div className={styles.campaignInfo}>
                      <strong>{campaign.name}</strong>

                      <span>
                        {campaign.description ||
                          "Uma nova aventura aguarda sua mesa."}
                      </span>

                      {campaignInviteCode && (
                        <div className={styles.inviteRow}>
                          <code className={styles.inviteCode}>
                            Convite: {campaignInviteCode}
                          </code>

                          <button
                            type="button"
                            className={styles.copyButton}
                            onClick={() => copyInviteCode(campaignInviteCode)}
                          >
                            <CopyIcon className={styles.smallIcon} />
                            <span>
                              {copiedCode === campaignInviteCode
                                ? "Copiado!"
                                : "Copiar"}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className={styles.manageButton}
                      onClick={() => setManagedCampaignId(campaign.id)}
                      title="Gerenciar campanha"
                      aria-label={`Gerenciar ${campaign.name}`}
                    >
                      <SparkIcon className={styles.rowSpark} />
                    </button>

                    <button
                      type="button"
                      className={styles.openButton}
                      onClick={() => openCampaign(campaign)}
                    >
                      <SwordsIcon className={styles.primaryIcon} />
                      <span>Abrir mesa</span>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>

      {managedCampaign && (
        <CampaignManageModal
          campaign={managedCampaign}
          currentUserId={user?.id}
          loading={loading}
          systemPreset={managedSystemPreset}
          onOpenSystemPicker={() => setManagedSystemModalOpen(true)}
          onClose={() => {
            setManagedCampaignId(null);
            setManagedSystemModalOpen(false);
          }}
          onCopyInvite={copyInviteCode}
          copiedCode={copiedCode}
          onSaveSystem={saveManagedSystem}
          onChangeMemberRole={changeMemberRole}
          onRemoveMember={removeManagedMember}
          onDeleteCampaign={requestDeleteManagedCampaign}
        />
      )}

      {campaignPendingDeletion && (
        <CampaignDeleteConfirmModal
          campaign={campaignPendingDeletion}
          value={deleteConfirmationText}
          loading={loading}
          onChange={setDeleteConfirmationText}
          onCancel={() => {
            setDeleteConfirmationCampaignId(null);
            setDeleteConfirmationText("");
          }}
          onConfirm={() => void confirmDeleteCampaign()}
        />
      )}

      <CampaignSystemModal
        open={createSystemModalOpen}
        selectedSystemId={systemPreset}
        onSelect={(systemId) => {
          setSystemPreset(systemId);
          setCreateSystemModalOpen(false);
        }}
        onClose={() => setCreateSystemModalOpen(false)}
      />

      {managedCampaign && (
        <CampaignSystemModal
          open={managedSystemModalOpen}
          selectedSystemId={managedSystemPreset}
          loading={loading}
          title="Sistema da campanha"
          subtitle="A troca salva uma base registrada para novas fichas e reorganiza campanhas antigas para o identificador correto."
          onSelect={(systemId) => {
            setManagedSystemPreset(systemId);
            setManagedSystemModalOpen(false);
          }}
          onClose={() => setManagedSystemModalOpen(false)}
        />
      )}
    </main>
  );
}

type CampaignManageModalProps = {
  campaign: Campaign;
  currentUserId?: string;
  loading: boolean;
  systemPreset: CampaignSystemId;
  copiedCode: string | null;
  onOpenSystemPicker: () => void;
  onClose: () => void;
  onCopyInvite: (code: string) => void;
  onSaveSystem: () => void;
  onChangeMemberRole: (
    member: CampaignMember,
    role: Exclude<CampaignRole, "owner">,
  ) => void;
  onRemoveMember: (member: CampaignMember) => void;
  onDeleteCampaign: () => void;
};

function CampaignManageModal({
  campaign,
  currentUserId,
  loading,
  systemPreset,
  copiedCode,
  onOpenSystemPicker,
  onClose,
  onCopyInvite,
  onSaveSystem,
  onChangeMemberRole,
  onRemoveMember,
  onDeleteCampaign,
}: CampaignManageModalProps) {
  const isOwner = campaign.ownerUserId === currentUserId;
  const canManage = canManageCampaign(campaign, currentUserId);
  const inviteCode = campaign.invites?.[0]?.code ?? "";
  const selectedSystem = getCampaignSystemDefinition(systemPreset);
  const sortedMembers = [...(campaign.members ?? [])].sort((a, b) => {
    if (a.userId === campaign.ownerUserId) return -1;
    if (b.userId === campaign.ownerUserId) return 1;
    return getMemberDisplayName(a).localeCompare(getMemberDisplayName(b));
  });

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <section className={`${styles.panel} ${styles.manageModal}`}>
        <header className={styles.modalHeader}>
          <div>
            <span>Gerenciamento da mesa</span>
            <h2>{campaign.name}</h2>
          </div>

          <button type="button" className={styles.closeButton} onClick={onClose}>
            Fechar
          </button>
        </header>

        <div className={styles.manageGrid}>
          <section className={styles.manageSection}>
            <h3>Sistema da campanha</h3>
            <p>
              Troca a base usada por novas fichas. O catalogo mostra apenas
              sistemas registrados no projeto.
            </p>

            <button
              type="button"
              className={styles.modalSystemSummary}
              onClick={onOpenSystemPicker}
              disabled={!canManage || loading}
            >
              <strong>{selectedSystem.name}</strong>
              <span>{selectedSystem.summary}</span>
              <small>Selecionar sistema</small>
            </button>

            <button
              type="button"
              className={styles.modalPrimaryButton}
              onClick={onSaveSystem}
              disabled={!canManage || loading}
            >
              Salvar sistema
            </button>
          </section>

          <section className={styles.manageSection}>
            <h3>Convite</h3>
            {inviteCode ? (
              <div className={styles.modalInviteRow}>
                <code>{inviteCode}</code>
                <button
                  type="button"
                  className={styles.modalGhostButton}
                  onClick={() => onCopyInvite(inviteCode)}
                >
                  {copiedCode === inviteCode ? "Copiado" : "Copiar"}
                </button>
              </div>
            ) : (
              <p>Nenhum convite ativo nesta campanha.</p>
            )}
          </section>
        </div>

        <section className={styles.manageSection}>
          <h3>Players cadastrados</h3>
          <div className={styles.memberList}>
            {sortedMembers.map((member) => {
              const lockedOwner =
                member.role === "owner" || member.userId === campaign.ownerUserId;
              const isCurrentUser = member.userId === currentUserId;

              return (
                <article key={member.id} className={styles.memberItem}>
                  <div className={styles.memberIdentity}>
                    <strong>
                      {getMemberDisplayName(member)}
                      {isCurrentUser ? " (voce)" : ""}
                    </strong>
                    <span>{member.user?.email ?? "sem email"}</span>
                  </div>

                  {lockedOwner ? (
                    <span className={styles.roleBadge}>
                      {getCampaignRoleLabel("owner")}
                    </span>
                  ) : (
                    <select
                      value={member.role}
                      onChange={(event) =>
                        onChangeMemberRole(
                          member,
                          event.target.value as Exclude<CampaignRole, "owner">,
                        )
                      }
                      disabled={!canManage || loading}
                    >
                      <option value="player">Player</option>
                      <option value="gm">GM</option>
                      <option value="spectator">Espectador</option>
                    </select>
                  )}

                  <button
                    type="button"
                    className={styles.dangerSmallButton}
                    onClick={() => onRemoveMember(member)}
                    disabled={!canManage || lockedOwner || isCurrentUser || loading}
                  >
                    Remover
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <footer className={styles.modalFooter}>
          <button
            type="button"
            className={styles.deleteCampaignButton}
            onClick={onDeleteCampaign}
            disabled={!isOwner || loading}
          >
            Excluir campanha
          </button>
          {!isOwner && (
            <span>Somente o dono original pode excluir a campanha.</span>
          )}
        </footer>
      </section>
    </div>
  );
}

function CampaignDeleteConfirmModal(props: {
  campaign: Campaign;
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const canConfirm = props.value.trim() === props.campaign.name;

  return (
    <div
      className={`${styles.modalOverlay} ${styles.dangerModalOverlay}`}
      role="dialog"
      aria-modal="true"
    >
      <section className={`${styles.panel} ${styles.deleteConfirmModal}`}>
        <header>
          <span>Arquivo proibido</span>
          <h2>Excluir campanha</h2>
        </header>

        <p>
          Esta acao arquiva a mesa para todos os players. Digite o nome da
          campanha para confirmar.
        </p>

        <div className={styles.deleteRuneBox}>
          <strong>{props.campaign.name}</strong>
          <input
            autoFocus
            className={styles.deleteConfirmInput}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            placeholder="Digite o nome da campanha"
          />
        </div>

        <footer className={styles.deleteConfirmActions}>
          <button
            type="button"
            className={styles.modalGhostButton}
            onClick={props.onCancel}
            disabled={props.loading}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={styles.deleteCampaignButton}
            onClick={props.onConfirm}
            disabled={!canConfirm || props.loading}
          >
            Excluir definitivamente
          </button>
        </footer>
      </section>
    </div>
  );
}

function getCampaignSystemPreset(campaign: Campaign): CampaignSystemId {
  return normalizeCampaignSystemId(campaign.settingsJson?.sheetTemplate.preset);
}

function getMemberDisplayName(member: CampaignMember) {
  return member.displayName || member.user?.name || member.user?.email || "Player";
}

function CrystalIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="31" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="23" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <path d="M40 9v62M9 40h62M18 18l44 44M62 18 18 62" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <path d="M40 16 57 40 40 64 23 40 40 16Z" fill="currentColor" opacity="0.18" />
      <path d="M40 16 52 40 40 64 28 40 40 16Z" fill="currentColor" opacity="0.35" />
      <path d="M23 40h34M40 16v48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 20c4-7 8-9 14-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LanternIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6M10 2h4M8 8h8l-1 12H9L8 8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 8c0-2 4-2 4 0M12 12v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 16h3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PortalIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 20v-8a7 7 0 0 1 14 0v8M8 20v-8a4 4 0 0 1 8 0v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 20h18M12 10v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TomeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h10a4 4 0 0 1 4 4v12H8a3 3 0 0 1-3-3V4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 4v13a3 3 0 0 0 3 3M10 8h5M10 12h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 12a8 8 0 0 1-13.5 5.8M4 12A8 8 0 0 1 17.5 6.2M17 3v4h4M7 21v-4H3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 8h11v11H8V8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 16H4V4h12v1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 14.2 9.8 21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function SwordsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 6-6M14 10l6-6M15 5l4 4M3 5l16 16M5 3l16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
