/* ==== Auth Controller ==== */
const mongoose = require('mongoose');
const db = require("../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

// Index - GET - Retrieve data of authorized user
const index = async (req, res) => {
    let user;
    try {
        user = await db.User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "Error: Server error, please try again later",
            data: err
        })
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
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        
        return res.status(422).json({
            message: "Error: Invalid inputs passed, please check your data",
            data: extractedErrors
        });
    
    
    };
    
    const  { fullName, username, email, password } = req.body;
    
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
        fullName,
        username,
        email,
        password,
        image,
        banner: "",
        bio: "",
        skills: "",
        languages: [],
        favLanguage: "",
        posts: [],
        comments: [],
        followers: [],
        following: []
    });

    const salt = await bcrypt.genSalt(6);
    newUser.password = await bcrypt.hash(password, salt);


    try {
        await newUser.save();

        const token = jwt.sign(
            { user: { id: newUser.id }},
            process.env.SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
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
    };

    let isMatch = false;
    try {
        isMatch = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res.status(500).json({
            message: "Error: Could not log you in, please check credentials and try again"
        })
    };

    if (!isMatch) {
        return res.status(401).json({
            message: "Error: Invalid credentials, could not log you in",
        });
    };

    const token = jwt.sign(
        { user: { id: existingUser.id }},
        process.env.SECRET,
        { expiresIn: "1h" }
    );

    return res.json({
        message: "Success: User logged in",
        token: token
    });

};

module.exports = { index, signup, login }