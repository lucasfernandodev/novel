import { IconOrderByOld, IconOrderByRecent } from '../../assets/icons';
import style from './style.module.css';
import { usePagination } from '../../Hook/usePagination';
import { Link } from '../../layout/Link';
import { INovelChapter } from '@/types/novel';

interface TableChapterContentProps {
  novelslug: string,
  chapters: INovelChapter[];
}

export const TableChapterContent = ({
  novelslug,
  chapters: chaptersData
}: TableChapterContentProps) => {
  const {
    changePage,
    chapters,
    order,
    toggleOrder,
    currentPage,
    lastPage,
    pages } = usePagination({ chapters: chaptersData })

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
        {chaptersData && order && chapters.map(chapter => {
          return (
            <li key={chapter.title}>
              <Link to={`/novel/${novelslug}/chapter/${chapter.id}`}>{chapter.title}</Link>
              <span>10h</span>
            </li>
          )
        })}

      </ul>
      {chaptersData && chaptersData.length > 10 && <div className={style.pagination}>
        {
          chaptersData && pages.map((i, index) => {
            return (
              <span
                key={index}
                data-active={i === currentPage ? "true" : "false"}
                onClick={() => changePage(i, index)}
                className={style.item}
              >
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
      </div>}
    </div>
  )
}