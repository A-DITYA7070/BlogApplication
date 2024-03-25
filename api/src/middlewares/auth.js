import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"
import { User } from "../models/user.model.js"

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource ",401));
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decoded._id);
    next();
});

export const isAdmin = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.user?._id);
    if(!user){
        return next(new ErrorHandler("Please login to access this resource ",401));
    }
    if(user.role !== "admin"){
        return next(new ErrorHandler("Unauthorized ",401));
    }
    next();
})