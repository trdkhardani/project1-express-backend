-- AlterTable
ALTER TABLE "public"."admins" ALTER COLUMN "admin_username" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "public"."superadmins" ALTER COLUMN "admin_username" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "user_username" SET DATA TYPE VARCHAR(15);
