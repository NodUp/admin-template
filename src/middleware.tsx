import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';
import { SessionData } from './lib/session';

import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    request,
    new Response(),
    sessionOptions
  );

  if (!session.isLoggoedIn) {
    return NextResponse.json(null, {
      status: 401,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/users/:path*',
};
