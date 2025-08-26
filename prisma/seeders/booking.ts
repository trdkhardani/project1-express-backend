import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedBooking() {
    await prisma.booking.createMany({
        data: [
            {
                booking_id: "6bc0f360-e361-40a8-aa17-c98e19f83c8e",
                booking_payment_status: "SUCCESSFUL",
                booking_payment_method: "Credit Card",
                showtime_id: "2f07fbe0-bd28-4820-9fdf-be23b5148685", // The Exorcist at Pakuwon City Mall
                user_id: "d82da956-8b83-4dd2-b180-7bd246c31fda" // Tridiktya
            }
        ]
    })

    console.log("Bookings Seeded")
}