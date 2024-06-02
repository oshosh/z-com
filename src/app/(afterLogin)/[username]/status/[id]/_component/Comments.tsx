'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import Post from '@/app/(afterLogin)/_component/Post';

type Props = {
  id: string;
};
export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(['posts', id]);

  const { data, error } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    enabled: !!post, // post가 없으면 답글도 없다.
  });

  if (post) {
    return data?.map((post) => {
      return (
        <>
          여기는 답글
          <Post post={post} key={post.postId} />
        </>
      );
    });
  }
  return null;
}
