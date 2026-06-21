import mongoose from "mongoose";
import { device } from "../interface/user";

 const deviceSchema = new mongoose.Schema<device>({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
    pushtoken: {
        type: String,
        required: true,
        unique: true,
    },
    os:{
        type: String,
        required: true,
    },
    devicename:{
        type: String,
        required: true,
    },
    appversion:{
        type: String,
        required: true,
    },
},{
    timestamps: true
});

export default mongoose.model<device>("Device", deviceSchema);