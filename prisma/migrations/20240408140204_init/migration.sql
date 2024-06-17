/*
  Warnings:

  - Added the required column `companyId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "companies_companyId_foreign" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "companies_companyId_foreign" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
