import { seedAdmin } from "./admin";
import { seedCinemaChain } from "./cinema-chain";
import { seedMovie } from "./movie";
import { seedShowtime } from "./showtime";
import { seedTheater } from "./theater";

async function seed() {
    await seedCinemaChain();
    await seedAdmin();
    await seedMovie();
    await seedTheater();
    await seedShowtime();
}

seed().then(() => {
    console.log("Seeding done")
})