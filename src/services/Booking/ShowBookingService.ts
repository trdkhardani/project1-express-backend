import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import type { ResponseInterface } from "../../models/response";
import { internalServerErrorResponse, successResponse } from "../../utils/response.utils";

export class ShowBookingService {
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
            
            return successResponse(booking)
        } catch(err) {
            console.error(err)
            return internalServerErrorResponse();
        }
    }
}
