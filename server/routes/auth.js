/* ==== Auth Routes ==== */
const router = require("express").Router();
const authorized = require("../middleware/auth");
const { auth } = require("../controllers");

router.get('/', authorized, auth.index);
router.post("/signup", auth.signup);
router.post("/login", auth.login);



module.exports = router;