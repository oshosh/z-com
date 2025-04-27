'use client';

import Post from '@/app/(afterLogin)/_component/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import styles from '@/app/(afterLogin)/home/home.module.css';
import { Post as IPost } from '@/model/Post';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// 데이터를 완전 처음 불러오는 경우 isPending이 true 상태 에서 데이터를 가져오는 경우
// false로 변경 되면서 isFetching 상태가 true로 변경 그때 isLoading도 true가 된다.
// 즉 isPending && isFetching 은 isLoading이 true인 경우이다.
export default function PostRecommends() {
  // hasNextPage 다음 페이지가 있는지 여부
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading, isError } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number // initialPageParam
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      // staleTime을 gcTime보다 길게 둬야 의도한 대로 동작한다. 캐시 유지 시간과 캐시 메모리를 비우는 시간이 맞음
      staleTime: 60 * 1000, // 기본값은 0이고 ms 단위로 설정 1분 동안 캐시 데이터 유지(fresh -> stale)
      gcTime: 300 * 1000, // 5분 이후 캐시 데이터 삭제(key 사용여부 -> inactive) 하지만 캐시 데이터가 사라지는 것은 아니기 때문에 ['posts', 'recommends']가 1분 설정 안으로 돌아오면 캐시 데이터가 사라지지 않는다.
      initialPageParam: 0, // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]] => 2차원 배열 형태로 가지고 있음
      getNextPageParam: (lastPage) => {
        return lastPage.at(-1)?.postId;
      },
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
            style={{ stroke: 'rgb(129, 155, 240)', opacity: 0.2 }}
          ></circle>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: 'rgb(129, 155, 240)', strokeDasharray: 80, strokeDashoffset: 60 }}
          ></circle>
        </svg>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
      </div>
    );
  }
  return (
    <>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.map((post) => {
              return <Post key={post.postId} post={post} />;
            })}
          </Fragment>
        );
      })}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
