import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
