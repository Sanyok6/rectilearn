import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    if (["/login", "/signup"].includes(req.nextUrl.pathname) && req.cookies.access_token) {
        const response = NextResponse.redirect("/dashboard");
        return response;
    }
}