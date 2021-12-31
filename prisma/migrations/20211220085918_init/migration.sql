-- CreateTable
CREATE TABLE `sentences_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` ENUM('Nature', 'Animals', 'History', 'Industry') NOT NULL,
    `sentenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sentences_tags` ADD CONSTRAINT `sentences_tags_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
