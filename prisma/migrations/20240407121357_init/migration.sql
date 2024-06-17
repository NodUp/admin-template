/*
  Warnings:

  - You are about to drop the column `centerId` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the `Centers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stocks" DROP CONSTRAINT "stock_centerId_foreign";

-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "centerId";

-- DropTable
DROP TABLE "Centers";
