/* ==== Post Routes ==== */
const router = require("express").Router();
const { posts } = require("../controllers");
const auth = require("../middleware/auth");
const { postRules, updatePostRules } = require("../middleware/validator");
const upload = require("../middleware/upload");

router.get("/", posts.index);
router.get("/:pid", posts.getOnePost);
router.get("/user/:uid", posts.getAllUserPosts);
router.post("/", auth, upload.array('postImgs', 4), postRules(), posts.createPost);
router.put("/:pid", auth, updatePostRules(), posts.updatePost);
router.put("/like/:pid", auth, posts.updatePostLike);
router.put("/dislike/:pid", auth, posts.updatePostDislike);
router.delete("/:pid", auth, posts.destroyPost);

module.exports = router;