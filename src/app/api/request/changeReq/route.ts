import RequestedOcS from "@/models/RequestedOcModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest) {
    try {
        const res =await request.json()


       const updatedReq = await RequestedOcS.findByIdAndUpdate(res?._id, {reqStatus: res?.status})

       console.log(updatedReq)

        return NextResponse.json({message: 'Request status update success', updatedReq}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Error in update request oc'}, {status: 402})
    }
}