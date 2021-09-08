/* ==== Comments Routes ==== */
const router = require("express").Router();
const { comments } = require("../controllers");
const auth = require("../middleware/auth");

router.get("/", comments.index);
router.get("/:cid", comments.getOneComment);
router.get("/user/:uid", comments.getAllUserComments);
router.post("/:pid", auth, comments.createComment);
router.put("/:cid", comments.updateComment);
router.delete("/:cid", auth, comments.destroyComment);

module.exports = router;