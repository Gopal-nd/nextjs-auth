import {connect} from '@/dbConfig/dbconfig'
import User from "@/model/user.model.js"
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email,password} = reqBody;
        console.log(reqBody)

        //check if user alredy exist 
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Alredy Exists"},{status:400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashhedPassword = await bcryptjs.hash(password,salt)
        

        // new user
     const newUser = new User({
            username,
            email,
            password:hashhedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message:"User Created Successfully",
            sucess: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},
      {  status:500})
        console.log(error)
    }
}