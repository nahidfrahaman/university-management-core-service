/*
  Warnings:

  - Made the column `endMonth` on table `academic_semisters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "academic_semisters" ALTER COLUMN "endMonth" SET NOT NULL,
ALTER COLUMN "endMonth" SET DATA TYPE TEXT;
