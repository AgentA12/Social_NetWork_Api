const { User } = require("../models/index.js");

const userData = [
  {
    username: "superman",
    email: "clark.kent@gmail.com",
  },
  {
    username: "wonderwoman",
    email: "diana.princess@gmail.com",
  },
  {
    username: "batman",
    email: "bruce.wayne@hotmail.com",
  },
  {
    username: "spiderman",
    email: "peter.parker@gmail.com",
  },
  {
    username: "joker",
    email: "jake.napier@gmail.com",
  },
];

const seedUsers = async () => {
  await User.deleteMany({});
  await User.insertMany(userData);
};

module.exports = seedUsers;
