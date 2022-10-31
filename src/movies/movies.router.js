const router = require("express").Router({ mergeParams: true });
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.use("/:movieId/reviews", controller.validateId, reviewsRouter);
router.use("/:movieId/theaters", controller.validateId, theatersRouter);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;