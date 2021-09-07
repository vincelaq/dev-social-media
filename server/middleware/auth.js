/* ==== Auth Custom Middleware ==== */
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            message: "Error: No token, authorization denied",
            data: token
        })
    };

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Error: Token is not valid",
            data: err
        })
    }
}