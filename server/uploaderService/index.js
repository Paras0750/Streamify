require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./modules/db")();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/uploader"));


app.listen(process.env.PORT || 3003, (err) =>
  console.log(`Server Started On ${process.env.PORT || 3003}`)
);
