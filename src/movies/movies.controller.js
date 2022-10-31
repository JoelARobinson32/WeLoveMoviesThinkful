const service = require("./movies.service");


//Middleware
async function validateId(req, res, next) {
  try {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({
      status: 404,
      message: "Movie cannot be found.",
    });
  } catch (error) {
    next(error);
  }
}

//Standard functions
async function list(req, res, next) {
  try {
    const data = await service.list(req.query.is_showing);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const { movieId } = req.params;
    const data = await service.read(movieId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  read: [validateId, read],
  validateId,
};