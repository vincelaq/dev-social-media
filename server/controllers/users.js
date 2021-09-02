/* ==== Users Controller ==== */
const db = require("../models");

// Index - GET - Retrieve data of all users
const index = async (req, res) => {
    const users = await db.User.find({});
    res.json({
        message: "Success: Found Users",
        data: users
    });
};


// Signup - POST - Creation of new user
const signup = async (req, res) => {
    const newUser = new db.User (req.body);
    try {
        await newUser.save();
        res.json({
            message: "Success: Added New User",
            data: newUser});
    } catch (err) {
        res.status(400).json(err);
    }
};

// Destroy - DELETE - Functional (id)
const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) console.log("Error in User#destroy:", err);

        return res.status(200).json({
            message: "Success: Deleted User",
            data: deletedUser,
        });
    });
};

module.exports = { index, signup, destroy };