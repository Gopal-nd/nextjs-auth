import { NextResponse,NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { decode } from "punycode";

export const getDataFromToken = async(request:NextRequest)=>{
    try {
        const encodedToken = request.cookies.get('token')?.value||''

        const decodedToken:any = jwt.verify(encodedToken,process.env.TOKEN_SECRET!)
        console.log(decodedToken.id)
        return decodedToken.id; 
    } catch (error:any) {
        console.log("error in detDataFromToken",error)
        throw new Error(error.message);
    }
}