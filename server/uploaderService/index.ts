require("dotenv").config();
import express from "express";
import cors from "cors";
import db from "./modules/db";
db();

const app = express();

app.use(express.json());
app.use(cors());

import uploader from "./routes/uploader";
app.use("/api", uploader);

app.get("/", (req, res) => {
  console.log("req received");
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3003, () => {
  console.log(`Uploader Service Started on port ${process.env.PORT || 3003}`);
});
