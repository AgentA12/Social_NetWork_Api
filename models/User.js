const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      Unique: true,
      required: "A username is required",
      trim: true,
    },
    email: {
      type: String,
      Unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtuals("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
