/* ==== Post Routes ==== */
const router = require("express").Router();
const { posts } = require("../controllers");

router.get("/", posts.index);
router.get("/:pid", posts.getOnePost);
router.get("/user/:uid", posts.getAllUserPosts);
router.post("/", posts.createPost);
// router.put("/:id", users.update);
// router.delete("/:id", users.destroy);

module.exports = router;