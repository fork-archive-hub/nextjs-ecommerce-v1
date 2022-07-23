/*
  Warnings:

  - The primary key for the `BrandOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `BrandOnProducts` table. All the data in the column will be lost.
  - Added the required column `brandName` to the `BrandOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_name_fkey";

-- AlterTable
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_pkey",
DROP COLUMN "name",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD CONSTRAINT "BrandOnProducts_pkey" PRIMARY KEY ("productId", "brandName");

-- AddForeignKey
ALTER TABLE "BrandOnProducts" ADD CONSTRAINT "BrandOnProducts_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;
