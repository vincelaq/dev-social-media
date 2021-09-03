/* ==== Post Model ==== */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required:true, ref: "User" },
        body: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Post", postSchema);