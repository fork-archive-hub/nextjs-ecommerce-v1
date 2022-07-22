-- CreateTable
CREATE TABLE "ImagesOnProductBrand" (
    "imageId" TEXT NOT NULL,
    "productBrandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnProductBrand_pkey" PRIMARY KEY ("imageId","productBrandId")
);

-- AddForeignKey
ALTER TABLE "ImagesOnProductBrand" ADD CONSTRAINT "ImagesOnProductBrand_productBrandId_fkey" FOREIGN KEY ("productBrandId") REFERENCES "ProductBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnProductBrand" ADD CONSTRAINT "ImagesOnProductBrand_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
