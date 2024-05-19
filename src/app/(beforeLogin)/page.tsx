import { auth } from '@/auth';
import BeforeLogin from './_component/BeforeLogin';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if(session?.user){
    redirect('/home');
    return null;
  }

  return (
     <BeforeLogin />
  )
}
