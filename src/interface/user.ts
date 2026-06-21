import mongoose from "mongoose";

export interface UserInterface {
    _id:string,
    username:string,
    email:string   
    profilepic:string, 
    isactive:boolean;
}

export interface AccountInterface extends UserInterface {
     password:string,
}

export interface device {
     userId: mongoose.Types.ObjectId,
    pushtoken:string,
    os:string;
    devicename:string;   
   
    appversion:string;
    
}