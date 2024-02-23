require("dotenv").config();
import express, { json, urlencoded } from "express";
import cors from "cors";

import db from "./modules/db";
db();
import authRoutes from "./routes/auth";
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
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service Started on ${PORT}`);
});
