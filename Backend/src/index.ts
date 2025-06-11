import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connectToDb } from "./Config/DB";
import authRoutes from "./Routes/auth.Routes";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

(async function () {
  try {
    await connectToDb().then(() => {
      app.listen(3000,()=>{
        console.log("server is running on port", port)
      })
    });
  } catch (error) {
    console.error("Failed to connect to DB. Server not started.", error);
    process.exit(1);
  }
})();
