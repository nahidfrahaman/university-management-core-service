/*
  Warnings:

  - You are about to drop the column `EndMonth` on the `academic_semisters` table. All the data in the column will be lost.
  - Added the required column `endMonth` to the `academic_semisters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "academic_semisters" DROP COLUMN "EndMonth",
ADD COLUMN     "endMonth" VARCHAR ;
