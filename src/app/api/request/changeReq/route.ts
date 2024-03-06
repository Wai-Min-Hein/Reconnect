import { dbConnect } from "@/dbConfig/Database";
import RequestedOcS from "@/models/RequestedOcModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect()

export async function PUT(request:NextRequest) {
    try {
        const res =await request.json()
        const id = res._id
        const reqStatus = res.reqStatus

        
        
        
        
        const updatedReq = await RequestedOcS.findByIdAndUpdate(id, {reqStatus})


        return NextResponse.json({message: 'Request status update success', updatedReq}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Error in update request oc'}, {status: 402})
    }
}