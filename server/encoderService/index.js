require("dotenv").config();
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg"); 

require("./modules/db")();
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500, // 500 MB
  },
});

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No video file uploaded.');
  }
  
  // Input and output file paths
  const inputFilePath = req.file.path;
  const outputDirectory = 'output/';

  const resolutions = ['256x144', '426x240', '640x360', '854x480', '1280x720', '1920x1080'];

  Promise.all(
    resolutions.map((resolution) => {
      const outputFilePath = `${outputDirectory}${Date.now()}-output-${resolution}.mov`;

      return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath) 
          .output(outputFilePath)
          .videoCodec('libx264')
          .audioCodec('aac')
          .size(resolution)
          .on('end', () => {
            console.log(`Video processing finished for ${resolution}.`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`Error processing video for ${resolution}:`, err);
            reject(err);
          })
          .run();
      });
    }) 
  )
    .then(() => {
      console.log('All video processing finished.');
      res.send('All video processing finished.');
    })
    .catch((error) => {
      console.log('Error processing video:', error);
      res.status(500).send('Error processing video.');
    });
});

app.listen(PORT, (err) => console.log(`Server Started On ${PORT}`));
