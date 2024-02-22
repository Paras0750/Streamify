import mongoose from "mongoose";

const SubscribedSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  subscribed: [],
});

export default mongoose.model("Subscribed", SubscribedSchema);
