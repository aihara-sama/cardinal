-- CreateTable
CREATE TABLE `SentenceLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `sentenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SentenceLike` ADD CONSTRAINT `SentenceLike_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SentenceLike` ADD CONSTRAINT `SentenceLike_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
