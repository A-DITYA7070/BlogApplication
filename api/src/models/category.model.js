import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,"name of the category is required "]
    },
    description:{
        type:String,
        required:[true,"Description of the category is required "]
    },
    creatdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true
});

categorySchema.methods.isCategoryExists = async function(name){
    if(this.name !== name){
       return false;
    }else{
        return true;
    }
}

export const Category = mongoose.model("Category",categorySchema);