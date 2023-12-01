require("dotenv").config();
const cors = require("cors");
const express = require("express");

require("./modules/db")();
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

const transcodeRoutes = require("./routes/encode");
app.use("/api", transcodeRoutes);

app.listen(PORT, (err) =>
  console.log(`Encoder Service Started On port ${PORT}`)
);
