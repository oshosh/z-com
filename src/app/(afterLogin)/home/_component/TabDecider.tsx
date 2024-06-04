'use client';
import { use } from 'react';
import { TabContext } from './TabProvider';
import PostRecommends from './PostRecommends';
import FollowingPosts from './FollowingPosts';

export default function TabDecider() {
  // const { tab } = useContext(TabContext);
  const { tab } = use(TabContext); // use는 조건문 안에서도 가능하나 커스텀 훅 혹은 컴포넌트에서만 사용 가능함 일반 펑션에서 사용 불가
  if (tab === 'rec') {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}
