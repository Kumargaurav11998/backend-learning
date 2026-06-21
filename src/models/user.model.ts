import mongoose from "mongoose";
import { emailRegex, noSpaceRegex } from "../utils/regex";
import { AccountInterface } from "../interface/user";

const AccountSchema = new mongoose.Schema<AccountInterface>({
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
  profilepic:{
    type: String,
    required: false,
  },
  isactive:{
    type: Boolean,
    required: false,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model<AccountInterface>("User", AccountSchema);
