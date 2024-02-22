const router = require("express").Router();
import protect from "../modules/jwt";
import { createCollections, mySubscriptions, subscribe, unsubscribe, isSubscribed } from "../controllers/subscriptionController";
import { Request, Response } from "express";

router.post("/test", protect, (req: Request, res: Response) => {
  res.send("Hey!");
});
router.get("/createcollection", protect, createCollections);
router.get("/mySubscriptions", protect, mySubscriptions);

router.post("/subscribe", protect, subscribe);
router.post("/unsubscribe", protect, unsubscribe);
router.post("/issubscribed", protect, isSubscribed);

export default router;
