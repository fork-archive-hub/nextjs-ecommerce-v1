/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "imageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Store_imageId_key" ON "Store"("imageId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
