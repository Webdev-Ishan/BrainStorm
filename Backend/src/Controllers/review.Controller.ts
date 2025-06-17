import { Request, Response } from "express";
import { z } from "zod";
import reviewModel from "../Models/review.Model";
import userModel from "../Models/user.Model";

const reviewSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export const makeReview = async (req: Request, res: Response) => {
  const parsedbody = reviewSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(411).json({
      success: false,
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }

  const { name, content } = parsedbody.data;

  const userid = req.user?.id;

  if (!userid) {
    return res.status(411).json({
      success: false,
      message: "Ids not found",
    });
  }

  try {
    let user = await userModel.findById(userid);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not exist",
      });
    }

    let review = new reviewModel({
      name,
      content,
      userID: user._id,
    });

    await review.save();
    if (!review) {
      return res.status(500).json({
        success: false,
        messsage: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(411).json({
        success: false,
        message: error.message,
      });
    }
  }

  return res.status(500).json({
    success: false,
    messsage: "Internal Server Error",
  });
};

export const getreview = async (req: Request, res: Response) => {
  const userid = req.user?.id;

  if (!userid) {
    return res.status(411).json({
      success: false,
      message: "Ids not found",
    });
  }

  try {
    const reviews = await reviewModel.find();

    if (!reviews) {
      return res.status(500).json({
        success: false,
        messsage: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(411).json({
        success: false,
        message: error.message,
      });
    }
  }
  return res.status(500).json({
    success: false,
    messsage: "Internal Server Error",
  });
};
