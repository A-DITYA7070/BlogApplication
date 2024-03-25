import mongoose, {Schema} from "mongoose";


const blogSchema = new Schema({
    title:{
        type:String,
        required:[true,"Title of the blod is required "]
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        } 
    },
    content:{
        type:String,
        required:[true,"Enter the blog contents "],
        maxLength:[5000,"Blog content should not exceed 1000 characters "],
        minLength:[20,"Blog should be atleast 20 chars long "]
    },
    description:{
        type:String,
        required:[true,"Blog description is required "]
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"author is required "]
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:[true,"Category is required "]
    },
    likes:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]

},{
    timestamps:true
});


export const Blog = mongoose.model("Blog",blogSchema);
