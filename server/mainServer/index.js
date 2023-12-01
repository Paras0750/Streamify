require("dotenv").config();
require("./modules/db")();

const path = require("path");
const upload = require("./modules/multer");

const express = require("express");
const app = express();
const cors = require("cors");
// const userRoutes = require("./routes/userRoutes");
const PORT = process.env.PORT || 3001;

const channelRoutes = require("./routes/channelRoutes");
const subscriptionRoutes = require("./routes/subscribeRoutes");
const videoRoutes = require("./routes/videoRoutes");

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully");
});
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "S3Bucket/"))
);

// Routes
app.use("/api/app", channelRoutes);
app.use("/api/app", subscriptionRoutes);
app.use("/api/app", videoRoutes);

app.listen(PORT, () => console.log(`Main Server Started on port ${PORT}`));
