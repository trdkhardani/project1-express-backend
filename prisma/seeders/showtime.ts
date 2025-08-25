import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedShowtime() {
    await prisma.showtime.createMany({
        data: [
            {
                showtime_id: "c6c7f598-1d58-44ad-8141-01898fd804e8",
                movie_id: "3ae1273e-f39f-4d5e-9de7-623ef7eafcc3", // The Pigeon
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", // Pakuwon City Mall
                showtime_price: 35000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "2f07fbe0-bd28-4820-9fdf-be23b5148685",
                movie_id: "2cb3f9a0-65b2-44c1-9944-551e76b2efb4", // The Exorcist
                theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24", // Pakuwon City Mall
                showtime_price: 35000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "cd4026d2-52b3-4b23-b4e8-5b18f42d222c",
                movie_id: "5bb1416a-95c9-43f5-966d-b9d575fb4fdf", // The Lantern
                theater_id: "2f695ff0-279b-4953-b033-457ec52fe63b", // Marvell City Mall
                showtime_price: 35000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "07f06760-2ccf-4090-b43a-0a3605c0ec37",
                movie_id: "75ff4507-c452-4dc1-8a14-72645e0e0802", // The Committee
                theater_id: "50a35c6f-e039-42cc-928c-e8ba1cb6cffd", // Pakuwon Trade Center
                showtime_price: 35000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "a788533b-3fbb-402a-9206-8f51a056a9ee",
                movie_id: "783912be-cbf8-45bd-bae5-cf7799a6ce66", // Regulation of
                theater_id: "2c40633c-5113-44ae-96aa-538bb1185406", // Aeon Mall Jakarta Garden City
                showtime_price: 45000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "fb5a123e-1407-435a-8f9f-aad1c7c94396",
                movie_id: "783912be-cbf8-45bd-bae5-cf7799a6ce66", // Regulation of
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", // Mall Kelapa Gading
                showtime_price: 50000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
            {
                showtime_id: "ae6af2f7-34d5-4eb1-81e4-10b3b6c541dc",
                movie_id: "2cb3f9a0-65b2-44c1-9944-551e76b2efb4", // The Exorcist",
                theater_id: "1187e020-ed0f-458a-8908-e805e90883e1", // Mall Kelapa Gading
                showtime_price: 50000,
                showtime_start_date: "2025-09-05T11:40:00.000Z"
            },
        ]
    })

    console.log("Showtimes Seeded")
}