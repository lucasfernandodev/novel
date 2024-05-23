import { IconOrderByOld, IconOrderByRecent } from '../../assets/icons';
import style from './style.module.css';
import { INovelChapter } from '@/types/novel';
import { TableChapterList } from '../TableChapterList';
import { TableChapterPagination } from '../TableChapterPagination';
import { useEffect, useState } from 'react';


interface TableChapterContentProps {
  novelslug: string,
  chapters: INovelChapter[];
}

const ORDER_TYPES = {
  NEWEST: 'newest',
  OLDEST: 'oldest'
}

export const TableChapterContent = ({
  novelslug,
  chapters: chapterList
}: TableChapterContentProps) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [allPages, setAllPages] = useState([] as INovelChapter[])
  const [page, setPage] = useState([] as INovelChapter[]);
  const [order, setOrder] = useState(ORDER_TYPES.OLDEST)

  // Create Copy of chapters for ordering
  useEffect(() => {
    if (chapterList && chapterList.length !== 0) {
      setAllPages(chapterList)
    }
  }, [chapterList])

  // Slice only visible chapters for current page list
  useEffect(() => {
    if (allPages && allPages.length !== 0) {
      setPage(allPages?.slice((currentPage * 10) - 10, (currentPage * 10)))
    }
  }, [allPages, order, currentPage])

  function toggleOrder() {
    setOrder(prevOrder => (prevOrder === ORDER_TYPES.NEWEST ? ORDER_TYPES.OLDEST : ORDER_TYPES.NEWEST));
    setAllPages(allPages.reverse())
  }

  return (
    <div className={style.chaperList}>
      <div className={style.header}>
        <h3>Capítulos</h3>
        <button onClick={toggleOrder}>
          {order === ORDER_TYPES.OLDEST && <IconOrderByOld />}
          {order === ORDER_TYPES.NEWEST && <IconOrderByRecent />}
        </button>
      </div>

      <TableChapterList chapters={page} novelSlug={novelslug} />

      {allPages && allPages.length > 10 && (
        <TableChapterPagination
          setPage={setCurrentPage}
          totalCount={allPages.length}
        />
      )}
    </div>
  )
}