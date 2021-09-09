const { body } = require("express-validator");

const signupRules = () => {
    return [
        body('email')
            .normalizeEmail()
            .isEmail(),
        body('password')
            .isLength({ min: 6 }),
        body('username')
            .not()
            .isEmpty()
    ]
};

const postRules = () => {
    return [
        body('title')
            .not()
            .isEmpty(),
        body('body')
            .isLength({ min: 5 })
    ]
};

const updatePostRules = () => {
    return [
        body('body')
            .isLength({ min: 5 })
    ]
};

const commentRules = () => {
    return [
        body('body')
            .not()
            .isEmpty()
    ]
}

module.exports = { signupRules, postRules, updatePostRules, commentRules }