export async function GET() {
    return new Response(null, {
        status: 307,
        headers: { 'Set-Cookie': `Authorization=guest; path=/`, 'Location': '/dashboard', },
    });
}