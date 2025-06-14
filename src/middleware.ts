// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const url = request.nextUrl;

  const isDashboard = url.pathname.startsWith('/dashboard');
  const isLogin = url.pathname === '/login';

  // If accessing /dashboard and not logged in → redirect to /login
  if (isDashboard && token !== 'valid_user') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access /login → redirect to /dashboard
  if (isLogin && token === 'valid_user') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
