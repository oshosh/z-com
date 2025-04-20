'use client';

import BeforeLogin from '@/app/(beforeLogin)/_component/BeforeLogin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/home');
    }
  }, [session.status, router]);

  useEffect(() => {
    router.replace('/i/flow/login');
  }, [router]);

  return (
    <>
      <div>여기는 원래 로그인 페이지 입니다.</div>
      <BeforeLogin />
    </>
  );
}
