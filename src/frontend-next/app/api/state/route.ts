import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    if (req.cookies.get("Authorization")) {
        return new Response(JSON.stringify(true), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify(false), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}