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

// /api/users/:userId/friends route
router.route("/:userId/friends").post(addFriend);

// /api/users/:userId/friends/:friendId route
router.route("/:userId/friends/:friendId").delete(friendDelete);

module.exports = router;
