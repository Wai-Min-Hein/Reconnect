import { dbConnect } from "@/dbConfig/Database";
import RequestedOcData from "@/models/RequestedOcdataModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect()


export  async function GET() {
    try {
        const reqDatas = await RequestedOcData.find()

        return NextResponse.json({message: 'Get data in requested Oc success', data: reqDatas}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Cannot get data in requested Oc'}, {status: 401})
    }
}

export  async function POST(request: NextRequest) {
    try {
        const req =await request.json()

        const data = new RequestedOcData(req)

        const savedData = await data.save()

        return NextResponse.json({message: 'Post data in requested Oc success', data: savedData}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Cannot post data in requested Oc'}, {status: 401})
    }
}


export async function PUT(request:NextRequest) {
    try {
        const res =await request.json()

        


        const id = res.allReq._id
        // const name = res?.name
        // const newUpdatedData = res?.data


       const updatedReq = await RequestedOcData.findByIdAndUpdate(id, res?.allReq)

    


        return NextResponse.json({message: 'Request status update success', data: updatedReq}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: 'Error in update request oc'}, {status: 402})
    }
}