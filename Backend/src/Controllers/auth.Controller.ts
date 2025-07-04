import userModel from "../Models/user.Model";
import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../Config/nodemailer.config";

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

    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account is registered",
      text: `Welcome to the BrainStorm , Your second Brain to complete and remember the tasks which you care.`,
    };

    await transporter.sendMail(mailoptions);

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

    return res.status(200).json({
      success: true,
      message: "Logged in SuccessFull",
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
    message: "Internal Server Error",
  });
};

export const profileController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({
      success: false,
      message: "Login first please",
      value: req.body.userid,
    });
  }

  try {
    let user = await userModel.findById(userId).populate("contents", "link title type" )
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
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
    message: "Internal Server Error",
  });
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Log out",
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
    message: "Internal Server Error",
  });
};

export const updateController = async (req: Request, res: Response) => {
  const userid = req.user?.id;
  if (!userid) {
    return res.status(403).json({
      succes: false,
      message: "User id is not found",
    });
  }

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
    let exist = await userModel.findById(userid);
    if (!exist) {
      return res.status(403).json({
        success: false,
        message: "User do not exist",
      });
    }

    let verifyPassword = await bcrypt.compare(password, exist.password);

    if (exist.username != username) {
      exist.username = username;
    }

    if (exist.email != email) {
      exist.email = email;
    }

    if (!verifyPassword) {
      let salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(password, salt);
      exist.password = hashed;
    }

    await exist.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated",
      exist,
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
    message: "Internal Server Error",
  });
};
