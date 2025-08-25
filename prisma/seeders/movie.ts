import { PrismaClient } from "../../src/generated/prisma"
const prisma = new PrismaClient()

export async function seedMovie() {
    await prisma.movie.createMany({
        data: [
            {
                movie_id: "3ae1273e-f39f-4d5e-9de7-623ef7eafcc3",
                movie_title: "The Pigeon That Filed for Divorce",
                movie_poster: "public/movie_posters/the-pigeon-that-filed-for-divorce.jpg",
                movie_synopsis: "In a crumbling Eastern European city, a bureaucrat discovers a stack of legal documents inexplicably signed by a pigeon demanding a divorce from its mate. Obsessed with solving the absurd case, he spirals into a surreal investigation involving underground bird courts, a chorus of lawyers who only speak in coos, and his own failing marriage. By the time he reaches the verdict, the line between man and pigeon blurs in ways no law could contain.",
                movie_duration: 90,
            },
            {
                movie_id: "0c0f329b-1d1c-43fe-bd7d-c90f685e17dd",
                movie_title: "Grandmother’s Teeth in the Microwave",
                movie_poster: "public/movie_posters/grandmother-s-teeth-in-the-microwave.jpg",
                movie_synopsis: "After inheriting her eccentric grandmother’s home, a young woman finds a set of dentures permanently fused inside the microwave. Each time she heats food, the teeth whisper cryptic advice about family secrets, financial markets, and how to avoid being poisoned. What starts as a quirky haunting evolves into a paranoid comedy-thriller as she begins to suspect the dentures are manipulating her toward a destiny that involves neither cooking nor sanity.",
                movie_duration: 90,
            },
            {
                movie_id: "2cb3f9a0-65b2-44c1-9944-551e76b2efb4",
                movie_title: "The Exorcist’s Day Off",
                movie_poster: "public/movie_posters/the-exorcist-s-day-off.jpg",
                movie_synopsis: "A jaded exorcist decides he’s done with demons and just wants a quiet fishing trip. Unfortunately, the lake he picks happens to be the dumping ground for cursed objects confiscated by the Vatican. Soon his peaceful outing is invaded by talking dolls demanding therapy, a possessed catfish that wants baptism, and a rival exorcist livestreaming the chaos for clout. The only way to survive the weekend is to out-snark the demons before they eat all his bait.",
                movie_duration: 90,
            },
            {
                movie_id: "e36cc8bf-c172-445c-a65e-864093ae176a",
                movie_title: "Grandpa’s Haunted Pacemaker",
                movie_poster: "public/movie_posters/grandpa-s-haunted-pacemaker.jpg",
                movie_synopsis: "After a routine surgery, Grandpa’s new pacemaker starts picking up ghost frequencies. At first, the family thinks he’s just ranting—until the device literally summons specters every time his heart skips a beat. The family must juggle nursing home drama, government agents wanting to weaponize the pacemaker, and a particularly needy Victorian ghost who won’t stop giving dinner advice. The situation gets worse when Grandpa decides he kinda likes being a human Ouija board.",
                movie_duration: 90,
            },
            {
                movie_id: "5bb1416a-95c9-43f5-966d-b9d575fb4fdf",
                movie_title: "The Lantern Eats the Dark",
                movie_poster: "public/movie_posters/the-lantern-eats-the-dark.jpg",
                movie_synopsis: "A burned-out journalist retreats to a mountain cabin to finish a memoir, only to discover an antique lantern left behind by the previous tenant. When lit, the lantern reveals hidden words scrawled across walls, trees, and even the night sky—warnings about his own death. As the messages grow more detailed, he realizes something inhuman is writing his story ahead of him, using the lantern as its pen.",
                movie_duration: 90,
            },
            {
                movie_id: "0a3779f4-52ef-4459-b202-d39d9d8512a6",
                movie_title: "Whispers Beneath the Static",
                movie_poster: "public/movie_posters/whispers-beneath-the-static.jpg",
                movie_synopsis: "A late-night radio host starts receiving anonymous calls that aren’t on the station’s log. The voices know things about his past, his guests, and crimes that haven’t happened yet. Every time he plays music, the static between songs bleeds with distorted whispers that urge him to “stay on air.” As the line between show and nightmare collapses, he realizes the town is listening to a broadcast that never ends—long after he’s dead.",
                movie_duration: 90,
            },
            {
                movie_id: "c58cb25c-1c98-4429-aab3-b120b617e1a6",
                movie_title: "Ministry of Left Shoes",
                movie_poster: "public/movie_posters/ministry-of-left-shoes.jpg",
                movie_synopsis: "In a near-future nation, the government tries to boost the economy by banning all right shoes, declaring that citizens will “walk together in unity.” Chaos ensues as black markets for contraband right shoes emerge, while police squads patrol the streets checking feet. A small-town cobbler unwillingly becomes the leader of a nationwide resistance after accidentally inventing the reversible shoe.",
                movie_duration: 90,
            },
            {
                movie_id: "75ff4507-c452-4dc1-8a14-72645e0e0802",
                movie_title: "The Committee for Eternal Traffic Jams",
                movie_poster: "public/movie_posters/the-committee-for-eternal-traffic-jams.jpg",
                movie_synopsis: "To showcase “progress,” a city government deliberately creates the world’s longest traffic jam, promising it will become a tourist attraction and boost GDP. Entire families get stuck on highways for months, businesses sprout up between cars, and reality TV crews arrive to document the mess. As the mayor insists everything is “going according to plan,” one unlucky commuter realizes escaping the jam might be considered treason.",
                movie_duration: 90,
            },
            {
                movie_id: "783912be-cbf8-45bd-bae5-cf7799a6ce66",
                movie_title: "Regulation of Everything, Literally",
                movie_poster: "public/movie_posters/regulation-of-everything-literally.jpg",
                movie_synopsis: "A government desperate to prove its efficiency begins issuing new laws every day: citizens must submit daily reports in triplicate, laughter must be registered with the Ministry of Mirth, and even bird noises in public are outlawed. As the rules pile up, people form a black market for banned jokes and contraband chuckles. A weary clerk, ordered to enforce the “no-bird law,” finds himself caught between absurd decrees and the chaos of a population that refuses to stop chirping.",
                movie_duration: 90,
            },
            {
                movie_id: "253a3e21-ca22-4d86-97c2-fd8fe534d336",
                movie_title: "Five Pillars Talent Show",
                movie_poster: "public/movie_posters/five-pillars-talent-show.jpg",
                movie_synopsis: "In an effort to promote “national unity,” the government launches a reality competition where contestants must embody the state’s five founding principles through bizarre stage acts: balancing on literal pillars, shouting loyalty slogans while juggling paperwork, and reenacting history as slapstick. As the show spirals out of control, contestants turn the satire back on the judges, exposing corruption and hypocrisy on live television. The government, too blinded by its own spectacle, fails to realize the audience is laughing at them, not with them.",
                movie_duration: 90,
            },
        ]
    })

    console.log("Movies Seeded")
}