/*
  Warnings:

  - The values [STARTED,FINISHED] on the enum `DeparturiesStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TRANSIT] on the enum `EntriesStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeparturiesStatus_new" AS ENUM ('INICIADO', 'FINALIZADO');
ALTER TABLE "Departuries" ALTER COLUMN "status" TYPE "DeparturiesStatus_new" USING ("status"::text::"DeparturiesStatus_new");
ALTER TYPE "DeparturiesStatus" RENAME TO "DeparturiesStatus_old";
ALTER TYPE "DeparturiesStatus_new" RENAME TO "DeparturiesStatus";
DROP TYPE "DeparturiesStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EntriesStatus_new" AS ENUM ('LOCAL', 'TRANSITO');
ALTER TABLE "Entries" ALTER COLUMN "status" TYPE "EntriesStatus_new" USING ("status"::text::"EntriesStatus_new");
ALTER TYPE "EntriesStatus" RENAME TO "EntriesStatus_old";
ALTER TYPE "EntriesStatus_new" RENAME TO "EntriesStatus";
DROP TYPE "EntriesStatus_old";
COMMIT;
