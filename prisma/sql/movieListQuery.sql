/*
$1 is the current date (will be provided in the backend server)
$2 is the lowered case string that would be matched with the available movie titles
$3 is the limit of rows shown
$4 is the intended or current page 
*/
SELECT m.movie_id, m.movie_title, m.movie_poster
FROM movies m
WHERE EXISTS (
    SELECT 1
    FROM showtimes st
    WHERE st.movie_id = m.movie_id
    AND st.showtime_start_date >= $1
) 
AND LOWER(m.movie_title) LIKE LOWER($2)
ORDER BY m.movie_title ASC
LIMIT $3
OFFSET ($4-1) * $3
/*
Equals to Prisma Query:
const movies = await prisma.movie.findMany({
            select: {
                movie_id: true,
                movie_title: true,
                movie_poster: true
            },
            where: {
                showtime: {
                    some: {
                        showtime_start_date: {
                            gt: new Date().toISOString()
                        }
                    }
                },
                movie_title: {
                    contains: search
                }
            },
            orderBy: {
                movie_title: 'asc'
            },
            skip: (page - 1) * limit,
            take: limit
        })
*/