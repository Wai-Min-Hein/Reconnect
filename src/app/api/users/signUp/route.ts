import { dbConnect } from "@/dbConfig/Database";
import User from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'



dbConnect();
export async function POST(requset: NextRequest) {
  try {
    const reqBody = await requset.json();

    const { userName, email, password, isAdmin } = reqBody;


    //if user existed

    const user = await User.findOne({email})

    if(user) {
     return NextResponse.json({error: 'User already existed'}, {status: 400})
    }

      //if user not existed
      const salt = await bcryptjs.genSalt(10)

      const hashPassword= await bcryptjs.hash(password, salt)


      const newUser = new User({userName, email, password:hashPassword, isAdmin})

      const savedUser = await newUser.save()

      console.log(savedUser)
    

    

    

    return NextResponse.json({ message: "Successful" , success: true, savedUser});
  } catch (error) {
    console.log("Route error", error);
    return NextResponse.json({ error: "error in creating new user" });
  }
}
