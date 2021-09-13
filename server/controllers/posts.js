/* ==== Posts Controller ==== */
const mongoose = require("mongoose");
const db = require("../models");
const { validationResult } = require("express-validator");
const fs = require("fs");


// Index - GET - Retrieve data of all posts (no specific criteria)
const index = async (req, res) => {
    let posts;
    try {
        posts = await db.Post.find({})
            .sort({ createdAt: -1 })
            .populate({path: 'comments', populate: {path: 'comments'}})
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
        post = await db.Post.findById(req.params.pid)
            .populate({path: 'comments', populate: {path: 'comments'}})
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Post not found",
                data: post
            });
        }
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        
        return res.status(422).json({
            message: "Error: Invalid inputs passed, please check your data",
            data: extractedErrors
        });
    };
    
    const { title, body } = req.body;
    const paths = req.files.map(file => file.path);

    let user;
    try {
        user = await db.User.findById(req.user.id).select('-password');
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

    const newPost = new db.Post({
        title,
        author: user.id,
        username: user.username,
        languages: [],
        body,
        image: user.image,
        postImgs: paths,
        favLanguage: user.favLanguage,
        comments: [],
        likes: [],
    });

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        
        return res.status(422).json({
            message: "Error: Invalid inputs passed, please check your data",
            data: extractedErrors
        });
    };
    
    const { title, body } = req.body;
    
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding post for update has failed, please try again later",
            data: err
        });
    }

    if (!foundPost) {
        return res.status(404).json({
            message: "Error: Post could not be found",
            data: foundPost
        });
    }

    if (title) foundPost.title = title;
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

// Likes - PUT - Update likes from current user
const updatePostLike = async (req, res) => {
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid)
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Post not found",
                data: foundPost
            });
        }
        return res.status(500).json({
            message: "Error: Finding post has failed, please try again later",
            data: err
        });
    }

    if (foundPost.likes.filter(like => like.toString() === req.user.id).length > 0) {
        const removeIndex = foundPost.likes.map(like => like.toString()).indexOf(req.user.id);
        
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            foundPost.likes.splice(removeIndex, 1);
            foundPost.voteTotal = foundPost.voteTotal-1;
            await foundPost.save({ session: session });
            await session.commitTransaction();
            return res.json({
                message: "Success: Update post, removed like",
                data: foundPost.likes
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error: Updating post has failed, please try again later",
                data: err
            });
        }
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        foundPost.likes.unshift(req.user.id)
        foundPost.voteTotal = foundPost.voteTotal+1;
        await foundPost.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Update post like",
            data: foundPost.likes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Updating post has failed, please try again later",
            data: err
        });
    }
}

// Dislike - PUT - Update dislikes from current user
const updatePostDislike = async (req, res) => {
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid)
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Post not found",
                data: foundPost
            });
        }
        return res.status(500).json({
            message: "Error: Finding post has failed, please try again later",
            data: err
        });
    }

    if (foundPost.dislikes.filter(dislike => dislike.toString() === req.user.id).length > 0) {
        const removeIndex = foundPost.dislikes.map(dislike => dislike.toString()).indexOf(req.user.id);

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            foundPost.dislikes.splice(removeIndex, 1);
            foundPost.voteTotal = foundPost.voteTotal+1;
            await foundPost.save({ session: session });
            await session.commitTransaction();
            return res.json({
                message: "Success: Update post, removed dislike",
                data: foundPost.dislikes
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error: Updating post has failed, please try again later",
                data: err
            });
        }
    }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        foundPost.dislikes.unshift(req.user.id)
        foundPost.voteTotal = foundPost.voteTotal-1;
        await foundPost.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Update post dislike",
            data: foundPost.dislikes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Updating post has failed, please try again later",
            data: err
        });
    }
}

// Destroy - DELETE - Remove an existing post
const destroyPost = async (req, res) => {    
    let foundPost;
    try {
        foundPost = await db.Post.findById(req.params.pid).populate('author')
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Post not found",
                data: foundPost
            });
        }
        return res.status(500).json({
            message: "Error: Finding post has failed, please try again later",
            data: err
        });
    }

    if (!foundPost) {
        return res.status(404).json({
            message: "Error: Could not find post",
            data: foundPost
        });
    }

    if (foundPost.author.id !== req.user.id) {
        return res.status(401).json({
            message: "Error: User not authorized",
        })
    }

    let imagePaths;
    if (foundPost.postImgs.length > 0) {
        imagePaths = foundPost.postImgs;
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foundPost.remove({ session: session });
        foundPost.author.posts.pull(foundPost);
        await foundPost.author.save({ session: session });
        await session.commitTransaction();
    } catch (err) {
        return res.status(500).json({
            message: "Error: Destroying post has failed, please try again later",
            data: err
        });
    }

    imagePaths.forEach(path => {
        fs.unlink(path, err => {
            console.log(err);
        })
    });

    return res.json({
        message: "Success: Destroyed Post",
        data: foundPost
    });
    
};

module.exports = { index, getOnePost, getAllUserPosts, createPost, updatePost, updatePostLike, updatePostDislike, destroyPost };