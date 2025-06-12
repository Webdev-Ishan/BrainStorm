import mongoose from "mongoose";
const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tagID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const contentModel = mongoose.model("Content", contentSchema);

export default contentModel;
