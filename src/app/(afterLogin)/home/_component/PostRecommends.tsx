'use client';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { useInView } from 'react-intersection-observer';
import { Fragment, useEffect } from 'react';

export default function PostRecommends() {
  // hasNextPage 다음 페이지가 있는지 여부
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost,
    Object,
    InfiniteData<IPost>,
    [_1: string, _2: string],
    number // initialPageParam
  >({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    initialPageParam: 0, // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]] => 2차원 배열 형태로 가지고 있음
    getNextPageParam: (lastPage: IPost) => lastPage.postId // 5을 가져옴
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

  // 2차원 리턴
  return (
    <>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {[group].map((post : IPost) => {
              return <Post key={post.postId} post={post} />;
            })}
          </Fragment>
        );
      })}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
