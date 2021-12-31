/*
  Warnings:

  - You are about to drop the column `roomId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `socketId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `unreadComments` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `roomId`,
    DROP COLUMN `socketId`,
    DROP COLUMN `unreadComments`,
    ADD COLUMN `unreadCommentsNumber` INTEGER NOT NULL DEFAULT 0;
