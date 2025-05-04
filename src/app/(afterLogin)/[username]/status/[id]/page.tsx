import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { Post } from '@/model/Post';
import { User } from '@/model/User';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getUserServer } from '../../_lib/getUserServer';
import Comments from './_component/Comments';
import { getComments } from './_lib/getComments';
import { getSinglePost } from './_lib/getSinglePost';
import { getSinglePostServer } from './_lib/getSinglePostServer';
import style from './singlePost.module.css';

type Props = {
  params: Promise<{ id: string; username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, id } = await params;
  const [user, post]: [User, Post] = await Promise.all([
    getUserServer({ queryKey: ['users', username] }),
    getSinglePostServer({ queryKey: ['posts', id] }),
  ]);
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts', id], queryFn: getSinglePost });
  await queryClient.prefetchQuery({ queryKey: ['posts', id, 'comments'], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <div>싱글포스트</div>
        <SinglePost id={id} />
        <div>댓글 폼</div>
        <CommentForm id={id} />
        <div>
          <div>댓글</div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
