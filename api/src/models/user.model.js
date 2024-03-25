import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name is required "]
    },
    email:{
        type:String,
        required:[true,"Please enter your email id "],
        unique:[true,"user already exists "]
    },
    password:{
        type:String,
        required:[true,"please enter your password !! "],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    bio:{
        type:String
    },
    role:{
        type:String,
        default:"User"
    }
},{
    timestamps:true
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

/**
 * model methods to check whether the password is correct or not 
*/
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.password,password);
}

userSchema.methods.getjwtToken = function(){
    return jwt.sign(
    {_id:this._id},
    process.env.JWT_SECRET,
    { expiresIn:"15d"},
  ).toString();
}


export const User = mongoose.model("User",userSchema);