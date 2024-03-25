import { isAuthenticated } from "../middlewares/auth.js";
import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../models/user.model.js"
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import datauri from "../utils/dataUri.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

/**
 * Controller function to register user 
 */
export const registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password,bio} = req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("Please enter all fields ",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exists ",401));
    }

    // const file=req.file;
    // const fileUri=datauri(file);
    // const mycloud=await cloudinary.v2.uploader.upload(fileUri.content);

    user = await User.create({
        name,
        email,
        password,
        bio,
        avatar:{
            public_id:"dummy url",
            url:"dummy url",
        }
    });
    sendToken(res,user,"Registered succesfully ",201);
});

/**
 * Controller function to login 
 */
export const login = catchAsyncError(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email && !password){
        return next(new ErrorHandler("Please enter all credentials ",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid credentials ",400));
    }
    const isPasswordCorrect = user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        return next(new ErrorHandler("Invalid credentials ",400));
    }
    sendToken(res,user,`Welcome Back ${user.name} `,200);
});

/**
 * Controller function to logout 
 */
export const logout = catchAsyncError(async(req,res,next) => {
    const options = {
        secure:true,
        httpOnly:true,
        expires:new Date(Date.now()),
        sameSite:"none"
    }
    res.status(200)
    .cookie("token",null,options)
    .json({
        success:true,
        message:"Logged out successfully !! "
    });
})

export const changePassword = catchAsyncError(async(req,res,next) => {
    const {oldPassword,newPassword} = req.body;
    if(!oldPassword && !newPassword){
        return next(new ErrorHandler("Enter all the fields ",400));
    }
    let user = await User.findById(req.user._id).select("+password");
    const isMatch = user.isPasswordCorrect(oldPassword);
    if(!isMatch){
        return next(new ErrorHandler("Wrong password ",401));
    }
    user.password = newPassword;
    await user.save();
    res.status(200)
    .json({
        success:true,
        message:"Password updated successfully !! "
    })
})



