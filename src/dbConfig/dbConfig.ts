/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { Trykker } from "next/font/google";
export async function connect(){
    try {
       await mongoose.connect(process.env.MONGO_URI!,)
       const connection=mongoose.connection;
       connection.on('connected',()=>{
        console.log('MongoDB connected successfully');
       })
       connection.on('error',(err)=>{
        console.log('MongoDb connection error . Please make sure mongoDb is running '+err)
       })
    } catch (error) {
        console.log(`something went wrong`);
        console.error(error);
    }
}