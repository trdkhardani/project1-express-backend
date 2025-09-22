import * as z from 'zod';

export const CreateTheaterData = z.object({
    theaterCity: z.coerce.string("Theater City must not be empty").refine((val) => val !== "", "Theater City must not be empty").trim(),
    theaterLocation: z.coerce.string("Theater Location must not be empty").refine((val) => val !== "", "Theater Location must not be empty").trim()
})