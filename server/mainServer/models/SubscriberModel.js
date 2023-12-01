const mongoose = require("mongoose");

const SubscriberSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  subscriber: [],
});

module.exports = mongoose.model("Subscriber", SubscriberSchema);
