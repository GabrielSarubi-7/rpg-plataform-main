-- CreateEnum
CREATE TYPE "CharacterType" AS ENUM ('pc', 'npc', 'monster');

-- CreateEnum
CREATE TYPE "CharacterVisibility" AS ENUM ('private', 'gm_only', 'public');

-- AlterTable
ALTER TABLE "map_tokens" ADD COLUMN     "character_id" TEXT;

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "owner_user_id" TEXT,
    "created_by_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CharacterType" NOT NULL DEFAULT 'pc',
    "visibility" "CharacterVisibility" NOT NULL DEFAULT 'private',
    "portrait_image" TEXT,
    "default_token_image" TEXT,
    "system" TEXT NOT NULL DEFAULT 'dnd5e',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_sheets" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "system" TEXT NOT NULL DEFAULT 'dnd5e',
    "schema_version" INTEGER NOT NULL DEFAULT 1,
    "data_json" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "last_edited_by_user_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "character_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_permissions" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "can_view" BOOLEAN NOT NULL DEFAULT true,
    "can_edit" BOOLEAN NOT NULL DEFAULT false,
    "can_control" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "character_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "characters_campaign_id_idx" ON "characters"("campaign_id");

-- CreateIndex
CREATE INDEX "characters_owner_user_id_idx" ON "characters"("owner_user_id");

-- CreateIndex
CREATE INDEX "characters_created_by_user_id_idx" ON "characters"("created_by_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_sheets_character_id_key" ON "character_sheets"("character_id");

-- CreateIndex
CREATE INDEX "character_permissions_character_id_idx" ON "character_permissions"("character_id");

-- CreateIndex
CREATE INDEX "character_permissions_user_id_idx" ON "character_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_permissions_character_id_user_id_key" ON "character_permissions"("character_id", "user_id");

-- CreateIndex
CREATE INDEX "map_tokens_character_id_idx" ON "map_tokens"("character_id");

-- AddForeignKey
ALTER TABLE "map_tokens" ADD CONSTRAINT "map_tokens_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_sheets" ADD CONSTRAINT "character_sheets_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_permissions" ADD CONSTRAINT "character_permissions_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_permissions" ADD CONSTRAINT "character_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
