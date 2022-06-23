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

  // add reply to comment
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
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

  async deleteReaction({ params, body }, res) {
    try {
      let deletedReaction = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: params.reactionID } },
        { new: true, runValidators: true }
      );
      res.json(deletedReaction);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = thoughtControllers;
