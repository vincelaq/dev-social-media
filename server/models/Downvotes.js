const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Downvotes = new Schema({
  questionid: {
    type: Schema.Types.ObjectId,
    ref: "questionsModel",
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = Downvote = mongoose.model("downvotes", Downvotes);
