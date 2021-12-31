-- AlterTable
ALTER TABLE `users` ADD COLUMN `chatRoomId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_chatRoomId_fkey` FOREIGN KEY (`chatRoomId`) REFERENCES `sentences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
