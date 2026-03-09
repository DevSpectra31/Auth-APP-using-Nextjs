import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import {connect} from "@/dbConfig/dbConfig"
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {password, token} = reqBody;

    if(!password || !token){
        return NextResponse.json(
            {message:"password and token are both required"},
            {status:400}
        )
    }

    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {$gt: Date.now()}
    });

    if(!user){
        return NextResponse.json({message:"invalid or reset link expired"})
    }

    const hashedpassword = await bcrypt.hash(password,10);

    user.password = hashedpassword
    user.isReset=true
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
        message:"password reset successfully",
        success:true
    })
}