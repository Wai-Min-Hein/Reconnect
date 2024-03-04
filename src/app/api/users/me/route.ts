import { dbConnect } from "@/dbConfig/Database";
import { getDataFromToken } from "@/helper/getDataFromTokem";
import User from "@/models/UserModels";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const req = request.json();

    const email = await getDataFromToken(request);

    const user = await User.findOne({ email }).select(["-password", "-__v"]);

    return NextResponse.json(
      { message: "Data accepted from token", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get data from token" },
      { status: 500 }
    );
  }
}




export async function POST(request: NextRequest) {
  try {
    const token =  await request.json();
    

    const decodedToken: any = jwt.verify(token, process?.env.PassSecret!);

    const email = decodedToken?.email;





    const user = await User.findOne({ email }).select(["-password", "-__v"]);

 

    return NextResponse.json(
      { message: "Data accepted from token", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get data from token" },
      { status: 500 }
    );
  }
}


