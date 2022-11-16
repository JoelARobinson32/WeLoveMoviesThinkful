const { whereShowing } = require("../movies/movies.service");
const service = require("./theaters.service");

async function list(req, res) {
    let { movieId } = req.params;

    //checks if there is a movieId
    if (movieId !== undefined) {
        res.json({ data: await whereShowing(movieId) });
    } else {
        const theaters = await service.list();

        //adds the movies to each theater
        const theatersWithMovies = theaters.map(async (theater) => {
            return { ...theater, movies: await service.moviesList(theater) };
        });
        const result = await Promise.all(theatersWithMovies);

        res.json({ data: result });
    }
}

module.exports = { list };