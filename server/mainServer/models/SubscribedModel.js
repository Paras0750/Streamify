const mongoose = require("mongoose");

const SubscribedSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  subscribed: [],
});

module.exports = mongoose.model("Subscribed", SubscribedSchema);
