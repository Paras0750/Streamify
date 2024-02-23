const router = require("express").Router();
import "../controllers/videoEncoder";
import { stream } from "../controllers/videoEncoder";

router.get("/stream/:manifest", stream);

export default router;
