const service = require("./reviews.service");

async function read(req, res, next) {
    const { movieId } = req.params;

    res.json({ data: await service.readReviews(movieId) });
}
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(Number(reviewId));
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found.",
    });
}

async function destroy(req, res) {
    const { review_id } = res.locals.review;
    await service.delete(Number(review_id));
    res.sendStatus(204);
}

async function update(req, res) {
    const { review_id, critic_id } = res.locals.review;

    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    const review = await service.read(Number(review_id));

    const result = {
        ...review,
        updated_at: "string",
        created_at: "string",
        critic: await service.getCritics(Number(critic_id)),
    };
    res.json({ data: result });
}

module.exports = {
    update: [reviewExists, update],
    delete: [reviewExists, destroy],
    read,
};