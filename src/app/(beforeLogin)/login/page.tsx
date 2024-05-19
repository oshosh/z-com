'use client';

import { useRouter } from 'next/navigation';
import BeforeLogin from '@/app/(beforeLogin)/_component/BeforeLogin';
import { useSession } from 'next-auth/react';

export default function Logion() {
  const router = useRouter();
  router.replace('/i/flow/login');
  const session = useSession();

  if (session.status === 'authenticated') {
    router.replace('/home');
    return null;
  }

  return (
    <>
      <div>여기는 페러럴 라우트</div>
      <div>여기는 페러럴 라우트</div>
      <div>여기는 페러럴 라우트</div>
      <div>여기는 페러럴 라우트</div>
      <div>여기는 페러럴 라우트</div>
      <BeforeLogin />
    </>
  );
}
