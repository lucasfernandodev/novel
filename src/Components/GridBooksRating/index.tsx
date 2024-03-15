import style from './style.module.css';
import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import { IconStar } from '../../assets/icons';
import { Link } from '@/layout/Link';
import { generateSlug } from '@/utils/generateSlug';
import { IResumeNovel, novelApi } from '@/api/novel-api';
import { useQuery } from 'react-query';


export const GridBooksRating = () => {
  const [novels, setNovels] = useState<IResumeNovel[] | []>([]);

  const { data, isLoading } = useQuery('GridBooksRating-api',
    async () => await novelApi.getAll({ limit: 10, order: 'rated' })
  );

  useEffect(() => {
    if (!isLoading && data && data.length > 0) return setNovels(data);
  }, [data, isLoading])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Melhores Avaliados</h2>
      <div className={style.wrapper}>
        {novels.length === 0 && <p>Nenhuma novel foi adicionado ainda!</p>}
        {novels.length > 0 && novels.map(novel => (
          <Link key={novel.id} to={`/novel/${generateSlug(novel.title)}`} className={style.grid__book}>
            <div className={style.container}>
              <Thumbnail className={style.thumbnail} src={novel.thumbnail} alt={novel.title} />
            </div>
            <div className={style.info}>
              <h3 className={style.title}>{novel.title}</h3>
              <span className={style.author}>{novel.author}</span>
              <span className={style.rating}>
                <span><IconStar /></span>
                <span>{novel.rating}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}