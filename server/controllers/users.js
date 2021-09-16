/* ==== Users Controller ==== */
const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// Index - GET - Retrieve data of all users
const index = async (req, res) => {
    let users;
    try {
        users = await db.User.find({}, '-password').populate('posts').populate('comments');
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving users has failed, please try again later",
            data: err
        });
    }

    if (users.length >= 1) {
        return res.json({
            message: "Success: Found Users",
            data: users
        });
    } else {
        return res.status(404).json({
            message: "Failed: No users in database yet",
            data: users
        });
    }

};

// Profile - GET - Retrieved data of current user
const getMyProfile = async (req, res) => {
    let profile;
    try {
        profile = await db.User.findById(req.user.id).select('-password');
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving current user has failed, please try again later",
            data: err
        })
    }

    if (!profile) {
        return res.status(404).json({
            message: "Failed: User not found",
            data: profile
        });
    } else {
        return res.json({
            message: "Success: User found",
            data: profile
        });
    }
};

// User - GET - Retrieve data of one user
const getUserProfile = async (req, res) => {
    let user;
    try {
        user = await db.User.findOne({ _id: req.params.uid });
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Failed: User not found",
                data: user
            });
        }
        return res.status(500).json({
            message: "Error: Retrieving user has failed, please try again later",
            data: err
        });
    }

    if (!user) {
        return res.status(404).json({
            message: "Failed: User not found",
            data: user
        });
    } else {
        return res.json({
            message: "Success: User found",
            data: user
        });
    }
};


// Following - GET - Retrieved data of current user following
const getMyFollowing = async (req, res) => {
    let following;
    try {
        following = await db.User.findById(req.user.id)
            .select('following')
            .populate('following');
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving current user has failed, please try again later",
            data: err
        })
    }

    if (!following) {
        return res.status(404).json({
            message: "Failed: Following not found",
            data: following
        });
    } else {
        return res.json({
            message: "Success: Following found",
            data: following
        });
    }
};


// Update - PUT - Update an existing user (WARNING: NEED FRONT END REQUIREMENTS FOR ALL FIELDS)
const updateMyProfile = async (req, res) => {
    const { fullName, password, skills, bio, jobTitle, languages, favLanguage } = req.body;

    let foundUser;
    try {
        foundUser = await db.User.findById(req.user.id);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding user for update has failed, please try again later",
            data: err
        });
    }

    if (!foundUser) {
        return res.status(404).json({
            message: "Error: Could not find user",
            data: foundUser
        });
    }

    let newPassword;
    if (password) {  
        const salt = await bcrypt.genSalt(6);
        newPassword = await bcrypt.hash(password, salt);
    }

    let newLanguages;
    if (languages) {
        newLanguages = languages.split(" ");
    }

    if (fullName) foundUser.fullName = fullName;
    if (newPassword) foundUser.password = newPassword;
    if (skills) foundUser.skills = skills;
    if (req.files['image']) foundUser.image = req.files['image'][0].path;
    if (req.files['banner']) foundUser.banner = req.files['banner'][0].path;
    if (bio) foundUser.bio = bio;
    if (jobTitle) foundUser.jobTitle = jobTitle;
    if (favLanguage) foundUser.favLanguage = favLanguage;
    if (languages) foundUser.languages = newLanguages;

    try {
        await foundUser.save();

        return res.json({
            message: "Success: Updated User",
            data: foundUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Update user has failed, please try again later",
            data: err
        });
    }
};

// Update - PUT - Update user with follows
const updateFollow = async (req, res) => {
    let currentUser;
    try {
        currentUser = await db.User.findById(req.user.id);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding your user for follow failed, please try again later",
            data: err
        });
    }
    if (!currentUser) {
        return res.status(404).json({
            message: "Error: Could not find your user",
            data: currentUser
        });
    }

    let followUser;
    try {
        followUser = await db.User.findById(req.params.uid);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding user for follow failed, please try again later",
            data: err
        });
    }
    if (!followUser) {
        return res.status(404).json({
            message: "Error: Could not find user",
            data: followUser
        });
    }

    if (req.params.uid === req.user.id) {
        return res.status(405).json({
            message: "Error: User cannot follow themselves",
        });
    }    

    if (currentUser.following.filter(user => user.toString() === req.params.uid).length > 0) {
        const followingIndex = currentUser.following.map(user => user.toString()).indexOf(req.params.uid);
        const followerIndex = followUser.followers.map(user => user.toString()).indexOf(req.user.id);
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            currentUser.following.splice(followingIndex, 1);
            followUser.followers.splice(followerIndex, 1);
            await currentUser.save({ session: session });
            await followUser.save({ session: session });
            await session.commitTransaction();
            return res.json({
                message: "Success: Updated user, removed follow",
                curentUser: currentUser.following,
                followUser: followUser.follower
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error: Updating follow failed, please try again later",
                data: err
            });
        }
    } 

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        currentUser.following.unshift(req.params.uid);
        followUser.followers.unshift(req.user.id);
        await currentUser.save({ session: session });
        await followUser.save({ session: session });
        await session.commitTransaction();
        return res.json({
            message: "Success: Updated user follow",
            currentUser: currentUser.following,
            followUser: followUser.followers
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Updating follow has failed, please try again later",
            data: err
        });
    }
};


// Destroy - DELETE - Remove an existing user (Not recommended)
const destroyUser = async (req, res) => {    
    let foundUser;
    try {
        foundUser = await db.User.findById(req.user.id)
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding user has failed, please try again later",
            data: err
        });
    }

    if (!foundUser) {
        return res.status(404).json({
            message: "Error: Could not find user",
            data: foundUser
        });
    }

    let imagePath;
    let bannerPath;
    if (foundUser.image) imagePath = foundUser.image;
    if (foundUser.banner) bannerPath = foundUser.banner;

    try {
        await foundUser.remove();
        // ADD remove post and comments here as well later

    } catch (err) {
        return res.status(500).json({
            message: "Error: Destroying user has failed, please try again later",
            data: err
        });
    }

    
    if (imagePath) {
        fs.unlink(imagePath, err => {
            if (err) console.log(err);
    })}
    if (bannerPath) {
        fs.unlink(bannerPath, err => {
            if (err) console.log(err);
    })}
    

    return res.json({
        message: "Success: Destroyed User",
        data: foundUser});
};

module.exports = { index, getMyProfile, getUserProfile, getMyFollowing, updateMyProfile, updateFollow, destroyUser };