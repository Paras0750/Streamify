const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  vidId: {
    require: true,
    type: String,
  },
  username: {
    require: true,
    type: String,
  },
  displayPic: {
    require: true,
    type: String,
  },
  actualComment: {
    require: true,
    type: String,
  },
});

const commentModel = mongoose.model("commentModel", commentSchema);

module.exports = commentModel;
