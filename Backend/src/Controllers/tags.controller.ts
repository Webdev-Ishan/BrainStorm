import { Request, Response } from "express";
import tagModel from "../Models/tag.Model";

export const getalltags = async (req: Request, res: Response) => {
  try {
    let alltags = await tagModel.find();

    if (!alltags) {
      return res.status(403).json({
        success: false,
        message: "Unable to fetch all tags",
      });
    }

    return res.status(200).json({
      success: true,
      alltags,
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
