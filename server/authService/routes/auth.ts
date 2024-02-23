import login from "../controllers/login";
import register from "../controllers/register";

const router = require("express").Router();



router.post("/register", register);
router.post("/login", login);

export default router;
