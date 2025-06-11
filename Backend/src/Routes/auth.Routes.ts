import express from "express";
const authRouter = express.Router();
import { SigninController } from "../Controllers/auth.Controller";

authRouter.post("/signup", SigninController);

export default authRouter;
