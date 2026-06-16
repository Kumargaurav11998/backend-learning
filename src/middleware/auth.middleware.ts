import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type to include the verified user property
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const protectRoute = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      return;
    }

    // Extract token whether they used "Bearer <token>" or just "<token>"
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized: Invalid token format" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET environment variable is missing.");
      res.status(500).json({ success: false, message: "Internal server error" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, secret) as { userId: string; email: string };
    
    // Attach decoded user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};
