/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images_on_brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images_on_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images_on_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_result` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_on_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "brand_on_products" DROP CONSTRAINT "brand_on_products_brand_name_fkey";

-- DropForeignKey
ALTER TABLE "brand_on_products" DROP CONSTRAINT "brand_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_products" DROP CONSTRAINT "categories_on_products_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "categories_on_products" DROP CONSTRAINT "categories_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "images_on_brand" DROP CONSTRAINT "images_on_brand_brand_name_fkey";

-- DropForeignKey
ALTER TABLE "images_on_brand" DROP CONSTRAINT "images_on_brand_image_id_fkey";

-- DropForeignKey
ALTER TABLE "images_on_category" DROP CONSTRAINT "images_on_category_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "images_on_category" DROP CONSTRAINT "images_on_category_image_id_fkey";

-- DropForeignKey
ALTER TABLE "images_on_product" DROP CONSTRAINT "images_on_product_image_id_fkey";

-- DropForeignKey
ALTER TABLE "images_on_product" DROP CONSTRAINT "images_on_product_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "payment_result" DROP CONSTRAINT "payment_result_order_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_store_id_fkey";

-- DropForeignKey
ALTER TABLE "products_on_order" DROP CONSTRAINT "products_on_order_order_id_fkey";

-- DropForeignKey
ALTER TABLE "products_on_order" DROP CONSTRAINT "products_on_order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_address_id_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_image_id_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_seller_id_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "brand";

-- DropTable
DROP TABLE "brand_on_products";

-- DropTable
DROP TABLE "categories_on_products";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "image";

-- DropTable
DROP TABLE "images_on_brand";

-- DropTable
DROP TABLE "images_on_category";

-- DropTable
DROP TABLE "images_on_product";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "payment_result";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "products_on_order";

-- DropTable
DROP TABLE "seller";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "store";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification_token";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role",
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Brand" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "first_mame" TEXT NOT NULL,
    "second_mame" TEXT NOT NULL,
    "bio" TEXT,
    "sex" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "stores_counter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "image_id" TEXT,
    "products_counter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandOnProducts" (
    "product_id" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrandOnProducts_pkey" PRIMARY KEY ("product_id","brand_name")
);

-- CreateTable
CREATE TABLE "ImagesOnBrand" (
    "image_id" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnBrand_pkey" PRIMARY KEY ("image_id","brand_name")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "count_in_stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "store_id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesOnProduct" (
    "image_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnProduct_pkey" PRIMARY KEY ("image_id","product_id")
);

-- CreateTable
CREATE TABLE "ImagesOnCategory" (
    "image_id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagesOnCategory_pkey" PRIMARY KEY ("image_id","categoryName")
);

-- CreateTable
CREATE TABLE "CategoriesOnProducts" (
    "product_id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnProducts_pkey" PRIMARY KEY ("product_id","categoryName")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "items_price" DOUBLE PRECISION NOT NULL,
    "tax_price" DOUBLE PRECISION NOT NULL,
    "shipping_rice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "payment_method" TEXT NOT NULL,
    "shipping_address_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentResult" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "PaymentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnOrder" (
    "quantity" INTEGER NOT NULL,
    "price_per_product" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "ProductsOnOrder_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Address_country_city_address_key" ON "Address"("country", "city", "address");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_user_id_key" ON "Customer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_user_id_key" ON "Seller"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_address_id_key" ON "Store"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_image_id_key" ON "Store"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_title_key" ON "Store"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "BrandOnProducts_product_id_key" ON "BrandOnProducts"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentResult_order_id_key" ON "PaymentResult"("order_id");

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
ALTER TABLE "ImagesOnCategory" ADD CONSTRAINT "ImagesOnCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentResult" ADD CONSTRAINT "PaymentResult_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
