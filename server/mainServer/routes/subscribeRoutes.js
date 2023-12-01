const router = require("express").Router();
const { protect } = require("../modules/jwt");
const {
  createCollections,
  mySubscriptions,
  subscribe,
  unsubscribe,
  isSubscribed,
} = require("../controllers/subscriptionController");

router.post("/test", protect, (req, res) => {
  res.send("Hey!");
});
router.get("/createcollection", protect, createCollections);
router.get("/mySubscriptions", protect, mySubscriptions);

router.post("/subscribe", protect, subscribe);
router.post("/unsubscribe", protect, unsubscribe);
router.post("/issubscribed", protect, isSubscribed);

module.exports = router;
