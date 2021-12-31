/*
  Warnings:

  - You are about to drop the column `chatRoomId` on the `users` table. All the data in the column will be lost.
  - Added the required column `socketId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_chatRoomId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `chatRoomId`,
    ADD COLUMN `socketId` VARCHAR(191) NOT NULL,
    ADD COLUMN `unreadComments` INTEGER NOT NULL DEFAULT 0;
