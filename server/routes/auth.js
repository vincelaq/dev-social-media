/* ==== Auth Routes ==== */
const router = require("express").Router();
const authorized = require("../middleware/auth");
const { auth } = require("../controllers");
const { signupRules } = require("../middleware/validator");

router.get('/', authorized, auth.index);
router.post("/signup", signupRules(), auth.signup);
router.post("/login", auth.login);



module.exports = router;