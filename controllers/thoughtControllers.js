const { Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that Id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      await Reaction.deleteMany({ _id: { $in: thought.reactions } });

      return res.json({ message: "Thought and reactions deleted!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async postReactions(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No reaction with this id!" });
      }

      return res.json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteReactions(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({
        _id: req.params.id,
      });

      if (!reaction) {
        return res.status(404).json({ message: "No reaction with that Id" });
      }

      return res.json({ message: "Reaction deleted successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
