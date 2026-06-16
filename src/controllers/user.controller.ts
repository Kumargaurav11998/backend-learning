import type { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const getUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    
    // Fetch the user from the database and exclude the password field
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (error) {
    console.error("Error in getUser controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
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
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }

    // Save push token if provided
    if (token) {
      user.pushtoken = token;
      await user.save();
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET environment variable is missing.");
      res.status(500).json({ success: false, message: "Internal server error" });
      return;
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
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
