import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  // Log unexpected server errors
  if (statusCode === 500) {
    console.error("💥 Unexpected System Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
