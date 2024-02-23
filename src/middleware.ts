import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import jwt from 'jsonwebtoken'
import User from './models/UserModels'
import { dbConnect } from './dbConfig/Database'

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const publicPath = (pathName == '/')

  



  const token = request.cookies.get('token')?.value || ''


 

  
  if(publicPath&& token) {
    return NextResponse.redirect(new URL('/myDeaths', request.nextUrl))
  }

  if(!publicPath&& !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }


}

  

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/myDeaths',
    '/requestOc',
    '/newAccount',
    '/allAccounts',
    '/changePasssword'
  ],
}
