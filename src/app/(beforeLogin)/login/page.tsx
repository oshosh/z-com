'use client';

import { useRouter } from 'next/navigation';
import BeforeLogin from '@/app/(beforeLogin)/_component/BeforeLogin';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  // 서버에서 리다이렉트하면 인터셉트 안됨
  router.replace('/i/flow/login');
  const session = useSession();

  if (session.status === 'authenticated') {
    router.replace('/home');
    return null;
  }

  return (
    <>
      <div>여기는 원래 로그인 페이지 입니다.</div>
      <BeforeLogin />
    </>
  );
}
