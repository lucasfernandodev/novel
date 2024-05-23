import { FC, useEffect } from 'react';
import style from './style.module.css';
import { usePagination } from '@/Hook/usePagination';

interface IProps {
  totalCount: number,
  setPage: (page: number) => void
}

interface ICustomPaginationItemProps {
  value: number;
  isActive: boolean;
  fn: () => void
}

const CustomPaginationItem: FC<ICustomPaginationItemProps> = ({ value, isActive, fn }) => {
  return <span
    onClick={fn}
    data-active={isActive}
    className={style.item}
  >
    {value}
  </span>
}

export const TableChapterPagination: FC<IProps> = ({ totalCount, setPage }) => {

  const { changePage, currentPage, lastPage, pages } = usePagination({ totalCount: totalCount });

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  return (
    <div className={style.paginationList}>
      {pages.map((item, index) => {
        const isActive = item === currentPage ? true : false;
        const _changePage = () => changePage(item, index)
        return (
          <CustomPaginationItem key={item} value={item} isActive={isActive} fn={_changePage} />
        )
      })}
      <span className={style.item}>...</span>
      <span className={style.item}
        data-active={lastPage === currentPage ? true : false}
        onClick={() => changePage(lastPage, null)}>
        {lastPage}
      </span>
    </div>
  )
}