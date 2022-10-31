const service = require("./reviews.service");

//Validator
async function validateId(req, res, next) {
  try {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({
      status: 404,
      message: "Review cannot be found.",
    });
  } catch (error) {
    next(error);
  }
}

//Update and delete methods
async function update(req, res, next) {
  try {
    const newReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const updatedReview = await service.update(newReview);
    const review = await service.read(res.locals.review.review_id);
    const reviewToReturn = {
      ...review,
      critic: await service.getCritic(res.locals.review.critic_id),
    };
    res.json({ data: reviewToReturn });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { review } = res.locals;
    await service.destroy(review.review_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

//standard
async function read(req, res, next) {
  try {
    const reviews = await service.getReviews(
      res.locals.movie.movie_id
    );

    for (let review of reviews) {
      const critic = await service.getCritic(review.critic_id);

      review["critic"] = critic;
    }

    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  update: [validateId, update],
  delete: [validateId, destroy],
  read,
};