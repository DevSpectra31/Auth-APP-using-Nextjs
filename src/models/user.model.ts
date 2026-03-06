/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose  , {Schema} from "mongoose";
import { unique } from "next/dist/build/utils";
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim : true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true, 
        },
        password:{
            type:String,
            required: [true, "Please provide a password"]
        },
       isVerified:{
        type:Boolean,
        default:false,
       },
       isAdmin:{
        type:String,
        default:false,
       },
       forgotPasswordToken:String,
       forgotPasswordTokenExpiry:Date,
       verifyToken:String,
       verifyTokenExpiry:Date,
    }
)
export const User = mongoose.models.User || mongoose.model("User", userSchema);