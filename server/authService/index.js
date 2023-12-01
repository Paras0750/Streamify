require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./modules/db")();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Auth Service Started on ${PORT}`);
});
