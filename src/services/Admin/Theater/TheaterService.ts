import { PrismaClient } from "../../../generated/prisma/index.js";
import type { ResponseInterface } from "../../../models/response.ts";
import type { CreateTheaterData } from "../../../models/theater.ts";
import { createdResponse, internalServerErrorResponse } from "../../../utils/response.utils.ts";
const prisma = new PrismaClient();

export class TheaterService {
    static async createTheater(theaterData: CreateTheaterData):Promise<ResponseInterface<{}>> {
        try {
            const theater = await prisma.theater.create({
                data: {
                    theater_city: theaterData.theaterCity,
                    theater_location: theaterData.theaterLocation,
                    cinema_chain_id: theaterData.cinemaChainId
                }
            })
            
            return createdResponse(theater, "Theater Successfully Added")
        } catch(err: any) {
            console.error(err);
            return internalServerErrorResponse();
        }
    }
}