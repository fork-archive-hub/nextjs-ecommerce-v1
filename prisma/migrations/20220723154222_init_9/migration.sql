/*
  Warnings:

  - The primary key for the `CategoriesOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoriesOnProducts` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `ImagesOnCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `ImagesOnCategory` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `CategoriesOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `ImagesOnCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnCategory" DROP CONSTRAINT "ImagesOnCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("productId", "categoryName");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "ImagesOnCategory" DROP CONSTRAINT "ImagesOnCategory_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD CONSTRAINT "ImagesOnCategory_pkey" PRIMARY KEY ("imageId", "categoryName");

-- AddForeignKey
ALTER TABLE "ImagesOnCategory" ADD CONSTRAINT "ImagesOnCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
