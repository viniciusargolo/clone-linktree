/*
  Warnings:

  - The primary key for the `Appearance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `theme` on the `Appearance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appearance" DROP CONSTRAINT "Appearance_pkey",
DROP COLUMN "theme",
ADD COLUMN     "PageTextColor" VARCHAR(7) NOT NULL DEFAULT '#19191e',
ADD COLUMN     "buttonBackground" VARCHAR(7) NOT NULL DEFAULT '#f6339a',
ADD COLUMN     "buttonTextColor" VARCHAR(7) NOT NULL DEFAULT '#19191e',
ADD COLUMN     "pageBackground" VARCHAR(7) NOT NULL DEFAULT '#f5efe1',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Appearance_id_seq";
