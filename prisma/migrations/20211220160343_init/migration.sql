/*
  Warnings:

  - Added the required column `authorId` to the `sentences_comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sentences` DROP FOREIGN KEY `sentences_authorId_fkey`;

-- AlterTable
ALTER TABLE `sentences_comments` ADD COLUMN `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `sentences` ADD CONSTRAINT `sentences_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
