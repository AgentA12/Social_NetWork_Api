const { Thought, User } = require("../models/index");

const thoughtControllers = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      let thoughts = await Thought.find();
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
      let newThought = await Thought.create(body);

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
};

module.exports = thoughtControllers;
