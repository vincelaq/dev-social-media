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
    const { body } = req.body;

    let user;
    try {
        user = await db.User.findById(req.user.id).select('-password');
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
        originalPost = await db.Post.findById(req.params.pid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving post for comment creation has failed, please try again later",
            data: err
        });
    }

    if (!originalPost) {
        return res.status(404).json({
            message: "Error: Could not find original post for provided id",
            data: originalPost
        });
    }

    const newComment = new db.Comment({
        author: req.user.id,
        username: user.username,
        post: req.params.pid,
        image: user.image,
        body,
        likes: [],
        comments: []
    });

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

// Update Comment - PUT - Update an existing comment (WARNING: NEED FRONT END REQUIREMENTS FOR ALL FIELDS)
const updateComment = async (req, res) => {
    const { body } = req.body;
    
    let foundComment;
    try {
        foundComment = await db.Comment.findById(req.params.cid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding comment for update has failed, please try again later",
            data: err
        });
    }

    if (!foundComment) {
        return res.status(404).json({
            message: "Error: Comment could not be found",
            data: foundComment
        });
    }

    foundComment.body = body;

    try {
        await foundComment.save();
        return res.json({
            message: "Success: Updated Comment",
            data: foundComment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Update comment has failed, please try again later",
            data: err
        });
    }
};

// Create Nested Comment - POST - Creation of new comment replying another comment
const createNestComment = async (req, res) => {
    const { body } = req.body;

    let user;
    try {
        user = await db.User.findById(req.user.id).select('-password');
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

    let originalComment;
    try {
        originalComment = await db.Comment.findById(req.params.cid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving comment for comment creation has failed, please try again later",
            data: err
        });
    }

    if (!originalComment) {
        return res.status(404).json({
            message: "Error: Could not find original comment for provided id",
            data: originalPost
        });
    }

    const newComment = new db.Comment({
        author: req.user.id,
        username: user.username,
        origComment: req.params.cid,
        image: user.image,
        body,
        likes: [],
        comments: []
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction(); 
        await newComment.save({ session: session });
        originalComment.comments.push(newComment);
        await originalComment.save({ session: session });
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

// Likes - PUT - Update likes from current user
const updateCommentLike = async (req, res) => {
    let foundComment;
    try {
        foundComment = await db.Comment.findById(req.params.cid)
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Comment not found",
                data: foundComment
            });
        }
        return res.status(500).json({
            message: "Error: Finding comment has failed, please try again later",
            data: err
        });
    }

    if (foundComment.likes.filter(like => like.toString() === req.user.id).length > 0) {
        const removeIndex = foundComment.likes.map(like => like.toString()).indexOf(req.user.id);
        
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            foundComment.likes.splice(removeIndex, 1);
            foundComment.voteTotal = foundComment.voteTotal-1;
            await foundComment.save({ session: session });
            await session.commitTransaction();
            return res.json({
                message: "Success: Update comment, removed like",
                data: foundComment.likes
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error: Updating comment has failed, please try again later",
                data: err
            });
        }
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        foundComment.likes.unshift(req.user.id)
        foundComment.voteTotal = foundComment.voteTotal+1;
        await foundComment.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Update comment like",
            data: foundComment.likes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Updating comment has failed, please try again later",
            data: err
        });
    }
}

// Dislike - PUT - Update dislikes from current user
const updateCommentDislike = async (req, res) => {
    let foundComment;
    try {
        foundComment = await db.Comment.findById(req.params.cid)
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: Comment not found",
                data: foundComment
            });
        }
        return res.status(500).json({
            message: "Error: Finding comment has failed, please try again later",
            data: err
        });
    }
    console.log(foundComment)

    if (foundComment.dislikes.filter(dislike => dislike.toString() === req.user.id).length > 0) {
        const removeIndex = foundComment.dislikes.map(dislike => dislike.toString()).indexOf(req.user.id);

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            foundComment.dislikes.splice(removeIndex, 1);
            foundComment.voteTotal = foundComment.voteTotal+1;
            await foundComment.save({ session: session });
            await session.commitTransaction();
            return res.json({
                message: "Success: Update commentt, removed dislike",
                data: foundComment.dislikes
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error: Updating comment has failed, please try again later",
                data: err
            });
        }
    }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        foundComment.dislikes.unshift(req.user.id)
        foundComment.voteTotal = foundComment.voteTotal-1;
        await foundComment.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Update comment dislike",
            data: foundComment.dislikes
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Updating comment has failed, please try again later",
            data: err
        });
    }
}

// Destroy - DELETE - Remove an existing comment
const destroyComment = async (req, res) => {    
    let foundComment;
    try {
        foundComment = await db.Comment.findById(req.params.cid).populate('author').populate('post');
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding comment has failed, please try again later",
            data: err
        });
    }

    if (!foundComment) {
        return res.status(404).json({
            message: "Error: Could not find comment",
            data: foundComment
        });
    }

    if (foundComment.author.id.toString() !== req.user.id) {
        return res.status(401).json({
            message: "Error: User not authorized",
            data: foundComment
        })
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await foundComment.remove({ session: session });
        foundComment.author.comments.pull(foundComment);
        await foundComment.author.save({ session: session });
        foundComment.post.comments.pull(foundComment);
        await foundComment.post.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Destroyed Comment",
            data: foundComment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Destroying comment has failed, please try again later",
            data: err
        });
    }
    
};

module.exports = { index, getOneComment, getAllUserComments, createComment, createNestComment, updateComment, updateCommentLike, updateCommentDislike, destroyComment };