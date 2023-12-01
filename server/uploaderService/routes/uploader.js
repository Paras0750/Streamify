const router = require("express").Router();
const upload = require("../modules/multer");
const { protect } = require("../modules/jwt");
const videoUploader = require("../controllers/videoUploader");

router.post("/upload", 
    protect, 
    upload.fields([{name: 'video', maxCount:1},{ name: 'thumbnail', maxCount: 1 }]), 
videoUploader);

module.exports = router;
