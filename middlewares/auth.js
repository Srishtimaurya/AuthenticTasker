
import {user} from "../models/user.js";
// FRONTEND_URL=http://localhost:5173

import jwt from "jsonwebtoken"
export const isauthenticated=async(req,res,next)=>{

   
    const {token}=req.cookies;

    if(!token)
     return res.status(404).json({
    success:false,
    message:"login first",
   });

   const decoded=jwt.verify(token,process.env.JWT_SECRET); // here we are taking our decoded data
   req.usr=await user.findById(decoded._id);  // from decoded data we are accessing our id
        next();
}