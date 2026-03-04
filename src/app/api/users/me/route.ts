/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDatafromToken } from "@/helpers/getdatafromtoken";
import { NextRequest,NextResponse } from "next/server";
import { User } from "@/models/user.model";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request : NextRequest){
    try {
        const userid=await getDatafromToken(request);
      const user=  await User.findOne({_id : userid}).select("-password");
        return NextResponse.json({
            message : "User found",
            data : user,
        })
    } catch (error : any ) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
