// const { getVideoFeed, getVideo, likevideo, getLikeCount, unlikevideo, isLiked, comment, getComments, getChannelFeed, getPublicFeed } = require('../controllers/videoController');

const LikedModel = require("../models/likedModel");
const SubscribedModel = require("../models/subscribedModel");
const videoModel = require("../models/videoModel");
const Like = require("../models/likeModel");
const commentModel = require("../models/CommentModel");
const channelModel = require("../models/ChannelModel");

module.exports.getVideoFeed = async (req, res) => {
  const { username } = req.user;

  const subscribed = await SubscribedModel.find({ username });
  subscribed = subscribed.subscribed;

  const feed = await videoModel.find({ username: { $in: subscribed } });

  if (feed.length > 0) res.status(200).json({ status: true, feed });
  else res.status(400).json({ status: false, msg: "Failed to get feed" });
};

module.exports.getVideo = async (req, res) => {
  const { vidID } = req.body;
  const video = await videoModel.findOne({ vidId: vidID });
  // console.log("videoID: ", vidID);
  // console.log("video: ", video);
  video
    ? res.status(200).json({ status: true, video })
    : res.status(400).json({ status: false, msg: "Failed to get video" });
};

module.exports.likevideo = async (req, res) => {
  try {
    const { vid } = req.body;
    const { username } = req.user;

    // Check if the video is already liked
    const userLikedVideos = await LikedModel.findOne({ username });
    if (userLikedVideos && userLikedVideos.liked.includes(vid)) {
      return res
        .status(400)
        .json({ status: false, msg: "Video Already Liked" });
    }

    // Add video to user's liked videos
    await LikedModel.findOneAndUpdate(
      { username },
      { $addToSet: { liked: vid } }, // Use $addToSet to add unique values to the array
      { upsert: true } // Create a new document if it doesn't exist
    );

    // Increase the like count for the video
    const updatedLike = await Like.findOneAndUpdate(
      { vid },
      { $inc: { like: 1 } }, // Increment the like count by 1
      { new: true, upsert: true } // Return the modified document and create a new one if it doesn't exist
    );

    res.status(200).json({ status: true, like: updatedLike.like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: "Failed to update like count" });
  }
};

module.exports.getLikeCount = async (req, res) => {};

module.exports.unlikevideo = async (req, res) => {};

module.exports.isLiked = async (req, res) => {};

module.exports.comment = async (req, res) => {
  const { vidId, actualComment } = req.body;
  const { username } = req.user;
  console.log("Comment: ", vidId, actualComment, username);
  try {
    console.log("User", req.user);

    // Use await to get the result from the findOne method
    const channelData = await channelModel.findOne({ username: username });
    console.log("channelData", channelData);

    // Check if channelData is not null before accessing its properties
    const displayPic = channelData ? channelData.displayPic : null;
    console.log("displayPic", displayPic);

    console.log("Details: ", vidId, username, displayPic, actualComment);
    const newComment = new commentModel({
      vidId,
      username,
      displayPic,
      actualComment,
    });
    console.log(newComment);
    const result = await newComment.save();

    if (result) {
      res.status(200).json({ response: "Comment Updated!" });
    } else {
      res.status(401).json({ response: "Comment Update Failed!" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "Internal Server Error" });
  }
};

module.exports.getComments = async (req, res) => {
  const { vidId } = req.body;
  // console.log("VideoID: getComments: ", vidId, req.body);

  const result = await commentModel.find({ vidId: vidId });
  // console.log(result);

  if (result) {
    res.status(200).json({ status: true, comments: result });
  } else {
    res.status(400).json({ status: false, err: "Error Occured" });
  }
};

module.exports.getChannelFeed = async (req, res) => {};

module.exports.getPublicFeed = async (req, res) => {
  const feed = await videoModel
    .find()
    .sort({ date: -1 }) //  sort by date in descending order (latest videos first)
    .limit(10);

  feed
    ? res.status(200).json({ status: true, feed })
    : res.status(400).json({ status: false, msg: "Failed to get feed" });
};
