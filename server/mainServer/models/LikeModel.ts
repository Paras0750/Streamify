import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  vid: {
    type: String,
    require: true,
  },
  like: {
    type: Number,
  },
});

export default mongoose.model("LikeModel", likeSchema);
