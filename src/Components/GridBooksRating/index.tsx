import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import style from './style.module.css';
import { getNovels } from '../../lib/getNovels';

interface INovels{
  id: string,
  title: string,
  slug: string,
  thumbnail: string,
  author: string,
  rating: string,
  rating_votes: string
}

export const GridBooksRating = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () =>{
      const novels = await getNovels();
      setData(novels)
    })();
  }, [])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Melhores Avaliados</h2>
      <div className={style.wrapper}>
        {data.length
          > 0 && data.slice(0, 10).map((novel: INovels) => (
            <a key={novel.id} href="#" className={style.grid__book}>
              <div className={style.container}>
                <Thumbnail className={style.thumbnail} src="" alt={novel.title} />
              </div>
              <div className={style.info}>
              <h3 className={style.title}>{novel.title}</h3>
              <span className={style.author}>{novel.author}</span>
              <span className={style.rating}>Nota {novel.rating} / 5 com {novel.rating_votes} votos</span>
              </div>
            </a>
          ))}
      </div>
    </section>
  )
}