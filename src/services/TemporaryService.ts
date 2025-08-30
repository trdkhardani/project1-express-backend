import { PrismaClient, TicketStatus } from "../generated/prisma";
const prisma = new PrismaClient()
import type { ResponseInterface } from "../models/response";
import { MailerUtils } from "../utils/mailer.utils";
import { internalServerErrorResponse, successResponse } from "../utils/response.utils";
const BASE_URL = process.env.BASE_URL as string;
const PORT = process.env.PORT as string;

export class TemporaryService {
    static async paymentSuccess(bookingId: string):Promise<ResponseInterface<{}>> {
        try {
            const shortenedInvoiceUrl = `${BASE_URL}:${PORT}/api/v1/booking/invoice/${bookingId}`

            const updateBooking = await prisma.booking.update({
                data: {
                    booking_payment_status: "SUCCESSFUL",
                    booking_invoice_url: shortenedInvoiceUrl
                },
                where: {
                    booking_id: bookingId
                },
                select: {
                    booking_id: true,
                    booking_payment_status: true,
                    booking_invoice_url: true,
                    user: {
                        select: {
                            user_email: true,
                            user_name: true
                        }
                    },
                    booking_seat: {
                        select: {
                            booking_seat_id: true
                        }
                    }
                }
            })
            
            const ticketsData = updateBooking.booking_seat.map((data) => {
                return {
                    booking_seat_id: data.booking_seat_id,
                    ticket_status: TicketStatus.VALID
                }
            })
            
            const tickets = await prisma.ticket.createMany({
                data: ticketsData
            })

            MailerUtils.sendInvoiceEmail({
                userEmail: updateBooking.user.user_email,
                userName: updateBooking.user.user_name,
                invoiceLink: updateBooking.booking_invoice_url as string
            })

            return successResponse({updateBooking, tickets}, "Payment successful!")
        } catch(err) {
            console.error(err)
            return internalServerErrorResponse();
        }
    }
    
    static async paymentCancelled(bookingId: string):Promise<ResponseInterface<{}>> {
        try {
            const updateBookingStatus = await prisma.booking.update({
                data: {
                    booking_payment_status: "CANCELLED"
                },
                where: {
                    booking_id: bookingId
                }
            })
    
            return successResponse(updateBookingStatus, "Payment cancelled!")
        } catch(err) {
            console.error(err)
            return internalServerErrorResponse();
        }
    }
}
