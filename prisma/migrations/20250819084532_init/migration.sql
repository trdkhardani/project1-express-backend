-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('VALID', 'USED', 'REFUNDED');

-- CreateTable
CREATE TABLE "public"."admins" (
    "admin_id" TEXT NOT NULL,
    "cinema_chain_id" TEXT NOT NULL,
    "admin_email" VARCHAR(50) NOT NULL,
    "admin_username" CHAR(15) NOT NULL,
    "admin_password" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "public"."cinema_chains" (
    "cinema_chain_id" TEXT NOT NULL,
    "cinema_chain_brand" TEXT NOT NULL,
    "cinema_chain_logo" TEXT NOT NULL,

    CONSTRAINT "cinema_chains_pkey" PRIMARY KEY ("cinema_chain_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "user_username" CHAR(15) NOT NULL,
    "user_email" VARCHAR(50) NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_status" "public"."UserStatus" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."movies" (
    "movie_id" TEXT NOT NULL,
    "movie_title" TEXT NOT NULL,
    "movie_synopsis" TEXT NOT NULL,
    "movie_duration" SMALLINT NOT NULL,
    "movie_poster" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "public"."theaters" (
    "theater_id" TEXT NOT NULL,
    "cinema_chain_id" TEXT NOT NULL,
    "theater_location" TEXT NOT NULL,
    "theater_city" TEXT NOT NULL,

    CONSTRAINT "theaters_pkey" PRIMARY KEY ("theater_id")
);

-- CreateTable
CREATE TABLE "public"."seats" (
    "seat_id" SERIAL NOT NULL,
    "theater_id" TEXT NOT NULL,
    "seat_row" CHAR(1) NOT NULL,
    "seat_number" SMALLINT NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "public"."showtimes" (
    "showtime_id" TEXT NOT NULL,
    "theater_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "showtime_price" INTEGER NOT NULL,
    "showtime_start_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "showtimes_pkey" PRIMARY KEY ("showtime_id")
);

-- CreateTable
CREATE TABLE "public"."bookings" (
    "booking_id" TEXT NOT NULL,
    "showtime_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "booking_payment_status" "public"."PaymentStatus" NOT NULL,
    "booking_payment_method" TEXT,
    "booking_date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "public"."booking_seats" (
    "booking_seat_id" TEXT NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "booking_id" TEXT NOT NULL,

    CONSTRAINT "booking_seats_pkey" PRIMARY KEY ("booking_seat_id")
);

-- CreateTable
CREATE TABLE "public"."tickets" (
    "ticket_id" TEXT NOT NULL,
    "booking_seat_id" TEXT NOT NULL,
    "ticket_issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_qr_code" TEXT NOT NULL,
    "ticket_status" "public"."TicketStatus" NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_admin_email_key" ON "public"."admins"("admin_email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_admin_username_key" ON "public"."admins"("admin_username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_username_key" ON "public"."users"("user_username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "public"."users"("user_email");

-- AddForeignKey
ALTER TABLE "public"."admins" ADD CONSTRAINT "admins_cinema_chain_id_fkey" FOREIGN KEY ("cinema_chain_id") REFERENCES "public"."cinema_chains"("cinema_chain_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."theaters" ADD CONSTRAINT "theaters_cinema_chain_id_fkey" FOREIGN KEY ("cinema_chain_id") REFERENCES "public"."cinema_chains"("cinema_chain_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."seats" ADD CONSTRAINT "seats_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "public"."theaters"("theater_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."showtimes" ADD CONSTRAINT "showtimes_theater_id_fkey" FOREIGN KEY ("theater_id") REFERENCES "public"."theaters"("theater_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."showtimes" ADD CONSTRAINT "showtimes_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_showtime_id_fkey" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtimes"("showtime_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_seats" ADD CONSTRAINT "booking_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "public"."seats"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."booking_seats" ADD CONSTRAINT "booking_seats_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_booking_seat_id_fkey" FOREIGN KEY ("booking_seat_id") REFERENCES "public"."booking_seats"("booking_seat_id") ON DELETE CASCADE ON UPDATE CASCADE;
