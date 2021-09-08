const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Upvotes = new Schema({
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = Upvote = mongoose.model("upvotes", Upvotes);
