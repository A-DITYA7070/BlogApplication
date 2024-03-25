import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {Blog} from "../models/blog.model.js";
import { Category } from "../models/category.model.js";
import ErrorHandler from "../utils/errorHandler.js";


/**
 * Controller function to create blog
 */
export const createBlog = catchAsyncError(async(req,res,next) => {
    const {
        title,
        description,
        content,
        category
    } = req.body;

    if(!title || !description || !content || !category){
        return next(new ErrorHandler("Please enter all fields ",400));
    }

    const isExists = await Category.findById(category);
    if(!isExists){
        return next(new ErrorHandler("Please select a valid category ",400))
    }

    const author = req.user?._id;

    const blogs = await Blog.create({
        title,
        content,
        description,
        author,
        category,
        image:{
            public_id:"dummy url",
            url:"dummy url",
        }
    });

    res.status(201).json({
        success:true,
        blogs
    })

});

/**
 * Controller function to get all blogs 
 */
export const getAllBlogs = catchAsyncError(async(req,res,next) => {
    const blogs = await Blog.find({});
    res.status(200)
    .json({
        success:true,
        blogs
    })
});

/**
 * controller function to get single blog.
 */
export const getBlog = catchAsyncError(async(req,res,next) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        return next(new ErrorHandler("Not found",404));
    }
    res.status(200)
    .json({
        success:true,
        blog
    })
});

/**
 * Controller function to update the blog.
 */
export const updateBlog = catchAsyncError(async(req,res,next) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        return next(new ErrorHandler("Not found ",404));
    }
    const {title,description,content} = req.body;
    if(!title && !description && !content){
        return next(new ErrorHandler("Enter atleast one field to update ",400));
    }

    const author = req.user?._id;
    const role = req.user?.role;
    if(author !== blog.author && role !== "admin"){
        return next(new ErrorHandler("Unauthorized ",401));
    }

    if(title){
        blog.title=title;
    }
    if(description){
        blog.description=description;
    }
    if(content){
        blog.content=content;
    }
    await blog.save();
    res.status(200)
    .json({
        success:true,
        message:"Blog updated successfully !! "
    });
});

/**
 * Controller function to delete the blog 
 * To prevent privelage escalation it should be only deleted by the author as well as admin.
 */
export const deleteBlog = catchAsyncError(async(req,res,next)=>{
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        return next(new ErrorHandler("Not found",404));
    }
    const author = req.user?._id;
    const role = req.user?.role;
    if(author !== blog.author && role !== "admin"){
        return next(new ErrorHandler("Unauthorized ",401));
    }
    await blog.deleteOne();
    res.status(200).json({
        success:true,
        message:"Blog deleted successfully !! "
    });
})