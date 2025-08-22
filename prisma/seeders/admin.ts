import { PrismaClient } from "../../src/generated/prisma"
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function seedAdmin() {
    await prisma.admin.createMany({
        data: [
            {
                admin_id: "b31ff191-22f8-471e-a240-e183a041924c",
                admin_email: "admin@bcd.id",
                admin_username: "admin_bcd",
                admin_password: await bcrypt.hash("admin-bcd-123", 12),
                cinema_chain_id: "8560be2d-54ba-46d5-ad35-8152bff2f618" // BCD
            },
            {
                admin_id: "18409cba-27f2-4072-82a1-2abd14fc3ef5",
                admin_email: "admin@duaempat.id",
                admin_username: "admin_duaempat",
                admin_password: await bcrypt.hash("admin-duaempat-123", 12),
                cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1" // DuaPuluhEmpat
            },
            {
                admin_id: "2e941f6c-e6fc-44e9-9819-f8e28421b399",
                admin_email: "admin@sinampol.id",
                admin_username: "admin_sinampol",
                admin_password: await bcrypt.hash("admin-sinampol-123", 12),
                cinema_chain_id: "07ccd992-19e4-4057-9f7c-64ee39fe3874" // Sinampol
            },
        ]
    })

    console.log("Admins Seeded")
}