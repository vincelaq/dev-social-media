/* ==== User Routes ==== */
const router = require("express").Router();
const { users } = require("../controllers");

router.get("/", users.index);
router.get("/:id", users.oneUser);
router.post("/signup", users.signup);
router.put("/:id", users.update);
router.delete("/:id", users.destroy);

module.exports = router;