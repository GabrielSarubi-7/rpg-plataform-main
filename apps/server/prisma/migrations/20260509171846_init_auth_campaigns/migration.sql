-- CreateEnum
CREATE TYPE "CampaignRole" AS ENUM ('owner', 'gm', 'player', 'spectator');

-- CreateEnum
CREATE TYPE "CampaignSessionStatus" AS ENUM ('active', 'ended');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "refresh_token_hash" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_members" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "CampaignRole" NOT NULL DEFAULT 'player',
    "display_name" TEXT,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3),

    CONSTRAINT "campaign_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_invites" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "role_on_join" "CampaignRole" NOT NULL DEFAULT 'player',
    "created_by_user_id" TEXT NOT NULL,
    "max_uses" INTEGER,
    "uses_count" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_sessions" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "active_map_id" TEXT,
    "status" "CampaignSessionStatus" NOT NULL DEFAULT 'active',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "created_by_user_id" TEXT NOT NULL,

    CONSTRAINT "campaign_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_idx" ON "user_sessions"("user_id");

-- CreateIndex
CREATE INDEX "campaigns_owner_user_id_idx" ON "campaigns"("owner_user_id");

-- CreateIndex
CREATE INDEX "campaign_members_campaign_id_idx" ON "campaign_members"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_members_user_id_idx" ON "campaign_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_members_campaign_id_user_id_key" ON "campaign_members"("campaign_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_invites_code_key" ON "campaign_invites"("code");

-- CreateIndex
CREATE INDEX "campaign_invites_campaign_id_idx" ON "campaign_invites"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_invites_created_by_user_id_idx" ON "campaign_invites"("created_by_user_id");

-- CreateIndex
CREATE INDEX "campaign_sessions_campaign_id_idx" ON "campaign_sessions"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_sessions_created_by_user_id_idx" ON "campaign_sessions"("created_by_user_id");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_members" ADD CONSTRAINT "campaign_members_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_members" ADD CONSTRAINT "campaign_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_invites" ADD CONSTRAINT "campaign_invites_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_invites" ADD CONSTRAINT "campaign_invites_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_sessions" ADD CONSTRAINT "campaign_sessions_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_sessions" ADD CONSTRAINT "campaign_sessions_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
