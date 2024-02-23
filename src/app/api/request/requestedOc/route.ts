import { dbConnect } from "@/dbConfig/Database";
import RequestedOcS from "@/models/RequestedOcModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    if (!req.reqStatus) {
        req.reqStatus = 'processing';
      }
    
    const newRequestedOc = new RequestedOcS(req);
   

    const savedRequestedOc = await newRequestedOc.save();


    return NextResponse.json(
      { message: "Requested Oc Success", data: savedRequestedOc },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error in Backend" }, { status: 400 });
  }
}
