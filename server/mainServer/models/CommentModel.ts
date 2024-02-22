import mongoose from "mongoose";

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

export default mongoose.model("commentModel", commentSchema);
