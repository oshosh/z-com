'use client';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getFollowingPost } from '../_lib/getFollowingPost';
import Post from '../../_component/Post';

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post: IPost) => {
    return <Post key={post.postId} post={post} />;
  });
}
