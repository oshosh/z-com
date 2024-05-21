export async function getFollowingPost() {
  const res = await fetch('http://localhost:9090/api/followingPosts', {
    next: {
      tags: ['posts', 'followings'],
    },
    cache: 'no-store', // 캐시를 하지 않고 모든 요청을 새로 불러옴
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
