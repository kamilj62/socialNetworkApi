const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  postReactions,
  deleteReactions,
} = require("../../controllers/thoughtControllers");

// /api/thoughts routes
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:_Id routes
router
  .route("/:_Id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions routes
router
  .route("/thoughts/:thoughtId/reactions")
  .post(postReactions)
  .delete(deleteReactions);

module.exports = router;
