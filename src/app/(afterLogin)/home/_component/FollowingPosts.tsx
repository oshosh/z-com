'use client';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getFollowingPosts } from '../_lib/getFollowingPost';
import Post from '../../_component/Post';
import styles from '@/app/(afterLogin)/home/home.module.css';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';

export default function FollowingPosts() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      // 데이터를 가져오고 있는지? 다음 페이지가 있는지에 따라 다음 데이터 조회
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg className={styles.loader} height={'100%'} viewBox='0 0 32 32' width={40}>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}
          ></circle>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: 'rgb(29, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60 }}
          ></circle>
        </svg>
      </div>
    );
  } else
    return (
      <>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((post: IPost) => (
              <Post key={post.postId} post={post} />
            ))}
          </Fragment>
        ))}
        <div ref={ref} style={{ height: 50 }} />
      </>
    );
}
