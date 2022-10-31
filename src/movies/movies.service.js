const knex = require("../db/connection");

//Standard functions
function list(visible) {
  if (visible) {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .distinct()
      .select("movies.*")
      .where({ is_showing: true });
  }
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
};