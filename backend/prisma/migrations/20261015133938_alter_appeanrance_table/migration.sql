/*
  Warnings:

  - You are about to drop the column `PageTextColor` on the `Appearance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appearance" DROP COLUMN "PageTextColor",
ADD COLUMN     "pageTextColor" VARCHAR(7) NOT NULL DEFAULT '#19191e';
