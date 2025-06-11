import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Db is connected successfully");
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
