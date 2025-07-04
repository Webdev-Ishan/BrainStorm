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
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // ✅ Attach user ID to request object
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

