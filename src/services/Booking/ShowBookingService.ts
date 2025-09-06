import { PaymentStatus, PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import type { ResponseInterface } from "../../models/response";
import { badRequestResponse, internalServerErrorResponse, successResponse } from "../../utils/response.utils";

export class ShowBookingService {
    static async bookingList(bookingId: string, userId: string, page: number, limit: number, paymentStatus: PaymentStatus):Promise<ResponseInterface<{}>> {
        try {
            let whereClause: any = {
                booking_id: bookingId,
                user_id: userId,
            }
            if(paymentStatus) {
                if(paymentStatus.toUpperCase() === PaymentStatus.SUCCESSFUL)
                    whereClause.booking_payment_status = "SUCCESSFUL"
                else if(paymentStatus.toUpperCase() === PaymentStatus.PENDING)
                    whereClause.booking_payment_status = "PENDING"
                else if(paymentStatus.toUpperCase() === PaymentStatus.EXPIRED)
                    whereClause.booking_payment_status = "EXPIRED"
                else if(paymentStatus.toUpperCase() === PaymentStatus.FAILED)
                    whereClause.booking_payment_status = "FAILED"
                else
                    whereClause.booking_payment_status = "CANCELLED"
            } else {
                return badRequestResponse("Please specify the payment_status")
            }

            const bookings = await prisma.booking.findMany({
                select: {
                    showtime: {
                        select: {
                            movie: {
                                select: {
                                    movie_title: true,
                                }
                            },
                            theater: {
                                select: {
                                    theater_location: true,
                                    theater_city: true
                                }
                            },
                            showtime_start_date: true,
                        }
                    },
                    booking_seat: {
                        select: {
                            seat: true,
                        }
                    },
                    booking_payment_status: true
                },
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit
            })
            
            if(bookings.length === 0) {
                return successResponse(null, "No bookings found")
            }

            return successResponse({
                bookings,
                page,
                limit
            })
        } catch(err) {
            console.error(err);
            return internalServerErrorResponse();
        }
    }

    static async bookingDetail(bookingId: string, userId: string):Promise<ResponseInterface<{}>> {
        try {
            const booking = await prisma.booking.findUnique({
                select: {
                    showtime: {
                        select: {
                            movie: {
                                select: {
                                    movie_title: true,
                                }
                            },
                            theater: {
                                select: {
                                    theater_location: true,
                                    theater_city: true
                                }
                            },
                            showtime_start_date: true,
                            showtime_price: true,
                        }
                    },
                    booking_seat: {
                        select: {
                            seat: true,
                        }
                    },
                    booking_payment_status: true
                },
                where: {
                    booking_id: bookingId,
                    user_id: userId
                }
            })
            
            if(!booking) {
                return successResponse(null, "No booking found")
            }

            return successResponse(booking)
        } catch(err) {
            console.error(err)
            return internalServerErrorResponse();
        }
    }
}