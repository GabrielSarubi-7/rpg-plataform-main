-- CreateEnum
CREATE TYPE "GridType" AS ENUM ('square', 'hex');

-- CreateEnum
CREATE TYPE "TokenVisibility" AS ENUM ('public', 'gm_only', 'owner_only', 'custom');

-- CreateEnum
CREATE TYPE "TokenDisposition" AS ENUM ('friendly', 'neutral', 'hostile', 'hidden');

-- CreateTable
CREATE TABLE "maps" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "cell_size" INTEGER NOT NULL,
    "grid_type" "GridType" NOT NULL DEFAULT 'square',
    "background_image" TEXT,
    "background_fit_mode" TEXT NOT NULL DEFAULT 'stretch',
    "background_offset_x" INTEGER NOT NULL DEFAULT 0,
    "background_offset_y" INTEGER NOT NULL DEFAULT 0,
    "background_scale" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "grid_offset_x" INTEGER NOT NULL DEFAULT 0,
    "grid_offset_y" INTEGER NOT NULL DEFAULT 0,
    "grid_color" TEXT NOT NULL DEFAULT '#ffffff',
    "grid_opacity" DOUBLE PRECISION NOT NULL DEFAULT 0.22,
    "fog_enabled" BOOLEAN NOT NULL DEFAULT false,
    "fog_mode" TEXT NOT NULL DEFAULT 'manual',
    "fog_opacity" DOUBLE PRECISION NOT NULL DEFAULT 0.85,
    "fog_players_see_explored" BOOLEAN NOT NULL DEFAULT false,
    "layer_config_json" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "map_tokens" (
    "id" TEXT NOT NULL,
    "map_id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "width_cells" INTEGER NOT NULL DEFAULT 1,
    "height_cells" INTEGER NOT NULL DEFAULT 1,
    "rotation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "z_index" INTEGER NOT NULL DEFAULT 0,
    "scale_x" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "scale_y" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "layer_key" TEXT NOT NULL DEFAULT 'tokens',
    "visibility" "TokenVisibility" NOT NULL DEFAULT 'public',
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "elevation" INTEGER NOT NULL DEFAULT 0,
    "stand_mode" TEXT NOT NULL DEFAULT 'auto',
    "bars_json" JSONB,
    "status_json" JSONB,
    "vision_json" JSONB,
    "light_json" JSONB,
    "disposition" "TokenDisposition" NOT NULL DEFAULT 'neutral',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "map_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "maps_campaign_id_idx" ON "maps"("campaign_id");

-- CreateIndex
CREATE INDEX "map_tokens_map_id_idx" ON "map_tokens"("map_id");

-- CreateIndex
CREATE INDEX "campaign_sessions_active_map_id_idx" ON "campaign_sessions"("active_map_id");

-- AddForeignKey
ALTER TABLE "maps" ADD CONSTRAINT "maps_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "map_tokens" ADD CONSTRAINT "map_tokens_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
