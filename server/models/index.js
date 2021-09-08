/* ==== Model Hub ==== */
require("../config/database");

module.exports = {
    User: require("./User"),
    Post: require("./Post"),
    Upvotes: require("./Upvotes"),
};