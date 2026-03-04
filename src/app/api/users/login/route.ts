/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {connect} from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST (request  : NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody;
        console.log(reqBody)
        //check if user exist
        const existeduser=await User.findOne({email});
        if(!existeduser){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        //check if password is correct
        const validPassword=await bcrypt.compare(password,existeduser.password)
        if(!validPassword){
            return NextResponse.json({error:"password is not correct"},{status:400})
        }
        //set the token data
        const tokenData={
            id:existeduser._id,
            username:existeduser.username,
            email:existeduser.email,

        }
        //set the token
       const token  = await jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1d"})
      // console.log("token : ",token)
        const response = NextResponse.json({
            message:"login successfully",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    } catch (error : any) {
        return NextResponse.json({error : error.message},{status:500})
    }
}