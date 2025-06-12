import contentModel from "../Models/content.Model";
import { Request, Response } from "express";
import { string, z } from "zod";
import userModel from "../Models/user.Model";
import tagModel from "../Models/tag.Model";
import mongoose from "mongoose";

const contentSchema = z.object({
  link: z.string(),
  type: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
});

export type finalcontent = z.infer<typeof contentSchema>;

export const addContent = async (req: Request, res: Response) => {
  const parsedbody = contentSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(411).json({
      success: false,
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }
  const { link, type, title, tags } = parsedbody.data;
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
    let uniqueTags = [...new Set(tags)];

    let newTags = uniqueTags.map((tag) => ({
      updateOne: {
        filter: { title: tag },
        update: { $setOnInsert: { title: tag } },
        upsert: true,
      },
    }));

    await tagModel.bulkWrite(newTags);

    const tagDocs = await tagModel.find({
      title: { $in: uniqueTags },
    });

    // Extract ObjectIds
    const tagIDs = tagDocs.map((tag) => tag._id);

    const content = new contentModel({
      link,
      title,
      tagID: tagIDs,
      type,
      userID: userid,
    });

    await content.save();

    await userModel.findByIdAndUpdate(
      user._id,
      { $push: { contents: content._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Content added in BrainStorm",
      content,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export const getContent = async (req: Request, res: Response) => {
  const id = req.user?.id;
  if (!id) {
    return res.status(403).json({
      success: false,
      message: "Id of the user not found",
    });
  }
  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not exist",
      });
    }

    let content = await contentModel.find({ userID: id });

    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Unable to fetch the content.",
      });
    }

    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Something wen wrong",
  });
};

export const getSpecificContent = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const contentid = req.params.id;
  if (!id || !contentid) {
    return res.status(403).json({
      success: false,
      message: "Id not found",
    });
  }
  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not exist",
      });
    }

    let content = await contentModel.findById(contentid);

    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Unable to fetch the content.",
      });
    }

    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  }

  return res.status(500).json({
    success: false,
    message: "Something wen wrong",
  });
};
