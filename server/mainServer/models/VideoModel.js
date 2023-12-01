const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  vidId: {
    type: String,
    require: true
  },
  displayPic: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date()
  },
  m3u8: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  thumbnail: {
    type: String,
    require: true
  }
});

const videoModel = mongoose.model('videoModel', videoSchema);

module.exports = videoModel;