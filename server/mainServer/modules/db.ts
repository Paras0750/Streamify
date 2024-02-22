import mongoose from "mongoose";

export default function db(): void {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("Connected to Database"))
    .catch((err: Error) => console.log(`Error: ${err}`));
}
