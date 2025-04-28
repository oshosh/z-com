type Props = { pageParam?: number };
export async function getPostRecommends({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ['posts', 'recommends'],
      },
      credentials: 'include',
      cache: 'force-cache',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
/**
 * https://nextjs.org/docs/app/building-your-application/caching
 * next 15 버전 부터는 기본적으로 데이터를 캐시하지 않는다.
 * 캐시를 사용하기 위해서는 force-cache 옵션을 사용해야 한다.
 *
 * user가 영원히 캐시가 되는 경우가 있으니 next option 아래 revalidate 옵션을 사용하거나
 * revalidatePath, revalidateTag 함수를 사용해야 한다.
 *
 * 그리고 revalidatePath, revalidateTag의 경우는 server action과 route handler에서만 사용이 가능
 *
 * no-store와 revalidate는 같이 사용이 불가능 하다.
 * 캐시를 사용하지 않는데 데이터를 캐시를 갱신 하는 것은 무의미 하다.
 */
