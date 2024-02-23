require("dotenv").config();
import cors from "cors";
import express, { Request, Response } from "express";
import transcodeRoutes from "./routes/encode";
import db from "./modules/db";
db();

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", transcodeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Encoder Service Started On port ${PORT}`));
