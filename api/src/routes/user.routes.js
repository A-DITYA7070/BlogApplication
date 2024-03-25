import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 
    login,
    logout,
    registerUser
} from "../controllers/user.controllers.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();


router.route("/register").post(singleUpload,registerUser);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);


export default router;