'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logOutButton.module.css';
import { Session } from 'next-auth';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  me: Session | null;
};
export default function LogoutButton({ me }: Props) {
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.clear();
    signOut({ callbackUrl: '/' });
  };

  if (!me?.user) {
    return null;
  }
  // console.log('me', me);

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.uid as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.uid}</div>
      </div>
    </button>
  );
}
