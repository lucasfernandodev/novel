import { IconOrderByOld, IconOrderByRecent } from '../../assets/icons';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { usePagination } from '../../Hook/usePagination';
import { Link } from '../../layout/Link';

interface IChapter {
  title: string,
  url: string,
  timeago: string
}
export const TableChapterContent = () => {
  const [data, setData] = useState([] as IChapter[]);

  useEffect(() => {
    async function getChapters() {
      const req = await fetch("http://192.168.1.5:3000/chapters");
      const chapters = await req.json() as [];
      if (chapters.length) {
        setData(chapters);
      }

    }

    getChapters().catch(console.error)
  }, [])

  const { changePage, chapters,order, toggleOrder, currentPage, lastPage, pages } = usePagination({ chapters: data })

  return (
    <div className={style.chaperList}>
      <div className={style.header}>
        <h3>Capítulos</h3>
        <button onClick={toggleOrder}>
          {order === 'oldest' && <IconOrderByOld />}
          {order === 'newest' && <IconOrderByRecent />}
          </button>
      </div>
      <ul>
        {data && order && chapters.map(chapter => {
          return (
            <li key={chapter.title}>
              <Link to="#">{chapter.title}</Link>
              <span>{chapter.timeago}</span>
            </li>
          )
        })}

      </ul>
      <div className={style.pagination}>
        {
          data && pages.map((i, index) => {
            return (
              <span
                data-active={i === currentPage ? "true" : "false"}
                onClick={() => changePage(i, index)}
                className={style.item}>
                {i}
              </span>)
          })

        }
        <span className={style.item}>...</span>
        <span className={style.item}
          data-active={lastPage === currentPage ? "true" : "false"}
          onClick={() => changePage(lastPage, null)}>
          {lastPage}
        </span>
      </div>
    </div>
  )
}