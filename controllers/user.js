
import {user} from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import errorhandler  from "../middlewares/error.js";
import { sendcookie } from "../utils/features.js";
export const getallusers= async(req,res)=>{
    // const users=await user.find({});
    // const keywrd=req.query.keyword  // ye basically query hota h ,jb bhi hme loi data url ke through bhejna ho
    // console.log(keywrd)
    // res.json({
    //     success:true,
    //     users,
    // })
};

// export const register=async(req,res)=>{
    
//     const {name,email,password}=req.body;
//     await user.create({
//         name,
//         email,
//         password,
//     });
    
// // temp ek variable h jisme cookie ki value store hui h
//     res.status(201).cookie("temp","lol").json({  // 201 mtlb ki create ho gya h user ,ye optional h cookie and status,dde bhi skte nhi bhi
//         success:true,
//         message:"registered successfully"
//     })
// };

// export const userdetail=async(req,res)=>{
//     const {id}=req.query;
//     const users=await user.findById(id); // we are finding details of user by giving id
    
//     res.json({
//         success:true,
//         users,
//     })
// };

// export const getuserdetails= async(req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id);
//     res.json({
//         success:true,
//         users,
//     })
// }

// export const updateuser= async(req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id);
//     res.json({
//         success:true,
//        message:"updated",
//     })
// }

// export const deleteuser= async(req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id);
//     //await user.remove();
//     res.json({
//         success:true,
//        message:"deleted",
//     })
// }

export const getMyProfile = (req, res) => {
    res.status(200).json({
      success: true,
      usr:req.usr,
    });
  };

export const login= async(req,res,next)=>{
    try {
        const {email,password}=req.body;
    const usr=await user.findOne({email}).select("+password"); // yaha +password isliye likh rhe as controllers ke user file me
    // password me select ko false kra hai,kyuki taaki koi use access na kr paaye...
    if(!usr){
        return  next(new errorhandler("user do not exist",404));
    }

    const ismatch=await bcrypt.compare(password,usr.password);

    if(!ismatch){
        return  next(new errorhandler("invalid username or password",404));
    }

    sendcookie(usr,res,`welcome here,${usr.name}`,200);
    } catch (error) {
        next(error);
    }

}


export const register= async(req,res,next)=>{

 try {
    const {name,email,password}=req.body;
    let usr=await user.findOne({email});
 
     if(usr)
         return  next(new errorhandler("user already exist",404));
 
     
 
     const hashedpassword=await bcrypt.hash(password,10);
     usr= await user.create({name,email,password:hashedpassword});
 
     sendcookie(usr,res,"registered successfully",201)
 }
  catch (error) {
     next(error);
 }

};


// isme jrurat nhi h try catch ki as ye async in hai
export const getuserdetails=(req,res)=>{
    
   res.status(200).json({
    success:true,
     usr:req.usr,
   });

    
};


export const logout=(req,res)=>{
    
    res.status(200).cookie("token","",{expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        // sameesite none isliye h taaki hum chahte h frontend kisi aur url pr rhe aur backend kahi aur
        secure:process.env.NODE_ENV==="Development"?false:true,
        // secure ko true krna hi pdta h samesite ke saath
    }).json({  // mtlb cookie me jo token h use empty kr do
     success:true,
    //   usr:req.usr,
    user:req.user,
    });
 
     
 }

