import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token');

  // if (!token && !req.url.includes('/auth/login')) {
  //   return NextResponse.redirect(new URL('/auth/login', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/contact', '/profile', '/data/:path*', '/auth/logout'],
};
