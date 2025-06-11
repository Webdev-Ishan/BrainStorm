import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connectToDb } from "./Config/DB.js";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working");
});

(async function () {
  try {
    await connectToDb();
    console.log("Server is running on port", port);
  } catch (error) {
    console.error("Failed to connect to DB. Server not started.", error);
    process.exit(1);
  }
})();
