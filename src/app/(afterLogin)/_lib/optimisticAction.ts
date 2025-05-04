import { Post } from '@/model/Post';
import { User } from '@/model/User';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

interface MutationProps {
  queryClient: QueryClient;
  postId?: number;
  userId?: string;
  session: any;
  add: boolean;
}

export function updateHeartsOnCache({ queryClient, postId, session, add }: MutationProps) {
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

export function updateFollowersOnCache({ queryClient, userId, session, add }: MutationProps) {
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

  queryKeys.forEach((queryKey) => {
    if (queryKey[0] === 'users') {
      // followRecommends 업데이트
      if (queryKey[1] === 'followRecommends') {
        const value: User[] | undefined = queryClient.getQueryData(queryKey);
        if (value) {
          const index = value.findIndex((v) => v.id === userId);
          if (index > -1) {
            const shallow = [...value];
            shallow[index] = {
              ...shallow[index],
              Followers: add
                ? [{ id: session?.user?.email as string }]
                : shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
              _count: {
                ...shallow[index]._count,
                Followers: shallow[index]._count?.Followers + (add ? 1 : -1),
              },
            };
            queryClient.setQueryData(queryKey, shallow);
          }
        }
      }

      // 개별 유저 업데이트
      if (queryKey[1] === userId) {
        const value: User | undefined = queryClient.getQueryData(queryKey);
        if (value) {
          const shallow = {
            ...value,
            Followers: add
              ? [{ id: session?.user?.email as string }]
              : value.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value._count,
              Followers: value._count?.Followers + (add ? 1 : -1),
            },
          };
          queryClient.setQueryData(queryKey, shallow);
        }
      }
    }
  });
}
