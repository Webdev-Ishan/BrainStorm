import express from "express";
import * as reviewController from "../Controllers/review.Controller";
const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.makeReview);

export default reviewRouter;
