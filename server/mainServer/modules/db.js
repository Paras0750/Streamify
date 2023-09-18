const mongoose = require("mongoose");

module.exports = function db() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log("Connected to Database"))
    .catch((err) => console.log(`Error: ${err}`));
};
