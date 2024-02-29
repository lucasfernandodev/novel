import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import style from './style.module.css';
import { getNovels } from '../../lib/getNovels';
import { IconStar } from '../../assets/icons';
import { INovel } from '../../types/novel';
import { Link } from '@/layout/Link';
import { generateSlug } from '@/utils/generateSlug';


export const GridBooksRating = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const novels = await getNovels();
      setData(novels)
    })();
  }, [])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Melhores Avaliados</h2>
      <div className={style.wrapper}>
        {data.length
          > 0 && data.slice(0, 10).map((novel: INovel) => (
            <Link key={novel.id} to={`/novel?id=${generateSlug(novel.title)}`} className={style.grid__book}>
              <div className={style.container}>
                <Thumbnail className={style.thumbnail} src={novel.avatarUrl} alt={novel.title} />
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