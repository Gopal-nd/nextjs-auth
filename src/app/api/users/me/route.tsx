

import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/model/user.model";
import { connect } from "@/dbConfig/dbconfig";


connect()

export async function GET (request:NextRequest){
    try {
      const userId =  await getDataFromToken(request)
      console.log( 'user Unique id: ',userId)
      const user =await User.findOne({_id:userId}).select("-password");

      console.log( "after user get the find ouy by the mongood : ",user)
       return NextResponse.json({
        message:"user found",
        data:user
       }) 

        } catch (error:any) {
            console.log("error in api route ME",error)
        return NextResponse.json({error:error.message},{status:400});
    }
}