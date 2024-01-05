import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    if (!req.cookies.Authorization) {
        const response = NextResponse.redirect("/login");
        return response;
    }
}