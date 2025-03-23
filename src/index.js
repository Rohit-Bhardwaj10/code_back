//require("dotenv").config({ path: "./env" });

import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDb();

//first approach
/*
import express from "express";
const app = express();


//connecting db through a iife
//in db connection always handle errors and use async await;

(async () => {
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${Dbname}`)
   app.on("error",(error)=>{
      console.log("app not able to talk to the backend",error)
    })

    app.listen(process.env.PORT, () =>{
      console.log(`app is listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("error :" , error)
  }
})()

*/

//second approach, using a db file for all db operations
