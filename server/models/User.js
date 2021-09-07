/* ==== User Model ==== */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6 },
        image: String,
        skills: String,
        bio: String,
        posts: [{ type: Schema.Types.ObjectId, required: true, ref: "Post" }],
        comments: [{ type: Schema.Types.ObjectId, required: true, ref: "Comment" }],
        followers: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
        following: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }]
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);