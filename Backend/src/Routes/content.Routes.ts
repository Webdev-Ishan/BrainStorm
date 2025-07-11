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
contentRouter.get(
  "/Braincontent/:neuron",
  contentController.getContentviaLink
);
contentRouter.delete("/content/:id", authUser, contentController.deleteContent);
contentRouter.put("/updateInfo/:id",authUser,contentController.UpdateController);
contentRouter.post("/search",authUser,contentController.Search);
export default contentRouter;
