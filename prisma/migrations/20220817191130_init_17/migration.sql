/*
  Warnings:

  - You are about to drop the column `createdAt` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `brand_on_products` table. All the data in the column will be lost.
  - The primary key for the `categories_on_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `categories_on_products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories_on_products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `images_on_brand` table. All the data in the column will be lost.
  - The primary key for the `images_on_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `images_on_category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `images_on_category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `images_on_product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products_on_order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `categories_on_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `images_on_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories_on_products" DROP CONSTRAINT "categories_on_products_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "images_on_category" DROP CONSTRAINT "images_on_category_categoryName_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "brand" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "brand_on_products" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "categories_on_products" DROP CONSTRAINT "categories_on_products_pkey",
DROP COLUMN "categoryName",
DROP COLUMN "createdAt",
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "categories_on_products_pkey" PRIMARY KEY ("product_id", "category_name");

-- AlterTable
ALTER TABLE "category" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "images_on_brand" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "images_on_category" DROP CONSTRAINT "images_on_category_pkey",
DROP COLUMN "categoryName",
DROP COLUMN "createdAt",
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "images_on_category_pkey" PRIMARY KEY ("image_id", "category_name");

-- AlterTable
ALTER TABLE "images_on_product" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "products_on_order" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "store" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "images_on_category" ADD CONSTRAINT "images_on_category_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_products" ADD CONSTRAINT "categories_on_products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
