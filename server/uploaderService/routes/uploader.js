const router = require("express").Router();
const upload = require("../modules/multer");
const videoUploader = require("../controllers/videoUploader");

router.post("/upload", upload.single("video"), videoUploader);

module.exports = router;
 