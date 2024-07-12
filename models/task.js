import {user} from "../models/user.js";
import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
   description:{
       type: String,
       required:true,
       
    },

    iscompleted:{
        type:Boolean,
      
       default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    createdat:{
            type:Date,
            default:Date.now,
        }
});


export const Task=mongoose.model("Task",userschema);
