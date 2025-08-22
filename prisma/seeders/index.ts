import { seedAdmin } from "./admin";
import { seedCinemaChain } from "./cinema-chain";

async function seed() {
    seedCinemaChain();
    seedAdmin();
}

seed().then(() => {
    console.log("Seeding done")
})