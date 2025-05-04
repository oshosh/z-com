// import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
// import PostForm from './_component/PostForm';
// import Tab from './_component/Tab';
// import TabProvider from './_component/TabProvider';
// import style from './home.module.css';
// import { getPostRecommends } from './_lib/getPostRecommends';
// import TabDecider from './_component/TabDecider';
// import { auth } from '@/auth';

// export default async function Home() {
//   const session = await auth();
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ['posts', 'recommends'],
//     queryFn: getPostRecommends,
//     initialPageParam: 0, // 처음 cursor 값
//   });
//   // dehydrateState를 통해 prefetchQuery를 client로 hydrate하는 과정
//   const dehydrateState = dehydrate(queryClient);

//   // query 데이터 불러오기
//   queryClient.getQueryData(['posts', 'recommends']);
//   // throw '하하';
//   return (
//     <main className={style.main}>
//       {/* network tab에서 home에 ssg에서 미리 가져와서 불러다 client로 뿌릴수 있음 */}
//       <HydrationBoundary state={dehydrateState}>
//         <TabProvider>
//           <Tab />
//           <PostForm me={session} />
//           <TabDecider />
//         </TabProvider>
//       </HydrationBoundary>
//     </main>
//   );
// }

// 리펙토링
// 위 로직은 전부 다 loading 컴포넌트에 의해 Tab,PostForm layout까지 ui가 나오지 않는 증상이 있지만
// Suspense를 통해 최적화 진행 및 TabDeciderSuspense만 로딩으로 적용함
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './home.module.css';

import { auth } from '@/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import Loading from './loading';

export const metadata: Metadata = {
  title: '홈 / Z',
  description: '홈',
};

export default async function Home() {
  const session = await auth();

  // throw '하하';
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        {/*  Suspense 가 로딩을 감지하고자 하는 것보다 위에 있어야함 */}
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
