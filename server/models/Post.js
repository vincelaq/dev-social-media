/* ==== Post Model ==== */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    username: [{ type: String }],
    languages: [{ type: String }],
    body: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    image: [{ type: String }],
    favLanguage: String,
    postImgs: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    voteTotal: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Post", postSchema);