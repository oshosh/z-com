export async function getPostRecommends() {
  const res = await fetch('http://localhost:9090/api/postRecommends', {
    next: {
      tags: ['posts', 'recommends'], // 캐시 태깅 revalidateTag를 통해 해당 태그와 관련 모든 항목의 유효성 검사가 가능함. (지정된거만 다시 캐시를 호출 한다고 보면됨.)
    },
    cache: 'no-store', // 캐시를 하지 않고 모든 요청을 새로 불러옴
  });

  // revalidatePath -> revalidatePath('/home') home url의 캐시를 삭제하고 다시 생성 -> 페이지를 다시 로드 해줌

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
