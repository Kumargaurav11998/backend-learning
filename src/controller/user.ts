import type { Request, Response } from "express";
import User from "../modal/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email }).select("-password");

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      return;
    }

    // Safely extract token whether they used "Bearer " or not
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized: Invalid token format" });
      return;
    }

    const tokenjwt = jwt.verify(token, process.env.JWT_SECRET!);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (e) {
    console.log(e)
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json({
          success: false,
          message: "User with this email already exists",
        });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user1 = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userResponse = {
      _id: user1._id,
      username: user1.username,
      email: user1.email,
    };

    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: userResponse,
      });
  } catch (e) {
    console.log("Error in register:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
interface IlogBody {
  email: string;
  password: string;
  token?: string;
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, token } = req.body as IlogBody;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }
    if (token) {
      user.pushtoken = token;
      await user.save();
    }

    const tokenjwt = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: { username: user.username, email: user.email, token: tokenjwt },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
