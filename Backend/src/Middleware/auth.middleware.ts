import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;
interface JwtPayload {
  id: string;
}

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    return res.status(403).json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    let decoded = jwt.verify(req.cookies.token, secret) as JwtPayload;

    if (decoded.id) {
      req.user = { id: decoded.id };
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }
};
