import BackButton from '@/app/(afterLogin)/_component/BackButton';
import Post from '@/app/(afterLogin)/_component/Post';
import style from './profile.module.css';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import UserPosts from './_compoent/UserPosts';
import { getUserPosts } from './_lib/getUserPosts';
import { getUser } from './_lib/getUser';
import UserInfo from './_compoent/UserInfo';

type Props = {
  params: Promise<{
    username: string;
  }>;
};
export default async function Profile(props: Props) {
  const params = await props.params;
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
