/*
  Warnings:

  - The primary key for the `superadmins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `superadmin_email` on the `superadmins` table. All the data in the column will be lost.
  - You are about to drop the column `superadmin_id` on the `superadmins` table. All the data in the column will be lost.
  - You are about to drop the column `superadmin_password` on the `superadmins` table. All the data in the column will be lost.
  - You are about to drop the column `superadmin_username` on the `superadmins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin_email]` on the table `superadmins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[admin_username]` on the table `superadmins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_email` to the `superadmins` table without a default value. This is not possible if the table is not empty.
  - The required column `admin_id` was added to the `superadmins` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `admin_password` to the `superadmins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin_username` to the `superadmins` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."superadmins_superadmin_email_key";

-- DropIndex
DROP INDEX "public"."superadmins_superadmin_username_key";

-- AlterTable
ALTER TABLE "public"."superadmins" DROP CONSTRAINT "superadmins_pkey",
DROP COLUMN "superadmin_email",
DROP COLUMN "superadmin_id",
DROP COLUMN "superadmin_password",
DROP COLUMN "superadmin_username",
ADD COLUMN     "admin_email" VARCHAR(50) NOT NULL,
ADD COLUMN     "admin_id" TEXT NOT NULL,
ADD COLUMN     "admin_password" TEXT NOT NULL,
ADD COLUMN     "admin_username" CHAR(15) NOT NULL,
ADD CONSTRAINT "superadmins_pkey" PRIMARY KEY ("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "superadmins_admin_email_key" ON "public"."superadmins"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "superadmins_admin_username_key" ON "public"."superadmins"("admin_username");
