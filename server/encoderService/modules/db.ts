import { connect } from "mongoose";

export default function db() {
  connect(process.env.MONGO_URI || "")
    .then((con) => console.log("Connected to Database"))
    .catch((err) => console.log(`Error: ${err}`));
};
