import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  subscriber: [],
});

export default mongoose.model("Subscriber", SubscriberSchema);
