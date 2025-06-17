import express from "express";
import * as reviewController from "../Controllers/review.Controller";
import { authUser } from "../Middleware/auth.middleware";
const reviewRouter = express.Router();

reviewRouter.post("/", authUser, reviewController.makeReview);
reviewRouter.get("/",authUser, reviewController.getreview);
export default reviewRouter;
