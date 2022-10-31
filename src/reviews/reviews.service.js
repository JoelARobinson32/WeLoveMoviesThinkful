const knex = require("../db/connection");

// SERVICE FUNCTIONS //

function read(id) {
  return knex("reviews").select("*").where({ review_id: id }).first();
}

function update(updated) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updated.review_id })
    .update(updated);
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

function getCritic(id) {
  return knex("critics").select("*").where({ critic_id: id }).first();
}

function getReviews(id) {
  return knex("reviews").select("*").where({ movie_id: id });
}

// EXPORT //

module.exports = {
  read,
  update,
  destroy,
  getCritic,
  getReviews,
};