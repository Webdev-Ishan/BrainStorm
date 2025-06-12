import express from "express";
import { authUser } from "../Middleware/auth.middleware";
import * as contentController from "../Controllers/content.Controller";
const contentRouter = express.Router();

contentRouter.post("/content", authUser, contentController.addContent);
contentRouter.get("/content", authUser, contentController.getContent);
contentRouter.get(
  "/content/:id",
  authUser,
  contentController.getSpecificContent
);
contentRouter.delete("/content/:id", authUser, contentController.deleteContent);

export default contentRouter;
