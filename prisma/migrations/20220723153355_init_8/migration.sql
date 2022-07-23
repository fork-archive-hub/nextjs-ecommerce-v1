/*
  Warnings:

  - The primary key for the `BrandOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BrandOnProducts` table. All the data in the column will be lost.
  - You are about to drop the `ImagesOnBrandOnProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesOnBrandOnProducts" DROP CONSTRAINT "ImagesOnBrandOnProducts_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnBrandOnProducts" DROP CONSTRAINT "ImagesOnBrandOnProducts_productBrandId_fkey";

-- DropIndex
DROP INDEX "BrandOnProducts_name_key";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BrandOnProducts_pkey" PRIMARY KEY ("name", "productId");

-- DropTable
DROP TABLE "ImagesOnBrandOnProducts";

-- CreateTable
CREATE TABLE "Brand" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ImagesOnBrand" (
    "imageId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnBrand_pkey" PRIMARY KEY ("imageId","brandName")
);

-- AddForeignKey
ALTER TABLE "BrandOnProducts" ADD CONSTRAINT "BrandOnProducts_name_fkey" FOREIGN KEY ("name") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrand" ADD CONSTRAINT "ImagesOnBrand_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrand" ADD CONSTRAINT "ImagesOnBrand_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
