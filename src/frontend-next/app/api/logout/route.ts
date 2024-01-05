export async function GET() {
    return new Response(null, {
        status: 307,
        headers: { 'Set-Cookie': `Authorization=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`, 'Location': '/login', },
    });
}