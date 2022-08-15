/*
  Warnings:

  - You are about to drop the `ProductOnStore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductOnStore" DROP CONSTRAINT "ProductOnStore_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnStore" DROP CONSTRAINT "ProductOnStore_storeId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "storeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductOnStore";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
