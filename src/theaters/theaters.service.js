const knex = require("../db/connection");

//List service methods
function list() {
  return knex("theaters").select("*");
}

function listMovies(theaterId) {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ theater_id: theaterId })
    .select("movies.*");
}

module.exports = {
  list,
  listMovies,
};