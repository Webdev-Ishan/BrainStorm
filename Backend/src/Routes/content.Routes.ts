import express from "express";
import { authUser } from "../Middleware/auth.middleware";
import * as contentController from "../Controllers/content.Controller";
const contentRouter = express.Router();

contentRouter.post("/content", authUser, contentController.addContent);

export default contentRouter;
