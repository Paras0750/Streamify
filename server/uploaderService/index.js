require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./modules/db")();

const app = express();

app.use(express.json());
app.use(cors());

const uploader = require("./routes/uploader");
app.use("/api", uploader);

app.get("/", (req, res) => {
  console.log("req received");
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3003, (err) =>
  console.log(`Uploader Service Started on port ${process.env.PORT || 3003}`)
);
