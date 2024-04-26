const { Thought, Reactions } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.courseId,
      }).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(course);
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
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.courseId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      await Reactions.deleteMany({ _id: { $in: course.students } });
      res.json({ message: "Thought and reactions deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
