const mongoose = require("mongoose");

module.exports = function db() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log("Connected To Database"))
    .catch((e) => console.log(`Error: ${e}`));
};
