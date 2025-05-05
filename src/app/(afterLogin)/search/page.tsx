import BackButton from '@/app/(afterLogin)/_component/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import Tab from '@/app/(afterLogin)/search/_component/Tab';
import { Metadata, ResolvingMetadata } from 'next';
import SearchResult from './_component/SearchResult';
import style from './search.module.css';

type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};

// 부모 페이지의 메타데이터를 상속받아 사용 - parent (ex) '/' 페이지의 메타데이터를 상속받아 사용
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { q } = await searchParams;
  console.log('parent', parent);

  return {
    title: `${q} - 검색 / Z`,
    description: `${q} - 검색 / Z`,
  };
}

export default async function Search({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={query.q} pf={query.pf} f={query.f} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={query} />
      </div>
    </main>
  );
}
