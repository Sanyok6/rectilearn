import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    if (!req.cookies.access_token) {
        const response = NextResponse.redirect("/login");
        return response;
    }
}