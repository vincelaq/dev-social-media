/* ==== Users Controller ==== */
const mongoose = require('mongoose');
const db = require("../models");


// Index - GET - Retrieve data of all posts (no specific criteria)
const index = async (req, res) => {
    let posts;
    try {
        posts = await db.Post.find({});
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving posts has failed, please try again later",
            data: err
        });
    }

    if (posts.length >= 1) {
        return res.json({
            message: "Success: Found Posts",
            data: posts
        });
    } else {
        return res.json({
            message: "Failed: No posts yet",
            data: posts
        });
    }

};

// One Post - GET - Retrieve data of one post (pid = post id)
const getOnePost = async (req, res) => {
    let post;
    try {
        post = await db.Post.findOne({ _id: req.params.pid });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving post has failed, please try again later",
            data: err
        });
    }

    if (!post) {
        return res.status(404).json({
            message: "Failed: Post not found",
            data: post
        });
    } else {
        return res.json({
            message: "Success: Found Post",
            data: post
        });
    }

};

// All User Posts - GET - Retrieve all posts of one user (uid = user id)
const getAllUserPosts = async (req, res) => {
    let posts;
    try {
        posts = await db.Post.find({ author: req.params.uid });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving user posts has failed, please try again later",
            data: err
        });
    }

    if (posts.length >= 1) {
        return res.json({
            message: "Success: Found User Posts",
            data: posts
        });
    } else {
        return res.json({
            message: "Failed: No user posts yet",
            data: posts
        });
    }
};

// Create Post - POST - Creation of new post
const createPost = async (req, res) => {
    const { title, author, body } = req.body;

    const newPost = new db.Post({
        title,
        author,
        body,
        comments: []
    });

    let user;
    try {
        user = await db.User.findById(author);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving user for post creation has failed, please try again later",
            data: err
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "Error: Could not find user for provided id",
            data: user
        });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction(); 
        await newPost.save({ session: session });
        user.posts.push(newPost);
        await user.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Added New Post",
            data: newPost
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Posting failed, please try again later",
            data: err
        });
    }
};

// Update Post - PUT - Update an existing post (WARNING: NEED FRONT END REQUIREMENTS FOR ALL FIELDS)
const updatePost = async (req, res) => {
    const { title, body } = req.body;
    
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding poar for update has failed, please try again later",
            data: err
        });
    }

    if (!foundPost) {
        return res.status(404).json({
            message: "Error: Post could not be found",
            data: foundPost
        });
    }

    foundPost.title = title;
    foundPost.body = body;

    try {
        await foundPost.save();
        return res.json({
            message: "Success: Updated Post",
            data: foundPost
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Update post has failed, please try again later",
            data: err
        });
    }
};


// Destroy - DELETE - Remove an existing user
const destroyPost = async (req, res) => {    
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid).populate('author')
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding user has failed, please try again later",
            data: err
        });
    }

    if (!foundPost) {
        return res.status(404).json({
            message: "Error: Could not find post",
            data: foundPost
        });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foundPost.remove({ session: session });
        foundPost.author.posts.pull(foundPost);
        await foundPost.author.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Destroyed Post",
            data: foundPost
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Destroying post has failed, please try again later",
            data: err
        });
    }
    
};

module.exports = { index, getOnePost, getAllUserPosts, createPost, updatePost, destroyPost };