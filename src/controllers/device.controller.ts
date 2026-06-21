import { asyncHandler } from "../utils/asyncHandler";
import Device from "../models/device.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import type { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { AppError } from "../utils/appError";

export const getdevice = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userid = req.query.userid as string;
    console.log(userid);
    
    // Check if userid is present and is a valid MongoDB ObjectId
    if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
        throw new AppError("Invalid or missing user ID format", 400);
    }

    const device = await Device.find({ userId: userid });
    if (!device || device.length === 0) {
        throw new AppError("Device not found", 404);
    }
    res.status(200).json({ success: true, message: "Device found", data: device });
});