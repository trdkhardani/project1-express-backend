/*
  Warnings:

  - Added the required column `ticket_qr_code` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tickets" DROP COLUMN "ticket_qr_code",
ADD COLUMN     "ticket_qr_code" BYTEA NOT NULL;
