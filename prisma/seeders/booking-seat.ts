import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedBookingSeat() {
    await prisma.bookingSeat.createMany({
        data: [
            {
                seat_id: 1, // Seat A1 at Pakuwon City Mall
                booking_id: "6bc0f360-e361-40a8-aa17-c98e19f83c8e",
            }
        ]
    })

    console.log("Booking Seats Seeded")
}