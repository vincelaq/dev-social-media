/* ==== Model Hub ==== */
require("../config/database");

module.exports = {
    User: require("./User"),
    Post: require("./Post"),
    Comment: require("./Comment"),
};