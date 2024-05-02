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

// /api/thoughts/:thoughtId routes
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// thoughtId/reactions/
router.route("/:thoughtId/reactions").post(postReactions);

// thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactions);

module.exports = router;
