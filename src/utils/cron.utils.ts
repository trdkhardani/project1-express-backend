import cron from "node-cron";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient()
import QRCode from 'qrcode'

const {
    BASE_URL,
    PORT
} = process.env

export class CronJobs {
    static async generateTicketQR() {
        const noQrTickets = await prisma.ticket.findMany({
            select: {
                booking_seat: {
                    select: {
                        booking_id: true
                    }
                },
                ticket_id: true,
            },
            where: {
                ticket_qr_code: null
            },
            orderBy: {
                ticket_issued_at: 'asc' // prioritize the earliest issued ticket(s)
            },
            take: Math.floor(Math.random() * (20 - 10) + 10) // limit of the retrieved data would be between 10 to 20
        })
        
        if(noQrTickets.length === 0) {
            console.log("All tickets have QR Code")
            return;
        }

        for(let i = 0; i < noQrTickets.length; i++) {
            const ticketQrBlob = await QRCode.toBuffer(`${BASE_URL}:${PORT}/api/v1/booking/invoice/${noQrTickets[i]?.booking_seat.booking_id}`)

            await prisma.ticket.update({
                where: {
                    ticket_id: noQrTickets[i]?.ticket_id!,
                    ticket_qr_code: null
                },
                data: {
                    ticket_qr_code: ticketQrBlob
                }
            })
            console.log(`Successfully generated QR Code for Ticket ID ${noQrTickets[i]?.ticket_id}`)
        }

    }
}

console.log("Cron job process is running...")

cron.schedule("* * * * *", () => {
    CronJobs.generateTicketQR()
})