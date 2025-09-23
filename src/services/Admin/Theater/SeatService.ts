import { PrismaClient } from "../../../generated/prisma/index.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library.js";
import type { ResponseInterface } from "../../../models/response.ts";
import type { CreateSeatsData } from "../../../models/seat.ts";
import { badRequestResponse, createdResponse, internalServerErrorResponse, successResponse } from "../../../utils/response.utils.ts";
const prisma = new PrismaClient();

export class SeatService {
    static async createSeats(seatData: CreateSeatsData):Promise<ResponseInterface<{}>> {
        try {
            const theaterSeatsCount = await prisma.seat.count({
                where: {
                    theater_id: seatData.theaterId
                }
            })

            if(theaterSeatsCount > 0) {
                return badRequestResponse(`Theater with ID ${seatData.theaterId} already has seats`)
            }

            const seats = [];
            
            for(let i = 1; i <= seatData.seatRows; i++) {
                for(let j = 1; j <= seatData.seatsEachRow; j++) {
                    let Ascii_A = 64+i // starts from ascii code 65 (letter A)
                    seats.push({
                        theater_id: seatData.theaterId,
                        seat_row: String.fromCharCode(Ascii_A),
                        seat_number: j
                    })
                }
            }

            await prisma.seat.createMany({
                data: seats
            })

            return createdResponse(seats, "Seats created")
        } catch(err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === "P2003") {
                    return badRequestResponse("No theater found")
                }
            }
            console.error(err);
            return internalServerErrorResponse();
        }
    }
}