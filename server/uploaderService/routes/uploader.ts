const router = require("express").Router();
import upload from "../modules/multer";
import { protect } from "../modules/jwt";
import videoUploader from "../controllers/videoUploader";

router.post(
  "/upload",
  protect,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoUploader
);

export default router;
