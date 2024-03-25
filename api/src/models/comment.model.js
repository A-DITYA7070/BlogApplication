import mongoose,{Schema} from "mongoose";


const commentSchema = new Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    },
    content:{
        type:String,
        required:[true,"Please enter the contents of comment "]
    }
},{
    timestamps:true
});

export default Comment = mongoose.model("Comment",commentSchema);
