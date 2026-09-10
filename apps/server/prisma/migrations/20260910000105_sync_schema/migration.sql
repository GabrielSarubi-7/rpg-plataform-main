/*
  Warnings:

  - You are about to drop the column `settings_json` on the `campaigns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "settings_json";
