import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 10,
    min: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 20,
    min: 8,
  },
  email: {
    type: String,
    required: true,
    max: 36,
    unique: true,
  },
  contactRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
