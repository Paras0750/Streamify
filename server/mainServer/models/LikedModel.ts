import mongoose from "mongoose";

const likedSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  liked: [],
});

const likedModel = mongoose.model("LikedVideosModel", likedSchema);

module.exports = likedModel;
export default likedModel;
