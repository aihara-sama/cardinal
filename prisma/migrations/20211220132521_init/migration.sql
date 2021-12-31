-- CreateTable
CREATE TABLE `sentences_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(1000) NOT NULL,
    `sentenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sentences_comments` ADD CONSTRAINT `sentences_comments_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
