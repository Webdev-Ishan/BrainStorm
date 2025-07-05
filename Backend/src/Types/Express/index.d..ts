// types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken"; // optional

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
      body: {
        Userid?: string;
        [key: string]: any; // allow more dynamic fields if needed
      };
    }
  }
}


