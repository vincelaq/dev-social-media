/* ==== User Routes ==== */
const router = require("express").Router();
const { users } = require("../controllers");
const auth = require("../middleware/auth");

router.get("/", auth, users.index);
router.get("/:uid", users.oneUser);
router.put("/:uid", users.update);
router.delete("/:uid", users.destroy);

module.exports = router;