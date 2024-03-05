
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout duccessful"});

    cookies().delete('token')

    

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Cannot logout" });
  }
}
