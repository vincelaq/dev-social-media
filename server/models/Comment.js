/* ==== Comment Model ==== */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required:true, ref: "User" },
        post: { type: Schema.Types.ObjectId, required:true, ref: "Post" },
        body: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Comment", commentSchema);