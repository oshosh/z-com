'use client';

import { User } from '@/model/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { updateFollowersOnCache } from '../_lib/optimisticAction';
import style from './followRecommend.module.css';

type Props = {
  user: User;
};
export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession();
  const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post',
      });
    },
    onMutate(userId: string) {
      updateFollowersOnCache({ queryClient, userId, session, add: true });
    },
    onError(error, userId: string) {
      updateFollowersOnCache({ queryClient, userId, session, add: false });
    },
  });

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete',
      });
    },
    onMutate(userId: string) {
      updateFollowersOnCache({ queryClient, userId, session, add: false });
    },
    onError(error, userId: string) {
      updateFollowersOnCache({ queryClient, userId, session, add: true });
    },
  });

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('follow', followed, user.id);
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  return (
    <Link href={`/${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={cx(style.followButtonSection, followed && style.followed)}>
        <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
      </div>
    </Link>
  );
}
