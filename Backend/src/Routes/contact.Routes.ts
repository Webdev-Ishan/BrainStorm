import express from "express";
import * as contactController from "../Controllers/contact.Controller";
const contactRouter = express.Router();

contactRouter.post("/request", contactController.Contact);

export default contactRouter;
