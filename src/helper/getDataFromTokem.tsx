'use server'
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function getDataFromToken(request: NextRequest) {

    try {
        const token = request.cookies.get("token")?.value || ''

    const decodedToken :any = jwt.verify(token, process?.env.PassSecret!)

    



return decodedToken?._id


    } catch (error: any) {
        console.log('error', error)
        
    }
    
}