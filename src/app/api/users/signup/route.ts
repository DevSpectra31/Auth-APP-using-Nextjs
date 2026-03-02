/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {connect} from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { error } from "console";


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        console.log("Fields required : ",reqBody)

        //check if user already exists
        const existedUser=await User.findOne({email})
        if(existedUser){
            return NextResponse.json({error:"user already exists"},{status:400})
        }
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            username,
            email,
            password:hashPassword
        })
        const savedUser=await newUser.save()
        console.log(savedUser)
        return NextResponse.json({
            message: "User created successfully",
            success:true,
            savedUser
        })
    } catch (error : any) {
        return NextResponse.json({error:error.message})
    }
}