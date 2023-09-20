require("dotenv").config();
const cors = require("cors");
const express = require("express");

require("./modules/db")();
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

app.use(require("./routes/encode"));

app.listen(PORT, (err) => console.log(`Server Started On ${PORT}`));
