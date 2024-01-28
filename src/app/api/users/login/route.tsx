
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import {connect} from '@/dbConfig/dbconfig'
import User from "@/model/user.model.js"
import bcryptjs from 'bcryptjs'
import { NextRequest,NextResponse } from 'next/server'
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest){
   try {
    // check for usser email
    const reqBody = await request.json()
    console.log(reqBody)
    const {email, password} = reqBody;

    const user =await User.findOne({email})
    if(!user){
        return NextResponse.json({Message:"User not exist"},{status:500})
    }
    console.log("user exists");
    //check if passsword exist

    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({
            message:"Invalid password"
        },{status:400})
    }
    console.log(user);

// create token data
const tokenData = {
    id:user._id,
    username:user.username,
    email:user.email,

}

  //create token data
  const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET! ,{expiresIn:"1d"})
  
const response = NextResponse.json({
    message:"Login Successful",
    sucsess:true,
})


response.cookies.set("token",token,{httpOnly:true})

return response;

   } catch (err:any) {
    return NextResponse.json({err:err.message},{status:500})
   }
}