const router = require("express").Router();
const theaterRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/theaters", theaterRouter).all(methodNotAllowed);
router.use("/:movieId/reviews", reviewsRouter).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;