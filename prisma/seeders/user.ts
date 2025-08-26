import { PrismaClient } from "../../src/generated/prisma"
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export async function seedUser() {
    await prisma.user.createMany({
        data: [
            {
                user_id: "d82da956-8b83-4dd2-b180-7bd246c31fda",
                user_name: "Tridiktya Hardani Putra",
                user_email: "tridiktya@gmail.com",
                user_username: "tridiktya_hp",
                user_password: await bcrypt.hash("tridiktya123", 12),
                user_status: "VERIFIED"
            },
        ]
    })

    console.log("Users Seeded")
}