const { Thought, User } = require("../models/index");
const date = require("date-and-time");
const thoughtControllers = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      let thoughts = await Thought.find().select("-__v").populate("reactions");
      res.json(thoughts);
    } catch (error) {
      res.json(error);
    }
  },

  //get a thought by id
  async getThoughtById({ params }, res) {
    try {
      let singleThought = await Thought.findOne({ _id: params.id });
      res.json(singleThought);
    } catch (error) {
      res.json(error);
    }
  },

  //add a thought
  async createThought({ params, body }, res) {
    try {
      let user = await User.findOne({ _id: params.id });

      let newThought = await Thought.create({
        thoughtText: body.thoughtText,
        username: user.username,
      });

      let updatedUserThought = await User.findOneAndUpdate(
        { _id: params.id },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(newThought);
    } catch (error) {
      res.json(error);
    }
  },

  //edit a thought
  async editThought({ params, body }, res) {
    try {
      let editedThought = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(editedThought);
    } catch (error) {
      res.json(error);
    }
  },

  //remove a thought
  async deleteThought({ params }, res) {
    try {
      let deletedThought = await Thought.findOneAndDelete({ _id: params.id });
      res.json(deletedThought);
    } catch (error) {
      res.json(error);
    }
  },

  async addReaction({ params, body }, res) {
    try {
      let newReaction = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );
      res.json(newReaction);
    } catch (error) {
      res.json(error);
    }
  },

  async deleteReaction({ params }, res) {
    console.log(params);
    try {
      let deletedReaction = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true, runValidators: true }
      );
      console.log(deletedReaction);
      res.json(deletedReaction);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = thoughtControllers;
