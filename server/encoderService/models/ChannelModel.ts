import { Schema, model } from "mongoose";

const channelSchema = new Schema({
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

const channelModel = model("channelModel", channelSchema);

export default channelModel;
