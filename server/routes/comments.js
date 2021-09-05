/* ==== Comments Routes ==== */
const router = require("express").Router();
const { comments } = require("../controllers");

router.get("/", comments.index);
router.get("/:cid", comments.getOneComment);
router.get("/user/:uid", comments.getAllUserComments);
router.post("/", comments.createComment);
router.put("/:cid", comments.updateComment);
router.delete("/:cid", comments.destroyComment);

module.exports = router;