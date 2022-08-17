/*
  Warnings:

  - You are about to drop the column `first_mame` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `second_mame` on the `customer` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_name` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "first_mame",
DROP COLUMN "second_mame",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "second_name" TEXT NOT NULL;
