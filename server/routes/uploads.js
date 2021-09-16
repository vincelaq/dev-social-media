/* ==== Upload Routes ==== */
const router = require("express").Router();
const authorized = require("../middleware/auth");
const { auth } = require("../controllers");
const upload = require("../middleware/file-upload");

const singleUpload = upload.single('image');

router.post('/image-upload', singleUpload, function(req, res) {
    res.send(req.file.location)
})

module.exports = router;