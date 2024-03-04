import { dbConnect } from "@/dbConfig/Database";
import User from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

export async function GET() {
    try {
        const response = await User.find().select(["-password", "-__v"])

        return NextResponse.json({success: true, data: response}, {status:200})
        
    } catch (error) {
        return NextResponse.json({success: true, error: error}, {status: 400})
    }
    
}


export async function POST(request: NextRequest) {
    try {
        const response = await request.json()

        const id = response?._id
        const isAdmin = !response.isAdmin

        const updateUser = await User.findByIdAndUpdate(id, {isAdmin})


      

        return NextResponse.json({success: true, updateUser}, {status:200})
        
    } catch (error) {
        return NextResponse.json({success: true, error: error}, {status: 400})
    }
    
}