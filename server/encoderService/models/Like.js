const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  videoId: {
    type: String,
    ref: "Video",
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

const likeModel = mongoose.model("likeCountModel", likeSchema);

module.exports = likeModel;
