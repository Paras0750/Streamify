const ffmpeg = require("fluent-ffmpeg");
const amqplib = require("amqplib");
const fs = require("fs");
const path = require("path");
const Video = require("../models/VideoModel");
const Like = require("../models/Like");
const ChannelModel = require("../models/ChannelModel");

(async () => {
  const queue = process.env.QUEUE_NAME || "test-queue";
  const conn = await amqplib.connect("amqp://localhost");

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, async (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
      const content = JSON.parse(msg.content.toString());
      const manifestFileName = await processVideo(content.videoUrl);
      const { username, vidId, title, description, thumbnailUrl } = content;

      var dp = new ChannelModel({ username });
      dp = dp.displayPic;

      await SaveVideoMetaData(
        username,
        dp,
        vidId,
        manifestFileName,
        title,
        description,
        thumbnailUrl
      );

      ch1.ack(msg);
      console.log("Acknowledge sent");
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();

async function SaveVideoMetaData(
  username,
  dp,
  vidId,
  m3u8,
  title,
  description,
  thumbnailUrl
) {
  try {
    const video = new Video({
      username: username,
      displayPic: dp,
      vidId: vidId,
      m3u8: m3u8,
      title: title,
      description: description,
      thumbnail: thumbnailUrl,
    });

    video.save();
    console.log("Video saved in the database successfully.");
    const likes = new Like({
      videoId: vidId,
    });
    await likes.save();
    console.log("Likes saved in the database successfully.");
  } catch (error) {
    throw error;
  }
}

async function processVideo(inputFilePath) {
  // Input and output file paths
  const uniqueId = Date.now();
  const outputDirectory = "./output/";
  const manifestFileName = `${uniqueId}.m3u8`;
  const manifestPath = path.join(outputDirectory, `${manifestFileName}`);

  const resolutions = [
    "256x144",
    "426x240",
    "640x360",
    "854x480",
    "1280x720",
    "1920x1080",
  ];

  const promises = resolutions.map((resolution) => {
    const outputFilePath = path.join(
      outputDirectory,
      `${resolution}-output-${uniqueId}.m3u8`
    );

    return new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .output(outputFilePath)
        .outputOptions([
          "-profile:v baseline", // H.264 profile for wider devide suppoet
          "-level 3.1", // H265 level
          "-start_number 0", // Segment start number
          "-hls_time 10", // segnebt duration
          "-hls_list_size 0", // number of segments to keep in playlist (0 means all)
          "-f hls", // output format HLS
        ])
        .videoCodec("libx264")
        .audioCodec("aac")
        .size(resolution)
        .on("end", () => {
          console.log(`Video processing finished for ${resolution}.`);
          resolve(outputFilePath);
        })
        .on("error", (err) => {
          console.error(`Error processing video for ${resolution}:`, err);
          reject(err);
        })
        .run();
    });
  });

  await Promise.all(promises)
    .then((outputFilePaths) => {
      const manifestContent = outputFilePaths
        .map((outputPath) => {
          // Extract the filename from the output path
          const filename = path.basename(outputPath);
          return `#EXTINF:1.000,\n${filename}`;
        })
        .join("\n");

      // Write the manifest content to the manifest file
      fs.writeFileSync(manifestPath, manifestContent);

      console.log("Manifest file created:", manifestPath);
    })
    .catch((error) => {
      console.log("Error processing video:", error);
    });

  return manifestFileName;
}

module.exports.stream = (req, res) => {
  const manifestFileName = req.params.manifest;
  const manifestPath = path.join(__dirname, "..", "output", manifestFileName);

  if (!fs.existsSync(manifestPath))
    return res.status(404).json({ status: false, msg: "No Such File Exists" });

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  fs.createReadStream(manifestPath).pipe(res);
};
