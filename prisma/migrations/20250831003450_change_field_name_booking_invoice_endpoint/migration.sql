/*
  Warnings:

  - You are about to drop the column `booking_invoice_url` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."bookings" DROP COLUMN "booking_invoice_url",
ADD COLUMN     "booking_invoice_endpoint" TEXT;
