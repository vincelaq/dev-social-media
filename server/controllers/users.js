/* ==== Users Controller ==== */
const db = require("../models");

// Index - GET - Retrieve data of all users
const index = async (req, res) => {
    let users;
    try {
        users = await db.User.find({});
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
            data: user
        });
    }

};

// User - GET - Retrieve data of one user
const oneUser = async (req, res) => {
    let user;
    try {
        user = await db.User.findOne({ _id: req.params.uid });
    } catch (err) {
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


// Signup - POST - Creation of new user
const signup = async (req, res) => {
    const  { firstName, lastName, email, password } = req.body;
    
    let existingUser 
    try {
       existingUser = await db.User.findOne({ email: req.body.email })
    } catch (err) {
        return res.status(500).json({
            message: "Error: Signing up failed, please try again later",
            data: err
        });
    }

    if (existingUser) {
        return res.status(422).json({
            message: "User exists already, please login instead",
            data: existingUser
        })
    }

    const newUser = new db.User ({
        firstName,
        lastName,
        email,
        password,
        posts: [],
    });
    try {
        await newUser.save();
        return res.json({
            message: "Success: Added New User",
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Signing up failed, please try again later",
            data: err
        });
    }
};

// Update - PUT - Update an existing user (WARNING: NEED FRONT END REQUIREMENTS FOR ALL FIELDS)
const update = async (req, res) => {
    let foundUser;
    try {
        foundUser = await db.User.findById(req.params.uid);
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

    foundUser.firstName = req.body.firstName;
    foundUser.lastName = req.body.lastName;
    foundUser.password = req.body.password;

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
const destroy = async (req, res) => {    
    let foundUser;
    try {
        foundUser = await db.User.findById(req.params.uid)
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

module.exports = { index, oneUser, signup, update, destroy };