const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  dp: {
    type: String,
  },
  bio: {
    type: String,
  },
  banner: {
    type: String,
  },
});

const channelModel = mongoose.model("channelModel", channelSchema);

module.exports = channelModel;
