const { Schema, Types, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const formatDate = require("../utils/formatDates");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max: [280, "Thought is to long, Max 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtTime) => formatData(createdAtTime),
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function (reactions) {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
