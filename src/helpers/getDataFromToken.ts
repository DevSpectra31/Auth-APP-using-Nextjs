/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDatafromToken = (request : NextRequest) =>{
    try {
       const token = request.cookies.get("token")?.value || "";
       const decodetoken = jwt.verify(token,process.env.JWT_SECRET!) as jwt.JwtPayload;
       return decodetoken.id;
       
    } catch (error : any) {
        throw new Error(error.message);
    }
}