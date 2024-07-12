import express from "express";

import userRouter from "../routes/user.js"
import taskRouter from "../routes/task.js"
import {errormiddleware} from  "../middlewares/error.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";    // ye jaise ki jb saare api me same word repeat hota h like /users ,to kai log ise dynamically
// app .use("/users",userRouter)  aise likh dete ek jgah taaki baar baar na likhna pde.. pr tb api me do part
// ho jata static aur dynamic ,so deploy lrne me dikkat aati..so cors ka use krte
export const app=express();
config({
    path: "./data/config.env",
})



app.use(express.json()) // using middle ware to access json data from postman app

app.use(cookieParser()); // for accessing out id from token as we are already register
app.use(cors({  // origin ka mtlb hai ki request hmaare (frontend web application's URL) se hi aa rhi hai na...kisi aur jgah se aayegi to ye block kr dega 
    // origin:'http://localhost:5173',
    origin:process.env.FRONTEND_URL,
    methods:["GET","PUT","POST","DELETE"],
    credentials:true, // credentoials ka kaam h ,jo bhi hum cookies set kiye h login ke wqt,wo frontend pr dikhaaye
}))



// Enable CORS

app.use(userRouter);
app.use(taskRouter);
//app.use("/user" ,userRouter);   hum yaha prefix add kr skte ..iske mtlb h agr bajut saare routing me /users hai
// to har jgah likhne ki jurat nhi h..jaise routes ke user file me  hum /users hta skte routing se ..
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });







app.get("/",(req,res)=>{
    res.send("i will learn soon");
})


// using error middleware
app.use(errormiddleware);