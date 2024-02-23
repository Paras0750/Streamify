import { Schema, model } from "mongoose";

const videoSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  displayPic: {
    type: String,
  },
  vidId: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: () => Date(),
  },
  m3u8: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
});

const videoModel = model("videoModel", videoSchema);

export default videoModel;
