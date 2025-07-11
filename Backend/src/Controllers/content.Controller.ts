import contentModel from "../Models/content.Model";
import { Request, Response } from "express";
import { z } from "zod";
import userModel from "../Models/user.Model";
import tagModel from "../Models/tag.Model";
import LinkModel from "../Models/Link.Model";
import generateShortLink from "../Utils/hashGenerator";
import transporter from "../Config/nodemailer.config";

const contentSchema = z.object({
  link: z.string(),
  type: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
});

const updationSchema = z.object({
  link: z.string(),
  type: z.string(),
  title: z.string(),
});

const searchSchema = z.object({
  query: z.string(),
});

export type finalcontent = z.infer<typeof contentSchema>;

export const addContent = async (req: Request, res: Response) => {
  const parsedbody = contentSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(403).json({
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

    let existContent = await contentModel.findOne({ link: link });
    if (existContent) {
      return res.status(400).json({
        success: true,
        message: "This content alraedy exist in your brain",
        existContent,
      });
    }

    let convertedURL = generateShortLink(link);

    let share = new LinkModel({
      link: convertedURL,
      userID: user._id,
    });

    await share.save();

    const content = new contentModel({
      link,
      title,
      tagID: tagIDs,
      type,
      sharable: share._id,
      userID: userid,
    });

    await content.save();

    await userModel.findByIdAndUpdate(
      user._id,
      { $push: { contents: content._id } },
      { new: true }
    );

    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Task is added to BrainStorm",
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: 'Segoe UI', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 32px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px; color: #333333;">Your OTP Code</h2>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 16px;">
                <p style="margin: 0; font-size: 16px; color: #555555;">Use the code below to complete your login:</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 24px 0;">
                <div style="display: inline-block; font-size: 28px; letter-spacing: 12px; font-weight: bold; background: #f0f0f0; padding: 12px 24px; border-radius: 8px; color: #000000;">
                  ${content.sharable}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 16px;">
                <p style="margin: 0; font-size: 14px; color: #888888;">This code will expire in 10 minutes.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 32px;">
                <p style="margin: 0; font-size: 12px; color: #bbbbbb;">
                  If you didn’t request this, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 24px;">
                <p style="margin: 0; font-size: 14px; color: #333333;"><strong>Transactify Team</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    await transporter.sendMail(mailoptions);

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

    let content = await contentModel
      .findById(contentid)
      .populate("userID", "username");

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

export const deleteContent = async (req: Request, res: Response) => {
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
        message: "content do not exist .",
      });
    }

    if (content.userID?.toString() != id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this content.",
      });
    }

    await contentModel.findByIdAndDelete(content._id);

    await userModel.findByIdAndUpdate(
      user._id,
      { $pull: { contents: content._id } },
      { new: true }
    );

    await LinkModel.findByIdAndDelete(content.sharable);

    return res.status(200).json({
      success: true,
      message: "Content Deleted Successfully.",
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

export const UpdateController = async (req: Request, res: Response) => {
  const userid = req.user?.id;
  const contentid = req.params.id;

  if (!userid || !contentid) {
    return res.status(403).json({
      success: false,
      message: "ids not found",
    });
  }

  const parsedbody = updationSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(411).json({
      success: false,
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }
  const { link, type, title } = parsedbody.data;

  try {
    let exist = await userModel.findById(userid);
    if (!exist) {
      return res.status(403).json({
        success: false,
        message: "User  not found",
      });
    }

    let content = await contentModel.findById(contentid);
    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Content not found",
      });
    }

    if (content.userID?.toString() != userid) {
      return res.status(409).json({
        success: false,
        message: "You can not update this content",
      });
    }

    if (content.link != link) {
      content.link = link;
    }

    if (content.type != type) {
      content.type = type;
    }

    if (content.title != title) {
      content.title = title;
    }

    await content.save();

    return res.status(200).json({
      success: true,
      message: "Content of this is updated successfully",
      content,
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

export const getContentviaLink = async (req: Request, res: Response) => {
  const neuron = req.params.neuron;
  if (!neuron) {
    return res.status(403).json({
      success: false,
      message: "Link is not found",
    });
  }

  try {
    let content = await contentModel
      .findOne({ sharable: neuron })
      .populate("userID", "username");

    if (!content) {
      return res.status(403).json({
        success: false,
        message: "Content is not found",
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
        error: error,
      });
    }
  }
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export const Search = async (req: Request, res: Response) => {
  const parsedbody = searchSchema.safeParse(req.body);

  if (!parsedbody.success) {
    return res.status(403).json({
      success: false,
      message: "Input fields are incorrect",
      errors: parsedbody.error.flatten(),
    });
  }
  const { query } = parsedbody.data;

  const userid = req.user?.id;

  if (!userid) {
    return res.status(403).json({
      success: false,
      message: "id not found",
    });
  }

  try {
    let exist = await userModel.findById(userid);
    if (!exist) {
      return res.status(403).json({
        success: false,
        message: "User  not found",
      });
    }

    const searchresult = await contentModel.aggregate([
      {
        $search: {
          index: "searchIndex",
          text: {
            query: query,
            path: "title",
            fuzzy: {},
          },
        },
      },

      {
        $limit: 10,
      },
    ]);

    if (!searchresult) {
      return res.status(403).json({
        success: false,
        message: "Not able to search",
      });
    }

    return res.status(200).json({
      success: true,
      query,
      searchresult,
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
