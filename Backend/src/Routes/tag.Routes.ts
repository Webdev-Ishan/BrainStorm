import express from "express";
import * as tagController from "../Controllers/tags.controller";
const tagRouter = express.Router();

tagRouter.get("/alltags", tagController.getalltags);

export default tagRouter;