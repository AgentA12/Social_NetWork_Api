const { User } = require("../models/index");

const userControllers = {
  //get all users
  async getAllUsers(req, res) {
    try {
      let users = await User.find();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },

  //get one user by id
  async getSingleUser({ params }, res) {
    try {
      let singleUser = await User.findOne({ _id: params.id });
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
      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = userControllers;
