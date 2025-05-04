'use client';

import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import style from '@/app/(afterLogin)/[username]/profile.module.css';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { User } from '@/model/User';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { Session } from 'next-auth';
import { MouseEventHandler } from 'react';
import { updateFollowersOnCache } from '../../_lib/optimisticAction';

type Props = {
  username: string;
  session: Session | null;
};
export default function UserInfo({ username, session }: Props) {
  const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
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

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div
          style={{
            height: 100,
            alignItems: 'center',
            fontSize: 31,
            fontWeight: 'bold',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          계정이 존재하지 않음
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  const followed = user.Followers?.find((v) => v.id === session?.user?.email);

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {user.id !== session?.user?.email && (
            <button
              onClick={onFollow}
              className={cx(style.followButton, followed && style.followed)}
            >
              {followed ? '팔로잉' : '팔로우'}
            </button>
          )}
        </div>
        <div className={style.userFollower}>
          <div>{user._count.Followers} 팔로워</div>
          &nbsp;
          <div>{user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
