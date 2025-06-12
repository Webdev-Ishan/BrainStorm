import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
const tagModel = mongoose.model("Tag", tagSchema);
export default tagModel;
