import type { PaymentGateway } from "../controllers/Booking/PaymentController";
import { PrismaClient, TicketStatus } from "../generated/prisma";
const prisma = new PrismaClient()
import type { ResponseInterface } from "../models/response";
import { MailerUtils } from "../utils/mailer.utils";
import { internalServerErrorResponse, successResponse } from "../utils/response.utils";

export class TemporaryService {
    static async paymentSuccess(bookingId: string, paymentGateway: PaymentGateway):Promise<ResponseInterface<{}>> {
        try {
            const invoiceEndpoint = `api/v1/booking/invoice/${bookingId}?payment_gateway=${paymentGateway}`

            const updateBooking = await prisma.booking.update({
                data: {
                    booking_payment_status: "SUCCESSFUL",
                    booking_payment_method: paymentGateway.toUpperCase(),
                    booking_invoice_endpoint: invoiceEndpoint
                },
                where: {
                    booking_id: bookingId
                },
                select: {
                    booking_id: true,
                    booking_payment_status: true,
                    booking_payment_method: true,
                    booking_invoice_endpoint: true,
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
                invoiceEndpoint: updateBooking.booking_invoice_endpoint as string
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
