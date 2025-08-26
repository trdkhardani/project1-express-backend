import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedSeat() {
    await prisma.seat.createMany({
        data: [
            // Pakuwon City Mall
            {
                seat_number: 1,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'A',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 1,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'B',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 1,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'C',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 1,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'D',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 1,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'E',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 1,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 2,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 3,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 4,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 5,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 6,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 7,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 8,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 9,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },
            {
                seat_number: 10,
                seat_row: 'F',
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", 
            },

            // Mall Kelapa Gading
            {
                seat_number: 1,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'A',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 1,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'B',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 1,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'C',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 1,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'D',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 1,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'E',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 1,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 2,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 3,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 4,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 5,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 6,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 7,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 8,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 9,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
            {
                seat_number: 10,
                seat_row: 'F',
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", 
            },
        ]
    })

    console.log("Seats Seeded")
}