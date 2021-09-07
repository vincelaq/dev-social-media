/* ==== Auth Controller ==== */
const mongoose = require('mongoose');
const db = require("../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Index - GET - Retrieve data of authorized user
const index = async (req, res) => {
    try {
        const user = await db.User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "Error: Server error, please try again later",
            data: err
        })
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
        
        const payload = {
            user: {
                id: newUser.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: "24h" }
        );

        return res.json({
            message: "Success: User registered",
            token: token
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

    if (!existingUser) {
        return res.status(401).json({
            message: "Error: Invalid credentials, could not log you in",
        })
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Error: Invalid credentials, could not log you in",
        });
    };

    const payload = {
        user: {
            id: existingUser.id
        }
    };

    const token = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: "24h" }
    );

    return res.json({
        message: "Success: User registered",
        token: token
    });

};

module.exports = { index, signup, login }