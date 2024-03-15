import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import style from './style.module.css';
import { Link } from '../../layout/Link';
import { generateSlug } from '../../utils/generateSlug';
import { IResumeNovel, novelApi } from '@/api/novel-api';
import { useQuery } from 'react-query';

export const GridBooksRecomendations = () => {
  const [novels, setNovels] = useState<IResumeNovel[] | []>([]);

  const { data, isLoading } = useQuery('GridBooksRecomendations-api',
    async () => await novelApi.getAll({ limit: 6 })
  );

  useEffect(() => {
    if (!isLoading && data && data.length > 0) return setNovels(data);
  }, [data, isLoading])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Recomendações</h2>
      <div className={style.wrapper}>
        {novels.length > 0 && novels.map(novel => (
          <Link to={`/novel/${generateSlug(novel.title)}`} key={novel.id} className={style.grid__book}>
            <div className={style.container}>
              <Thumbnail src={novel.thumbnail} alt={novel.title} />
            </div>
            <h3 className={style.title}>{novel.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}