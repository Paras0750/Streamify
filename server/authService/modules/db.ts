import { connect } from "mongoose";

export default function db() {
  connect(process.env.MONGO_URI || "")
    .then((con) => console.log("Connected To Database"))
    .catch((e) => console.log(`Error: ${e}`));
}
