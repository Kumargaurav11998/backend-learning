import type { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { AccountInterface } from "../interface/account";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";

export const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email } = req.body;
  
  // Fetch the user from the database and exclude the password field
  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ success: true, message: "User found", data: user });
});

export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const userResponse = {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: userResponse,
  });
});

export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, password, pushtoken, os ,devicename,isactive,appversion } = req.body as AccountInterface;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  // Save push token if provided
  if (pushtoken) {
    user.pushtoken = pushtoken;
    await user.save();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET environment variable is missing.");
    throw new AppError("Internal server error", 500);
  }

  // Sign JWT token
  const tokenjwt = jwt.sign(
    { userId: user._id, email: user.email },
    secret
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      username: user.username,
      email: user.email,
      token: tokenjwt,
    },
  });
});
