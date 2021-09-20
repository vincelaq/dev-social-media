/* ==== Post Routes ==== */
const router = require("express").Router();
const { posts } = require("../controllers");
const auth = require("../middleware/auth");
const { postRules } = require("../middleware/validator");

router.get("/", posts.index);
router.get("/:pid", posts.getOnePost);
router.get("/user/:uid", posts.getAllUserPosts);
router.post("/", auth, postRules(), posts.createPost);
router.put("/:pid", auth, posts.updatePost);
router.put("/like/:pid", auth, posts.updatePostLike);
router.put("/dislike/:pid", auth, posts.updatePostDislike);
router.delete("/:pid", auth, posts.destroyPost);

module.exports = router;