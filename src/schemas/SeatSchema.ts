import * as z from 'zod';

export const CreateSeatSchema = z.object({
    theaterId: z.coerce.string("Please provide theater ID"),
    seatRows: z.coerce.number("Seat Rows must be a number").min(3, "3 rows minimum").max(26, "26 rows maximum"),
    seatsEachRow: z.coerce.number("Seats per Row must be a number").min(1, "1 seat per row minimum").max(50, "50 seat per row maximum")
})