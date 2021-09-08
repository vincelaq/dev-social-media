/* ==== Comment Model ==== */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required:true, ref: "User" },
        username: String,
        image: String,
        post: { type: Schema.Types.ObjectId, required:true, ref: "Post" },
        body: { type: String, required: true },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        voteTotal: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Comment", commentSchema);