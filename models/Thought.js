const { Schema, Types, model } = require("mongoose");
const formatDate = require("../utils/formatDates");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      max: [280, "Error, Max 280 characters"],
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (d) => formatDate(d),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

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
      get: (createdAtTime) => formatDate(createdAtTime),
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
