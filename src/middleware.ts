import { NextRequest, NextResponse } from 'next/server';


export async function middleware(request: NextRequest) {
  const access = request.cookies.get('access_token');
  const loginURL = request.nextUrl.basePath + '/auth/login';

  console.log(request.nextUrl.pathname);
  console.log(access);
  
  if (!access?.value) {
    return NextResponse.redirect(new URL(loginURL, request.url)); 
  }

  const checkLoginStatusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/check-login-status/`, {
    headers: {
      Authorization: `Bearer ${access.value}`,
      'Content-Type': 'application/json',
    }
  });

  if (checkLoginStatusResponse.status === 200) {
    return NextResponse.next();

  } else {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    const refreshData = await refreshResponse.json();
    if (refreshResponse.status === 200) {
      const response = NextResponse.next();
      response.cookies.set('access_token', refreshData.access, {
        expires: 60 * 60,
        httpOnly: false, 
        secure: true,
        path: '/',
        sameSite: 'none',
      });
      return response;
    } else {
      return NextResponse.redirect(new URL(loginURL, request.url));
    }
  }
}

export const config = {
  matcher: ['/', '/contact', '/profile', '/data/:path*', '/auth/logout'],
};
