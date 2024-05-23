import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './home.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';
import TabDecider from './_component/TabDecider';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  // dehydrateState를 통해 prefetchQuery를 client로 hydrate하는 과정
  const dehydrateState = dehydrate(queryClient);

  // query 데이터 불러오기
  queryClient.getQueryData(['posts', 'recommends']);

  return (
    <main className={style.main}>
      {/* network tab에서 home에 ssg에서 미리 가져와서 불러다 client로 뿌릴수 있음 */}
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm me={session} />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
