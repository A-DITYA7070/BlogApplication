import app from "./app.js";
import cloudinary from "cloudinary";

// connecting to server..


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_APIKEY,
    api_secret:process.env.CLOUDINARY_CLIENT_APISECRET
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})


