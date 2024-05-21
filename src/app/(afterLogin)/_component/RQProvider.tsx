'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: ReactNode;
};

export default function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // stale된 데이터를 다시 가져오는 경우 3가지
          refetchOnWindowFocus: false, // 다른 탭 있다가 다시 브라우저로 focus될때
          retryOnMount: true, // 컴포넌트가 언마운트되었다가 다시 마운트되었을때
          refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 연결되었을때
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
    </QueryClientProvider>
  );
}
