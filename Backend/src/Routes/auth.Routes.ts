import express from "express";
const authRouter = express.Router();
import *as authController from '../Controllers/auth.Controller'
import { authUser } from "../Middleware/auth.middleware";

authRouter.post("/signup", authController.SignupController);
authRouter.post("/signin",authUser, authController.SigninController);
authRouter.get("/profile",authUser,authController.profileController)
export default authRouter;
