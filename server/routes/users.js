/* ==== User Routes ==== */
const router = require("express").Router();
const { users } = require("../controllers");
const auth = require("../middleware/auth");
const fileUpload = require("../middleware/upload");


router.get("/", users.index);
router.get("/profile", auth, users.getMyProfile);
router.get("/profile/:uid", users.getUserProfile);
router.get("/following", auth, users.getMyFollowing);
router.get("/search/:query", users.searchUser);
router.post("/image", auth, fileUpload.single('image'), users.postImage);
router.post("/banner", auth, fileUpload.single('banner'), users.postBanner);
router.put("/profile", auth, users.updateMyProfile);
router.put("/follow/:uid", auth, users.updateFollow);
router.delete("/", auth, users.destroyUser);

module.exports = router;