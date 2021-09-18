/* ==== Route Hub ==== */
const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/uploads", require("./uploads"));

module.exports = router;