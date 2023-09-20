const amqp = require("amqplib");

module.exports = async (req, res) => {
    const queue = process.env.QUEUE_NAME || "test-queue";
    const conn = await amqp.connect("amqp://localhost");

    const channel = await conn.createChannel();
    console.log(req.file.path);
    await channel.sendToQueue(queue, Buffer.from(req.file.path));

    res.send("Video uploaded successfully.");

};