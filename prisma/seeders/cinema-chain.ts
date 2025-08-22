import { PrismaClient } from "../../src/generated/prisma"
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function seedCinemaChain() {
    await prisma.cinema_Chain.createMany({
        data: [
            {
                cinema_chain_id: "8560be2d-54ba-46d5-ad35-8152bff2f618",
                cinema_chain_brand: "BCD",
                cinema_chain_logo: "upload/brand_logos/bcd.svg"
            },
            {
                cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1",
                cinema_chain_brand: "DuaPuluhEmpat",
                cinema_chain_logo: "upload/brand_logos/duapuluhempat.svg"
            },
            {
                cinema_chain_id: "07ccd992-19e4-4057-9f7c-64ee39fe3874",
                cinema_chain_brand: "Sinampol",
                cinema_chain_logo: "upload/brand_logos/sinampol.svg"
            },
        ]
    })

    console.log("Cinema Chains Seeded")
}