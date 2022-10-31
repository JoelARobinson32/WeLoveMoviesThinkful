const service = require("./theaters.service");

//List method
async function list(req, res, next) {
  const { movieId } = req.params;
  try {
    const theaters = await service.list();
    for (let theater of theaters) {
      const movies = await service.listMovies(theater.theater_id);
      theater["movies"] = movies;
    }
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: [list],
};