import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    // console.log("token@middleware.ts: ",token)
    const url = request.nextUrl

    // Redirect authenticated users from "/" to "/dashboard"
    if (token && url.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect unauthenticated users from protected routes
    if (!token && (
        url.pathname.startsWith('/bills') ||
        url.pathname.startsWith('/dashboard')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/bills',
    ]
}