const { Reaction } = require("../models/index");

const reactionSeeds = [
  {
    reactionBody: "I am too",
    username: "wonderwoman",
  },
];

const seedReactions = async () => {
  await Reaction.deleteMany({});
  await Reaction.insertMany(reactionSeeds);
};

module.exports = seedReactions;
