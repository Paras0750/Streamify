const mongoose = require("mongoose");
const channelModel = require("../models/ChannelModel");
const likedModel = require("../models/likedModel");
const historyModel = require("../models/historyModel");
const videoModel = require("../models/videoModel");

module.exports.createChannel = async (req, res) => {
  const { userName, bio } = req.body;

  try {
    console.log("Auth: ", req.user);
    console.log("Recieved: ", req.body);
    console.log("Recieved: ", req.body.userName);

    const newChannel = new channelModel({
      username: userName,
      bio: bio,
      displayPic: req.files.displayPic[0].path,
      banner: req.files.bannerImage[0].path,
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

module.exports.getChannel = async (req, res) => {
  try {
    const { username } = req.body;
    console.log("Recieved: ", req.body);

    const channel = await channelModel.findOne({ username });
    if (channel) res.status(200).json({ status: true, channel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.pushHistory = async (req, res) => {
  const { vid } = req.body;
  const { username } = req.user;

  let history = await historyModel.findOne({ username });
  history = history.history;

  const index = history.indexOf(vid);

  if (index > -1) {
    history.splice(index, 1);
  }

  history.push(vid);
  await historyModel.findOneAndUpdate({ username }, { history });
  res.status(200).json({ status: true });
};

// not tested
module.exports.getHistory = async (req, res) => {
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

module.exports.myinfo = (req, res) => {
  const { username } = req.user;
  res.status(200).json({ status: true, username });
};
