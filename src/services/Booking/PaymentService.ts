import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import type { ResponseInterface } from "../../models/response";
import { acceptedResponse, internalServerErrorResponse, successResponse } from "../../utils/response.utils";
import { StripeInstance } from "../../utils/stripe.utils";

export async function checkout(bookingId: string):Promise<ResponseInterface<{}>> {
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                booking_id: bookingId,
                booking_payment_status: "PENDING"
            },
            select: {
                booking_id: true,
                user: {
                    select: {
                        user_email: true
                    }
                },
                showtime: {
                    select: {
                        movie: {
                            select: {
                                movie_title: true
                            }
                        },
                        theater: {
                            select: {
                                theater_location: true,
                                theater_city: true
                            }
                        },
                        showtime_price: true
                    }
                },
                booking_seat: {
                    select: {
                        seat: {
                            select: {
                                seat_number: true,
                                seat_row: true
                            }
                        }
                    }
                }
            }
        })

        if(!booking) {
            return successResponse(null, `No booking with id ${bookingId} found`)
        }

        const bookingData = {
            amount: booking?.showtime.showtime_price * 100, // idk why it have to be multiplied by 100 to have correct amount per unit???
            quantity: booking?.booking_seat.length,
            get appFee() {
                return this.amount * 0.05
            },
            bookedSeats: booking?.booking_seat.map((bookedSeat) => {
                return `${bookedSeat.seat.seat_row}${bookedSeat.seat.seat_number}`
            }).join(", ")
        }

        const payment = await StripeInstance.createShowtimeCheckoutSession({
            bookingId: booking.booking_id,
            amount: Number(bookingData.amount),
            quantity: bookingData.quantity,
            applicationFee:  bookingData.appFee,
            userEmail: booking?.user.user_email,
            movieTitle: booking?.showtime.movie.movie_title,
            theater: booking?.showtime.theater.theater_location,
            theaterCity: booking.showtime.theater.theater_city,
            seats: bookingData.bookedSeats
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            throw new Error(err)
        })

        return successResponse(payment.url, "Payment initiated")
    } catch(err) {
        console.error(err)
        return internalServerErrorResponse();
    }
}

export async function invoiceUrl(bookingId: string):Promise<ResponseInterface<{}>> {
    try {
        const invoiceUrl = await StripeInstance.findInvoice(bookingId)
        .then((data: any) => {
            return data
        })

        if(invoiceUrl.data.length === 0) {
            return acceptedResponse("The invoice is either still being processed or does not exist.")
        }

        return successResponse({
            original_invoice_url: invoiceUrl.data[0].hosted_invoice_url,
        }, "Invoice retrieved")
    } catch(err) {
        console.error(err);
        return internalServerErrorResponse();
    }
}