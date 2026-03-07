import  {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import { User } from "@/models/user.model"
import { error } from "console";


connect();

export async function POST(request : NextRequest){
    try {
        const reqBody=await request.json();
        const{token} = reqBody
        console.log(token)


        const user=await User.findOne({ verifyToken : token ,
            verifyTokenExpiry:{$gt:Date.now()}
        })
        console.log("user : ",user)
         if(!user){
             return NextResponse.json({error: "User does not exit"},{status:400})
         }
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({message: "email verified successfully ",
            success:true,
        })
    } catch ( error :any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}