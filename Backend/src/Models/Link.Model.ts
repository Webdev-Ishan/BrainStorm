import mongoose from "mongoose";
import { string } from "zod";

const linkSchema = new mongoose.Schema({
  link: {
    type: String,
    unique: true,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const LinkModel = mongoose.model("Link", linkSchema);
export default LinkModel;
