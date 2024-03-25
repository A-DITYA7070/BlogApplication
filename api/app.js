import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config({
    path:"config/config.env"
});

// connecting to database..
import connectToDB from "./database/database.js";
connectToDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    express.urlencoded({
    extended: true, 
})
);

// importing routes.
import userRoutes from "./src/routes/user.routes.js";
import errorMiddleWare from "./src/middlewares/error.js";
import categoryRoutes from "./src/routes/category.routes.js";
import blogs from "./src/routes/blog.routes.js";

// using middlewares..
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/blog",blogs);



export default app;

app.use(errorMiddleWare);