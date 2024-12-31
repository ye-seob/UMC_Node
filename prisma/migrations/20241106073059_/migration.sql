/*
  Warnings:

  - You are about to drop the column `created_at` on the `food_category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `food_category` table. All the data in the column will be lost.
  - You are about to drop the column `inactive_date` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `food_category` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `inactive_date`;
