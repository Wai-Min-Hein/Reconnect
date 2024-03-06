import { dbConnect } from "@/dbConfig/Database";
import RequestedOcS from "@/models/RequestedOcModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect()

export async function PUT(request:NextRequest) {
    try {
        const res =await request.json()
        const id = res._id
console.log(res.status)
        
        
        
        
        const updatedReq = await RequestedOcS.findByIdAndUpdate(id, {reqStatus: res.status})


        return NextResponse.json({message: 'Request status update success', updatedReq}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Error in update request oc'}, {status: 402})
    }
}