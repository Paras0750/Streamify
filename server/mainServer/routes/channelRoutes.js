const router = require("express").Router();
const upload = require("../modules/multer");
const { protect } = require("../modules/jwt");
const {
  createChannel,
  getChannel,
  pushHistory,
  getHistory,
  myinfo
} = require("../controllers/channelControler");

router.get("/gethistory", protect, getHistory);
router.get('/myinfo',protect, myinfo);

router.post("/createchannel",protect, upload.fields([{name: 'displayPic',maxCount:1},{ name: 'bannerImage', maxCount: 1 }]), createChannel);
router.post("/getchannel", getChannel);
router.post("/posthistory", protect, pushHistory);

module.exports = router;
