/* ==== Comments Routes ==== */
const router = require("express").Router();
const { comments } = require("../controllers");

router.get("/", comments.index);
router.get("/:cid", comments.getOneComment);
router.get("/user/:uid", comments.getAllUserComments);
router.post("/", comments.createComment);
// router.put("/:pid", posts.updatePost);
// router.delete("/:pid", posts.destroyPost);

module.exports = router;