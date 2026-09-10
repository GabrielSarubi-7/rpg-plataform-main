ALTER TABLE "campaigns"
ADD COLUMN IF NOT EXISTS "settings_json" JSONB;
