import mongoose from "mongoose";
import channelModel from "../models/ChannelModel";
import likedModel from "../models/LikedModel";
import historyModel from "../models/HistoryModel";
import videoModel from "../models/VideoModel";
import path from "path";
import { Request, Response } from "express";

export interface CustomReq extends Request {
  user: any;
  files: any;
  body: any;
}

interface historyType {
  history?: any;
}
export const createChannel = async (req: CustomReq, res: Response) => {
  const { userName, bio } = req.body;

  try {
    console.log("Auth: ", req.user);
    console.log("Received: ", req.body);
    console.log("Received: ", req.body.userName);

    const displayPicFileName = path.basename(req.files.displayPic[0].path);
    const bannerFileName = path.basename(req.files.bannerImage[0].path);

    const newChannel = new channelModel({
      username: userName,
      bio: bio,
      displayPic: displayPicFileName,
      banner: bannerFileName,
    });

    const response = await newChannel.save();
    if (response) {
      console.log("Channel created successfully");
      await likedModel.create({ username: userName, liked: [] });
      await historyModel.create({ username: userName, history: [] });
      console.log("Like & History Model created successfully");
    }

    res.status(200).json({ status: true });
  } catch (error) {
    console.log("Error Creating Channel: ", error);
    res
      .status(500)
      .json({ status: false, msg: `Error Creating Channel: ${error}` });
  }
};

export const getChannel = async (req: CustomReq, res: Response) => {
  try {
    const { username } = req.body;
    console.log("Recieved: ", req.body);

    const channel = await channelModel.findOne({ username });
    if (channel) res.status(200).json({ status: true, channel });
    else
      res.json({
        status: false,
        message: "The requested item was not found in the database.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const pushHistory = async (req: CustomReq, res: Response) => {
  const { vid } = req.body;
  const { username } = req.user;

  let history = await historyModel.findOne({ username });
  if (!history) await historyModel.create({ username, history: [vid] });

  history = history?.history;

  const index = history.indexOf(vid);

  if (index > -1) {
    history.splice(index, 1);
  }

  history.push(vid);
  await historyModel.findOneAndUpdate({ username }, { history });
  res.status(200).json({ status: true });
};

// not tested
export const getHistory = async (req: CustomReq, res: Response) => {
  const { username } = req.user;
  let history = await historyModel.findOne({ username });
  history = history.history;
  console.log(history);

  // array of object ids of videos
  let arrOfObjHistory = history.map((id) => new mongoose.Types.ObjectId(id));

  // $in is used to find all the documents with the _id in the array
  const historyfeed = await videoModel.find({ _id: { $in: arrOfObjHistory } });
  res.status(200).json({ status: true, history: historyfeed });
};

export const myinfo = async (req: CustomReq, res: Response) => {
  const { username } = req.user;
  res.status(200).json({ status: true, username });
};
