
import express from "express";
import { 
    createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory
} from "../controllers/category.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.route("/create-category").post(isAuthenticated,isAdmin,createCategory);
router.route("/categories").get(isAuthenticated,getAllCategories);
router.route("/category/:id").get(isAuthenticated,getCategoryById)
                             .patch(isAuthenticated,isAdmin,updateCategory)
                             .delete(isAuthenticated,isAdmin,deleteCategory);




export default router;