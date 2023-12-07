const router = require("express").Router();
require("../controllers/videoEncoder")
const { stream,  } = require("../controllers/videoEncoder");

router.get("/stream/:manifest", stream);


module.exports = router;
