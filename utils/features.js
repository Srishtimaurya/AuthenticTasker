import jwt from "jsonwebtoken"

 export const sendcookie=(user,res,message,statuscode=200)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);


    res.status(statuscode).cookie("token",token,{
     httpOnly:true,
     maxage:15*60*1000,
     sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
     // sameesite none isliye h taaki hum chahte h frontend kisi aur url pr rhe aur backend kahi aur
     secure:process.env.NODE_ENV==="Development"?false:true,
     // secure ko true krna hi pdta h samesite ke saath
    })
    .json({
        success:true,
        message,
    });
 }