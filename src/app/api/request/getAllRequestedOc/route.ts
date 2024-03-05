import { dbConnect } from "@/dbConfig/Database";
import RequestedOcS from "@/models/RequestedOcModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect()

export async function GET(request:NextRequest) {

    try {
        const reqs = await RequestedOcS.find()

        console.log(reqs, 'all requestded data')

        return NextResponse.json({success: true, requests: reqs}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Error in getting requested'}, {status: 402})
    }
    
}