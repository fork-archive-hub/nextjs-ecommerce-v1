/*
  Warnings:

  - You are about to drop the column `address` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[country,city,street_address]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `street_address` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "address_country_city_address_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "address",
ADD COLUMN     "street_address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "address_country_city_street_address_key" ON "address"("country", "city", "street_address");
