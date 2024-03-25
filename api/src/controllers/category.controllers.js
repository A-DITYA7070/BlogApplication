import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {Category} from "../models/category.model.js";
import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";



export const createCategory = catchAsyncError(async(req,res,next) => {
    const {name,description} =req.body;
    if(!name && !description){
        return next(new ErrorHandler("Enter all the required fields ",400));
    }
    const user = await User.findById(req.user?._id);
    const newName = name.toLowerCase();
    let category = await Category.findOne({name:newName});
    if(category){
       return next(new ErrorHandler("Category already exits ",400));
    }
    category = await Category.create({
        name:newName,
        description,
        creatdBy:user?.id
    });
    res.status(200)
    .json({
        success:true,
        category,
        message:"created successfully !! "
    })
});


export const getAllCategories = catchAsyncError(async(req,res,next)=>{
    const category = await Category.find({});
    res.status(200)
    .json({
        category,
        message:"Fetched successfully !! "
    })
});

export const getCategoryById = catchAsyncError(async(req,res,next) => {
    const id = req.params.id;
    if(!id)return next(new ErrorHandler("Bad request ",400));
    const category = await Category.findById(id);
    if(!category){
        return next(new ErrorHandler("Not found ",404));
    }
    res.status(200)
    .json({
        success:true,
        category
    })
})

/**
 * Controller function to update category by admin.
 */
export const updateCategory = catchAsyncError(async(req,res,next) => {
    const id = req.params.id;
    const {name,description} = req.body;
    if(!id){
        return next(new ErrorHandler("Bad request ",400));
    }
    if(!name && !description){
        return next(new ErrorHandler("Please enter atleast one field to update",400));
    }

    const newName = name.toLowerCase();
    const isMatch = await Category.findOne({name:newName});

    if(isMatch){
        return next(new ErrorHandler("Name already exists ",400));
    }

    const category = await Category.findById(id);

    if(!category){
        return next(new ErrorHandler("Not found ",400));
    }
   
    if(name){
        category.name = name;
    }
    if(description){
        category.description = description;
    }
    await category.save();
    
    res.status(200).json({
        success:true,
        message:"Details updated successfully !! "
    })
});


export const deleteCategory = catchAsyncError(async(req,res,next) => {
    const id = req.params.id;
    if(!id)return next(new ErrorHandler("Bad request ",400));
    const category = await Category.findById(id);
    if(!category){
        return next(new ErrorHandler("Not found",404));
    }
    await category.deleteOne();
    res.status(200)
    .json({
        success:true,
        message:"Category deleted successfully !! "
    })
})
