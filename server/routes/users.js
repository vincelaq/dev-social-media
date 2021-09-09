/* ==== User Routes ==== */
const router = require("express").Router();
const { users } = require("../controllers");
const auth = require("../middleware/auth");


router.get("/", users.index);
router.get("/profile", auth, users.getMyProfile);
router.get("/profile/:uid", users.getUserProfile);
router.put("/profile", auth, upload.fields(), users.updateMyProfile);
router.delete("/", auth, users.destroyUser);

module.exports = router;