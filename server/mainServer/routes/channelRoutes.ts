const router = require("express").Router();
import upload from "../modules/multer";
import  protect from "../modules/jwt";
import { createChannel, getChannel, pushHistory, getHistory, myinfo } from "../controllers/channelControler";

router.get("/gethistory", protect, getHistory);
router.get('/myinfo',protect, myinfo);

router.post("/createchannel",protect, upload.fields([{name: 'displayPic',maxCount:1},{ name: 'bannerImage', maxCount: 1 }]), createChannel);
router.post("/getchannel", getChannel);
router.post("/posthistory", protect, pushHistory);

module.exports = router;
export default router;