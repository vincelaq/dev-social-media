/* ==== Users Controller ==== */
const db = require("../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    
    const image = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    let existingUser 
    try {
       existingUser = await db.User.findOne({ email: req.body.email }, '-password')
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
        image,
        posts: [],
        comments: [],
    });

    const salt = await bcrypt.genSalt(6);
    newUser.password = await bcrypt.hash(password, salt);


    try {
        await newUser.save();
        
        const token = jwt.sign(
            { newUser },
            process.env.SECRET,
            { expiresIn: "24h" }
        );

        return res.json({
            message: "Success: User registered",
            data: token
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error: Signing up failed, please try again later",
            data: err
        });
    }
};

// Login - POST - Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser 
    try {
       existingUser = await db.User.findOne({ email: email })
    } catch (err) {
        return res.status(500).json({
            message: "Error: Logging in failed, please try again later",
            data: err
        });
    }

    if (!existingUser || existingUser.password !== password) {
        return res.status(401).json({
            message: "Error: Invalid credentials, could not log you in",
            data: null
        });
    } else {
        return res.json({
            message: "Success: Logged in",
            data: existingUser
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

module.exports = { index, oneUser, signup, login, update, destroy };