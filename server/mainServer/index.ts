import { Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./modules/db";
import * as path from "path";
import upload from "./modules/multer";
import express from "express";
import cors from "cors";
import channelRoutes from "./routes/channelRoutes";
import subscriptionRoutes from "./routes/subscribeRoutes";
import videoRoutes from "./routes/videoRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  console.log(req.file);
  res.send("File uploaded successfully");
});

app.use("/getFile", express.static(path.join(__dirname, "S3Bucket/")));

// Routes
app.use("/api/app", channelRoutes);
app.use("/api/app", subscriptionRoutes);
app.use("/api/app", videoRoutes);

app.listen(PORT, () => console.log(`Main Server Started on port ${PORT}`));
