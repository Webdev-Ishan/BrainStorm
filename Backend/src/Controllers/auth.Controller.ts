import userModel from "../Models/user.Model";
import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userprofileSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(20),
  email: z.string().email().max(36),
});

const userloginSchema = z.object({
  password: z.string().min(8).max(20),
  email: z.string().email().max(36),
});

const secret: string = process.env.JWT_SECRET!;

export type FinalSchema = z.infer<typeof userprofileSchema>;
export type LoginSchema = z.infer<typeof userloginSchema>;

export const SignupController = async (req: Request, res: Response) => {
  const parsedbody = userprofileSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(411).json({
      success: false,
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }
  const { username, password, email } = parsedbody.data;

  try {
    let exist = await userModel.findOne({ email: email });
    if (exist) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new userModel({
      username: username,
      password: hashedPassword,
      email: email,
    });

    await user.save();

    let token = jwt.sign({ id: user._id.toString() }, secret, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Validation successfull",
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Unknown error",
  });
};

export const SigninController = async (req: Request, res: Response) => {
  const parsedbody = userloginSchema.safeParse(req.body);
  if (!parsedbody.success) {
    return res.status(403).json({
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }
  const { email, password } = parsedbody.data;

  try {
    let exist = await userModel.findOne({ email: email });
    if (!exist) {
      return res.status(403).json({
        message: "User not found",
        success: false,
      });
    }

    let verifyPassword = await bcrypt.compare(password, exist.password);

    if (!verifyPassword) {
      return res.status(403).json({
        message: "Email or Password is wrong....",
        success: false,
      });
    }

    let token = jwt.sign({ id: exist._id }, secret, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      secure: true,
      sameSite: "none",
    });

    return res.status(200).send(exist);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
