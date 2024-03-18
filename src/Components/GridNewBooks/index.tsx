import style from './style.module.css';
import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import { generateSlug } from '../../utils/generateSlug';
import { Link } from '../../layout/Link';
import { useQuery } from 'react-query';
import { IResumeNovel, novelApi } from '@/api/novel-api';

export const GridNewBooks = () => {
  const [novels, setNovels] = useState<IResumeNovel[] | []>([]);

  const { data, isLoading } = useQuery('GridBooksRating-api',
    async () => await novelApi.getAll({ limit: 10, order: 'rated' })
  );

  useEffect(() => {
    if (!isLoading && data && data.length > 0) return setNovels(data);
  }, [data, isLoading])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Novos Livros</h2>
      <div className={style.wrapper}>
        {novels.length === 0 && 'Não existe ainda nenhuma novel no momento'}
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