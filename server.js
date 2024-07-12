// import {app} from "../nodeapi/NODEAPI/app.js";
import {app} from "./NODEAPI/app.js";


import {connectdb} from "../nodeapi/data/database.js"


connectdb();

console.log("PORT:", process.env.PORT);

//  console.log('MongoDB URI:', process.env.mondodb_uri);

app.listen(4000,()=>{
    console.log(`server is working on:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
