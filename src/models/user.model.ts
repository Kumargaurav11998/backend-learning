import mongoose from "mongoose";
import { UserInterface } from "../interface/user";
import { emailRegex, noSpaceRegex } from "../utils/regex";

const userSchema = new mongoose.Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [noSpaceRegex, "Username cannot contain spaces"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [emailRegex, "Invalid Email"]
  },
  password: {
    type: String,
    required: true,
  },
  pushtoken: {
    type: String,
    required: false,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model<UserInterface>("User", userSchema);
