/*
  Warnings:

  - You are about to drop the column `sentenceId` on the `sentences_tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sentences_tags` DROP FOREIGN KEY `sentences_tags_sentenceId_fkey`;

-- AlterTable
ALTER TABLE `sentences_tags` DROP COLUMN `sentenceId`;

-- CreateTable
CREATE TABLE `_SentenceToSentenceTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SentenceToSentenceTag_AB_unique`(`A`, `B`),
    INDEX `_SentenceToSentenceTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SentenceToSentenceTag` ADD FOREIGN KEY (`A`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SentenceToSentenceTag` ADD FOREIGN KEY (`B`) REFERENCES `sentences_tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
