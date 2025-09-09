import * as z from 'zod';

export const CreateMovieData = z.object({
    movieTitle: z.coerce.string("Movie Title must not be empty").refine((val) => val !== "", "Movie Title must not be empty").trim(),
    movieSynopsis: z.coerce.string("Movie Synopsis must not be empty").refine((val) => val !== "", "Movie Synopsis must not be empty").trim(),
    movieDuration: z.coerce.number("Provide movie duration in minutes").min(30, "Minimum duration is 30 minutes"),
    // moviePoster: z.file().mime(["image/jpeg", "image/png"]).max(5_000_000, "Maximum 5 Megabytes"),
    // moviePoster: z.object({
    //     mimetype: ["image/png", "image/jpeg"],
    // })
})