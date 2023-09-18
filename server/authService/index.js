require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./modules/db")();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));


app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
