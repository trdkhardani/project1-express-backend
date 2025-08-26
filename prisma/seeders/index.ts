import { seedAdmin } from "./admin";
import { seedBooking } from "./booking";
import { seedBookingSeat } from "./booking-seat";
import { seedCinemaChain } from "./cinema-chain";
import { seedMovie } from "./movie";
import { seedSeat } from "./seat";
import { seedShowtime } from "./showtime";
import { seedTheater } from "./theater";
import { seedUser } from "./user";

async function seed() {
    await seedUser();
    await seedCinemaChain();
    await seedAdmin();
    await seedMovie();
    await seedTheater();
    await seedShowtime();
    await seedSeat();
    await seedBooking();
    await seedBookingSeat();
}

seed().then(() => {
    console.log("Seeding done")
})