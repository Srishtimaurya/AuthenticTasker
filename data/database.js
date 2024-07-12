// import mongoose from "mongoose";

// export const connectdb=()=>{
//     mongoose.connect(process.env.mongodb_uri,{ //isme hamne url ki jgah cloud ka url dena hai,to hmne config.env me iska url daal dia h fir yaha process.env ke through import kra h
//     dbname:"backendapi",
// }).then((c)=>console.log(`database connected successfully with ${c.connection.host}`)).catch((e)=>console.log(e));

// }
// ;

import mongoose from "mongoose";

export const connectdb = () => {
    mongoose.connect(process.env.mongodb_uri, {
        dbName: "backendapi",
        
    }).then((connection) => {
        console.log(`Database connected successfully with host: ${connection.connection.host}`);
    }).catch((error) => {
        console.error('Error connecting to database:', error);
    });
};
