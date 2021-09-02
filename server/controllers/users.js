/* ==== Users Controller ==== */
const { getNodeText } = require("@testing-library/react");
const db = require("../models");

// Index - GET - Retrieve data of all users
const index = async (req, res) => {
    const users = await db.User.find({});
    return res.json({
        message: "Success: Found Users",
        data: users
    });
};


// Signup - POST - Creation of new user
const signup = async (req, res) => {
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

    const newUser = new db.User (req.body);
    try {
        await newUser.save();
        return res.json({
            message: "Success: Added New User",
            data: newUser});
    } catch (err) {
        return res.status(400).json({
            message: "Error: Signing up failed, please try again later",
            data: err
        });
    }
};

// Destroy - DELETE - Remove an existing user
const destroy = async (req, res) => {    
    let foundUser;
    try {
        foundUser = await db.User.findById(req.params.id)
    } catch (err) {
        return res.status(500).json({
            message: "Error: Finding user has failed, please try again later",
            data: err
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

module.exports = { index, signup, destroy };