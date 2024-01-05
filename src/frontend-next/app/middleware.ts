import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    if (["/login", "/signup"].includes(req.nextUrl.pathname) && req.cookies.get("Authorization")) {
        const response = NextResponse.redirect("/dashboard");
        return response;
    }
}