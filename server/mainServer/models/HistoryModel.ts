import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  history: [],
});

const historyModel = mongoose.model("HistoryModel", historySchema);

module.exports = historyModel;
export default historyModel;
