import { connect } from "amqplib";
import { Request, Response } from "express";
import { v4 } from "uuid";

interface CustomRequest extends Request {
  user: any;
  username?: string;
  files: any
}

export default async (req: CustomRequest, res: Response) => {
  try {
    // console.log("req.body: ", req.body);
    // console.log("req.file: ", req.files);
    // console.log("req.user: ", req.user);
    const queue = process.env.QUEUE_NAME || "test-queue";
    const conn = await connect("amqp://localhost");

    const channel = await conn.createChannel();

    // console.log("thumbnailUrl", req.files.thumbnail[0].filename);
    const msg = {
      vidId: v4(),
      username: req.user.username,
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.files.video[0].path,
      thumbnailUrl: req.files.thumbnail[0].filename,
    };
    console.log("msg: ", msg);

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

    res.send("Video uploaded successfully.");
  } catch (error) {
    console.log("Error in videoUplwoader: ", error);
    res.status(500).send("Internal Server Error");
  }
};
