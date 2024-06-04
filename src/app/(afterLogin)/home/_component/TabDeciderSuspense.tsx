import { getPostRecommends } from '../_lib/getPostRecommends';
import TabDecider from './TabDecider';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 처음 cursor 값
  });
  // dehydrateState를 통해 prefetchQuery를 client로 hydrate하는 과정
  const dehydrateState = dehydrate(queryClient);
  // query 데이터 불러오기
  queryClient.getQueryData(['posts', 'recommends']);

  return (
    // network tab에서 home에 ssg에서 미리 가져와서 불러다 client로 뿌릴수 있음
    <HydrationBoundary state={dehydrateState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
