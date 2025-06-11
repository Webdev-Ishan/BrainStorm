import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
      console.log("Db connected successfully");
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
