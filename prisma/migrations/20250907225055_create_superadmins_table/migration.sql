-- CreateTable
CREATE TABLE "public"."superadmins" (
    "superadmin_id" TEXT NOT NULL,
    "superadmin_email" VARCHAR(50) NOT NULL,
    "superadmin_username" CHAR(15) NOT NULL,
    "superadmin_password" TEXT NOT NULL,

    CONSTRAINT "superadmins_pkey" PRIMARY KEY ("superadmin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superadmins_superadmin_email_key" ON "public"."superadmins"("superadmin_email");

-- CreateIndex
CREATE UNIQUE INDEX "superadmins_superadmin_username_key" ON "public"."superadmins"("superadmin_username");
