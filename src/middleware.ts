import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  // console.log('middleware', request.nextUrl.pathname);
  // 로그인 페이지 접근 시 로그인 페이지로 리다이렉트
  const session = await auth();
  if (!session) {
    console.log('middlewaremiddlewaremiddlewaremiddleware', process.env.NEXT_PUBLIC_CLIENT_URL);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/i/flow/login`);
  }
}

export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
