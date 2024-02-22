import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  bio: {
    type: String,
  },
  displayPic: {
    type: String,
  },
  banner: {
    type: String,
  },
});

const channelModel = mongoose.model("channelModel", channelSchema);

module.exports = channelModel;

export default channelModel;