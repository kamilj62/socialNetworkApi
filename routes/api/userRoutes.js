const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  friendUpdate,
  friendDelete,
} = require("../../controllers/userControllers");

// /api/users routes
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId routes
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId route
router
  .put("/:userId/friends/:friendId", friendUpdate)
  .delete("/:userId/friends/:friendId", friendDelete);

module.exports = router;
