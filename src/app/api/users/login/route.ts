'use server'

import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import User from "@/models/UserModels";

import jwt from "jsonwebtoken";
import { dbConnect } from "@/dbConfig/Database";
import { cookies } from "next/headers";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user existed
    const user = await User?.findOne({ email });

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "User do not existed" },
        { status: 400 }
      );
    }

    //compare password

    const salt = bcryptjs.genSaltSync(10);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Password do not correct" },
        { status: 400 }
      );
    }

    //create token
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.PassSecret!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token
    , {
      httpOnly: true,
    }
    );
    return response;
  } catch (error) {
    console.log("Error in login", error);
    return NextResponse.json({ merroressage: "Login failed", success: false });
  }
}
