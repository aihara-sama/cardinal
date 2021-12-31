/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `sentences_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sentences_comments` ADD COLUMN `sentenceCommentId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sentences_tags_tag_key` ON `sentences_tags`(`tag`);

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_sentenceCommentId_fkey` FOREIGN KEY (`sentenceCommentId`) REFERENCES `sentences_comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
