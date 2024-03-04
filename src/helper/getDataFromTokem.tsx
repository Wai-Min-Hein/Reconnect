"use server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    console.log(token)


    const decodedToken: any = jwt.verify(token, process?.env.PassSecret!);

    const email = decodedToken?.email;

    return email;
  } catch (error: any) {
    console.log("error", error);
  }
}
