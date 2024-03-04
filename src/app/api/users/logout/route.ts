
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout duccessful"});

    response.cookies.set("token", '',{
      httpOnly: false,
      expires: new Date(0)
    });
    

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Cannot logout" });
  }
}
