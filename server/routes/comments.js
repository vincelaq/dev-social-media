/* ==== Comments Routes ==== */
const router = require("express").Router();
const { comments } = require("../controllers");
const auth = require("../middleware/auth");
const { commentRules } = require("../middleware/validator");

router.get("/", comments.index);
router.get("/:cid", comments.getOneComment);
router.get("/user/:uid", comments.getAllUserComments);
router.post("/:pid", auth, commentRules(), comments.createComment);
router.post("/orig/:cid", auth, commentRules(), comments.createNestComment);
router.put("/:cid", auth, commentRules(), comments.updateComment);
router.put("/like/:cid", auth, comments.updateCommentLike);
router.put("/dislike/:cid", auth, comments.updateCommentDislike);
router.delete("/:cid", auth, comments.destroyComment);

module.exports = router;