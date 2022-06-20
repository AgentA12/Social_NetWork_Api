const { User } = require("../models/index");

const userControllers = {
  //get all users
  async getAllUsers(req, res) {
    let users = await User.find();
    res.json(users);
  },

  //get one user by id
  async getSingleUser({ params }, res) {
    let singleUser = await User.findOne({ _id: params.id });
    res.json(singleUser);
  },

  //create a new user
  async createUser({ body }, res) {
    let newUser = await User.create(body);
    res.json(newUser);
  },

  //edit single user by id
  async editUserById({ params, body }, res) {
    let updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedUser);
  },

  //delete a user by id
  async deleteUserById({ params }, res) {
    let deletedUser = await User.findOneAndDelete({ _id: params.id });
    res.json(deletedUser);
  },
};

module.exports = userControllers;
