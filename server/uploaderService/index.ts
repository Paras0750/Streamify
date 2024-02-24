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

// curl -X POST \
//   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzIzY2U1MWJlMjRlYTg5YTE2NmZlZSIsInVzZXJuYW1lIjoiUGFyYXMiLCJpYXQiOjE3MDg3MDA0MDcsImV4cCI6MTcwOTMwNTIwN30.J7vl8OtiwY16JeYLaMBavCXaTDWBrP41rgwvi9dMn3A" \
//   -F "video=@/Users/parasnauriyal/Desktop/testVideo/chatapp.mov" \
//   -F "thumbnail=@/Users/parasnauriyal/Desktop/testVideo/displaypic.png" \
//   -F "title=Your Video Title" \
//   -F "description=Your Video Description" \
//   http://localhost:3003/api/upload

