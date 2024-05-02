const router = require("express").Router();
const { Thought, User } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()

        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })

        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No user with that Id" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      return res.status(200).json({
        message: "User and associated thoughts are deleted!",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async friendUpdate(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No reaction with this id!" });
      }

      return res.json(friend);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteFriends(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { _id: req.params.friendsId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No friend with that Id" });
      }

      return res.json({ message: "Friend deleted successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = router;
