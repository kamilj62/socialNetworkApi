const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  friendDelete,
} = require("../../controllers/userControllers");

// /api/users routes
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId routes
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId route
router.route("/:userId/friends/:friendId").post(addFriend).delete(friendDelete);

module.exports = router;
