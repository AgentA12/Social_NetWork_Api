const { User, Thought } = require("../models/index");

const userControllers = {
  //get all users
  async getAllUsers(req, res) {
    try {
      let users = await User.find()
        .select("-__v")
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        });
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },

  //get one user by id
  async getSingleUser({ params }, res) {
    try {
      let singleUser = await User.findOne({ _id: params.id })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      res.json(singleUser);
    } catch (error) {
      res.json(error);
    }
  },

  //create a new user
  async createUser({ body }, res) {
    try {
      let newUser = await User.create(body);
      res.json(newUser);
    } catch (error) {
      res.json(error);
    }
  },

  //edit single user by id
  async editUserById({ params, body }, res) {
    try {
      let updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.json(error);
    }
  },

  //delete a user by id
  async deleteUserById({ params }, res) {
    try {
      let deletedUser = await User.findOneAndDelete({ _id: params.id });

      let deletedThoughts = await Thought.deleteMany({
        username: deletedUser.username,
      });

      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  },

  async addFriend({ params }, res) {
    try {
      let newFriend = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      res.json(newFriend);
    } catch (error) {
      res.json(error);
    }
  },

  async deleteFriend({ params }, res) {
    try {
      let deletedFriend = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      );
      res.json(deletedFriend);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = userControllers;
