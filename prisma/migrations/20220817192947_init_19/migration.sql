/*
  Warnings:

  - A unique constraint covering the columns `[seller_id,title]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "store_id_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "store_seller_id_title_key" ON "store"("seller_id", "title");
