import BackButton from '@/app/(afterLogin)/_component/BackButton';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import Tab from '@/app/(afterLogin)/search/_component/Tab';
import style from './search.module.css';
import SearchResult from './_component/SearchResult';

type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};
export default async function Search(props: Props) {
  const searchParams = await props.searchParams;
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
