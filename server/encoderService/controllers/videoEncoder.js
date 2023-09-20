const ffmpeg = require("fluent-ffmpeg"); 
const amqplib = require('amqplib');

(async () => {
  const queue = process.env.QUEUE_NAME || 'test-queue';
  const conn = await amqplib.connect('amqp://localhost');

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, async (msg) => {
    if (msg !== null) {
      console.log('Recieved:', msg.content.toString());
      await processVideo(msg.content.toString())
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });


})();



function processVideo(inputFilePath) {

  // Input and output file paths
  const outputDirectory = "./output/";

  const resolutions = [
    "256x144",
    "426x240",
    "640x360",
    "854x480",
    "1280x720",
    "1920x1080",
  ];

  Promise.all(
    resolutions.map((resolution) => {
      const outputFilePath = `${outputDirectory}${Date.now()}-output-${resolution}.mov`;

      return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
          .output(outputFilePath)
          .videoCodec("libx264")
          .audioCodec("aac")
          .size(resolution)
          .on("end", () => {
            console.log(`Video processing finished for ${resolution}.`);
            resolve();
          })
          .on("error", (err) => {
            console.error(`Error processing video for ${resolution}:`, err);
            reject(err);
          })
          .run();
      });
    })
  )
    .then(() => {
      console.log("All video processing finished.");
    })
    .catch((error) => {
      console.log("Error processing video:", error);
    });
};
