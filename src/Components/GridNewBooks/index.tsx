/* eslint-disable no-useless-escape */
import { useEffect, useState } from 'react';
import { Thumbnail } from '../Thumbnail';
import style from './style.module.css';
import { getNovels } from '../../lib/getNovels';
import { generateSlug } from '../../utils/generateSlug';
import { Link } from '../../layout/Link';
import { INovel } from '../../types/novel';

export const GridNewBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () =>{
      const novels = await getNovels();
      setData(novels)
    })();
  }, [])

  return (
    <section className={style.grid}>
      <h2 className={style.title}>Novos Livros</h2>
      <div className={style.wrapper}>
        {data.length
          > 0 && data.slice(0, 6).map((novel: INovel) => (
            <Link to={`/novel?id=${generateSlug(novel.title)}`} key={novel.id} className={style.grid__book}>
              <div className={style.container}>
                <Thumbnail src={novel.avatarUrl} alt={novel.title} />
              </div>
              <h3 className={style.title}>{novel.title}</h3>
            </Link>
          ))}
      </div>
    </section>
  )
}