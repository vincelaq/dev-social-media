/* ==== Comments Controller ==== */
const mongoose = require('mongoose');
const db = require("../models");


// Index - GET - Retrieve data of all comments (no specific criteria)
const index = async (req, res) => {
    let comments;
    try {
        comments = await db.Comment.find({});
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving comments has failed, please try again later",
            data: err
        });
    }

    if (comments.length >= 1) {
        return res.json({
            message: "Success: Found Comments",
            data: comments
        });
    } else {
        return res.json({
            message: "Failed: No comments yet",
            data: comments
        });
    }

};

// One Comment - GET - Retrieve data of one post (pid = post id)
const getOneComment = async (req, res) => {
    let comment;
    try {
        comment = await db.Comment.findOne({ _id: req.params.cid });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving comment has failed, please try again later",
            data: err
        });
    }

    if (!comment) {
        return res.status(404).json({
            message: "Failed: Comment not found",
            data: comment
        });
    } else {
        return res.json({
            message: "Success: Found Comment",
            data: comment
        });
    }

};

// All User Comments - GET - Retrieve all comments of one user (uid = user id)
const getAllUserComments = async (req, res) => {
    let existingUser;
    try {
        existingUser = await db.User.findById(req.params.uid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving existing user has failed, please try again later",
            data: err
        });
    }

    if (!existingUser) {
        return res.status(404).json({
            message: "Failed: User not found",
            data: existingUser
        });
    }
    
    let comments;
    try {
        comments = await db.Comment.find({ author: req.params.uid });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving user comments has failed, please try again later",
            data: err
        });
    }

    if (comments.length >= 1) {
        return res.json({
            message: "Success: Found User Comments",
            data: comments
        });
    } else {
        return res.json({
            message: "Failed: No user comments yet",
            data: comments
        });
    }
};

// Create Comment - POST - Creation of new comment
const createComment = async (req, res) => {
    const { author, post, body } = req.body;

    const newComment = new db.Comment({
        author,
        post,
        body,
    });

    let user;
    try {
        user = await db.User.findById(author);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving user for comment creation has failed, please try again later",
            data: err
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "Error: Could not find user for provided id",
            data: user
        });
    }

    let originalPost;
    try {
        originalPost = await db.Post.findById(post);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving post for comment creation has failed, please try again later",
            data: err
        });
    }

    if (!originalPost) {
        return res.status(404).json({
            message: "Error: Could not find original post for provided id",
            data: user
        });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction(); 
        await newComment.save({ session: session });
        originalPost.comments.push(newComment);
        await originalPost.save({ session: session });
        user.comments.push(newComment);
        await user.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Added New Comment",
            data: newComment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Commenting failed, please try again later",
            data: err
        });
    }
};

module.exports = { index, getOneComment, getAllUserComments, createComment };