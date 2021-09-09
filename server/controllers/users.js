/* ==== Users Controller ==== */
const mongoose = require("mongoose");
const db = require("../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({ storage: storage }).single("image");

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
        profile = await db.User.findOne({ id: req.user.id }).select('-password');
    } catch (err) {
        return res.status(500).json({
            message: "Error: Retrieving current user has failed, please try again later",
            data: err
        })
    }

    if (!profile) {
        return res.status(404).json({
            message: "Failed: User not found",
            data: user
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

// Update - PUT - Update an existing user (WARNING: NEED FRONT END REQUIREMENTS FOR ALL FIELDS)
const updateMyProfile = async (req, res) => {
    const { fullName, password, skills, bio, languages, favLanguages } = req.body;
    
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

    foundUser.fullName = fullName;
    foundUser.password = password;
    foundUser.skills = skills;
    foundUser.image = req.file.path;
    foundUser.banner = req.file.path;
    foundUser.bio = bio;
    foundUser.languages = languages;
    foundUser.favLanguage = favLanguage;

    try {
        await foundUser.save();
        return res.json({
            message: "Success: Updated User",
            data: foundUser
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Update user has failed, please try again later",
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

    try {
        await foundUser.remove();
        // ADD remove post and comments here as well later
        return res.json({
            message: "Success: Destroyed User",
            data: foundUser});
    } catch (err) {
        return res.status(500).json({
            message: "Error: Destroying user has failed, please try again later",
            data: err
        });
    }
    
};

module.exports = {
    index,
    getMyProfile,
    uploading,
    getUserProfile,
    updateMyProfile,
    destroyUser
};