/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `Appearance` table. All the data in the column will be lost.
  - You are about to drop the column `fontColor` on the `Appearance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appearance" DROP COLUMN "backgroundColor",
DROP COLUMN "fontColor",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'default';
