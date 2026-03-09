import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import {connect} from "@/dbConfig/dbConfig"
import { error } from "console";
import crypto from "crypto"
import next from "next";

connect();


export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user  = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"user does not exist"},{status:400})
        }
        await sendEmail({
            email:email,
            emailType:"RESET",
            userId : user._id
        });
        return NextResponse.json({message : "reset link send to your email ",
            success:true,
        })
    } catch (error : any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}