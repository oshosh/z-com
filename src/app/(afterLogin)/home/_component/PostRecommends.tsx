'use client';
import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 기본 값은 0이고, 0초뒤에 fresh상태에서 stale로 진행됨, Infinite (항상 fresh 상태 즉, 항상 캐시된 상태를 가져온다는 뜻)
    gcTime: 300 * 1000, // 5분 해당 queryKey를 사용하지 않으면 inactive 상태로 돌아가며 fresh 상태가 되고 있다면 캐시된 걸 바로 들고올 수 있음. (gcTime은 staleTime보다 작아야함.)
  });

  return data?.map((post: IPost) => {
    return <Post key={post.postId} post={post} />;
  });
}
