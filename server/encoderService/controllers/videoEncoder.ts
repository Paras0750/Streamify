import ffmpeg from "fluent-ffmpeg";
import { connect } from "amqplib";
import { writeFileSync, existsSync, createReadStream } from "fs";
import { join, basename } from "path";
import Video from "../models/VideoModel";
import Like from "../models/Like";
import ChannelModel from "../models/ChannelModel";
import { Request, Response } from "express";

interface VideoContent {
  videoUrl: string;
  username: string;
  vidId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  dp: string;
  m3u8: string;
}

(async () => {
  const queue = process.env.QUEUE_NAME || "test-queue";
  const conn = await connect("amqp://localhost");

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, async (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
      const content: VideoContent = JSON.parse(msg.content.toString());
      const manifestFileName = await processVideo(content.videoUrl);
      const { username, vidId, title, description, thumbnailUrl } = content;

      var dp = new ChannelModel({ username });
      // @ts-ignore
      dp = dp.displayPic;

      const videoContent: VideoContent = {
        username,
        // @ts-ignore
        dp,
        vidId,
        m3u8: manifestFileName,
        title,
        description,
        thumbnailUrl,
      };

      await SaveVideoMetaData(videoContent);

      ch1.ack(msg);
      console.log("Acknowledge sent");
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();

// Might have error
async function SaveVideoMetaData({
  username,
  dp,
  vidId,
  m3u8,
  title,
  description,
  thumbnailUrl,
}: VideoContent) {
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

async function processVideo(inputFilePath: string) {
  // Input and output file paths
  const uniqueId = Date.now();
  const outputDirectory = "./output/";
  const manifestFileName = `${uniqueId}.m3u8`;
  const manifestPath = join(outputDirectory, `${manifestFileName}`);

  const resolutions = [
    "256x144",
    // "426x240",
    // "640x360",
    // "854x480",
    // "1280x720",
    // "1920x1080",
  ];

  const promises = resolutions.map((resolution) => {
    const outputFilePath = join(
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
          // @ts-ignore
          const filename = basename(outputPath);
          return `#EXTINF:1.000,\n${filename}`;
        })
        .join("\n");

      // Write the manifest content to the manifest file
      writeFileSync(manifestPath, manifestContent);

      console.log("Manifest file created:", manifestPath);
    })
    .catch((error) => {
      console.log("Error processing video:", error);
    });

  return manifestFileName;
}

export function stream(req: Request, res: Response) {
  const manifestFileName = req.params.manifest;
  const manifestPath = join(__dirname, "..", "output", manifestFileName);

  if (!existsSync(manifestPath))
    return res.status(404).json({ status: false, msg: "No Such File Exists" });

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  createReadStream(manifestPath).pipe(res);
}

export function getFile(req: Request, res: Response) {
  const manifestFileName = req.params.file;
  const manifestPath = join(__dirname, "..", "output", manifestFileName);

  if (!existsSync(manifestPath))
    return res.status(404).json({ status: false, msg: "No Such File Exists" });

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  createReadStream(manifestPath).pipe(res);
}
