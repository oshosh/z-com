import { auth } from './auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}

export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
