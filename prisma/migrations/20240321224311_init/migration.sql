-- CreateEnum
CREATE TYPE "DeparturiesStatus" AS ENUM ('STARTED', 'FINISHED');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'COMUM');

-- CreateEnum
CREATE TYPE "EntriesStatus" AS ENUM ('LOCAL', 'TRANSIT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDENTE', 'ATIVO', 'INATIVO');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "UserStatus" NOT NULL DEFAULT 'PENDENTE',
    "role" "Roles" NOT NULL DEFAULT 'COMUM',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "tel" TEXT,
    "userId" TEXT NOT NULL,
    "stateId" TEXT,
    "cityId" TEXT,

    CONSTRAINT "Persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Centers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stocks" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "qtd" DECIMAL(65,30) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entries" (
    "id" TEXT NOT NULL,
    "transportation" TEXT,
    "arrivalDate" TIMESTAMP(3),
    "departureDate" TIMESTAMP(3),
    "container" TEXT,
    "invoice" TEXT,
    "damage" TEXT,
    "qtd" DECIMAL(65,30),
    "createAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "status" "EntriesStatus",
    "productId" TEXT NOT NULL,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departuries" (
    "id" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3),
    "invoice" TEXT,
    "client" TEXT,
    "value" DECIMAL(65,30),
    "total" DECIMAL(65,30),
    "qtd" DECIMAL(65,30),
    "createAt" TIMESTAMP(3),
    "updateAt" TIMESTAMP(3),
    "status" "DeparturiesStatus",
    "productId" TEXT NOT NULL,

    CONSTRAINT "Departuries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "States" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    CONSTRAINT "States_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Persons_cpf_key" ON "Persons"("cpf");

-- AddForeignKey
ALTER TABLE "Persons" ADD CONSTRAINT "persons_userId_foreign" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Persons" ADD CONSTRAINT "state_stateId_foreign" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Persons" ADD CONSTRAINT "city_cityId_foreign" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stocks" ADD CONSTRAINT "stock_centerId_foreign" FOREIGN KEY ("centerId") REFERENCES "Centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stocks" ADD CONSTRAINT "stockk_productId_foreign" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "entries_productId_foreign" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Departuries" ADD CONSTRAINT "departuries_productId_foreign" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cities" ADD CONSTRAINT "state_stateId_foreign" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
