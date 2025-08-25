import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedTheater() {
    await prisma.theater.createMany({
        data: [
            {
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24",
                cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1", // DuaPuluhEmpat
                theater_location: "Pakuwon City Mall",
                theater_city: "Surabaya"
            },
            {
                theater_id: "2f695ff0-279b-4953-b033-457ec52fe63b",
                cinema_chain_id: "8560be2d-54ba-46d5-ad35-8152bff2f618", // BCD
                theater_location: "Marvell City Mall",
                theater_city: "Surabaya"
            },
            {
                theater_id: "2c40633c-5113-44ae-96aa-538bb1185406",
                cinema_chain_id: "8560be2d-54ba-46d5-ad35-8152bff2f618", // BCD
                theater_location: "Aeon Mall Jakarta Garden City",
                theater_city: "East Jakarta"
            },
            {
                theater_id: "50a35c6f-e039-42cc-928c-e8ba1cb6cffd",
                cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1", // DuaPuluhEmpat
                theater_location: "Pakuwon Trade Center",
                theater_city: "Surabaya"
            },
            {
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1",
                cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1", // DuaPuluhEmpat
                theater_location: "Mall Kelapa Gading",
                theater_city: "North Jakarta"
            },
        ]
    })

    console.log("Theaters Seeded")
}