import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connectToDb } from "./Config/DB";
import authRoutes from "./Routes/auth.Routes";
import contentRoutes from "./Routes/content.Routes";
import tagRoutes from "./Routes/tag.Routes";
import contactRoutes from "./Routes/contact.Routes";
import reviewRoutes from "./Routes/review.Routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = process.env.PORT || 3000;

app.set("trust proxy", 1); 
app.use(
  cors({
    origin: "https://www.brainstormideas.xyz", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", contentRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/review", reviewRoutes);

(async function () {
  try {
    await connectToDb().then(() => {
      app.listen(3000, () => {
        console.log("server is running on port", port);
      });
    });
  } catch (error) {
    console.error("Failed to connect to DB. Server not started.", error);
    process.exit(1);
  }
})();
