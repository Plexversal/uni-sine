import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from "@upstash/redis";
import { NextResponse } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '10s'),
  analytics: true
});

export default async function middleware(req) {
  // api rate limiting
  if(req.nextUrl.pathname.includes('/api/db')) {
    const ip = req.headers.get('x-forwarded-for') ?? "";
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { message: "Too many requests" },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString()
          }
        }
      );
    }

    return NextResponse.next();  // Continue to the next middleware or the API route handler
  }

  return NextResponse.next();  // If the URL doesn't match, continue to the next middleware or API route
}
