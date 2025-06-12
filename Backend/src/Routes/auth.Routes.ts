import express from "express";
const authRouter = express.Router();
import *as authController from '../Controllers/auth.Controller'
import { authUser } from "../Middleware/auth.middleware";

authRouter.post("/signup", authController.SignupController);
authRouter.post("/signin", authController.SigninController);
authRouter.get("/profile",authUser,authController.profileController);
authRouter.post("/logout",authUser,authController.logoutController)
export default authRouter;
