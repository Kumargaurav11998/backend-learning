import type { Request, Response } from "express-serve-static-core";
import User from "./modal/user.ts";
 export const resgister =async(req:Request,res:Response)=>{
try{
const {username,email,password}=req.body;
const user = await User.create({username,email,password});
res.status(201).json({status:true, message:"Accont created successfully"})

}catch(error){
     if (error instanceof Error) {
        res.status(400).json({status: false, message: error.message})
    } else {
        res.status(500).json({status: false, message: "An unknown error occurred"})
    }
}

 }

 export const updateUser = async(req:Request,res:Response)=>{
     const {username,email,password}=req.body;
     
 }

