const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  //postReactions,
  //deleteReactions,
} = require("../../controllers/thoughtControllers");

// /api/thoughts routes
router.route("/").get(getThoughts);

// /api/thoughts/:_Id routes
router
  .route("/:_Id")
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions routes
// router
//   .route("/thoughts/:thoughtId/reactions")
//   .post(postReactions)
//   .delete(deleteReactions);

module.exports = router;
