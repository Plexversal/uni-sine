import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from "@upstash/redis";
import { NextResponse } from 'next/server';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '10s'),
  analytics: true
});


export default async function middleware(req) {
  // Apply rate limiting to /api/db
  if (req.nextUrl.pathname.includes('/api/db')) {
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
  }

  if (req.nextUrl.pathname.startsWith('/api/chat')) {
    const res = NextResponse.next();
    const session = await getSession(req, res);
    if (!session) return NextResponse.json(
      { message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true },
      {
        status: 401,
      }
    );

      const Auth0Data = {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://uni-sine.eu.auth0.com/api/v2/",
        grant_type: "client_credentials"
    }
    const tokenResponse = await fetch('https://uni-sine.eu.auth0.com/oauth/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Auth0Data)
    });
    const token = await tokenResponse.json()
    const userResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}`, {
        method: 'GET',
        headers: { "authorization": `Bearer ${token.access_token}` },
    })
    const data = await userResponse.json()

    if(!data) {
      return NextResponse.json(
        { message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true },
        {
          status: 401,
        }
      );
        
    }

    if(!data.app_metadata.is_premium) {
      return NextResponse.json(
        { message: 'You need premium to use this feature. Click Account on the sidebar to subscribe.', endOfChat: true },
        {
          status: 401,
        }
      );
  }



  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/db/:path*', '/api/chat/:path*'],
};
