/*
  Warnings:

  - Added the required column `allowSelfAccountDeletion` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settings` ADD COLUMN `allowSelfAccountDeletion` BOOLEAN NOT NULL;
