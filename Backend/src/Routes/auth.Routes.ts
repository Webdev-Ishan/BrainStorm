import express from "express";
const authRouter = express.Router();
import *as authController from '../Controllers/auth.Controller'

authRouter.post("/signup", authController.SignupController);
authRouter.post("/signin", authController.SigninController);
export default authRouter;
