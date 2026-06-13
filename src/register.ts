import type { Request, Response } from 'express-serve-static-core';
export const postRegister=(req:Request,res:Response)=>{
    console.log("Register endpoint hit",req.body);
    const {username,password}= req.body;
    console.log("Register endpoint hit ::",username,password);
res.status(201).json({success:true,message:"User registered successfully"});
}