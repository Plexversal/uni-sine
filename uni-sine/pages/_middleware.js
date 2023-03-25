import { NextResponse } from 'next/server';
import NextCors from 'nextjs-cors'
export async function middleware(req) {
    const { nextUrl: url, geo } = req;
    const country = geo.country || 'US';
    url.searchParams.set('country', country);


    return NextResponse.rewrite(url);
}