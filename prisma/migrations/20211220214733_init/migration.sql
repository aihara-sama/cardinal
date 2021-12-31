-- DropForeignKey
ALTER TABLE `sentences_comments` DROP FOREIGN KEY `sentences_comments_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_comments` DROP FOREIGN KEY `sentences_comments_sentenceCommentId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_comments` DROP FOREIGN KEY `sentences_comments_sentenceId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_likes` DROP FOREIGN KEY `sentences_likes_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_likes` DROP FOREIGN KEY `sentences_likes_sentenceId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_views` DROP FOREIGN KEY `sentences_views_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sentences_views` DROP FOREIGN KEY `sentences_views_sentenceId_fkey`;

-- AddForeignKey
ALTER TABLE `sentences_likes` ADD CONSTRAINT `sentences_likes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_likes` ADD CONSTRAINT `sentences_likes_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_views` ADD CONSTRAINT `sentences_views_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_views` ADD CONSTRAINT `sentences_views_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_sentenceCommentId_fkey` FOREIGN KEY (`sentenceCommentId`) REFERENCES `sentences_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
