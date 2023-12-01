const amqp = require("amqplib");
const uuid = require("uuid");

module.exports = async (req, res) => {
  // console.log("req.body: ", req.body);
  // console.log("req.file: ", req.files);
  // console.log("req.user: ", req.user);
  const queue = process.env.QUEUE_NAME || "test-queue";
  const conn = await amqp.connect("amqp://localhost");

  const channel = await conn.createChannel();

  // console.log("thumbnailUrl", req.files.thumbnail[0].filename);
  const msg = {
    vidId: uuid.v4(),
    username: req.user.username,
    title: req.body.title,
    description: req.body.description,
    videoUrl: req.files.video[0].path,
    thumbnailUrl: req.files.thumbnail[0].filename,
  };
  console.log("msg: ", msg);
  
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

  res.send("Video uploaded successfully.");
};
