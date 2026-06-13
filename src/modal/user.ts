import mongoose from "mongoose";
import { UserInterface } from "../interface/user.ts";
import { emailRegex, noSpaceRegex } from "../utils/regex.ts";

const userSchema = new mongoose.Schema<UserInterface>({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: [noSpaceRegex, "Username cannot contain spaces"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:[emailRegex,"Invalid Email"]
    },
    password:{
        type:String,
        required:true,
    },
    pushtoken:{
        type:String,
        required:false,
    },
    
})
export default mongoose.model("User",userSchema,);