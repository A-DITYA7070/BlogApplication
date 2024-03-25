import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
     createBlog, 
     deleteBlog, 
     getAllBlogs, 
     getBlog, 
     updateBlog
} from "../controllers/blog.controllers.js";

const router = express.Router();


router.route("/new").post(isAuthenticated,createBlog);
router.route("/blogs").get(isAuthenticated,getAllBlogs);
router.route("/:id").get(isAuthenticated,getBlog);
router.route("/:id").patch(isAuthenticated,updateBlog);
router.route("/:id").delete(isAuthenticated,deleteBlog);



export default router;