import Home from '@/app/(afterLogin)/home/page';

type Props = {
  params: Promise<{ username: string; id: string; photoId: string }>;
};
export default async function Page(props: Props) {
  const params = await props.params;
  params.username; // elonmusk
  params.id; // 1
  params.photoId; // 1
  return (
    <>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <div>인터셉트</div>
      <Home />
    </>
  );
}
