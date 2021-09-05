/* ==== User Routes ==== */
const router = require("express").Router();
const { users } = require("../controllers");

router.get("/", users.index);
router.get("/:uid", users.oneUser);
router.post("/signup", users.signup);
router.post("/login", users.login);
router.put("/:uid", users.update);
router.delete("/:uid", users.destroy);

module.exports = router;