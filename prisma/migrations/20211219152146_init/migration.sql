/*
  Warnings:

  - You are about to drop the column `textInEnglish` on the `sentences` table. All the data in the column will be lost.
  - You are about to drop the column `textInRussian` on the `sentences` table. All the data in the column will be lost.
  - Added the required column `en` to the `sentences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ru` to the `sentences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sentences` DROP COLUMN `textInEnglish`,
    DROP COLUMN `textInRussian`,
    ADD COLUMN `en` VARCHAR(191) NOT NULL,
    ADD COLUMN `ru` VARCHAR(191) NOT NULL;
