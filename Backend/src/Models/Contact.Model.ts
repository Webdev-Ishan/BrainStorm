import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  Subject: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
});

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
