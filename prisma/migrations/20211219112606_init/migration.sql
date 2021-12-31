/*
  Warnings:

  - You are about to drop the `sentencelike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sentencelike` DROP FOREIGN KEY `SentenceLike_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sentencelike` DROP FOREIGN KEY `SentenceLike_sentenceId_fkey`;

-- DropTable
DROP TABLE `sentencelike`;

-- DropTable
DROP TABLE `session`;

-- CreateTable
CREATE TABLE `sentences_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `sentenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentences_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `sentenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sentences_likes` ADD CONSTRAINT `sentences_likes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_likes` ADD CONSTRAINT `sentences_likes_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_views` ADD CONSTRAINT `sentences_views_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences_views` ADD CONSTRAINT `sentences_views_sentenceId_fkey` FOREIGN KEY (`sentenceId`) REFERENCES `sentences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
