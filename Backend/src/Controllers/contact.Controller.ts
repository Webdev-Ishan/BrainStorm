import { z } from "zod";
import { Request, Response } from "express";
import transporter from "../Config/nodemailer.config";
import contactModel from "../Models/Contact.Model";
import userModel from "../Models/user.Model";

const contactSchema = z.object({
  Fullname: z.string().min(3).max(24),
  email: z.string(),
  Subject: z.string().min(3).max(36),
  Message: z.string().min(20).max(100),
});

export const Contact = async (req: Request, res: Response) => {
  const parsedbody = contactSchema.safeParse(req.body);
  if (!parsedbody.success) {
    return res.status(411).json({
      success: false,
      message: "Incorreect Inputs",
      error: parsedbody.error.flatten(),
    });
  }

  const { Fullname, email, Subject, Message } = parsedbody.data;

  try {
    const exist = await contactModel.findOne({ email: email });
    if (exist) {
      return res.status(403).json({
        success: false,
        message: "You have already submitted a request",
      });
    }

    const user = await userModel.findOne({ email: email });

    let contactinfo = new contactModel({
      Fullname,
      email,
      Subject,
      Message,
    });
    await contactinfo.save();

    const mailoptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Task is added to BrainStorm",
      text: `Contact request is Submitted to BrainStorm We will reach out to you soon.`,
    };

    await transporter.sendMail(mailoptions);

    if (user) {
      await userModel.findByIdAndUpdate(
        user._id,
        { $push: { contactRequest: contactinfo._id } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Response Submitted",
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
