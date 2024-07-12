
import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
       type: String,
       required:true,
       unique:true,
    },

    password:{
        type:String,
        required:true,
        select:false,
    },
    createdat:{
            type:Date,
            default:Date.now,
        }
});


export const user=mongoose.model("user",userschema);
