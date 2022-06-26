const { Thought } = require("../models/index");

const thoughtSeeds = [
  {
    thoughtText: "I am invincible",
  },
  {
    thoughtText: "I am batman",
  },

  {
    thoughtText: "I'm a spider man",
  },
];

const seedThoughts = async () => {
  await Thought.deleteMany({});
  await Thought.insertMany(thoughtSeeds);
};

module.exports = seedThoughts;
