require("dotenv").config();
const cors = require("cors");
const express = require("express");
const multer = require("multer");

require("./modules/db")();
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

const transcodeRoutes = require("./routes/encode");
app.use("/api", transcodeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) =>
  console.log(`Encoder Service Started On port ${PORT}`)
);
