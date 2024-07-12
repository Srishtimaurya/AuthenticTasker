

import {Task} from "../models/task.js";
import {user} from "../models/user.js";
import {isauthenticated} from "../middlewares/auth.js";
import errorhandler from "../middlewares/error.js";



// jisme bhi async function hai usme hum try catch krenge error handling ke liye
export const newtask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
   // const userId = req.usr._id; // Assuming req.usr contains the user object
    await Task.create({
        title,
        description,
        user:  req.usr, // Assigning the user's ID to the task
    });
    res.status(201).json({
        success: true,
        message: "task added successfully"
    });
    } catch (error) {
        next(error);
    }
}

export const getmytask=async(req,res,next)=>{
    try {
        const userid = req.usr._id;
    
    const tasks=await Task.find({user:userid});
    //above both line finds all tasks associated with a specific user based on the user's ID extracted from the request object.
    res.status(200).json({
        success: true,
       tasks
    });
    } catch (error) {
        next(error);
    }
}



export const updatetask=async(req,res,next)=>{
    try {
        const task_id = req.params.id;
    const tasks=await Task.findById(task_id); // mtlb ye us id ka task de dega
    // finds a single task based on the task's ID provided as a route parameter in the URL.

    if(!tasks) return next(new errorhandler("invalid id",404));

tasks.iscompleted=!tasks.iscompleted;
await tasks.save();
    res.status(200).json({
        success: true,
       message:"task updated"
    });
    } catch (error) {
        next(error);
    }
}




export const deletetask=async(req,res,next)=>{
   try {
    const task_id = req.params.id;
    const tasks=await Task.findById(task_id);

    if(!tasks) return  next(new errorhandler("invalid id",404));
       
       
    
    await tasks.deleteOne()
    res.status(200).json({
        success: true,
       message:"deleted task"
    });
   } catch (error) {
    next(error);
   }
}