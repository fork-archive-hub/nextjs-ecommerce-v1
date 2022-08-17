/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `BrandOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brandName` on the `BrandOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `BrandOnProducts` table. All the data in the column will be lost.
  - The primary key for the `CategoriesOnProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `CategoriesOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `ImagesOnBrand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brandName` on the `ImagesOnBrand` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `ImagesOnBrand` table. All the data in the column will be lost.
  - The primary key for the `ImagesOnCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageId` on the `ImagesOnCategory` table. All the data in the column will be lost.
  - The primary key for the `ImagesOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageId` on the `ImagesOnProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ImagesOnProduct` table. All the data in the column will be lost.
  - You are about to drop the column `deliveredAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `itemsPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `taxPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `PaymentResult` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `PaymentResult` table. All the data in the column will be lost.
  - You are about to drop the column `countInStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storesCounter` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `productsCounter` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProductsOnOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `BrandOnProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `PaymentResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_name` to the `BrandOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `BrandOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `CategoriesOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_mame` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_mame` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_name` to the `ImagesOnBrand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `ImagesOnBrand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `ImagesOnCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `ImagesOnProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ImagesOnProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_rice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `PaymentResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PaymentResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count_in_stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_brandName_fkey";

-- DropForeignKey
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnBrand" DROP CONSTRAINT "ImagesOnBrand_brandName_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnBrand" DROP CONSTRAINT "ImagesOnBrand_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnCategory" DROP CONSTRAINT "ImagesOnCategory_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnProduct" DROP CONSTRAINT "ImagesOnProduct_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImagesOnProduct" DROP CONSTRAINT "ImagesOnProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentResult" DROP CONSTRAINT "PaymentResult_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrder" DROP CONSTRAINT "ProductsOnOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrder" DROP CONSTRAINT "ProductsOnOrder_productId_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_sellerId_fkey";

-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "BrandOnProducts_productId_key";

-- DropIndex
DROP INDEX "Customer_userId_key";

-- DropIndex
DROP INDEX "PaymentResult_orderId_key";

-- DropIndex
DROP INDEX "Seller_userId_key";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- DropIndex
DROP INDEX "Store_addressId_key";

-- DropIndex
DROP INDEX "Store_imageId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "providerAccountId",
DROP COLUMN "userId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postalCode",
ADD COLUMN     "postal_code" TEXT;

-- AlterTable
ALTER TABLE "BrandOnProducts" DROP CONSTRAINT "BrandOnProducts_pkey",
DROP COLUMN "brandName",
DROP COLUMN "productId",
ADD COLUMN     "brand_name" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD CONSTRAINT "BrandOnProducts_pkey" PRIMARY KEY ("product_id", "brand_name");

-- AlterTable
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_pkey",
DROP COLUMN "productId",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("product_id", "categoryName");

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "dateOfBirth",
DROP COLUMN "firstName",
DROP COLUMN "secondName",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_mame" TEXT NOT NULL,
ADD COLUMN     "second_mame" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImagesOnBrand" DROP CONSTRAINT "ImagesOnBrand_pkey",
DROP COLUMN "brandName",
DROP COLUMN "imageId",
ADD COLUMN     "brand_name" TEXT NOT NULL,
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD CONSTRAINT "ImagesOnBrand_pkey" PRIMARY KEY ("image_id", "brand_name");

-- AlterTable
ALTER TABLE "ImagesOnCategory" DROP CONSTRAINT "ImagesOnCategory_pkey",
DROP COLUMN "imageId",
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD CONSTRAINT "ImagesOnCategory_pkey" PRIMARY KEY ("image_id", "categoryName");

-- AlterTable
ALTER TABLE "ImagesOnProduct" DROP CONSTRAINT "ImagesOnProduct_pkey",
DROP COLUMN "imageId",
DROP COLUMN "productId",
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD CONSTRAINT "ImagesOnProduct_pkey" PRIMARY KEY ("image_id", "product_id");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveredAt",
DROP COLUMN "itemsPrice",
DROP COLUMN "paidAt",
DROP COLUMN "paymentMethod",
DROP COLUMN "shippingAddressId",
DROP COLUMN "shippingPrice",
DROP COLUMN "taxPrice",
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "items_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "shipping_address_id" TEXT NOT NULL,
ADD COLUMN     "shipping_rice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax_price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PaymentResult" DROP COLUMN "orderId",
DROP COLUMN "updateAt",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "countInStock",
DROP COLUMN "storeId",
DROP COLUMN "updatedAt",
ADD COLUMN     "count_in_stock" INTEGER NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "storesCounter",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "stores_counter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionToken",
DROP COLUMN "userId",
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "addressId",
DROP COLUMN "imageId",
DROP COLUMN "productsCounter",
DROP COLUMN "sellerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "address_id" TEXT NOT NULL,
ADD COLUMN     "image_id" TEXT,
ADD COLUMN     "products_counter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "seller_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "updatedAt",
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "ProductsOnOrder";

-- CreateTable
CREATE TABLE "products_on_order" (
    "quantity" INTEGER NOT NULL,
    "price_per_product" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "products_on_order_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "BrandOnProducts_product_id_key" ON "BrandOnProducts"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_user_id_key" ON "Customer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentResult_order_id_key" ON "PaymentResult"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_user_id_key" ON "Seller"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "Store_address_id_key" ON "Store"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_image_id_key" ON "Store"("image_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandOnProducts" ADD CONSTRAINT "BrandOnProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandOnProducts" ADD CONSTRAINT "BrandOnProducts_brand_name_fkey" FOREIGN KEY ("brand_name") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrand" ADD CONSTRAINT "ImagesOnBrand_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnBrand" ADD CONSTRAINT "ImagesOnBrand_brand_name_fkey" FOREIGN KEY ("brand_name") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnProduct" ADD CONSTRAINT "ImagesOnProduct_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnProduct" ADD CONSTRAINT "ImagesOnProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesOnCategory" ADD CONSTRAINT "ImagesOnCategory_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentResult" ADD CONSTRAINT "PaymentResult_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_order" ADD CONSTRAINT "products_on_order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_on_order" ADD CONSTRAINT "products_on_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
