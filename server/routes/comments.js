/* ==== Comments Routes ==== */
const router = require("express").Router();
const { comments } = require("../controllers");
const auth = require("../middleware/auth");

router.get("/", comments.index);
router.get("/:cid", comments.getOneComment);
router.get("/user/:uid", comments.getAllUserComments);
router.post("/:pid", auth, comments.createComment);
router.put("/:cid", comments.updateComment);
router.put("/like/:cid", auth, comments.updateCommentLike);
router.put("/dislike/:cid", auth, comments.updateCommentDislike);
router.delete("/:cid", auth, comments.destroyComment);

module.exports = router;