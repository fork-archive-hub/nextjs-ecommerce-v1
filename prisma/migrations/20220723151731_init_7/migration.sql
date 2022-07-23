/*
  Warnings:

  - You are about to drop the `ImagesOnProductBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductBrand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesOnProductBrand" DROP CONSTRAINT "ImagesOnProductBrand_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnProductBrand" DROP CONSTRAINT "ImagesOnProductBrand_productBrandId_fkey";

-- DropForeignKey
ALTER TABLE "ProductBrand" DROP CONSTRAINT "ProductBrand_productId_fkey";

-- DropTable
DROP TABLE "ImagesOnProductBrand";

-- DropTable
DROP TABLE "ProductBrand";

-- CreateTable
CREATE TABLE "BrandOnProducts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "BrandOnProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesOnBrandOnProducts" (
    "imageId" TEXT NOT NULL,
    "productBrandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnBrandOnProducts_pkey" PRIMARY KEY ("imageId","productBrandId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrandOnProducts_name_key" ON "BrandOnProducts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BrandOnProducts_productId_key" ON "BrandOnProducts"("productId");

-- AddForeignKey
ALTER TABLE "BrandOnProducts" ADD CONSTRAINT "BrandOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrandOnProducts" ADD CONSTRAINT "ImagesOnBrandOnProducts_productBrandId_fkey" FOREIGN KEY ("productBrandId") REFERENCES "BrandOnProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrandOnProducts" ADD CONSTRAINT "ImagesOnBrandOnProducts_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
