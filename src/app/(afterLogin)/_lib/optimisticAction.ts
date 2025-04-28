import { Post } from '@/model/Post';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

export function updateHeartsOnCache({
  queryClient,
  postId,
  session,
  add,
}: {
  queryClient: QueryClient;
  postId: number;
  session: any;
  add: boolean;
}) {
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

  queryKeys.forEach((queryKey) => {
    if (queryKey[0] === 'posts') {
      const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
      if (value && 'pages' in value) {
        const obj = value.pages.flat().find((v) => v.postId === postId);
        if (obj) {
          const pageIndex = value.pages.findIndex((page) => page.includes(obj));
          const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
          const shallow = { ...value };
          value.pages = { ...value.pages };
          value.pages[pageIndex] = [...value.pages[pageIndex]];
          shallow.pages[pageIndex][index] = {
            ...shallow.pages[pageIndex][index],
            Hearts: add
              ? [{ userId: session?.user?.email as string }]
              : shallow.pages[pageIndex][index].Hearts.filter(
                  (v) => v.userId !== session?.user?.email
                ),
            _count: {
              ...shallow.pages[pageIndex][index]._count,
              Hearts: shallow.pages[pageIndex][index]._count.Hearts + (add ? 1 : -1),
            },
          };
          queryClient.setQueryData(queryKey, shallow);
        }
      } else if (value) {
        if (value.postId === postId) {
          const shallow = {
            ...value,
            Hearts: add
              ? [{ userId: session?.user?.email as string }]
              : value.Hearts.filter((v) => v.userId !== session?.user?.email),
            _count: {
              ...value._count,
              Hearts: value._count.Hearts + (add ? 1 : -1),
            },
          };
          queryClient.setQueryData(queryKey, shallow);
        }
      }
    }
  });
}
